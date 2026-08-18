"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from '../page.module.css';

export default function ETicaretPage() {
  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>
      <header className={styles.hero} style={{ paddingBottom: '2rem' }}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>E-TİCARET</div>
          <h1 className={styles.title}>Satışlarınızı <span className={styles.goldText}>Katlayın.</span></h1>
          <p className={styles.description}>
            Hızlı, güvenli ve dönüşüm odaklı, premium e-ticaret altyapıları kuruyoruz.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/studio" style={{ color: '#d4af37', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </header>
      <section className={styles.processSection} style={{ paddingTop: '2rem', minHeight: '40vh' }}>
        <div style={{ textAlign: 'center', color: '#a0a0a0' }}>
          <p>E-ticaret çözümleri detayları çok yakında eklenecektir...</p>
        </div>
      </section>
    </div>
  );
}
