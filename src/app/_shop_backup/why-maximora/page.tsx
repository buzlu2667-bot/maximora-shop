"use client";

import React from 'react';
import { CheckCircle, ShieldCheck, Zap, Heart, Box, Headphones, Star } from 'lucide-react';

export default function WhyMaximoraPage() {
  const features = [
    {
      icon: <ShieldCheck size={32} />,
      title: "Güvenli ödeme altyapısı",
      desc: "Tüm işlemleriniz en yüksek güvenlik standartlarıyla korunur."
    },
    {
      icon: <Zap size={32} />,
      title: "Hızlı kargo",
      desc: "Siparişleriniz en kısa sürede hazırlanır ve yola çıkar."
    },
    {
      icon: <Heart size={32} />,
      title: "Müşteri memnuniyeti odaklı hizmet",
      desc: "Sizin mutluluğunuz bizim için her zaman ilk sıradadır."
    },
    {
      icon: <Box size={32} />,
      title: "Özenli paketleme",
      desc: "Ürünleriniz zarar görmemesi için büyük bir titizlikle paketlenir."
    },
    {
      icon: <Headphones size={32} />,
      title: "Satış sonrası destek",
      desc: "Her türlü sorunuzda ekibimiz yanınızdadır."
    }
  ];

  return (
    <div className="container" style={{ 
      maxWidth: '1000px', 
      marginTop: '4rem', 
      marginBottom: '8rem',
      padding: '0 15px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <Star size={48} strokeWidth={1} style={{ marginBottom: '1.5rem', color: '#000' }} />
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 10vw, 4rem)', 
          fontWeight: 400, 
          color: '#000', 
          marginBottom: '1.5rem' 
        }}>
          Neden Maximora?
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', 
          color: '#666', 
          maxWidth: '700px', 
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Maximora olarak müşterilerimize kaliteli ürünleri en uygun fiyatlarla sunmayı hedefliyoruz. İşte bizi tercih etmeniz için birkaç neden:
        </p>
      </div>

      {/* Features Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem'
      }}>
        {features.map((item, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              padding: '3rem 2rem', 
              backgroundColor: '#fff', 
              borderRadius: '24px', 
              border: '1px solid #f0f0f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
              transition: 'transform 0.3s ease'
            }}
          >
            <div style={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              padding: '1.25rem', 
              borderRadius: '50%', 
              marginBottom: '1.5rem' 
            }}>
              {item.icon}
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem', color: '#000' }}>
              {item.title}
            </h3>
            <p style={{ color: '#888', fontSize: '1rem', lineHeight: '1.6' }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Banner */}
      <div style={{ 
        marginTop: '6rem', 
        textAlign: 'center', 
        padding: '4rem 2rem', 
        backgroundColor: '#f9f9f9', 
        borderRadius: '32px'
      }}>
        <CheckCircle size={40} style={{ marginBottom: '1.5rem', color: '#000' }} />
        <h2 style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', fontWeight: 300, color: '#000' }}>
          Alışverişin en güvenilir adresi: <strong style={{ fontWeight: 700 }}>Maximora</strong>
        </h2>
      </div>
    </div>
  );
}
