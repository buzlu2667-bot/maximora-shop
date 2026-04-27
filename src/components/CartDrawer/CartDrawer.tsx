"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { X, ShoppingBag, Trash2, ArrowRight, Minus, Plus, Ticket } from 'lucide-react';
import { calculateCartTotals, DiscountSettings } from '@/lib/calculations';
import toast from 'react-hot-toast';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { isCartDrawerOpen, setIsCartDrawerOpen, cart, removeFromCart, updateQuantity, appliedCoupon, setAppliedCoupon } = useStore();
  const [settings, setSettings] = useState<DiscountSettings>({
    global_discount_percent: 0,
    multi_item_discounts: []
  });
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isCouponExpanded, setIsCouponExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchSettings();
  }, []);

  // Sayfa kaydırmasını engelle
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isCartDrawerOpen]);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings({
          global_discount_percent: data.global_discount_percent || 0,
          multi_item_discounts: data.multi_item_discounts || []
        });
      }
    } catch (err) {
      console.error('Drawer settings error:', err);
    }
  };

  const {
    total,
    subTotalFinal: subTotal,
    grossSubTotal,
    totalCartDiscount,
    totalMultiItemDiscount,
    couponDiscount: discountAmount
  } = calculateCartTotals(cart, settings, appliedCoupon);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsValidating(true);
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, cartTotal: subTotal })
      });
      const data = await res.json();

      if (res.ok) {
        setAppliedCoupon({ code: data.code, discountAmount: data.discountAmount });
        toast.success(`Kupon uygulandı: ${data.discountAmount.toFixed(2)} TL indirim!`);
        setCouponCode('');
      } else {
        toast.error(data.error || 'Kupon geçersiz.');
      }
    } catch (err) {
      toast.error('Bir hata oluştu.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.success('Kupon kaldırıldı.');
  };

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`${styles.overlay} ${isCartDrawerOpen ? styles.overlayVisible : ''}`}
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className={`${styles.drawer} ${isCartDrawerOpen ? styles.drawerOpen : ''}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <ShoppingBag size={22} />
            <span>Sepetim ({cart.length})</span>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsCartDrawerOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyIcon}>
                 <ShoppingBag size={48} opacity={0.2} />
              </div>
              <p>Sepetiniz şu an boş.</p>
              <button 
                className={styles.shopBtn}
                onClick={() => setIsCartDrawerOpen(false)}
              >
                Alışverişe Başla
              </button>
            </div>
          ) : (
            <div className={styles.itemList}>
              {cart.map((item) => {
                const selectedColor = item.selectedVariants?.['color'];
                const colorVariant = item.product.variants?.find((v: any) => v.id === 'color');
                const variantImg = selectedColor && colorVariant?.imageGroups?.[selectedColor]?.[0];
                const img = variantImg || item.product.images[0];
                
                const basePrice = item.overridePrice || item.product.price;
                const baseOldPrice = item.overrideOldPrice || item.overridePrice || item.product.oldPrice || item.product.price;
                const hasDiscount = baseOldPrice > basePrice;

                return (
                  <div key={item.cartItemId} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <img src={img} alt={item.product.name} />
                    </div>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemMain}>
                        <h4 className={styles.itemName}>{item.product.name}</h4>
                        <button 
                          className={styles.removeBtn}
                          onClick={() => removeFromCart(item.cartItemId)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className={styles.itemMeta}>
                         {item.selectedVariants && Object.entries(item.selectedVariants).map(([k, v]) => (
                           <span key={k} className={styles.variantBadge}>{v}</span>
                         ))}
                      </div>

                      <div className={styles.itemFooter}>
                        <div className={styles.quantity}>
                          <button onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}>
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => {
                            try {
                              updateQuantity(item.cartItemId, item.quantity + 1);
                            } catch (err: any) {
                              toast.error(err.message);
                            }
                          }}>
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className={styles.itemPrice}>
                           {hasDiscount ? (
                             <>
                               <span className={styles.oldPriceItem}>{(baseOldPrice * item.quantity).toFixed(2)} TL</span>
                               <span className={styles.currentPriceItem} style={{ color: '#e11d48' }}>{(basePrice * item.quantity).toFixed(2)} TL</span>
                             </>
                           ) : (
                             <span className={styles.currentPriceItem}>{(basePrice * item.quantity).toFixed(2)} TL</span>
                           )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className={styles.footer}>
            {/* Coupon Area */}
            <div className={styles.couponSection}>
              {appliedCoupon ? (
                <div className={styles.appliedCoupon}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Ticket size={16} color="#16a34a" />
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{appliedCoupon.code} uygulandı</span>
                  </div>
                  <button onClick={handleRemoveCoupon} className={styles.removeCouponBtn}>Kaldır</button>
                </div>
              ) : (
                <>
                  {!isCouponExpanded ? (
                    <button 
                      className={styles.couponToggle}
                      onClick={() => setIsCouponExpanded(true)}
                    >
                      <Ticket size={16} />
                      Kupon Kodu Gir
                    </button>
                  ) : (
                    <div className={styles.couponInputWrapper}>
                      <input 
                        type="text" 
                        placeholder="Kupon Kodu" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className={styles.couponInput}
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        disabled={!couponCode || isValidating}
                        className={styles.applyBtn}
                      >
                        {isValidating ? '...' : 'Uygula'}
                      </button>
                      <button 
                        onClick={() => setIsCouponExpanded(false)}
                        className={styles.cancelCouponBtn}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Ara Toplam</span>
                <span>{grossSubTotal.toFixed(2)} TL</span>
              </div>
              {(totalCartDiscount + totalMultiItemDiscount) > 0 && (
                <div className={`${styles.summaryRow} ${styles.discount}`}>
                  <span>Kampanya İndirimi</span>
                  <span>-{(totalCartDiscount + totalMultiItemDiscount).toFixed(2)} TL</span>
                </div>
              )}
              {appliedCoupon && (
                <div className={`${styles.summaryRow} ${styles.discount}`}>
                  <span>Kupon İndirimi ({appliedCoupon.code})</span>
                  <span>-{discountAmount.toFixed(2)} TL</span>
                </div>
              )}
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Genel Toplam</span>
                <span>{total.toFixed(2)} TL</span>
              </div>
            </div>

            <div className={styles.actions}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link 
                  href="/cart" 
                  className={styles.viewCartBtn}
                  onClick={() => setIsCartDrawerOpen(false)}
                >
                  Sepete Git
                </Link>
                <Link 
                  href="/checkout" 
                  className={styles.checkoutBtn}
                  onClick={() => setIsCartDrawerOpen(false)}
                >
                  Ödemeye Geç <ArrowRight size={18} />
                </Link>
              </div>
              <button 
                className={styles.continueBtn}
                onClick={() => setIsCartDrawerOpen(false)}
              >
                Alışverişe Devam Et
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
