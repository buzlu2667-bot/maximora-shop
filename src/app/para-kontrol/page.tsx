"use client";

import React from 'react';
import styles from './page.module.css';
import { 
  Wallet, 
  PieChart, 
  TrendingUp, 
  Layers, 
  Cloud, 
  ShieldCheck, 
  ChevronRight,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import Image from 'next/image';

export default function ParaKontrolPage() {
  return (
    <div className={styles.landing}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.topNav}>
          <a href="/" className={styles.backToShop}>
            Mağazaya Dön
          </a>
        </div>
        
        <div className={styles.heroContent}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(0, 122, 255, 0.1)', 
            padding: '0.5rem 1rem', 
            borderRadius: '100px',
            color: '#00E5FF',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(0, 229, 255, 0.2)'
          }}>
            <span style={{ width: '6px', height: '6px', background: '#00E5FF', borderRadius: '50%' }}></span>
            YENİ NESİL FİNANS YÖNETİMİ
          </div>
          
          <h1 className={styles.title}>Para Kontrol</h1>
          <p className={styles.subtitle}>
            Harcamalarınızı yönetin, bütçenizi planlayın ve finansal özgürlüğünüze giden yolu 
            akıllı analizlerle aydınlatın. Siyahın asaleti, teknolojinin mavisiyle buluştu.
          </p>

          <div className={styles.downloadButtons}>
            <a 
              href="#" 
              className={styles.playButton}
              onClick={(e) => e.preventDefault()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.523 15.3414L20.6136 12.2508L3.63916 2.5002C3.41407 2.37053 3.16781 2.30256 2.91716 2.30103C2.66651 2.2995 2.41829 2.36444 2.18916 2.4912L12.1892 12.4912L17.523 15.3414Z" fill="#000000"/>
                <path d="M2.18916 22.4912C2.41829 22.618 2.66651 22.6829 2.91716 22.6814C3.16781 22.6798 3.41407 22.6119 3.63916 22.4822L20.6136 12.7316L17.523 9.641L12.1892 12.4912L2.18916 22.4912Z" fill="#000000"/>
                <path d="M2.18916 2.4912L1.87916 2.8012C1.75131 2.92901 1.67916 3.10238 1.67916 3.2832C1.67916 3.46402 1.75131 3.63738 1.87916 3.76519L11.8792 13.7652L12.1892 13.4552V11.5272L2.18916 2.4912Z" fill="#000000"/>
                <path d="M12.1892 12.4912L2.18916 22.4912C2.31697 22.619 2.49034 22.6912 2.67116 22.6912C2.85198 22.6912 3.02534 22.6191 3.15316 22.4912L13.1532 12.4912L12.1892 11.5272V12.4912Z" fill="#000000"/>
              </svg>
              Google Play'den İndir
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Neden Para Kontrol?</h2>
          <p className={styles.sectionDesc}>
            Finansal hayatınızı sadeleştirmek ve kontrolü ele almak için ihtiyacınız olan tüm araçlar.
          </p>
        </div>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Plus size={32} />
            </div>
            <h3 className={styles.featureTitle}>Hızlı Kayıt</h3>
            <p className={styles.featureDesc}>
              Saniyeler içinde harcamalarınızı ekleyin, kategorize edin ve unutun. Para Kontrol sizin için hatırlar.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <PieChart size={32} />
            </div>
            <h3 className={styles.featureTitle}>Görsel Analiz</h3>
            <p className={styles.featureDesc}>
              Paranızın nereye gittiğini etkileşimli grafiklerle görün. Harcama alışkanlıklarınızı keşfedin.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <TrendingUp size={32} />
            </div>
            <h3 className={styles.featureTitle}>Bütçe Planlama</h3>
            <p className={styles.featureDesc}>
              Aylık veya haftalık bütçeler oluşturun, limitlerinizi aşmadan tasarruf etmeye başlayın.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Layers size={32} />
            </div>
            <h3 className={styles.featureTitle}>Kategori Yönetimi</h3>
            <p className={styles.featureDesc}>
              İhtiyaçlarınıza göre sınırsız kategori oluşturun ve harcamalarınızı kusursuzca düzenleyin.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Cloud size={32} />
            </div>
            <h3 className={styles.featureTitle}>Bulut Senkronizasyon</h3>
            <p className={styles.featureDesc}>
              Verileriniz tüm cihazlarınızda anlık olarak senkronize edilir. Telefonunuzu değiştirseniz de paranız güvende.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <ShieldCheck size={32} />
            </div>
            <h3 className={styles.featureTitle}>Tam Gizlilik</h3>
            <p className={styles.featureDesc}>
              Verileriniz uçtan uca şifrelenir. Finansal bilgileriniz sadece size özel kalır.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className={styles.showcase}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Uygulama Deneyimi</h2>
        </div>
        <div className={styles.showcaseContainer}>
          <div className={styles.carousel}>
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, index) => (
              <div key={index} className={styles.screenshotWrapper}>
                <img 
                  src={`/para-kontrol/screen${i}.png`} 
                  alt={`Para Kontrol Ekran ${i}`}
                  className={styles.screenshotImg}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerText}>
          &copy; 2026 Maximora Studio. Bütün hakları saklıdır.<br/>
          <a href="/para-kontrol-gizlilik" style={{ color: '#00E5FF', textDecoration: 'none', fontSize: '0.85rem', marginTop: '0.5rem', display: 'inline-block' }}>Gizlilik Politikası</a>
          <span style={{ margin: '0 0.5rem', opacity: 0.3 }}>|</span>
          <span style={{ fontSize: '0.85rem' }}>Para Kontrol - Akıllı Finans Asistanı</span>
        </div>
      </footer>
    </div>
  );
}
