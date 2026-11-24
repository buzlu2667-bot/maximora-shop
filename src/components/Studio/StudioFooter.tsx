"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, ArrowUpRight, MessageCircle, Clock, ShieldCheck, Zap, Headphones } from 'lucide-react';
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

          {/* Trust & Assurance Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <div className={styles.trustIconWrap}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <span className={styles.trustTitle}>Revizyon & Memnuniyet</span>
                <span className={styles.trustDesc}>Tam onay verene kadar yanınızdayız</span>
              </div>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustIconWrap}>
                <Zap size={22} />
              </div>
              <div>
                <span className={styles.trustTitle}>Şeffaf Süreç & Canlı Demo</span>
                <span className={styles.trustDesc}>Görmeden ve denemeden karar vermeyin</span>
              </div>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustIconWrap}>
                <Headphones size={22} />
              </div>
              <div>
                <span className={styles.trustTitle}>Birebir Destek & Danışmanlık</span>
                <span className={styles.trustDesc}>Doğrudan geliştirici ile hızlı iletişim</span>
              </div>
            </div>
          </div>
          
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
                <a href="#" className={styles.socialIcon} aria-label="Instagram">IG</a>
                <a href="#" className={styles.socialIcon} aria-label="Twitter">TW</a>
                <a href="#" className={styles.socialIcon} aria-label="LinkedIn">IN</a>
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
              <h3 className={styles.colTitle}>İletişim & Destek</h3>
              <ul className={styles.contactList}>
                <li>
                  <div className={styles.contactIconWrap}>
                    <MapPin size={18} className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactMain}>İstanbul, Türkiye</span>
                    <span className={styles.contactSub}>Dijital Tasarım & Yazılım Stüdyosu</span>
                  </div>
                </li>

                <li>
                  <div className={styles.contactIconWrapWhatsapp}>
                    <MessageCircle size={18} />
                  </div>
                  <div className={styles.contactInfo}>
                    <a 
                      href="https://wa.me/905384657526?text=Merhaba,%20web%20sitesi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.whatsappLink}
                    >
                      WhatsApp İletişim Hattı
                    </a>
                    <span className={styles.onlineBadge}>
                      <span className={styles.onlineDot} /> Çevrimiçi Destek (Ort. 15 dk)
                    </span>
                  </div>
                </li>

                <li>
                  <div className={styles.contactIconWrap}>
                    <Mail size={18} className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactInfo}>
                    <a href="mailto:destek@maximorashop.com" className={styles.mailLink}>
                      destek@maximorashop.com
                    </a>
                    <span className={styles.contactSub}>Proje & Teklif Talepleri</span>
                  </div>
                </li>

                <li>
                  <div className={styles.contactIconWrap}>
                    <Clock size={18} className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactMain}>Pzt - Cts: 09:00 - 21:00</span>
                    <span className={styles.contactSub}>7/24 Kesintisiz E-Posta</span>
                  </div>
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
