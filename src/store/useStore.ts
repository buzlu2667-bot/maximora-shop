import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types';
import { supabase } from '@/lib/supabase';

interface AppliedCoupon {
  code: string;
  discountAmount: number;
}

interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface StoreState {
  // Auth
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
  syncUserData: (userId: string) => Promise<void>;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, selectedVariants?: Record<string, string>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;

  // Favorites
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => Promise<void>;

  // Coupons
  appliedCoupon: AppliedCoupon | null;
  setAppliedCoupon: (coupon: AppliedCoupon | null) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // ---- AUTH ----
      user: null,

      setUser: (user) => set({ user }),

      logout: () => set({ user: null, favorites: [] }),

      // Kullanıcı giriş yaptıktan sonra Supabase'den favorilerini çeker
      syncUserData: async (userId: string) => {
        try {
          // Supabase Auth'dan kullanıcı bilgisi
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          // Profili çek (Rol bilgisini almak için)
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

          const current = get().user;
          const newUser = {
            id: user.id,
            email: user.email || '',
            name: user.user_metadata?.full_name || '',
            role: profile?.role || 'customer',
          };

          // Eğer veri aynıysa store'u güncelleme (Döngü kırıcı)
          if (JSON.stringify(current) === JSON.stringify(newUser)) {
             // Sadece favorileri çekmeye devam et
          } else {
             set({ user: newUser });
          }

          // Favorileri Supabase'den çek
          const { data: favRows } = await supabase
            .from('favorites')
            .select('product_id, products(*)')
            .eq('user_id', userId);

          if (favRows && favRows.length > 0) {
            const favProducts = favRows
              .map((f: any) => f.products)
              .filter(Boolean)
              .map((row: any) => ({
                id: row.id,
                name: row.name,
                slug: row.slug,
                description: row.description || '',
                price: Number(row.price),
                discountedPrice: row.discounted_price ? Number(row.discounted_price) : undefined,
                category: row.category,
                images: row.images || [],
                inStock: row.in_stock,
                stockCount: row.stock_count,
                variants: row.variants || [],
                features: row.features || [],
                shopierUrl: row.shopier_url || undefined,
              }));
            set({ favorites: favProducts });
          }
        } catch (err) {
          console.error('syncUserData error:', err);
        }
      },

      // ---- CART ----
      cart: [],

      addToCart: (product, quantity, selectedVariants) => {
        set((state) => {
          // Renge özel fiyatı hesapla
          const colorVariant = product.variants?.find(v => v.id === 'color');
          const selectedColor = selectedVariants?.['color'];
          let overridePrice = undefined;
          let overrideOldPrice = undefined;

          if (colorVariant?.variantPrices && selectedColor && colorVariant.variantPrices[selectedColor]) {
            overridePrice = colorVariant.variantPrices[selectedColor];
          }
          if (colorVariant?.variantOldPrices && selectedColor && colorVariant.variantOldPrices[selectedColor]) {
            overrideOldPrice = colorVariant.variantOldPrices[selectedColor];
          }

          const existingItem = state.cart.find((item) =>
            item.product.id === product.id &&
            JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.cartItemId === existingItem.cartItemId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            cart: [...state.cart, { 
              cartItemId: Date.now().toString(), 
              product, 
              quantity, 
              selectedVariants,
              overridePrice,
              overrideOldPrice
            }],
          };
        });
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      // ---- FAVORITES ----
      favorites: [],

      addToFavorites: async (product) => {
        set((state) => {
          if (state.favorites.some((f) => f.id === product.id)) return state;
          return { favorites: [...state.favorites, product] };
        });

        // Kullanıcı giriş yapmışsa Supabase'e de kaydet
        const user = get().user;
        if (user) {
          await supabase
            .from('favorites')
            .upsert({ user_id: user.id, product_id: product.id }, { onConflict: 'user_id,product_id' });
        }
      },

      removeFromFavorites: async (productId) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== productId),
        }));

        // Kullanıcı giriş yapmışsa Supabase'den de sil
        const user = get().user;
        if (user) {
          await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('product_id', productId);
        }
      },

      isFavorite: (productId) => {
        return get().favorites.some((f) => f.id === productId);
      },

      toggleFavorite: async (product: Product) => {
        const isFav = get().favorites.some((f) => f.id === product.id);
        if (isFav) {
          await get().removeFromFavorites(product.id);
        } else {
          await get().addToFavorites(product);
        }
      },

      // ---- COUPONS ----
      appliedCoupon: null,
      setAppliedCoupon: (coupon) => set({ appliedCoupon: coupon }),
    }),
    {
      name: 'maximora-storage',
      partialize: (state) => ({
        cart: state.cart,
        favorites: state.favorites,
        user: state.user,
      }),
    }
  )
);
