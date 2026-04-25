import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('showcases')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    
    const mapped = (data || []).map(item => ({
      id: item.id,
      title: item.title,
      category: item.category,
      brand: item.brand,
      limit: item.limit_count,
      layout: item.layout
    }));

    return NextResponse.json(mapped);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const showcases = Array.isArray(body) ? body : [body];
    
    const rows = showcases.map((item, index) => ({
      id: item.id || undefined,
      title: item.title,
      category: item.category || null,
      brand: item.brand || null,
      limit_count: item.limit || 4,
      layout: item.layout || 'grid',
      display_order: index
    }));

    // Önce hepsini silip yeniden ekle (sync)
    await supabaseAdmin.from('showcases').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const { error } = await supabaseAdmin
      .from('showcases')
      .insert(rows);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
