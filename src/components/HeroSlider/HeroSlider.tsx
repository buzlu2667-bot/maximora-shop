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

const DEFAULT_SLIDES: Slide[] = [
  {
    id: "1",
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Yeni Sezon Çantalar',
    subtitle: 'Stilinizi tamamlayacak en zarif dokunuş.',
    link: '/categories/new',
    textPosition: 'center'
  },
  {
    id: "2",
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Deri Şıklığı',
    subtitle: 'El yapımı özel koleksiyon deri çantalar.',
    link: '/categories/leather',
    textPosition: 'center'
  },
  {
    id: "3",
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Minimal ve Lüks',
    subtitle: 'Günlük karmaşadan uzak, sadece gerekenleri taşıyın.',
    link: '/categories/minimal',
    textPosition: 'center'
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch('/api/slider');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setSlides(data);
          } else {
            setSlides(DEFAULT_SLIDES);
          }
        } else {
          setSlides(DEFAULT_SLIDES);
        }
      } catch (e) {
        setSlides(DEFAULT_SLIDES);
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

  if (loading) return <div className={styles.slider} style={{ backgroundColor: '#111' }}></div>;
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
            style={{ backgroundImage: `url(${slide.image})`, cursor: (!hasText && slide.link) ? 'pointer' : 'default' }}
            onClick={() => {
              if (!hasText && slide.link) {
                router.push(slide.link);
              }
            }}
          >
            {/* Yazı yoksa karartmayı daha az tut */}
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
          {/* Ok Yönlendirmeleri */}
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
