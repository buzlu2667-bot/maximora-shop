import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { Product } from '@/types';

// Helper: Supabase satırını Product tipine dönüştür
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
    cart_discount_percent: row.cart_discount_percent || 0,
    createdAt: row.created_at,
  };
}

// Helper: Product objesini Supabase satırına dönüştür
function productToRow(body: any) {
  let badge_text = body.badgeText || null;
  if (body.badges && body.badges.length > 0) {
    badge_text = JSON.stringify(body.badges);
  } else if (body.badges && body.badges.length === 0) {
    badge_text = null;
  }

  return {
    name: body.name,
    slug: body.slug || body.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    description: body.description || '',
    price: body.price,
    discounted_price: body.discountedPrice || null,
    old_price: body.oldPrice || null,
    category: body.category,
    brand: body.brand || null,
    images: body.images || [],
    in_stock: body.inStock ?? true,
    stock_count: body.stockCount ?? 0,
    variants: body.variants || [],
    features: body.features || [],
    reviews: body.reviews || [],
    is_new: body.isNew ?? false,
    is_bestseller: body.isBestseller ?? false,
    is_featured: body.isFeatured ?? false,
    shopier_url: body.shopierUrl || null,
    badge_text: badge_text,
    badge_color: body.badgeColor || null,
    cart_discount_percent: body.cart_discount_percent || 0,
  };
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .order('in_stock', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json((data || []).map(rowToProduct));
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Ürünler okunamadı' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const row = productToRow(body);

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert(row)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(rowToProduct(data), { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Ürün eklenemedi' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID zorunludur' }, { status: 400 });

    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ message: 'Ürün silindi' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Ürün silinemedi' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID zorunludur' }, { status: 400 });

    const body = await request.json();
    const row = productToRow(body);

    const { data, error } = await supabaseAdmin
      .from('products')
      .update(row)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(rowToProduct(data));
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Ürün güncellenemedi' }, { status: 500 });
  }
}
