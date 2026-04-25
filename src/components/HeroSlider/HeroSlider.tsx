"use client";

import React, { useState, useEffect } from 'react';
import styles from './HeroSlider.module.css';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Slide = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
  textPosition: string;
};

const DEFAULT_SLIDES: Slide[] = [];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch('/api/slider');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setSlides(data);
          }
        }
      } catch (e) {
        console.error("Slider fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current, slides.length]);

  if (loading) {
    return (
      <div className={styles.slider} style={{ backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className={styles.skeletonPulse}></div>
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <div className={styles.slider}>
      {slides.map((slide, index) => {
        const hasText = slide.title || slide.subtitle;
        const positionClass = slide.textPosition ? slide.textPosition.replace('-', '_') : 'center';

        return (
          <div
            key={slide.id || index}
            className={`${styles.slide} ${index === current ? styles.active : ''}`}
            onClick={() => {
              if (!hasText && slide.link) {
                router.push(slide.link);
              }
            }}
            style={{ cursor: (!hasText && slide.link) ? 'pointer' : 'default' }}
          >
            {/* Optimized Image Component/Tag */}
            <img 
              src={slide.image} 
              alt={slide.title || "Slider Image"} 
              className={styles.slideImage}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
            />

            <div className={styles.overlay} style={{ opacity: hasText ? 1 : 0.2 }}></div>

            {hasText && (
              <div className={`container ${styles.content} ${styles[positionClass]} ${index === current ? styles.contentActive : ''}`}>
                {slide.title && <h1>{slide.title}</h1>}
                {slide.subtitle && <p>{slide.subtitle}</p>}
                {slide.link && (
                  <div className={styles.actions}>
                    <Link href={slide.link} className="btn btn-primary">İncele</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {slides.length > 1 && (
        <>
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prevSlide} aria-label="Önceki Slayt">
            <ChevronLeft size={36} />
          </button>
          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={nextSlide} aria-label="Sonraki Slayt">
            <ChevronRight size={36} />
          </button>

          <div className={styles.dots}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
                onClick={() => setCurrent(index)}
                aria-label={`Slayt ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

