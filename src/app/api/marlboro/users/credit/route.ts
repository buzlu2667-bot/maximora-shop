import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function PUT(request: Request) {
  try {
    const { userId, balance } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID zorunludur' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ credit_balance: Number(balance) })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ message: 'Kredi güncellendi', data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Hata oluştu' }, { status: 500 });
  }
}
