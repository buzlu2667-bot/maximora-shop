"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Ticket, Gift, X, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './CouponGamified.module.css';

export default function CouponGamified() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const timerRef = React.useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    fetchSettings();
    
    const interval = setInterval(fetchSettings, 60000);
    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings?t=' + Date.now());
      if (res.ok) {
        const data = await res.json();
        if (data.coupon_popup_settings && data.coupon_popup_settings.enabled) {
          const s = data.coupon_popup_settings;
          setSettings(s);

          // Eğer yüzen ikon kapalıysa, otomatik popup olarak göster
          if (!s.floatingIconEnabled) {
            const seenId = localStorage.getItem('maximora_coupon_seen_id');
            const sessionHiddenId = sessionStorage.getItem('maximora_coupon_hidden_id');
            
            // Mevcut bir sayaç varsa temizle (çiftleme yapmasın)
            if (timerRef.current) clearTimeout(timerRef.current);

            // Eğer ID farklıysa (yeni kuponsa) veya bu oturumda henüz bu ID gizlenmediyse göster
            if (seenId !== s.id && sessionHiddenId !== s.id) {
               const checkAndOpen = () => {
                 const latestHiddenId = sessionStorage.getItem('maximora_coupon_hidden_id');
                 const latestSeenId = localStorage.getItem('maximora_coupon_seen_id');
                 if (latestHiddenId === s.id || latestSeenId === s.id) return;

                 if (document.body.style.overflow === 'hidden') {
                    timerRef.current = setTimeout(checkAndOpen, 2000);
                 } else {
                    setIsOpen(true);
                 }
               };
               timerRef.current = setTimeout(checkAndOpen, 3500);
            }
          }
        } else {
          setSettings(null);
          setIsOpen(false);
        }
      }
    } catch (err) {
      console.error('Coupon fetch error:', err);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    
    if (settings?.id) {
      localStorage.setItem('maximora_coupon_seen_id', settings.id);
      sessionStorage.setItem('maximora_coupon_hidden_id', settings.id);
    }
  };

  // Scroll Kilidi
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCopy = () => {
    if (settings?.couponCode) {
      navigator.clipboard.writeText(settings.couponCode);
      toast.success('Kupon kodu kopyalandı! 🎉');
      
      // Kullanıcı kopyaladıysa, bu oturumda bu ID'yi gizle
      if (settings.id) {
        sessionStorage.setItem('maximora_coupon_hidden_id', settings.id);
      }
      
      // Küçük bir gecikmeyle kapat
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  };

  if (!mounted || !settings) return null;

  const sessionHidden = settings.id ? sessionStorage.getItem('maximora_coupon_hidden_id') === settings.id : false;
  if (sessionHidden && !isOpen) return null;

  return (
    <>
      {/* Floating Icon */}
      {settings.floatingIconEnabled && !isOpen && (
        <button 
          className={styles.floatingBtn} 
          onClick={() => setIsOpen(true)}
          title="Hediye Kuponun Var!"
        >
          <div className={styles.pulse} />
          <Ticket size={28} />
        </button>
      )}

      {/* Popup Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && handleClose()}>
          <div className={styles.popup}>
            <button className={styles.closeBtn} onClick={handleClose}>
              <X size={24} />
            </button>

            <div className={styles.iconBox}>
              <Gift size={40} />
            </div>

            <h2 className={styles.title}>{settings.title}</h2>
            {settings.amount && (
              <div className={styles.amountBadge}>
                {settings.amount}
              </div>
            )}
            <p className={styles.content}>{settings.content}</p>

            <div className={styles.couponCodeWrapper}>
              <span className={styles.label}>KUPON KODUN</span>
              <div className={styles.codeRow}>
                <span className={styles.code}>{settings.couponCode}</span>
                <button className={styles.copyBtn} onClick={handleCopy}>
                  <Copy size={18} />
                </button>
              </div>
            </div>

            <button className={styles.actionBtn} onClick={handleCopy}>
              {settings.buttonText || 'KUPONU KOPYALA'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
