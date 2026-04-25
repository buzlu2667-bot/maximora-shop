"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import FeaturedImageSlider from '../FeaturedImageSlider/FeaturedImageSlider';
import styles from '@/app/(shop)/page.module.css'; // Sadece class referansları için

interface Props {
  product: Product;
  index: number;
}

export default function ClientFeaturedProduct({ product, index }: Props) {
  // Seçili renk state'i
  const [selectedColor, setSelectedColor] = useState<string | null>(() => {
    const colorVariant = product.variants?.find(v => v.id === 'color');
    return colorVariant && colorVariant.options.length > 0 ? colorVariant.options[0] : null;
  });

  // Stok durumu hesaplama
  const getStockStatus = () => {
    let count = product.stockCount;
    const colorVariant = product.variants?.find(v => v.id === 'color');
    
    if (colorVariant?.stockCounts && selectedColor) {
      const normalized = Object.fromEntries(
        Object.entries(colorVariant.stockCounts).map(([k, v]) => [k.toLowerCase().trim(), v])
      );
      const vStock = normalized[selectedColor.toLowerCase().trim()];
      if (vStock !== undefined) {
        count = vStock;
      }
    }

    if (count === 0) return { color: '#ef4444', text: 'Stokta yok', dot: '#ef4444', count: 0 };
    if (count <= 5) return { color: '#f59e0b', text: 'Stok düzeyi düşük', dot: '#f59e0b', count };
    return { color: '#10b981', text: 'Stokta var', dot: '#10b981', count };
  };

  const currentStock = getStockStatus();
  const isOutOfStock = currentStock.count === 0;

  // Gösterilecek resimler (seçili renge göre filtrelenmiş)
  const displayImages = (() => {
    const colorVariant = product.variants?.find(v => v.id === 'color');
    if (colorVariant?.imageGroups && selectedColor && colorVariant.imageGroups[selectedColor]?.length > 0) {
      return colorVariant.imageGroups[selectedColor];
    }
    return product.images;
  })();

  const colorVariant = product.variants?.find(v => v.id === 'color');

  return (
    <section style={{ padding: '4rem 0', background: index % 2 === 0 ? '#f8f9fa' : '#ffffff', position: 'relative' }}>
      <div className="container">
        <div className={styles.featuredGrid}>
          {/* Sol: Ürün Görseli */}
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}>
            <FeaturedImageSlider images={displayImages} name={product.name} />
          </div>

          {/* Sağ: Ürün Bilgisi */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
              {(() => {
                const isReallyNew = product.createdAt
                  ? (Date.now() - new Date(product.createdAt).getTime()) < 14 * 24 * 60 * 60 * 1000
                  : product.isNew;
                return isReallyNew && (
                  <span style={{ display: 'inline-block', backgroundColor: '#111', color: 'white', padding: '0.3rem 0.8rem', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', borderRadius: '4px' }}>
                    YENİ
                  </span>
                );
              })()}
              
              {/* Stok Durumu Rozeti */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#f9f9f9', padding: '0.3rem 0.8rem', borderRadius: '50px', border: '1px solid #eee' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: currentStock.dot }}></span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: currentStock.color }}>{currentStock.text}</span>
              </div>
            </div>

            {product.brand && (
              <p style={{ color: '#888', fontSize: '1rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                {product.brand}
              </p>
            )}

            <h2 className={styles.featuredTitle}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: colorVariant ? '1.5rem' : '3.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {product.oldPrice && (
                  <span className={styles.featuredOldPrice}>
                    {product.oldPrice.toFixed(2)} TL
                  </span>
                )}
                <span className={styles.featuredPrice}>
                  {product.price.toFixed(2)} TL
                </span>
              </div>
              
              {product.oldPrice && (
                <div className={styles.featuredDiscount}>
                  %{(Math.round((1 - product.price / product.oldPrice) * 100))} İNDİRİM
                </div>
              )}
            </div>

            {/* Renk Varyantları (Tıpkı Ürün Detaydaki Gibi) */}
            {colorVariant && (
              <div style={{ marginBottom: '3.5rem' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#555', marginBottom: '0.5rem' }}>{colorVariant.name}</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {colorVariant.options.map((opt, colorIndex) => {
                    const isActive = selectedColor === opt;
                    const colorImage = colorVariant.imageGroups?.[opt]?.[0] || product.images[colorIndex] || product.images[0];
                    
                    const normalized = Object.fromEntries(
                      Object.entries(colorVariant.stockCounts || {}).map(([k, v]) => [k.toLowerCase().trim(), v])
                    );
                    const vStock = normalized[opt.toLowerCase().trim()];
                    const isColorOutOfStock = vStock === 0;

                    return (
                      <button
                        key={opt}
                        onClick={() => setSelectedColor(opt)}
                        style={{
                          position: 'relative',
                          background: 'none',
                          border: `2px solid ${isActive ? '#111' : '#d1d5db'}`,
                          borderRadius: '10px',
                          padding: '0',
                          cursor: 'pointer',
                          width: '100px',
                          overflow: 'hidden',
                          boxShadow: isActive ? '0 0 0 3px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.1)' : '0 2px 6px rgba(0,0,0,0.06)',
                          transition: 'all 0.2s ease',
                          transform: isActive ? 'translateY(-1px)' : 'none',
                          opacity: isColorOutOfStock ? 0.6 : 1
                        }}
                      >
                        <div style={{ position: 'relative' }}>
                          <div style={{ width: '100%', height: '100px', overflow: 'hidden', backgroundColor: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
                            <img
                              src={colorImage}
                              alt={opt}
                              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                            />
                          </div>
                          <div style={{
                            padding: '0.35rem 0.2rem',
                            fontSize: '0.7rem',
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? '#111' : '#555',
                            textAlign: 'center',
                            backgroundColor: isActive ? '#f3f4f6' : 'white',
                            borderTop: `1px solid ${isActive ? '#e5e7eb' : '#f3f4f6'}`
                          }}>
                            {opt}
                          </div>
                          {isColorOutOfStock && (
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                              <span style={{ backgroundColor: '#ef4444', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 700 }}>TÜKENDİ</span>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <Link
              href={`/product/${product.slug}`}
              className={styles.featuredAction}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '1rem', 
                backgroundColor: isOutOfStock ? '#d1d5db' : '#111', 
                color: isOutOfStock ? '#6b7280' : 'white', 
                borderRadius: '50px', 
                fontWeight: 700, 
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                width: 'fit-content',
                pointerEvents: isOutOfStock ? 'none' : 'auto',
                textDecoration: 'none'
              }}
            >
              {isOutOfStock ? 'STOKTA YOK' : 'HEMEN İNCELE'}
              {!isOutOfStock && <ArrowRight size={20} />}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
