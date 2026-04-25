import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Sunucu tarafında RLS'i aşmak için Service Role Key kullanan özel client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    if (error) throw error;
    
    if (!data) {
      return NextResponse.json({
        maintenance_mode: false,
        maintenance_until: null,
        maintenance_message: ''
      });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    
    // Admin yetkisiyle (Service Role) güncelleme yapıyoruz, RLS engeline takılmaz
    const { data, error } = await supabaseAdmin
      .from('settings')
      .upsert({
        id: 1,
        ...body,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase settings error:', error);
      return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Settings catch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
