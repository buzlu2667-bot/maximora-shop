import { CartItem } from '@/types';

export interface DiscountSettings {
  multi_item_discounts?: { rank: number; percent: number }[];
  global_discount_percent?: number;
}

export const calculateCartTotals = (cart: CartItem[], settings: DiscountSettings, appliedCoupon?: any, appliedCredit: number = 0) => {
  const globalDiscount = settings.global_discount_percent || 0;
  const multiItemRules = settings.multi_item_discounts || [];

  // 1. Her bir ürünün (veya varyantın) temel indirimli fiyatını hesapla (Ürün/Varyant özel indirimleri)
  // Bu fiyat, çoklu ürün indiriminden önceki fiyattır.
  const itemsWithBaseDiscount = cart.flatMap(item => {
    const selectedColor = item.selectedVariants?.['color'];
    const colorVariant = item.product.variants?.find((v: any) => v.id === 'color');
    const variantDiscount = selectedColor && colorVariant?.discountRates?.[selectedColor];

    const productDiscount = (variantDiscount !== undefined && Number(variantDiscount) > 0) 
      ? Number(variantDiscount) 
      : (Number(item.product.cart_discount_percent) || Number(globalDiscount));

    const basePrice = item.overridePrice || item.product.price;
    const baseOldPrice = item.overrideOldPrice || item.overridePrice || item.product.oldPrice || item.product.price;

    const priceAfterProductDiscount = productDiscount > 0 
      ? basePrice * (1 - productDiscount / 100) 
      : basePrice;

    // Her bir adedi ayrı bir nesne olarak döndür ki sıralayıp rank verebilelim
    return Array(item.quantity).fill(null).map(() => ({
      ...item,
      basePrice,
      baseOldPrice,
      priceAfterProductDiscount,
      originalProductDiscount: productDiscount
    }));
  });

  // 2. Tüm birimleri fiyata göre büyükten küçüğe sırala
  // En pahalı ürün 1. rank, sonraki 2. rank vs.
  // Kullanıcı lehine: Genelde 2. ürüne indirim dendiğinde ucuz olanın indirimli olması beklenir.
  const sortedItems = [...itemsWithBaseDiscount].sort((a, b) => b.priceAfterProductDiscount - a.priceAfterProductDiscount);

  const multiItemDiscountsDetail: { label: string; amount: number }[] = [];
  let totalMultiItemDiscount = 0;
  
  const calculatedItems = sortedItems.map((item, index) => {
    const rank = index + 1;
    // Sadece tam eşleşen rank varsa indirim uygula
    const rule = multiItemRules.find(r => r.rank === rank);
    
    let multiItemDiscountPercent = 0;
    if (rule) {
      multiItemDiscountPercent = rule.percent;
    }

    const finalPrice = item.priceAfterProductDiscount * (1 - multiItemDiscountPercent / 100);
    const multiItemDiscountAmount = item.priceAfterProductDiscount - finalPrice;
    
    if (multiItemDiscountAmount > 0) {
      totalMultiItemDiscount += multiItemDiscountAmount;
      multiItemDiscountsDetail.push({
        label: `${rank}. Ürün İndirimi (-%${multiItemDiscountPercent})`,
        amount: multiItemDiscountAmount
      });
    }

    return {
      ...item,
      rank,
      multiItemDiscountPercent,
      finalPrice
    };
  });

  const grossSubTotal = cart.reduce((sum, item) => sum + (item.overridePrice || item.product.price) * item.quantity, 0);
  const originalSubTotal = cart.reduce((sum, item) => {
    const baseOriginalPrice = item.overrideOldPrice || item.overridePrice || item.product.oldPrice || item.product.price;
    return sum + (baseOriginalPrice * item.quantity);
  }, 0);

  const subTotalAfterProductDiscounts = calculatedItems.reduce((sum, item) => sum + item.priceAfterProductDiscount, 0);
  const totalCartDiscount = grossSubTotal - subTotalAfterProductDiscounts; // Ürün bazlı indirimlerin toplamı

  const subTotalFinal = calculatedItems.reduce((sum, item) => sum + item.finalPrice, 0);
  
  const couponDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const afterCoupon = Math.max(0, subTotalFinal - couponDiscount);
  const total = Math.max(0, afterCoupon - appliedCredit);

  return {
    grossSubTotal,
    originalSubTotal,
    totalCartDiscount, 
    totalMultiItemDiscount, 
    multiItemDiscountsDetail,
    subTotalFinal, 
    couponDiscount,
    appliedCredit,
    total,
    items: calculatedItems
  };
};
