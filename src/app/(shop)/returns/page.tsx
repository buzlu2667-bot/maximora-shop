"use client";

import React from 'react';
import { RefreshCcw, CheckCircle2, XCircle, CreditCard, Mail, ShieldCheck } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="container" style={{ 
      maxWidth: '850px', 
      marginTop: '3rem', 
      marginBottom: '6rem',
      padding: '0 15px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <RefreshCcw size={48} strokeWidth={1} style={{ marginBottom: '1.5rem', color: '#000' }} />
        <h1 style={{ 
          fontSize: 'clamp(1.8rem, 7vw, 2.8rem)', 
          fontWeight: 400, 
          color: '#000', 
          marginBottom: '1rem' 
        }}>
          İade ve Para İadesi Politikası
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Müşteri memnuniyeti bizim için her şeyden önemli.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: '#333', lineHeight: '1.7' }}>
        
        {/* Temel Bilgi */}
        <section style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>
            MaxımoraShop üzerinden satın alınan ürünler, teslim tarihinden itibaren <strong>14 (on dört) gün</strong> içerisinde iade edilebilir.
          </p>
        </section>

        {/* İade Koşulları */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <CheckCircle2 size={24} color="#22c55e" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>İade Koşulları</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {[
              "Giyilmemiş ve kullanılmamış olması",
              "Zarar görmemiş olması",
              "Etiketlerinin çıkarılmamış olması",
              "Orijinal ambalajında bulunması",
              "Tekrar satılabilir durumda olması"
            ].map((item, i) => (
              <div key={i} style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px', fontSize: '0.95rem' }}>
                • {item}
              </div>
            ))}
          </div>
        </section>

        {/* İade Talebi */}
        <section style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
            <Mail size={24} color="#000" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>İade Talebi Oluşturma</h2>
          </div>
          <p>İade işlemi başlatmak için <strong>destek@maximorashop.com</strong> adresine e-posta göndermeniz gerekmektedir.</p>
          <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>* Onay alınmadan gönderilen ürünler kabul edilmemektedir.</p>
        </section>

        {/* İade Edilemeyenler */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <XCircle size={24} color="#e11d48" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>İade Edilemeyen Ürünler</h2>
          </div>
          <ul style={{ paddingLeft: '1.5rem', color: '#555' }}>
            <li>Kişisel kullanım ve hijyen ürünleri</li>
            <li>Özel sipariş ve kişiselleştirilmiş ürünler</li>
            <li>Kampanyalı ve indirimli ürünler</li>
            <li>Hediye kartları ve tekrar satışı mümkün olmayan ürünler</li>
          </ul>
        </section>

        {/* Para İadeleri */}
        <section style={{ backgroundColor: '#000', color: '#fff', padding: '2.5rem', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <CreditCard size={24} color="#fff" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>Para İadeleri</h2>
          </div>
          <p>İadesi onaylanan ürünlerin bedeli, en geç <strong>10 iş günü</strong> içerisinde, ödeme yapılan yöntemle iade edilir.</p>
          <p style={{ marginTop: '1rem', opacity: 0.8, fontSize: '0.9rem' }}>
            Banka kaynaklı gecikmeler firmamızın sorumluluğunda değildir. 15 iş günü içerisinde iade gerçekleşmezse lütfen bizimle iletişime geçin.
          </p>
        </section>

        {/* Politika Değişikliği */}
        <section style={{ textAlign: 'center', marginTop: '2rem' }}>
          <ShieldCheck size={32} color="#888" style={{ marginBottom: '1rem' }} />
          <p style={{ color: '#888', fontSize: '0.85rem' }}>
            MaxımoraShop, gerekli gördüğü durumlarda iade ve para iadesi politikasında değişiklik yapma hakkını saklı tutar.
          </p>
        </section>

      </div>
    </div>
  );
}
