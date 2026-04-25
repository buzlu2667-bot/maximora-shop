import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Tüm Kullanıcıları Getir
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Kullanıcı Silme
export async function DELETE(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID missing' }, { status: 400 });
    }

    // İlişkili verileri temizle
    await supabaseAdmin.from('favorites').delete().eq('user_id', userId);
    await supabaseAdmin.from('cart').delete().eq('user_id', userId);
    await supabaseAdmin.from('profiles').delete().eq('id', userId);

    // Ana kullanıcıyı Auth'dan sil
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    
    if (authError && authError.message !== 'User not found') {
      throw authError;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ 
      error: err.message || 'Bilinmeyen bir hata oluştu', 
      details: err
    }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { userId, isBanned } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID missing' }, { status: 400 });
    }

    // Profilde banla
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ is_banned: isBanned })
      .eq('id', userId);
    
    if (profileError) throw profileError;

    // Kullanıcının oturumlarını sonlandır
    if (isBanned) {
      await supabaseAdmin.auth.admin.signOut(userId);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
