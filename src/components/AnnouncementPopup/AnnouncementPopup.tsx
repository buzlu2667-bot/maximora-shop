"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import styles from './AnnouncementPopup.module.css';

export default function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState<any>(null);

  useEffect(() => {
    const checkPopup = async () => {
      try {
        const res = await fetch('/api/settings');
        if (!res.ok) return;
        
        const data = await res.json();
        const settings = data.popup_settings;

        if (settings && settings.enabled) {
          const seenId = localStorage.getItem('maximora_popup_seen_id');
          
          // Eğer ID farklıysa (yeni bir duyuruysa) göster
          if (seenId !== settings.id) {
            setPopupData(settings);
            // Küçük bir gecikmeyle açalım ki sayfa yüklendikten sonra gelsin (daha premium)
            setTimeout(() => setIsOpen(true), 1500);
          }
        }
      } catch (err) {
        console.error('Popup check error:', err);
      }
    };

    checkPopup();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (popupData?.id) {
      localStorage.setItem('maximora_popup_seen_id', popupData.id);
    }
  };

  if (!isOpen || !popupData) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Kapat">
          <X size={24} />
        </button>

        {popupData.image && (
          <div className={styles.imageWrapper}>
            <img src={popupData.image} alt={popupData.title} className={styles.image} />
          </div>
        )}

        <div className={styles.content}>
          <h2 className={styles.title}>{popupData.title}</h2>
          <p className={styles.text}>{popupData.content}</p>

          {popupData.buttonText && popupData.buttonLink && (
            <Link 
              href={popupData.buttonLink} 
              className={styles.actionBtn}
              onClick={handleClose}
            >
              {popupData.buttonText}
            </Link>
          )}

          <button className={styles.dismissBtn} onClick={handleClose}>
            Bir daha gösterme
          </button>
        </div>
      </div>
    </div>
  );
}
