"use client";

import React from 'react';
import { Gift, Sparkles, Clock, ShoppingBag, BellRing } from 'lucide-react';

export default function CampaignsPage() {
  return (
    <div className="container" style={{ 
      maxWidth: '850px', 
      marginTop: '4rem', 
      marginBottom: '8rem',
      padding: '0 15px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <div style={{ 
          display: 'inline-flex',
          backgroundColor: '#fff7ed',
          padding: '1.5rem',
          borderRadius: '50%',
          marginBottom: '1.5rem'
        }}>
          <Sparkles size={56} color="#f97316" strokeWidth={1.5} />
        </div>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 10vw, 3.5rem)', 
          fontWeight: 400, 
          color: '#000', 
          marginBottom: '1rem',
          letterSpacing: '-0.02em'
        }}>
          Kampanyalar
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Maximora'daki en güncel fırsatları ve indirimleri keşfedin.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Main Info Card */}
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '3rem 2rem', 
          borderRadius: '24px', 
          border: '1px solid #f0f0f0',
          textAlign: 'center',
          boxShadow: '0 4px 30px rgba(0,0,0,0.03)'
        }}>
          <Gift size={40} color="#000" style={{ marginBottom: '1.5rem' }} />
          <p style={{ 
            fontSize: '1.25rem', 
            lineHeight: '1.7', 
            color: '#333',
            margin: 0
          }}>
            Maximora’da dönemsel indirimler ve özel kampanyalar ana sayfamızda ve ürün sayfalarında duyurulmaktadır.
          </p>
        </div>

        {/* Feature Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem' 
        }}>
          <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '16px', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <Clock size={24} color="#000" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '1rem', color: '#555', margin: 0 }}>
              Aktif kampanyalar, <strong>stok durumuna</strong> ve belirlenen süreye göre geçerlidir.
            </p>
          </div>
          
          <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '16px', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <BellRing size={24} color="#000" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '1rem', color: '#555', margin: 0 }}>
              Güncel fırsatları kaçırmamak için ana sayfamızı <strong>düzenli olarak</strong> ziyaret edebilirsiniz.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ 
          marginTop: '3rem', 
          padding: '3rem', 
          backgroundColor: '#000', 
          color: '#fff', 
          borderRadius: '24px', 
          textAlign: 'center' 
        }}>
          <ShoppingBag size={32} color="#fff" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff' }}>
            Fırsatları Keşfetmeye Başlayın
          </h2>
          <a 
            href="/" 
            style={{ 
              display: 'inline-block',
              backgroundColor: '#fff', 
              color: '#000', 
              padding: '1rem 3rem', 
              borderRadius: '50px', 
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem'
            }}
          >
            Alışverişe Başla
          </a>
        </div>

      </div>
    </div>
  );
}
