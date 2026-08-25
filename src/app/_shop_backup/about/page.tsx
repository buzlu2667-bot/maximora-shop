"use client";

import React from 'react';
import { Award, ShoppingBag, Heart, ShieldCheck, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container" style={{ 
      maxWidth: '900px', 
      marginTop: '4rem', 
      marginBottom: '8rem',
      padding: '0 15px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 10vw, 4rem)', 
          fontWeight: 300, 
          color: '#000', 
          marginBottom: '1.5rem',
          letterSpacing: '-0.03em'
        }}>
          Hakkımızda
        </h1>
        <div style={{ 
          width: '60px', 
          height: '2px', 
          backgroundColor: '#000', 
          margin: '0 auto' 
        }} />
      </div>

      {/* Main Text */}
      <div style={{ 
        fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', 
        lineHeight: '1.8', 
        color: '#444', 
        textAlign: 'center',
        marginBottom: '5rem'
      }}>
        <p>
          MaximoraShop, kaliteli ve şık ürünleri uygun fiyatlarla müşterileriyle buluşturmak amacıyla kurulmuş bir online alışveriş platformudur.
        </p>
        <p style={{ marginTop: '2rem' }}>
          MaximoraShop olarak amacımız, siz değerli müşterilerimize her zaman güvenilir, şeffaf ve kaliteli bir hizmet sunmaktır.
        </p>
      </div>

      {/* Value Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '2rem',
        marginBottom: '5rem'
      }}>
        <div style={{ textAlign: 'center', padding: '2.5rem', backgroundColor: '#f9f9f9', borderRadius: '20px' }}>
          <Heart size={32} style={{ marginBottom: '1.2rem', color: '#000' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>Müşteri Memnuniyeti</h3>
          <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.6' }}>Sizlere en iyi alışveriş deneyimini sunmayı her zaman ön planda tutuyoruz.</p>
        </div>

        <div style={{ textAlign: 'center', padding: '2.5rem', backgroundColor: '#f9f9f9', borderRadius: '20px' }}>
          <ShieldCheck size={32} style={{ marginBottom: '1.2rem', color: '#000' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>Güvenli Alışveriş</h3>
          <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.6' }}>Verileriniz ve ödemeleriniz en yüksek güvenlik standartlarıyla korunur.</p>
        </div>

        <div style={{ textAlign: 'center', padding: '2.5rem', backgroundColor: '#f9f9f9', borderRadius: '20px' }}>
          <Zap size={32} style={{ marginBottom: '1.2rem', color: '#000' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>Hızlı Kargo</h3>
          <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.6' }}>Siparişleriniz en kısa sürede hazırlanarak kapınıza kadar ulaştırılır.</p>
        </div>
      </div>

      {/* Secondary Text Area */}
      <div style={{ 
        backgroundColor: '#000', 
        color: '#fff', 
        padding: 'clamp(2rem, 8vw, 4rem)', 
        borderRadius: '24px',
        textAlign: 'center'
      }}>
        <Award size={40} strokeWidth={1} style={{ marginBottom: '1.5rem' }} />
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.9 }}>
          Mağazamızda yer alan tüm ürünler özenle seçilmekte ve kalite kontrol süreçlerinden geçirilmektedir. Siparişleriniz en kısa sürede hazırlanarak güvenli şekilde adresinize teslim edilmektedir.
        </p>
        <p style={{ marginTop: '2rem', fontSize: '1.2rem', fontWeight: 600 }}>
          Bizi tercih ettiğiniz için teşekkür ederiz.
        </p>
      </div>
    </div>
  );
}
