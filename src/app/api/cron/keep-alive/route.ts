import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Veritabanına ufak bir "dokunuş" yapıyoruz
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('id')
      .limit(1);

    if (error) throw error;

    return NextResponse.json({ 
      status: 'awake', 
      timestamp: new Date().toISOString(),
      message: 'Supabase is wide awake! 🚀' 
    });
  } catch (error: any) {
    console.error('Keep-Alive Error:', error.message);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
