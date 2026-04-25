"use client";

import React from 'react';
import { Mail, Globe, MapPin, Building } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container" style={{ 
      maxWidth: '800px', 
      marginTop: '3rem', 
      marginBottom: '5rem',
      padding: '0 1rem' // Mobilde kenarlardan boşluk ekledik
    }}>
      <h1 style={{ 
        fontSize: 'clamp(2rem, 8vw, 3rem)', // Responsive font boyutu
        fontWeight: 400, 
        textAlign: 'center', 
        marginBottom: '2rem',
        color: '#000'
      }}>
        İletişim Bilgileri
      </h1>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem',
        backgroundColor: '#fff',
        padding: 'clamp(1.5rem, 5vw, 3rem)', // Responsive padding
        borderRadius: '12px',
        boxShadow: '0 4px 30px rgba(0,0,0,0.03)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        {/* Firma */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <Building size={24} color="#666" style={{ flexShrink: 0, marginTop: '4px' }} />
          <div style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)' }}>
            <strong style={{ color: '#000' }}>Firma:</strong> MaximoraShop
          </div>
        </div>

        {/* Web ve Çalışma Saatleri */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <Globe size={24} color="#666" style={{ flexShrink: 0, marginTop: '4px' }} />
          <div style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)' }}>
            <strong style={{ color: '#000' }}>Web:</strong> 
            <div style={{ display: 'inline-block' }}>www.maximorashop.com</div>
            <div style={{ color: '#888', fontSize: '0.9rem', marginTop: '4px' }}>(Hafta içi: 10:00 – 18:00)</div>
          </div>
        </div>

        {/* E-posta */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <Mail size={24} color="#666" style={{ flexShrink: 0, marginTop: '4px' }} />
          <div style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)' }}>
            <strong style={{ color: '#000' }}>E-posta:</strong> 
            <a href="mailto:destek@maximorashop.com" style={{ 
              color: '#000', 
              textDecoration: 'none', 
              wordBreak: 'break-all' // Mobilde uzun e-postayı kırar
            }}>
              destek@maximorashop.com
            </a>
            <div style={{ fontSize: '0.9rem', color: '#888', marginTop: '4px' }}>
              (Genelde aynı gün dönüş sağlanır)
            </div>
          </div>
        </div>

        {/* Adres */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <MapPin size={24} color="#666" style={{ flexShrink: 0, marginTop: '4px' }} />
          <div style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)' }}>
            <strong style={{ color: '#000' }}>Adres:</strong> İstanbul / Türkiye
          </div>
        </div>

        {/* Önemli Not */}
        <div style={{ 
          marginTop: '1rem', 
          padding: '1.5rem', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px',
          borderLeft: '4px solid #000'
        }}>
          <p style={{ 
            fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)', 
            fontStyle: 'italic', 
            color: '#444', 
            lineHeight: '1.6',
            margin: 0 
          }}>
            <strong>Not:</strong> Sipariş ve iade işlemleri için e-posta üzerinden sipariş numaranız ile iletişime geçmeniz rica olunur.
          </p>
        </div>

      </div>
    </div>
  );
}
