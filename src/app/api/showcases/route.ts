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
    
    const rows = showcases.map((item, index) => {
      return {
        title: item.title,
        category: item.category || null,
        brand: item.brand || null,
        limit_count: item.limit || 4,
        layout: item.layout || 'grid',
        display_order: index
      };
    });


    // Önce hepsini sil (sync için en temizi bu)
    // .gt('display_order', -1) her zaman doğru olacağı için tüm satırları siler
    const { error: delError } = await supabaseAdmin
      .from('showcases')
      .delete()
      .gt('display_order', -1);

    if (delError) {
      console.error('Delete error:', delError.message);
      return NextResponse.json({ error: `Silme hatası: ${delError.message}` }, { status: 500 });
    }

    if (rows.length > 0) {
      const { error: insError } = await supabaseAdmin
        .from('showcases')
        .insert(rows);

      if (insError) {
        console.error('Insert error:', insError.message);
        return NextResponse.json({ error: `Ekleme hatası: ${insError.message}` }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Showcases API Catch:', error.message);
    return NextResponse.json({ error: `Beklenmedik hata: ${error.message}` }, { status: 500 });
  }


}
