"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { useStore } from '@/store/useStore';
import { Send, Rocket } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Footer() {
  const { user } = useStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'Abonelik başarılı!');
        setEmail('');
      } else {
        toast.error(data.error || 'Bir hata oluştu.');
      }
    } catch (error) {
      toast.error('Bağlantı hatası.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Newsletter Şeridi - Footer ile Bütünleşik */}
      <div className={styles.newsletterRow}>
        <div className="container">
          <div className={styles.newsletterContent}>
            <h3 className={styles.newsletterTitle}>
              Özel İndirimleri Kaçırma! E-postana Gelsin <Rocket size={20} style={{ color: '#ff4d4d' }} />
            </h3>
            <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" disabled={loading} className={styles.newsletterBtn}>
                  {loading ? '...' : <Send size={18} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Logo ve Açıklama Bölümü */}
        <div className={styles.brandHeader}>
          <div className={styles.logoWrapper}>
            <img src="/logo-gold.png" alt="Maximora Logo" className={styles.footerLogo} />
          </div>
          <div className={styles.brandText}>
            <p><strong>Maximora</strong>, teknoloji, aksesuar ve günlük yaşam ürünlerinde kaliteyi ve uygun fiyatı bir araya getirir.</p>
            <p>Güvenli alışveriş, hızlı kargo ve müşteri memnuniyeti önceliğimizdir.</p>
          </div>
        </div>
        <div className={styles.separator}></div>
      </div>

      <div className={`container ${styles.footerGrid}`}>
        {/* Mağaza Sütunu */}
        <div className={styles.navCol}>
          <h4 className={styles.colTitle}>Mağaza</h4>
          <Link href="/" className={styles.link}>Anasayfa</Link>
          <Link href={user ? "/hesabim" : "/login"} className={styles.link}>Hesabım</Link>
          <Link href="/search" className={styles.link}>Arama</Link>
        </div>

        {/* Destek Sütunu */}
        <div className={styles.navCol}>
          <h4 className={styles.colTitle}>Destek</h4>
          <Link href="/contact" className={styles.link}>İletişim</Link>
          <Link href="/bize-ulasin" className={styles.link}>Bize Ulaşın</Link>
          <Link href="/faq" className={styles.link}>Sık Sorulan Sorular</Link>
          <Link href="/shipping" className={styles.link}>Kargo ve Teslimat</Link>
          <Link href="/returns" className={styles.link}>İade & Değişim</Link>
          <Link href="/privacy" className={styles.link}>Gizlilik Politikası</Link>
          <Link href="/terms" className={styles.link}>Hizmet Şartları</Link>
          <Link href="/legal" className={styles.link}>Yasal Bildirim</Link>
        </div>

        {/* Maximora Sütunu */}
        <div className={styles.navCol}>
          <h4 className={styles.colTitle}>Maximora</h4>
          <Link href="/about" className={styles.link}>Hakkımızda</Link>
          <Link href="/why-maximora" className={styles.link}>Neden Maximora?</Link>
          <Link href="/safe-shopping" className={styles.link}>Güvenli Alışveriş</Link>
          <Link href="/campaigns" className={styles.link}>Kampanyalar</Link>
        </div>
      </div>

      {/* Kargo ve Ödeme Bölümü */}
      <div className="container">
        <div className={styles.separator}></div>
        <div className={styles.bottomSection}>
          <div className={styles.bottomCol}>
            <h4 className={styles.bottomTitle}>Kargo Firmaları</h4>
            <img src="/shipping-logos.png" alt="Kargo Firmaları" className={styles.methodLogos} />
          </div>
          <div className={styles.bottomCol}>
            <h4 className={styles.bottomTitle}>Güvenli Ödeme</h4>
            <img src="/payment-logos.png" alt="Güvenli Ödeme" className={styles.methodLogos} />
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomBarContent}`}>
          <p className={styles.copy}>&copy; {new Date().getFullYear()} MAXIMORA. Tüm hakları saklıdır.</p>

          <div className={styles.socialLinks}>
            <a href="https://www.facebook.com/profile.php?id=61585122982535&locale=tr_TR" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" /></svg>
            </a>
            <a href="https://www.instagram.com/maximorashop" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://wa.me/905384657526?text=Merhaba" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </a>
            <a href="https://t.me/maximoraofficial" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Telegram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .33z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

