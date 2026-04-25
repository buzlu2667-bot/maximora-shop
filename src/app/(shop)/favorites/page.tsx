"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

import styles from './Favorites.module.css';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, addToCart } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    toast.success(`${product.name} sepete eklendi!`);
  };

  const handleRemove = (productId: string) => {
    removeFromFavorites(productId);
    toast.success("Favorilerden çıkarıldı.");
  };

  if (!mounted) return <div className={`container section ${styles.container}`} style={{ minHeight: '80vh' }}></div>;

  return (
    <div className={`container section ${styles.container}`}>
      <div className={styles.header}>
        <h1>Favorilerim</h1>
        <span style={{ fontSize: '1rem', color: '#888', fontWeight: 600 }}>{favorites.length} Ürün</span>
      </div>

      <div className={favorites.length === 0 ? '' : styles.grid}>
        {favorites.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
             <p style={{ color: '#888', fontSize: '1.2rem', marginBottom: '2rem' }}>Henüz favori listeniz boş.</p>
             <Link href="/" className="btn btn-primary" style={{ padding: '1rem 3rem', borderRadius: '14px' }}>Alışverişe Başla</Link>
          </div>
        ) : (
          favorites.map(product => (
            <div key={product.id} className={styles.card}>
               <button className={styles.removeBtn} title="Favorilerden Çıkar" onClick={() => handleRemove(product.id)}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                 </svg>
               </button>

               <Link href={`/product/${product.slug}`} className={styles.imgWrapper}>
                  <img src={product.images[0]} alt={product.name} />
               </Link>

               <div className={styles.info}>
                  <h3 className={styles.name}><Link href={`/product/${product.slug}`}>{product.name}</Link></h3>
                  
                  <div className={styles.priceRow}>
                    {product.oldPrice && (
                      <span className={styles.oldPrice}>{Number(product.oldPrice).toFixed(2)} TL</span>
                    )}
                    <p className={styles.price}>{Number(product.price).toFixed(2)} TL</p>
                  </div>

                  <p className={styles.stockStatus} style={{ color: product.inStock ? '#10b981' : '#ef4444' }}>
                    {product.inStock ? 'Stokta Var' : 'Tükendi'}
                  </p>
    
                  <div className={styles.actions}>
                     {product.variants && product.variants.length > 0 ? (
                       <Link href={`/product/${product.slug}`} className={`${styles.addBtn} btn btn-primary`} style={{ backgroundColor: '#111' }}>Seçenekleri Gör</Link>
                     ) : (
                       <button 
                         className={`${styles.addBtn} btn btn-primary`}
                         onClick={() => handleAddToCart(product)}
                         disabled={product.stockCount === 0 || product.inStock === false}
                       >
                         {(product.stockCount === 0 || product.inStock === false) ? 'Tükendi' : 'Sepete Ekle'}
                       </button>
                     )}
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

