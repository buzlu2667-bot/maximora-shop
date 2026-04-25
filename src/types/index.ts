export interface Variant {
  id: string;
  name: string;
  options: string[];
  imageGroups?: Record<string, string[]>;
  shopierLinks?: Record<string, string>; // { "Siyah": "https://shopier.com/...", "Kırmızı": "https://..." }
  stockCounts?: Record<string, number>; // { "Siyah": 10, "Kırmızı": 5 }
  variantPrices?: Record<string, number>; // { "Siyah": 1500, "Altın": 1800 }
  variantOldPrices?: Record<string, number>; // { "Siyah": 1700, "Altın": 2000 }
  discountRates?: Record<string, number>; // { "Siyah": 10, "Altın": 20 }
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice?: number;
  category: string;
  brand?: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  variants?: Variant[];
  features?: string[];
  reviews?: Review[];
  isNew?: boolean;
  isBestseller?: boolean;
  shopierUrl?: string; // Shopier ödeme linki
  badgeText?: string;
  badgeColor?: string;
  badges?: { text: string; color: string }[];
  oldPrice?: number;
  isFeatured?: boolean;
  cart_discount_percent?: number;
  createdAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  avatar?: string;
  favorites: string[]; // Product IDs
}

export interface CartItem {
  cartItemId: string; // Unique ID for cart item
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>; // e.g., { 'color': 'red', 'size': 'M' }
  overridePrice?: number;
  overrideOldPrice?: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: string;
  paymentMethod: 'iban' | 'shopier';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}
