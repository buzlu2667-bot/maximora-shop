"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

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

  if (!mounted) return <div className="container section" style={{ minHeight: '80vh' }}></div>;

  return (
    <div className="container section">
      <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Favorilerim</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        {favorites.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
             Hayır, favorilerinizde henüz bir ürün yok.
          </div>
        ) : (
          favorites.map(product => (
            <div key={product.id} style={{ display: 'flex', gap: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
               <div style={{ width: '150px', aspectRatio: '3/4', backgroundColor: 'transparent', overflow: 'hidden', borderRadius: '4px' }}>
                  <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}><Link href={`/product/${product.slug}`}>{product.name}</Link></h3>
                      <button style={{ color: 'var(--color-error)' }} title="Favorilerden Çıkar" onClick={() => handleRemove(product.id)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {product.oldPrice && (
                        <span style={{ fontSize: '0.9rem', color: '#999', textDecoration: 'line-through' }}>{product.oldPrice.toFixed(2)} TL</span>
                      )}
                      <p style={{ color: product.oldPrice ? '#cc3333' : 'var(--color-primary)', fontSize: '1.125rem', fontWeight: 600 }}>{product.price.toFixed(2)} TL</p>
                    </div>
                    <p style={{ color: 'var(--color-success)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{product.inStock ? 'Stokta Var' : 'Tükendi'}</p>
                  </div>
    
                  <div>
                     {product.variants && product.variants.length > 0 ? (
                       <Link href={`/product/${product.slug}`} className="btn btn-primary" style={{ backgroundColor: '#111', color: 'white' }}>Seçenekleri Gör</Link>
                     ) : (
                       <button 
                         className="btn btn-primary" 
                         onClick={() => handleAddToCart(product)}
                         disabled={product.stockCount === 0 || product.inStock === false}
                         style={{ 
                           opacity: (product.stockCount === 0 || product.inStock === false) ? 0.5 : 1,
                           cursor: (product.stockCount === 0 || product.inStock === false) ? 'not-allowed' : 'pointer'
                         }}
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
