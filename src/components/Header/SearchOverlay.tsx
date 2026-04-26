"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Search as SearchIcon, Loader2, CircleX } from 'lucide-react';
import styles from './SearchOverlay.module.css';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
      setSuggestions([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const result = await response.json();

        if (result.error) throw new Error(result.error);

        if (result.products) {
          const mappedProducts: Product[] = result.products.map((row: any) => ({
            id: row.id,
            name: row.name,
            slug: row.slug,
            description: row.description || '',
            price: row.discounted_price ? Number(row.discounted_price) : Number(row.price),
            oldPrice: row.old_price ? Number(row.old_price) : (row.discounted_price ? Number(row.price) : undefined),
            discountedPrice: row.discounted_price ? Number(row.discounted_price) : undefined,
            category: row.category,
            images: row.images || [],
            inStock: row.in_stock,
            stock_count: row.stock_count,
            variants: row.variants || [],
            features: row.features || [],
            shopierUrl: row.shopier_url || undefined,
          }));
          setResults(mappedProducts);

          const uniqueCats = Array.from(new Set(mappedProducts.map(p => p.category))).slice(0, 6);
          setSuggestions(uniqueCats);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.searchBarArea}>
        <div className={styles.container}>
          <div className={styles.inputWrapper}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Ürün veya kategori ara..."
              className={styles.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className={styles.searchIconGroup}>
              {query && <CircleX size={20} className="cursor-pointer" onClick={() => setQuery('')} />}
              {loading ? <Loader2 size={22} className="animate-spin" /> : <SearchIcon size={22} />}
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={32} strokeWidth={1.5} />
          </button>
        </div>

        {query.length >= 2 && (
          <div className={styles.dropdown}>
            <div className={styles.suggestionsCol}>
              <span className={styles.colTitle}>Öneriler</span>
              {suggestions.length > 0 ? suggestions.map((cat, idx) => (
                <Link key={idx} href={`/brand/${cat.toLowerCase().replace(/\s+/g, '-')}`} className={styles.suggestionItem} onClick={onClose}>
                  {cat}
                </Link>
              )) : <span style={{ color: '#ccc', fontSize: '0.9rem' }}>Öneri yok</span>}
            </div>

            <div className={styles.productsCol}>
              <span className={styles.colTitle}>Ürünler</span>
              {results.length > 0 ? (
                <div className={styles.productList}>
                  {results.map((product) => (
                    <Link key={product.id} href={`/product/${product.slug}`} className={styles.productCard} onClick={onClose}>
                      <img src={product.images[0] || '/placeholder.png'} alt={product.name} className={styles.productImg} />
                      <div className={styles.productInfo}>
                        <span className={styles.productName}>{product.name}</span>
                        <div className={styles.priceWrapper}>
                          {/* İndirim dedektörü: oldPrice varsa veya discounted_price fiyatı normal fiyattan düşükse */}
                          {product.oldPrice || (product.discountedPrice && Number(product.discountedPrice) < Number(product.price)) ? (
                            <>
                              <span className={styles.oldPrice}>
                                {(product.oldPrice || product.price).toLocaleString('tr-TR')} TL
                              </span>
                              <span className={styles.newPrice}>
                                {(product.discountedPrice || product.price).toLocaleString('tr-TR')} TL
                              </span>
                            </>
                          ) : (
                            <span className={styles.newPrice}>
                              {Number(product.price).toLocaleString('tr-TR')} TL
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className={styles.noResults}>Sonuç bulunamadı</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
