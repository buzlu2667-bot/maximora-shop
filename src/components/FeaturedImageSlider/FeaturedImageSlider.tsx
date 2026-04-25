"use client";

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './FeaturedImageSlider.module.css';

interface Props {
  images: string[];
  name: string;
}

export default function FeaturedImageSlider({ images, name }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.container}>
      <div 
        className={styles.slider} 
        ref={scrollRef} 
        onScroll={handleScroll}
      >
        {images.map((img, index) => (
          <div 
            key={index} 
            className={styles.slide}
            onClick={() => setIsModalOpen(true)}
          >
            <img 
              src={img} 
              alt={`${name} - ${index + 1}`} 
              className={styles.image} 
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button 
            className={`${styles.navBtn} ${styles.prevBtn}`} 
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Önceki resim"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className={`${styles.navBtn} ${styles.nextBtn}`} 
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === images.length - 1}
            aria-label="Sonraki resim"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className={styles.dots}>
            {images.map((_, index) => (
              <button 
                key={index} 
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                onClick={() => scrollTo(index)}
                aria-label={`Resim ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* ---------------- BÜYÜTÜLMÜŞ GÖRSEL MODALI ---------------- */}
      {isModalOpen && (
        <div className={styles.fullscreenModal} onClick={() => setIsModalOpen(false)}>
          <button className={styles.closeModalBtn} onClick={() => setIsModalOpen(false)}><X size={32} /></button>
          <img src={images[activeIndex]} alt={name} className={styles.fullscreenImage} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
