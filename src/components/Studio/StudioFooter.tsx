"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import styles from './StudioFooter.module.css';

export default function StudioFooter() {


  return (
    <footer className={styles.footerWrapper}>
      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>İşletmenizi Büyütmeye Hazır Mısınız?</h2>
          <p className={styles.ctaDesc}>
            Dilediğiniz zaman bizimle iletişime geçerek satış öncesi destek ve detaylı bilgi alabilirsiniz.
          </p>
          <a 
            href="https://wa.me/905384657526?text=Merhaba,%20Maximora%20Studio%20web%20tasar%C4%B1m%20paketleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.whatsappBtn}
          >
            WhatsApp İletişim <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className={styles.mainFooter}>
        <div className={styles.container}>
          
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brandCol}>
              <Link href="/studio" className={styles.logo}>
                MAXIMORA <span className={styles.goldText}>STUDIO</span>
              </Link>
              <p className={styles.brandDesc}>
                Sıradan olanı reddediyoruz. Markanızın hak ettiği premium dijital deneyimi, en ileri teknolojilerle kusursuz bir şekilde inşa ediyoruz.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialIcon}>IG</a>
                <a href="#" className={styles.socialIcon}>TW</a>
                <a href="#" className={styles.socialIcon}>IN</a>
              </div>
            </div>

            {/* Links Column */}
            <div className={styles.linksCol}>
              <h3 className={styles.colTitle}>Hızlı Menü</h3>
              <ul className={styles.linkList}>
                <li><Link href="/studio/kurumsal">Kurumsal</Link></li>
                <li><Link href="/studio/urunlerimiz">Ürünlerimiz</Link></li>
                <li><Link href="/studio/projelerimiz">Projelerimiz</Link></li>
                <li><Link href="/studio/e-ticaret-paketleri">E-Ticaret Çözümleri</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className={styles.contactCol}>
              <h3 className={styles.colTitle}>İletişim</h3>
              <ul className={styles.contactList}>
                <li>
                  <MapPin size={20} className={styles.contactIcon} />
                  <span>İstanbul, Türkiye</span>
                </li>
                <li>
                  <Mail size={20} className={styles.contactIcon} />
                  <a href="mailto:destek@maximorashop.com">destek@maximorashop.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.bottomBar}>
            <p>© {new Date().getFullYear()} Maximora Studio. Tüm hakları saklıdır.</p>
            <div className={styles.bottomLinks}>
              <Link href="/studio/gizlilik-politikasi">Gizlilik Politikası</Link>
              <Link href="/studio/kullanim-sartlari">Kullanım Şartları</Link>
              <Link href="/studio/kvkk">KVKK & Aydınlatma Metni</Link>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
