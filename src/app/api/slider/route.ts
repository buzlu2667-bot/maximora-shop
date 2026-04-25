import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('slider_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    
    const mapped = (data || []).map(item => ({
      id: item.id,
      image: item.image_url,
      title: item.title,
      link: item.link
    }));

    return NextResponse.json(mapped);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slides = Array.isArray(body) ? body : [body];
    
    const rows = slides.map((item, index) => ({
      image_url: item.image,
      title: item.title || null,
      link: item.link || null,
      display_order: index
    }));

    // Önce hepsini temizle (sync)
    await supabaseAdmin.from('slider_images').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const { error } = await supabaseAdmin
      .from('slider_images')
      .insert(rows);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
