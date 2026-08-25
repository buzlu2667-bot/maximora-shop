"use client";

import React from 'react';
import { Lock, ShieldCheck, CreditCard, EyeOff, CheckCircle2 } from 'lucide-react';

export default function SafeShoppingPage() {
  return (
    <div className="container" style={{ 
      maxWidth: '850px', 
      marginTop: '4rem', 
      marginBottom: '8rem',
      padding: '0 15px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ 
          display: 'inline-flex',
          backgroundColor: '#f0fdf4',
          padding: '1.5rem',
          borderRadius: '50%',
          marginBottom: '1.5rem'
        }}>
          <ShieldCheck size={56} color="#22c55e" strokeWidth={1.5} />
        </div>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 8vw, 3rem)', 
          fontWeight: 400, 
          color: '#000', 
          marginBottom: '1rem' 
        }}>
          Güvenli Alışveriş
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Maximora’da güvenliğiniz bizim önceliğimizdir.
        </p>
      </div>

      {/* Security Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* SSL Protection */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1.5rem', 
          padding: '2rem', 
          backgroundColor: '#fff', 
          borderRadius: '16px', 
          border: '1px solid #eee' 
        }}>
          <Lock size={32} color="#000" style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>SSL Sertifikası</h3>
            <p style={{ color: '#555', margin: 0, lineHeight: '1.6' }}>
              Maximora’da yaptığınız tüm alışverişler 256-bit SSL sertifikası ile uçtan uca şifrelenerek korunmaktadır.
            </p>
          </div>
        </div>

        {/* Payment Infrastructure */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1.5rem', 
          padding: '2rem', 
          backgroundColor: '#fff', 
          borderRadius: '16px', 
          border: '1px solid #eee' 
        }}>
          <CreditCard size={32} color="#000" style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Güvenli Ödeme Altyapısı</h3>
            <p style={{ color: '#555', margin: 0, lineHeight: '1.6' }}>
              Ödeme işlemleri, uluslararası güvenlik standartlarına uygun güvenli altyapılar üzerinden gerçekleştirilir.
            </p>
          </div>
        </div>

        {/* Credit Card Safety */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1.5rem', 
          padding: '2rem', 
          backgroundColor: '#fff', 
          borderRadius: '16px', 
          border: '1px solid #eee' 
        }}>
          <EyeOff size={32} color="#000" style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Veri Gizliliği</h3>
            <p style={{ color: '#555', margin: 0, lineHeight: '1.6' }}>
              Kredi kartı bilgileriniz sistemimizde asla saklanmaz. Bilgileriniz doğrudan banka ile paylaşılır.
            </p>
          </div>
        </div>

      </div>

      {/* Footer Assurance */}
      <div style={{ 
        marginTop: '4rem', 
        padding: '3rem', 
        backgroundColor: '#000', 
        color: '#fff', 
        borderRadius: '24px', 
        textAlign: 'center' 
      }}>
        <CheckCircle2 size={40} color="#22c55e" style={{ marginBottom: '1.5rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#fff' }}>
          Güvenle alışveriş yapabilirsiniz.
        </h2>
        <p style={{ opacity: 0.9, fontSize: '0.95rem', color: '#fff' }}>
          Müşteri bilgileriniz gizlilik politikamız kapsamında en sıkı şekilde korunmaktadır.
        </p>
      </div>
    </div>
  );
}
