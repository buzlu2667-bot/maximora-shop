"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './SplashScreen.module.css';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Wait for the animation to play before hiding the container
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.splashContainer} ${!isVisible ? styles.hidden : ''}`}>
      <Image 
        src="/logo-gold.png" 
        alt="Maximora" 
        width={400} 
        height={120} 
        className={styles.logo}
        priority
      />
    </div>
  );
}
