"use client";

import React from 'react';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from '../Teklif.module.css';

export default function TeklifBasariliPage() {
  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>
      <div className={styles.contentWrapper} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        <div style={{ 
          maxWidth: '600px', 
          width: '100%',
          textAlign: 'center', 
          background: 'rgba(255, 255, 255, 0.03)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '50px 30px', 
          borderRadius: '24px' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', color: '#d4af37' }}>
            <CheckCircle2 size={80} />
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#fff' }}>
            Harika! Talebiniz Alındı.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#a0a0a0', lineHeight: '1.6', marginBottom: '40px' }}>
            Proje detaylarınız uzman ekibimize ulaştı. İhtiyaçlarınızı analiz edip sizinle en kısa sürede iletişime geçeceğiz.
          </p>
          
          <Link 
            href="/studio" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: '#fff', 
              color: '#000', 
              padding: '16px 32px', 
              borderRadius: '100px', 
              fontWeight: '600', 
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <ArrowLeft size={20} /> Ana Sayfaya Dön
          </Link>
        </div>

      </div>
    </div>
  );
}
