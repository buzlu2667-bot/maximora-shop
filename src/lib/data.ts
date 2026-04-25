import { supabaseAdmin } from './supabase-admin';
import { Product } from '@/types';

export function rowToProduct(row: any): Product {
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

export async function getProducts() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('in_stock', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(rowToProduct);
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return rowToProduct(data);
}

export async function getShowcases() {
  const { data, error } = await supabaseAdmin
    .from('showcases')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) return [];
  
  return (data || []).map(item => ({
    id: item.id,
    title: item.title,
    category: item.category,
    brand: item.brand,
    limit: item.limit_count,
    layout: item.layout
  }));
}

export async function getPromoBlocks() {
  const { data, error } = await supabaseAdmin
    .from('promo_blocks')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) return [];
  
  return (data || []).map(item => ({
    id: item.id,
    enabled: item.enabled,
    title: item.title,
    description: item.description,
    buttonText: item.button_text,
    buttonLink: item.button_link,
    image: item.image,
    imagePosition: item.image_position
  }));
}

export async function getNewestSettings() {
  const { data, error } = await supabaseAdmin
    .from('settings')
    .select('newest_settings')
    .eq('id', 1)
    .maybeSingle();

  if (error) return null;
  return data?.newest_settings || {
    enabled: true,
    title: 'En Yeni Ürünler',
    layout: 'grid',
    limit: 8
  };
}

export async function getSliderImages() {
  const { data, error } = await supabaseAdmin
    .from('slider_images')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) return [];
  
  return (data || []).map(item => ({
    id: item.id,
    image: item.image_url,
    title: item.title,
    link: item.link
  }));
}
