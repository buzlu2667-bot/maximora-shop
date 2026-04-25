import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    // db.json'ı oku
    const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
    const raw = fs.readFileSync(dbPath, 'utf8');
    const products = JSON.parse(raw);

    // Her ürünü Supabase formatına çevir
    const rows = products.map((p: any) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description || '',
      price: p.price,
      discounted_price: p.discountedPrice || null,
      old_price: p.oldPrice || null,
      category: p.category,
      brand: p.brand || null,
      images: p.images || [],
      in_stock: p.inStock ?? true,
      stock_count: p.stockCount ?? 0,
      variants: p.variants || [],
      features: p.features || [],
      reviews: p.reviews || [],
      is_new: p.isNew ?? false,
      is_bestseller: p.isBestseller ?? false,
      is_featured: p.isFeatured ?? false,
      shopier_url: p.shopierUrl || null,
      badge_text: p.badgeText || null,
      badge_color: p.badgeColor || null,
      created_at: p.createdAt || new Date().toISOString(),
    }));

    // Supabase'e upsert (zaten varsa güncelle, yoksa ekle)
    const { data, error } = await supabaseAdmin
      .from('products')
      .upsert(rows, { onConflict: 'id' })
      .select('id, name');

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: `${data?.length || 0} ürün Supabase'e aktarıldı.`,
      products: data,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
