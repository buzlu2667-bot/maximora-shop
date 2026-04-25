"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Product } from '@/types';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductSlider.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  products: Product[];
}

export default function ProductSlider({ products }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    // Re-check when window is resized since clientWidth changes
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 300; // approximate card width
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <button 
        className={`${styles.navButton} ${styles.prevButton} ${isAtStart ? styles.disabled : ''}`} 
        onClick={() => scroll('left')}
        aria-label="Önceki ürünler"
        disabled={isAtStart}
      >
        <ChevronLeft size={24} />
      </button>
      
      <div className={styles.slider} ref={sliderRef} onScroll={checkScrollPosition}>
        {products.map(product => (
          <div key={product.id} className={styles.slideItem}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button 
        className={`${styles.navButton} ${styles.nextButton} ${isAtEnd ? styles.disabled : ''}`} 
        onClick={() => scroll('right')}
        aria-label="Sonraki ürünler"
        disabled={isAtEnd}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
