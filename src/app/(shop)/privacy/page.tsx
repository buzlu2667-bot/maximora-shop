"use client";

import React from 'react';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="container" style={{ 
      maxWidth: '900px', 
      marginTop: '3rem', 
      marginBottom: '6rem',
      padding: '0 15px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <Shield size={48} strokeWidth={1} style={{ marginBottom: '1.5rem', color: '#000' }} />
        <h1 style={{ 
          fontSize: 'clamp(2rem, 8vw, 3.2rem)', 
          fontWeight: 400, 
          color: '#000', 
          marginBottom: '1rem',
          letterSpacing: '-0.02em'
        }}>
          Gizlilik Politikası
        </h1>
        <p style={{ color: '#888', fontSize: '1rem' }}>
          Son Güncelleme: 11 Ocak 2026
        </p>
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2.5rem', 
        color: '#333', 
        lineHeight: '1.8',
        fontSize: '1.05rem',
        textAlign: 'justify'
      }}>
        
        {/* Giriş */}
        <section>
          <p>
            <strong>Maximora</strong> (“Şirket”, “biz”, “bizim”), müşterilerine güvenli ve kişiselleştirilmiş bir alışveriş deneyimi sunmak amacıyla www.maximorashop.com alan adlı internet sitesini (“Hizmetler”) işletmektedir. İşbu Gizlilik Politikası, Hizmetler’i ziyaret ettiğinizde, kullandığınızda veya bizimle iletişime geçtiğinizde kişisel verilerinizin nasıl toplandığını, işlendiğini, kullanıldığını ve paylaşıldığını açıklamaktadır.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Hizmetler’i kullanarak bu Gizlilik Politikası’nı okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.
          </p>
        </section>

        {/* Toplanan Veriler */}
        <section style={{ backgroundColor: '#f9f9f9', padding: '2.5rem', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <FileText size={24} color="#000" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Toplanan Kişisel Veriler</h2>
          </div>
          <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><strong>İletişim Bilgileri:</strong> Ad, soyad, e-posta, telefon, teslimat ve fatura adresleri.</li>
            <li><strong>Ödeme Bilgileri:</strong> Sipariş detayları, ödeme yöntemi, işlem geçmişi.</li>
            <li><strong>Hesap Bilgileri:</strong> Kullanıcı adı, tercihler, ayarlar.</li>
            <li><strong>İletişim Kayıtları:</strong> Canlı destek görüşmeleri ve müşteri hizmetleri yazışmaları.</li>
            <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, cihaz bilgileri ve kullanım verileri.</li>
          </ul>
        </section>

        {/* Kullanım Amaçları */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Eye size={24} color="#000" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Kişisel Verilerin Kullanım Amaçları</h2>
          </div>
          <p>Toplanan veriler; siparişlerin işlenmesi, müşteri desteği sağlanması, site deneyiminin iyileştirilmesi, güvenliğin sağlanması ve yasal yükümlülüklerin yerine getirilmesi amacıyla kullanılır.</p>
        </section>

        {/* Canlı Destek */}
        <section style={{ borderLeft: '4px solid #000', paddingLeft: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.2rem' }}>Canlı Destek Hizmetleri</h2>
          <p>Anlık destek için <strong>LiveChat</strong> ve <strong>JivoChat</strong> gibi üçüncü taraf hizmetler kullanılmaktadır. Bu hizmetleri kullanarak, paylaştığınız bilgilerin destek amacıyla işlenmesini kabul etmiş olursunuz.</p>
        </section>

        {/* Güvenlik */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Lock size={24} color="#000" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Veri Güvenliği</h2>
          </div>
          <p>Verilerinizin korunması için gerekli teknik ve idari önlemler alınmaktadır. Ancak internet ortamında %100 güvenlik garanti edilemez. Verileriniz hiçbir şekilde izinsiz satılmaz veya ticari amaçla devredilmez.</p>
        </section>

        {/* Haklar ve İletişim */}
        <section style={{ borderTop: '1px solid #eee', paddingTop: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Sorularınız mı var?</h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>Gizlilik Politikası ile ilgili her türlü soru ve hak talebiniz için bizimle iletişime geçebilirsiniz.</p>
          <a 
            href="mailto:destek@maximorashop.com" 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: '#000', 
              color: '#fff', 
              padding: '1rem 2.5rem', 
              borderRadius: '50px', 
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            <Mail size={20} />
            destek@maximorashop.com
          </a>
        </section>

      </div>
    </div>
  );
}
