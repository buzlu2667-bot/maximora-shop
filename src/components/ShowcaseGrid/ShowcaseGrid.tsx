"use client";

import React, { useState } from 'react';
import { Product } from '@/types';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ShowcaseGrid.module.css';

interface ShowcaseGridProps {
  products: Product[];
  initialLimit: number;
}

export default function ShowcaseGrid({ products, initialLimit }: ShowcaseGridProps) {
  const [displayCount, setDisplayCount] = useState(initialLimit);

  const hasMore = products.length > displayCount;
  const visibleProducts = products.slice(0, displayCount);

  const handleLoadMore = () => {
    // 8'er 8'er artırabiliriz
    setDisplayCount(prev => prev + 8);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.productGrid}>
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
            Daha Fazla Yükle
          </button>
        </div>
      )}
    </div>
  );
}
