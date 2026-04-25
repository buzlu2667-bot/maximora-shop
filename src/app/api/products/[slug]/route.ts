import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { Product } from '@/types';

// Helper: Supabase satırını Product tipine dönüştür (api/products/route.ts ile aynı)
function rowToProduct(row: any): Product {
  let parsedBadges = [];
  if (row.badge_text && row.badge_text.startsWith('[')) {
    try {
      parsedBadges = JSON.parse(row.badge_text);
    } catch(e) {}
  } else if (row.badge_text) {
    parsedBadges = [{ text: row.badge_text, color: row.badge_color || '#111111' }];
  }

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || '',
    price: Number(row.price),
    discountedPrice: row.discounted_price ? Number(row.discounted_price) : undefined,
    oldPrice: row.old_price ? Number(row.old_price) : undefined,
    category: row.category,
    brand: row.brand || undefined,
    images: row.images || [],
    inStock: row.in_stock,
    stockCount: row.stock_count,
    variants: row.variants || [],
    features: row.features || [],
    reviews: row.reviews || [],
    isNew: row.is_new,
    isBestseller: row.is_bestseller,
    isFeatured: row.is_featured,
    shopierUrl: row.shopier_url || undefined,
    badgeText: row.badge_text || undefined,
    badgeColor: row.badge_color || undefined,
    badges: parsedBadges,
    createdAt: row.created_at,
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
    }

    return NextResponse.json(rowToProduct(data));
  } catch (error) {
    return NextResponse.json({ error: 'Veritabanı okunurken bir hata oluştu' }, { status: 500 });
  }
}
