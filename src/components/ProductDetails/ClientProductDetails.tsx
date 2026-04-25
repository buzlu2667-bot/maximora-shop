"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './ClientProductDetails.module.css';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';
import { Heart, X, ChevronLeft, ChevronRight, CheckSquare, Package, ChevronDown, ChevronUp, ShieldCheck, Truck, Lock } from 'lucide-react';

interface Props {
  product: Product;
}

export default function ClientProductDetails({ product }: Props) {
  const router = useRouter();
  // Seçilen varyantları ürün render’ında doğrudan init et (useEffect gecikme sorunu olmasın)
  const getInitialVariants = () => {
    const initial: Record<string, string> = {};
    product.variants?.forEach(v => {
      if (v.options.length > 0) initial[v.id] = v.options[0];
    });
    return initial;
  };

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(getInitialVariants);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(() => {
    // İlk rengin imageGroups'unu varsa al
    const colorVariant = product.variants?.find(v => v.id === 'color');
    const firstColor = colorVariant?.options[0];
    if (colorVariant?.imageGroups && firstColor && colorVariant.imageGroups[firstColor]?.length > 0) {
      return colorVariant.imageGroups[firstColor][0];
    }
    return product.images[0] || '';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openTabs, setOpenTabs] = useState<Record<string, boolean>>({ desc: true, feat: false });

  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useStore();
  const favorite = isFavorite(product.id);

  // Ürün değişince (sayfa geçişi) yeniden init et
  React.useEffect(() => {
    setSelectedVariants(getInitialVariants());
    const colorVariant = product.variants?.find(v => v.id === 'color');
    const firstColor = colorVariant?.options[0];
    if (colorVariant?.imageGroups && firstColor && colorVariant.imageGroups[firstColor]?.length > 0) {
      setActiveImage(colorVariant.imageGroups[firstColor][0]);
    } else {
      setActiveImage(product.images[0] || '');
    }
    setQuantity(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  // Renk seçilince o rengin görselini ana galeriye geç
  const handleColorSelect = (variantId: string, opt: string, colorIndex: number) => {
    setSelectedVariants({ ...selectedVariants, [variantId]: opt });

    // imageGroups varsa o rengin ilk görselini kullan, yoksa index ile dön
    const colorVariant = product.variants?.find(v => v.id === 'color');
    if (colorVariant?.imageGroups && colorVariant.imageGroups[opt]?.length > 0) {
      setActiveImage(colorVariant.imageGroups[opt][0]);
    } else {
      const imageForColor = product.images[colorIndex];
      if (imageForColor) setActiveImage(imageForColor);
    }
  };

  // Aktif rengin göstereceği görsel listesi (galeri thumbnails)
  const displayImages = (() => {
    const colorVariant = product.variants?.find(v => v.id === 'color');
    const selectedColor = colorVariant ? selectedVariants['color'] : null;
    if (colorVariant?.imageGroups && selectedColor && colorVariant.imageGroups[selectedColor]?.length > 0) {
      return colorVariant.imageGroups[selectedColor];
    }
    return product.images;
  })();

  // Seçili rengin Shopier linki (varsa) veya ürünün global linki
  const activeShopierUrl = (() => {
    const colorVariant = product.variants?.find(v => v.id === 'color');
    const selectedColor = colorVariant ? selectedVariants['color'] : null;
    if (colorVariant?.shopierLinks && selectedColor && colorVariant.shopierLinks[selectedColor]) {
      return colorVariant.shopierLinks[selectedColor];
    }
    return product.shopierUrl || null;
  })();

  // Şu an gösterilen görselin indeksi
  const currentImageIdx = displayImages.indexOf(activeImage);

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIdx = (currentImageIdx + 1) % displayImages.length;
    setActiveImage(displayImages[nextIdx]);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIdx = (currentImageIdx - 1 + displayImages.length) % displayImages.length;
    setActiveImage(displayImages[prevIdx]);
  };

  // Swipe desteği
  const [touchStart, setTouchStart] = useState(0);
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) handleNextImage(); // Sola kaydır -> Sonraki
    if (diff < -50) handlePrevImage(); // Sağa kaydır -> Önceki
  };

  const handleAddToCart = () => {
    try {
      addToCart(product, quantity, selectedVariants);
      toast.success(`${product.name} — ${quantity} adet sepete eklendi!`, {
        icon: '🛍️',
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
    } catch (err: any) {
      toast.error(err.message || "Stok yetersiz.");
    }
  };

  const handleBuyNow = () => {
    try {
      addToCart(product, quantity, selectedVariants);
      router.push('/checkout');
    } catch (err: any) {
      toast.error(err.message || "Stok yetersiz.");
    }
  };

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(product.id);
      toast.success("Favorilerden çıkarıldı.");
    } else {
      addToFavorites(product);
      toast.success("Favorilere eklendi!");
    }
  };

  const stockStatus = () => {
    const colorVariant = product.variants?.find(v => v.id === 'color');
    const selectedColor = selectedVariants['color'];
    
    let count = product.stockCount;

    if (colorVariant?.stockCounts && selectedColor) {
      const normalized = Object.fromEntries(
        Object.entries(colorVariant.stockCounts).map(([k, v]) => [k.toLowerCase().trim(), v])
      );
      const vStock = normalized[selectedColor.toLowerCase().trim()];
      
      if (vStock !== undefined) {
        count = vStock;
      }
    }

    if (count === 0) {
      return { color: 'var(--color-error)', text: 'Bu ürün tükendi', dot: '#ef4444', count: 0 };
    }
    if (count <= 5) {
      return { color: '#f59e0b', text: 'Stok düzeyi düşük', dot: '#f59e0b', count };
    }
    return { color: 'var(--color-success)', text: 'Stokta var', dot: '#10b981', count };
  };

  const currentStock = stockStatus();
  const isOutOfStock = currentStock.count === 0;

  // Şu anki fiyatı hesapla (renge özel fiyat varsa onu kullan)
  const currentPrices = (() => {
    const colorVariant = product.variants?.find(v => v.id === 'color');
    const selectedColor = selectedVariants['color'];
    
    let price = product.price;
    let oldPrice = product.oldPrice;

    if (colorVariant?.variantPrices && selectedColor && colorVariant.variantPrices[selectedColor]) {
      price = colorVariant.variantPrices[selectedColor];
    }

    if (colorVariant?.variantOldPrices && selectedColor && colorVariant.variantOldPrices[selectedColor]) {
      oldPrice = colorVariant.variantOldPrices[selectedColor];
    }

    return { price, oldPrice };
  })();

  return (
    <div className={styles.productLayout}>

      {/* ---------------- GALERİ ---------------- */}
      <div className={styles.gallery}>
        <div
          className={styles.mainImageWrapper}
          onClick={() => setIsModalOpen(true)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Gezinme Okları */}
          {displayImages.length > 1 && (
            <>
              <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrevImage} aria-label="Önceki Görsel">
                <ChevronLeft size={32} />
              </button>
              <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNextImage} aria-label="Sonraki Görsel">
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <img src={activeImage} alt={product.name} className={styles.mainImage} />

          <div className={styles.zoomHint}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
        </div>
        <div className={styles.thumbnails}>
          {displayImages.map((img, idx) => (
            <div
              key={idx}
              className={`${styles.thumbWrapper} ${activeImage === img ? styles.activeThumb : ''}`}
              onClick={() => setActiveImage(img)}
            >
              <img src={img} alt={`Görsel ${idx}`} className={styles.thumbImage} />
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- BİLGİ ALANI ---------------- */}
      <div className={styles.info}>
        <div className={styles.header}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {(() => {
                  const isReallyNew = product.createdAt
                    ? (Date.now() - new Date(product.createdAt).getTime()) < 14 * 24 * 60 * 60 * 1000
                    : product.isNew;
                  return isReallyNew && (
                    <span style={{ display: 'inline-block', backgroundColor: '#111', color: 'white', padding: '0.3rem 0.8rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '4px' }}>
                      YENİ
                    </span>
                  );
                })()}

                {product.badges && product.badges.map((b, idx) => (
                  <span key={idx} style={{ display: 'inline-block', backgroundColor: b.color, color: 'white', padding: '0.3rem 0.8rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '4px' }}>
                    {b.text}
                  </span>
                ))}

                {(!product.badges || product.badges.length === 0) && product.badgeText && (
                  <span style={{ display: 'inline-block', backgroundColor: product.badgeColor || '#111', color: 'white', padding: '0.3rem 0.8rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '4px' }}>
                    {product.badgeText}
                  </span>
                )}
              </div>
              <span className={styles.category} style={{ display: 'block', marginBottom: '0.5rem' }}>{product.brand || product.category}</span>
              <h1 className={styles.title} style={{ marginTop: 0 }}>{product.name}</h1>
            </div>
            <button className={styles.favBtn} onClick={handleToggleFavorite} aria-label="Favoriye Ekle">
              <Heart size={28} fill={favorite ? "currentColor" : "none"} className={favorite ? styles.heartActive : ""} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
            {currentPrices.oldPrice ? (
              <>
                <p className={styles.price} style={{ marginBottom: 0, color: '#e11d48' }}>{currentPrices.price.toFixed(2)} TL</p>
                <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1.2rem' }}>{currentPrices.oldPrice.toFixed(2)} TL</span>
              </>
            ) : (
              <p className={styles.price} style={{ marginBottom: 0 }}>{currentPrices.price.toFixed(2)} TL</p>
            )}
          </div>

          <div className={styles.stockIndicator}>
            <span className={styles.stockDot} style={{ backgroundColor: currentStock.dot }}></span>
            <span style={{ color: currentStock.color, fontSize: '0.9rem', fontWeight: 500 }}>
              {currentStock.text}
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          {/* Varyantlar (Renk vs seçimi) */}
          {product.variants && product.variants.map(variant => (
            <div key={variant.id} className={styles.variantGroup}>
              <label className={styles.variantLabel}>{variant.name}</label>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                {variant.options.map((opt, colorIndex) => {
                  const isActive = selectedVariants[variant.id] === opt;
                  // Her renk kartta o rengin imageGroups'undaki ilk fotoğrafı göster
                  const colorVariant2 = product.variants?.find(v => v.id === 'color');
                  const colorImage = variant.id === 'color'
                    ? (colorVariant2?.imageGroups?.[opt]?.[0] || product.images[colorIndex] || product.images[0])
                    : null;
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        if (variant.id === 'color') {
                          handleColorSelect(variant.id, opt, colorIndex);
                        } else {
                          setSelectedVariants({ ...selectedVariants, [variant.id]: opt });
                        }
                      }}
                      style={{
                        position: 'relative',
                        background: 'none',
                        border: `2px solid ${isActive ? '#111' : '#d1d5db'}`,
                        borderRadius: '10px',
                        padding: '0',
                        cursor: 'pointer',
                        width: '120px',
                        overflow: 'hidden',
                        boxShadow: isActive ? '0 0 0 3px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.1)' : '0 2px 6px rgba(0,0,0,0.06)',
                        transition: 'all 0.2s ease',
                        transform: isActive ? 'translateY(-1px)' : 'none'
                      }}
                    >
                      {colorImage ? (
                        <div style={{ position: 'relative' }}>
                          <div style={{ width: '100%', height: '130px', overflow: 'hidden', backgroundColor: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                            <img
                              src={colorImage}
                              alt={opt}
                              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                            />
                          </div>
                          <div style={{
                            padding: '0.45rem 0.4rem',
                            fontSize: '0.78rem',
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? '#111' : '#555',
                            textAlign: 'center',
                            letterSpacing: '0.3px',
                            backgroundColor: isActive ? '#f3f4f6' : 'white',
                            textTransform: 'capitalize',
                            borderTop: `1px solid ${isActive ? '#e5e7eb' : '#f3f4f6'}`
                          }}>
                            {opt}
                          </div>
                          {(() => {
                            // Variant'ın kendi stoğuna bak
                            const normalized = Object.fromEntries(
                              Object.entries(variant.stockCounts || {}).map(([k, v]) => [k.toLowerCase().trim(), v])
                            );
                            const vStock = normalized[opt.toLowerCase().trim()];
                            
                            // Eğer bu renk için özel stok 0 girilmişse badge göster
                            if (vStock === 0) {
                              return (
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                                  <span style={{ backgroundColor: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700 }}>TÜKENDİ</span>
                                </div>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      ) : (
                        <div style={{ padding: '0.6rem 0.9rem', fontSize: '0.9rem', fontWeight: isActive ? 700 : 400, color: isActive ? '#111' : '#444' }}>
                          {opt}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ---- ADET SEÇİCİ ---- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#555' }}>Adet</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #d1d5db', borderRadius: '8px', overflow: 'hidden', width: 'fit-content' }}>
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ width: '40px', height: '40px', fontSize: '1.3rem', fontWeight: 700, color: '#111', background: '#f9f9f9', border: 'none', borderRight: '1px solid #d1d5db', cursor: 'pointer' }}
              >-</button>
              <span style={{ width: '50px', textAlign: 'center', fontWeight: 600, fontSize: '1rem', userSelect: 'none' }}>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(q => q + 1)}
                disabled={quantity >= currentStock.count}
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  fontSize: '1.3rem', 
                  fontWeight: 700, 
                  color: quantity >= currentStock.count ? '#ccc' : '#111', 
                  background: '#f9f9f9', 
                  border: 'none', 
                  borderLeft: '1px solid #d1d5db', 
                  cursor: quantity >= currentStock.count ? 'not-allowed' : 'pointer' 
                }}
              >+</button>
            </div>
            {/* Shopier uyarısı kaldırıldı */}
          </div>

          <div className={styles.btnGroup} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock
                ? 'Tükendi'
                : quantity > 1 ? `Sepete Ekle (${quantity} adet)` : 'Sepete Ekle'}
            </button>

            <button
              className="btn btn-secondary"
              style={{ width: '100%', padding: '1rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}
              onClick={handleBuyNow}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Stok Yok' : 'Hemen Satın Al'}
            </button>
          </div>

        </div>

        {/* Güven Rozetleri (Trust Badges) */}
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', padding: '1.5rem 0', borderBottom: '1px solid var(--color-border)', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', textAlign: 'center', flex: '1 1 30%', minWidth: '90px' }}>
            <ShieldCheck size={26} strokeWidth={1.5} color="#111" />
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#333', letterSpacing: '0.5px' }}>Sipariş Güvencesi</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', textAlign: 'center', flex: '1 1 30%', minWidth: '90px' }}>
            <Truck size={26} strokeWidth={1.5} color="#111" />
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#333', letterSpacing: '0.5px' }}>Hızlı Teslimat</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', textAlign: 'center', flex: '1 1 30%', minWidth: '90px' }}>
            <Lock size={26} strokeWidth={1.5} color="#111" />
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#333', letterSpacing: '0.5px' }}>Güvenli Alışveriş</span>
          </div>
        </div>

        {/* Akordiyon (Özellikler, Açıklama, Kargo, Teslimat) */}
        <div className={styles.accordion} style={{ marginTop: '1rem' }}>
          {/* 1. Ürün Açıklaması */}
          <div className={styles.accordionItem} style={{ borderBottom: '1px solid var(--color-border)', margin: 0 }}>
            <button
              onClick={() => setOpenTabs({ ...openTabs, desc: !openTabs.desc })}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: '1.25rem 0', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#111' }}>
                <CheckSquare size={20} strokeWidth={1.5} />
                <span style={{ fontSize: '1rem', fontWeight: 500 }}>Ürün Açıklaması</span>
              </div>
              <span style={{ color: '#666' }}>{openTabs.desc ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
            </button>
            {openTabs.desc && <div style={{ paddingBottom: '1.5rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word', overflow: 'hidden', width: '100%' }}>{product.description}</div>}
          </div>

          {/* 2. Özellikler (Varsa) */}
          {product.features && product.features.length > 0 && (
            <div className={styles.accordionItem} style={{ borderBottom: '1px solid var(--color-border)', margin: 0 }}>
              <button
                onClick={() => setOpenTabs({ ...openTabs, feat: !openTabs.feat })}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: '1.25rem 0', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#111' }}>
                  <CheckSquare size={20} strokeWidth={1.5} />
                  <span style={{ fontSize: '1rem', fontWeight: 500 }}>Özellikler</span>
                </div>
                <span style={{ color: '#666' }}>{openTabs.feat ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
              </button>
              {openTabs.feat && (
                <div style={{ paddingBottom: '1.5rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                    {product.features.map((f, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{f.trim()}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 3. Kargo */}
          <div className={styles.accordionItem} style={{ borderBottom: '1px solid var(--color-border)', margin: 0 }}>
            <button
              onClick={() => setOpenTabs({ ...openTabs, shipping: !openTabs.shipping })}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: '1.25rem 0', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#111' }}>
                <Package size={20} strokeWidth={1.5} />
                <span style={{ fontSize: '1rem', fontWeight: 500 }}>Kargo</span>
              </div>
              <span style={{ color: '#666' }}>{openTabs.shipping ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
            </button>
            {openTabs.shipping && (
              <div style={{ paddingBottom: '1.5rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>
                <p style={{ margin: '0 0 1rem 0' }}>Siparişinizi en kısa sürede göndermek için hızla çalışacağız.<br/>Siparişiniz gönderildikten sonra daha fazla bilgi içeren bir e-posta alacaksınız. Teslimat süreleri bulunduğunuz yere göre değişiklik gösterir.</p>
                <p style={{ margin: '0 0 1rem 0' }}>1-5 iş günü içinde kargoya verilir.</p>
                <p style={{ margin: 0 }}>Aynı gün kargo fırsatları olabilir.</p>
              </div>
            )}
          </div>

          {/* 4. Siparişimi ne zaman teslim alırım? */}
          <div className={styles.accordionItem} style={{ borderBottom: '1px solid var(--color-border)', margin: 0 }}>
            <button
              onClick={() => setOpenTabs({ ...openTabs, delivery: !openTabs.delivery })}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: '1.25rem 0', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#111' }}>
                <CheckSquare size={20} strokeWidth={1.5} />
                <span style={{ fontSize: '1rem', fontWeight: 500 }}>Siparişimi ne zaman teslim alırım?</span>
              </div>
              <span style={{ color: '#666' }}>{openTabs.delivery ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
            </button>
            {openTabs.delivery && (
              <div style={{ paddingBottom: '1.5rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>
                <p style={{ margin: 0 }}>Siparişinizi en kısa sürede göndermek için hızla çalışacağız.<br/>Siparişiniz gönderildikten sonra daha fazla bilgi içeren bir e-posta alacaksınız. Teslimat süreleri bulunduğunuz yere göre değişiklik gösterir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- BÜYÜTÜLMÜŞ GÖRSEL MODALI ---------------- */}
      {isModalOpen && (
        <div className={styles.fullscreenModal} onClick={() => setIsModalOpen(false)}>
          <button className={styles.closeModalBtn} onClick={() => setIsModalOpen(false)}><X size={32} /></button>
          <img src={activeImage} alt={product.name} className={styles.fullscreenImage} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
