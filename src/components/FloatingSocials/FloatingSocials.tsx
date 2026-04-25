"use client";

import React from 'react';
import styles from './FloatingSocials.module.css';

export default function FloatingSocials() {
  return (
    <div className={styles.container}>
      <a href="https://facebook.com/maximora" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Facebook">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" className={styles.icon} />
      </a>
      <a href="https://instagram.com/maximora" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Instagram">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className={styles.icon} />
      </a>
      <a href="https://wa.me/90XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="WhatsApp">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className={styles.icon} />
      </a>
      <a href="https://t.me/maximora" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Telegram">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram" className={styles.icon} />
      </a>
    </div>
  );
}
