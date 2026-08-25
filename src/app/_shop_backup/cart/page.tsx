"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';
import { Ticket, ArrowRight } from 'lucide-react';
import { calculateCartTotals, DiscountSettings } from '@/lib/calculations';

import styles from './Cart.module.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, appliedCoupon, setAppliedCoupon } = useStore();
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [settings, setSettings] = useState<DiscountSettings>({
    global_discount_percent: 0,
    multi_item_discounts: []
  });
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchSettings();
    window.scrollTo(0, 0);
  }, []);

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
      console.error('Ayarlar yüklenemedi:', err);
    }
  };

  const {
    total,
    subTotalFinal: subTotal,
    grossSubTotal,
    originalSubTotal,
    totalCartDiscount,
    totalMultiItemDiscount,
    multiItemDiscountsDetail,
    couponDiscount: discountAmount
  } = calculateCartTotals(cart, settings, appliedCoupon);

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} sepetten çıkarıldı.`);
    if (cart.length <= 1) setAppliedCoupon(null);
  };

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
    <div className="container section">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', margin: 0, fontWeight: 800 }}>Sepetim</h1>
        <p style={{ color: '#888', marginTop: '0.3rem', fontSize: '0.9rem' }}>{cart.length} ürün sepetinizde bekliyor.</p>
      </div>

      <div className={styles.cartContainer}>
        {/* Mobil Sipariş Özeti Accordion Header */}
        <div className={styles.mobileSummaryHeader} onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.4rem', borderRadius: '8px', display: 'flex' }}>
                <Ticket size={18} />
              </div>
              <div>
                 <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700 }}>Sipariş Özeti</p>
                 <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600 }}>{total.toFixed(2)} TL</p>
              </div>
           </div>
           <span style={{ fontSize: '0.8rem', transition: 'transform 0.3s', transform: isSummaryExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
        </div>

        {/* Ürün Listesi */}
        <div className={styles.cartItemsList}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fafafa', borderRadius: '20px', border: '1px dashed #ddd' }}>
              <p style={{ color: '#999', fontSize: '1rem', marginBottom: '1.5rem' }}>Sepetiniz şu an boş.</p>
              <Link href="/" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Alışverişe Başla</Link>
            </div>
          ) : (
            cart.map(item => {
              const selectedColor = item.selectedVariants?.['color'];
              const colorVariant = item.product.variants?.find((v: any) => v.id === 'color');
              const variantImg = selectedColor && colorVariant?.imageGroups?.[selectedColor]?.[0];
              const cartImg = variantImg || item.product.images[0];

              const variantDiscount = selectedColor && colorVariant?.discountRates?.[selectedColor];
              const itemDiscount = (variantDiscount !== undefined && Number(variantDiscount) > 0) 
                ? Number(variantDiscount) 
                : (Number(item.product.cart_discount_percent) || Number(settings.global_discount_percent || 0));

              const basePrice = item.overridePrice || item.product.price;
              const baseOldPrice = item.overrideOldPrice || item.overridePrice || item.product.oldPrice || item.product.price;

              const discountedPrice = Number(itemDiscount) > 0 
                ? (basePrice * item.quantity) * (1 - Number(itemDiscount) / 100) 
                : (basePrice * item.quantity);

              const originalPriceTotal = baseOldPrice * item.quantity;

              return (
                <div key={item.cartItemId} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img src={cartImg} alt={item.product.name} />
                  </div>

                  <div className={styles.itemInfo}>
                    <div>
                      <div className={styles.itemHeader}>
                        <h3 className={styles.itemTitle}>
                          <Link href={`/product/${item.product.slug}`}>{item.product.name}</Link>
                        </h3>
                        <div className={styles.itemPriceInfo}>
                          {itemDiscount > 0 || (item.overrideOldPrice || item.product.oldPrice) ? (
                            <>
                              <span className={styles.priceOriginal}>
                                {originalPriceTotal.toFixed(2)} TL
                              </span>
                              <span className={styles.priceDiscounted}>
                                {discountedPrice.toFixed(2)} TL
                              </span>
                              {itemDiscount > 0 && (
                                <span className={styles.discountBadge}>
                                  %{itemDiscount} İNDİRİM
                                </span>
                              )}
                            </>
                          ) : (
                            <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>{discountedPrice.toFixed(2)} TL</span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {item.selectedVariants && Object.entries(item.selectedVariants).map(([, val]) => (
                          <span key={val} className={styles.variantBadge}>
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.itemActions}>
                      <div className={styles.quantityControl}>
                        <button onClick={() => {
                          try {
                            updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1));
                          } catch (err: any) {
                            toast.error(err.message);
                          }
                        }}>-</button>
                        <span className={styles.quantityValue}>{item.quantity}</span>
                        <button onClick={() => {
                          try {
                            updateQuantity(item.cartItemId, item.quantity + 1);
                          } catch (err: any) {
                            toast.error(err.message);
                          }
                        }}>+</button>
                      </div>
                      <button onClick={() => handleRemove(item.cartItemId, item.product.name)} className={styles.removeButton}>SİL</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sipariş Özeti */}
        <div className={`${styles.summaryBox} ${isSummaryExpanded ? styles.summaryExpanded : ''}`}>
          <h3 className={styles.summaryTitle}>Ödeme Özeti</h3>
          
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Ara Toplam</span>
            <span className={styles.summaryValue} style={{ textDecoration: (originalSubTotal > grossSubTotal) ? 'line-through' : 'none', color: (originalSubTotal > grossSubTotal) ? '#bbb' : '#111' }}>
              {originalSubTotal.toFixed(2)} TL
            </span>
          </div>

          {(originalSubTotal > grossSubTotal) && (
            <div className={styles.summaryRow} style={{ color: '#666', fontSize: '0.9rem' }}>
              <span>Ürün İndirimleri</span>
              <span>-{(originalSubTotal - grossSubTotal).toFixed(2)} TL</span>
            </div>
          )}

          {totalCartDiscount > 0 && (
            <div className={styles.summaryRow} style={{ color: '#10b981' }}>
              <span style={{ fontWeight: 600 }}>Sepet İndirimi</span>
              <span style={{ fontWeight: 700 }}>-{totalCartDiscount.toFixed(2)} TL</span>
            </div>
          )}

          {multiItemDiscountsDetail.map((discount, i) => (
            <div key={i} className={styles.summaryRow} style={{ color: '#10b981' }}>
              <span style={{ fontWeight: 600 }}>{discount.label}</span>
              <span style={{ fontWeight: 700 }}>-{discount.amount.toFixed(2)} TL</span>
            </div>
          ))}

          {appliedCoupon && (
            <div className={styles.summaryRow} style={{ color: '#16a34a' }}>
              <span style={{ fontWeight: 600 }}>Kupon ({appliedCoupon.code})</span>
              <span style={{ fontWeight: 700 }}>-{discountAmount.toFixed(2)} TL</span>
            </div>
          )}

          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Kargo</span>
            <span style={{ fontWeight: 700, color: '#10b981' }}>{subTotal > 0 ? 'ÜCRETSİZ' : '-'}</span>
          </div>

          <div className={styles.totalDivider}></div>

          <div className={styles.summaryRow} style={{ alignItems: 'baseline', marginBottom: '1.5rem' }}>
            <span style={{ fontWeight: 700, fontSize: '1rem' }}>Toplam</span>
            <span className={styles.totalPrice}>{total.toFixed(2)} TL</span>
          </div>

          {cart.length > 0 ? (
            <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontSize: '1rem', borderRadius: '12px', fontWeight: 800 }}>
              ÖDEMEYE GEÇ <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
            </Link>
          ) : (
            <button disabled className="btn btn-primary" style={{ width: '100%', marginBottom: '1.25rem', opacity: 0.5, borderRadius: '12px' }}>SEPET BOŞ</button>
          )}

          <div className={styles.couponContainer}>
            {appliedCoupon ? (
              <div className={styles.couponApplied}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Ticket size={16} />
                  <span>Kupon: <strong>{appliedCoupon.code}</strong></span>
                </div>
                <button onClick={handleRemoveCoupon} style={{ background: 'none', border: 'none', color: '#166534', cursor: 'pointer', fontWeight: 900, fontSize: '1rem' }}>×</button>
              </div>
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
                  disabled={isValidating || !couponCode}
                  className="btn btn-secondary"
                  style={{ borderRadius: '10px', padding: '0 1rem', fontSize: '0.8rem' }}
                >
                  {isValidating ? '...' : 'EKLE'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
