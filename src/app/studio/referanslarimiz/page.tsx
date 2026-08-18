"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, Smartphone, Code, ArrowRight } from 'lucide-react';
import styles from '../page.module.css';

export default function ReferanslarimizPage() {
  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>
      <header className={styles.hero} style={{ paddingBottom: '2rem' }}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>REFERANSLARIMIZ</div>
          <h1 className={styles.title}>Neler <span className={styles.goldText}>Yaptık?</span></h1>
          <p className={styles.description}>
            Hayata geçirdiğimiz premium dijital projeler ve referanslarımız.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/studio" style={{ color: '#d4af37', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </header>
      <section className={styles.portfolioSection}>
        <div className={styles.portfolioGrid}>
          {/* Mock Portfolio Items */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImageWrapper}>
              <div className={styles.portfolioPlaceholder}>
                <Globe size={48} opacity={0.3} color="#d4af37" />
              </div>
            </div>
            <div className={styles.portfolioContent}>
              <h3>Kurumsal B2B Yazılımı</h3>
              <p>Türkiye'nin önde gelen firmaları için özel geliştirilmiş B2B sipariş sistemi.</p>
              <span className={styles.portfolioLink} style={{ cursor: 'pointer' }}>Detayları İncele <ArrowRight size={16} /></span>
            </div>
          </div>
          
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImageWrapper}>
              <div className={styles.portfolioPlaceholder}>
                <Smartphone size={48} opacity={0.3} color="#d4af37" />
              </div>
            </div>
            <div className={styles.portfolioContent}>
              <h3>Vip Transfer Mobil App</h3>
              <p>Özel araç çağırma ve VIP transfer işlemleri için iOS ve Android uygulaması.</p>
              <span className={styles.portfolioLink} style={{ cursor: 'pointer' }}>Detayları İncele <ArrowRight size={16} /></span>
            </div>
          </div>
          
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImageWrapper}>
              <div className={styles.portfolioPlaceholder}>
                <Code size={48} opacity={0.3} color="#d4af37" />
              </div>
            </div>
            <div className={styles.portfolioContent}>
              <h3>Otomasyon Sistemleri</h3>
              <p>E-ticaret firmaları için tam entegre kargo ve stok otomasyon yazılımları.</p>
              <span className={styles.portfolioLink} style={{ cursor: 'pointer' }}>Detayları İncele <ArrowRight size={16} /></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
