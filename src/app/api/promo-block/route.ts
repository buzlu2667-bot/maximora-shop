import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('promo_blocks')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    
    // Map snake_case to camelCase for compatibility
    const mapped = (data || []).map(item => ({
      id: item.id,
      enabled: item.enabled,
      title: item.title,
      description: item.description,
      buttonText: item.button_text,
      buttonLink: item.button_link,
      image: item.image,
      imagePosition: item.image_position
    }));

    return NextResponse.json(mapped);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Body bir array olmalı (sıralı liste)
    const blocks = Array.isArray(body) ? body : [body];
    
    // Mevcutları silip yenilerini ekleyerek sync edebiliriz veya tek tek upsert edebiliriz.
    // Admin paneli tüm listeyi gönderdiği için toplu işlem mantıklı.
    
    const rows = blocks.map((item, index) => ({
      id: item.id || `promo-${Date.now()}-${index}`,
      enabled: item.enabled ?? true,
      title: item.title || '',
      description: item.description || '',
      button_text: item.buttonText || '',
      button_link: item.buttonLink || '',
      image: item.image || '',
      image_position: item.imagePosition || 'right',
      display_order: index
    }));

    // Önce hepsini temizle (basit sync stratejisi)
    await supabaseAdmin.from('promo_blocks').delete().neq('id', 'temp-never-matches');

    const { error } = await supabaseAdmin
      .from('promo_blocks')
      .upsert(rows);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
