"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import styles from './ProductCard.module.css';
import { Heart } from 'lucide-react';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  inSlider?: boolean;
}

export default function ProductCard({ product, inSlider = false }: ProductCardProps) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartPos = React.useRef({ x: 0, y: 0 });
  const { toggleFavorite, favorites } = useStore();
  const isFavorite = favorites.some(f => f.id === product.id);
  
  const images = product.images && product.images.length > 0 ? product.images : ['/placeholder.jpg'];
  const hasMultipleImages = images.length > 1;

  // Akıllı "YENİ" etiketi kontrolü (14 gün)
  const isReallyNew = product.createdAt 
    ? (Date.now() - new Date(product.createdAt).getTime()) < 14 * 24 * 60 * 60 * 1000
    : product.isNew;

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await (toggleFavorite as any)(product);
    if (!isFavorite) {
      toast.success('Favorilere eklendi!');
    } else {
      toast('Favorilerden çıkarıldı.', { icon: '✕' });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasMultipleImages) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const sectionWidth = width / images.length;
    const index = Math.floor(x / sectionWidth);
    if (index >= 0 && index < images.length) setCurrentImageIndex(index);
  };

  const handleMouseLeave = () => setCurrentImageIndex(0);

  // Mobil Swipe (Kaydırma) İşlemi
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!hasMultipleImages) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartPos.current.x - touchEndX;
    const diffY = touchStartPos.current.y - touchEndY;

    // Sadece yatay hareket dikey hareketten daha fazlaysa ve eşik aşıldıysa tetikle
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // Sola kaydırdı -> Sonraki görsel
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      } else {
        // Sağa kaydırdı -> Önceki görsel
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
  };

  const activeImage = images[currentImageIndex] || images[0];

  return (
    <div className={styles.card}>
      <div 
        className={`${styles.imageWrapper} ${hasMultipleImages ? styles.hasMulti : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        <Link href={`/product/${product.slug}`}>
          <div className={styles.imageContainer}>
            <Image 
              src={activeImage} 
              alt={product.name} 
              className={`${styles.image} ${styles.activeImage}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              priority={currentImageIndex === 0}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </Link>

        
        {/* Favori Butonu */}
        <button 
          className={`${styles.favoriteBtn} ${isFavorite ? styles.isFavorite : ''}`}
          onClick={handleToggleFavorite}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        {/* Akıllı Rozetler Sistemi */}
        <div className={styles.badges}>
          {isReallyNew && <span className={styles.newBadge}>Yeni</span>}
          
          {/* Admin Panelinden Gelen Özel Rozetler */}
          {product.badges && product.badges.map((badge, idx) => (
            <span 
              key={idx} 
              className={styles.customBadge} 
              style={{ backgroundColor: badge.color }}
            >
              {badge.text}
            </span>
          ))}
          
          {/* Tekil Rozet (Eski sistem uyumluluğu için) */}
          {!product.badges && product.badgeText && (
            <span 
              className={styles.customBadge} 
              style={{ backgroundColor: product.badgeColor || '#d4af37' }}
            >
              {product.badgeText}
            </span>
          )}
        </div>

        {/* Tükendi Yazısı (Sağ Alt) */}
        {(product.stockCount === 0 || product.inStock === false) && (
          <div className={styles.soldOutBadge}>Tükendi</div>
        )}

        {/* Galeri Noktaları (Orta Alt) */}
        {hasMultipleImages && (
          <div className={styles.galleryDots}>
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`${styles.dot} ${idx === currentImageIndex ? styles.activeDot : ''}`}
              />
            ))}
          </div>
        )}

        {/* Renk Varyantları (Sol Alt) - Modern Yuvarlak Tasarım */}
        {(() => {
          const colorVariant = product.variants?.find(v => v.id === 'color');
          if (!colorVariant || colorVariant.options.length <= 1) return null;

          const getColorHex = (colorName: string) => {
            const colors: Record<string, string> = {
              'siyah': '#000000', 'black': '#000000',
              'beyaz': '#ffffff', 'white': '#ffffff',
              'kırmızı': '#e11d48', 'red': '#e11d48',
              'mavi': '#2563eb', 'blue': '#2563eb',
              'yeşil': '#16a34a', 'green': '#16a34a',
              'sarı': '#facc15', 'yellow': '#facc15',
              'turuncu': '#f97316', 'orange': '#f97316',
              'mor': '#7c3aed', 'purple': '#7c3aed',
              'pembe': '#db2777', 'pink': '#db2777',
              'gri': '#6b7280', 'gray': '#6b7280', 'grey': '#6b7280',
              'kahverengi': '#78350f', 'brown': '#78350f',
              'lacivert': '#1e3a8a', 'navy': '#1e3a8a',
              'bej': '#f5f5dc', 'beige': '#f5f5dc',
              'altın': '#d4af37', 'gold': '#d4af37',
              'gümüş': '#c0c0c0', 'silver': '#c0c0c0',
              'bordo': '#7f1d1d', 'burgundy': '#7f1d1d',
              'haki': '#3f6212', 'khaki': '#3f6212',
              'turkuaz': '#06b6d4', 'turquoise': '#06b6d4',
              'krem': '#fffdd0', 'cream': '#fffdd0',
              'antrasit': '#374151', 'anthracite': '#374151',
              'taba': '#b45309', 'tan': '#b45309',
              'fildişi': '#fffff0', 'ivory': '#fffff0'
            };
            return colors[colorName.toLowerCase().trim()] || '#cccccc';
          };

          return (
            <div className={styles.colorPalettes}>
              {colorVariant.options.slice(0, 5).map((opt, i) => (
                <div 
                  key={i} 
                  className={styles.colorDot} 
                  style={{ 
                    backgroundColor: getColorHex(opt),
                    border: getColorHex(opt).toLowerCase() === '#ffffff' ? '1px solid #ddd' : 'none'
                  }} 
                  title={opt}
                />
              ))}
              {colorVariant.options.length > 5 && (
                <span className={styles.moreColors}>+{colorVariant.options.length - 5}</span>
              )}
            </div>
          );
        })()}
      </div>

      <Link href={`/product/${product.slug}`} className={styles.info}>
        <p className={styles.brand}>MAXIMORA</p>
        <h3 className={styles.name}>{product.name}</h3>
        
        {(() => {
          const colorVariant = product.variants?.find(v => v.id === 'color');
          const firstOption = colorVariant?.options[0];
          
          // İlk varyantın/ürünün fiyatı
          let firstPrice = product.price;
          let firstOldPrice = product.oldPrice;
          if (colorVariant?.variantPrices && firstOption && colorVariant.variantPrices[firstOption]) {
            firstPrice = colorVariant.variantPrices[firstOption];
          }
          if (colorVariant?.variantOldPrices && firstOption && colorVariant.variantOldPrices[firstOption]) {
            firstOldPrice = colorVariant.variantOldPrices[firstOption];
          }

          // Tüm olası fiyatlar içindeki en düşük fiyat
          const allPrices = [product.price];
          if (colorVariant?.variantPrices) {
            Object.values(colorVariant.variantPrices).forEach(p => allPrices.push(p));
          }
          const minPrice = Math.min(...allPrices);
          const hasLowerPrice = minPrice < firstPrice;

          return (
            <div className={styles.priceContainer}>
              <div className={styles.mainPriceRow}>
                {firstOldPrice ? (
                  <>
                    <span className={styles.oldPrice}>{firstOldPrice.toFixed(2)} TL</span>
                    <span className={styles.discountedPrice}>{firstPrice.toFixed(2)} TL</span>
                  </>
                ) : (
                  <span className={styles.price}>{firstPrice.toFixed(2)} TL</span>
                )}
              </div>
              
              {hasLowerPrice && (
                <div className={styles.startingPrice}>
                  {minPrice.toFixed(2)} TL'den başlayan
                </div>
              )}
            </div>
          );
        })()}
      </Link>
    </div>
  );
}
