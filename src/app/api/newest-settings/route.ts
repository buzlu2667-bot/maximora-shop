import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('newest_settings')
      .eq('id', 1)
      .maybeSingle();

    if (error) throw error;
    
    const defaultSettings = {
      enabled: true,
      title: 'En Yeni Ürünler',
      layout: 'grid',
      limit: 8
    };

    return NextResponse.json(data?.newest_settings || defaultSettings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { error } = await supabaseAdmin
      .from('settings')
      .update({ newest_settings: body })
      .eq('id', 1);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
