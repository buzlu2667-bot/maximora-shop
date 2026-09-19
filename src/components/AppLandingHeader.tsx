"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './AppLandingHeader.module.css';

interface AppLandingHeaderProps {
  title: string;
}

export default function AppLandingHeader({ title }: AppLandingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Image 
            src="/logo-gold.png" 
            alt="Maximora" 
            width={32} 
            height={32} 
            className={styles.mLogo}
          />
          <span className={styles.title}>{title}</span>
        </div>
      </div>
    </header>
  );
}
