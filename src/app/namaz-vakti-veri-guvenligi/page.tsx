"use client";

import React from 'react';
import styles from '../namaz-vakti/page.module.css';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function VeriGuvenligiPage() {
  return (
    <div className={styles.landing}>
      {/* Header */}
      <section className={styles.hero} style={{ minHeight: '40vh', padding: '4rem 1rem' }}>
        <div className={styles.ornament}>
          <Image 
            src="/logo-gold.png" 
            alt="Maximora Logo" 
            width={80} 
            height={80} 
            className={styles.goldLogo}
          />
        </div>
        <h1 className={styles.title} style={{ fontSize: '2.5rem' }}>Veri Güvenliği ve Yedekleme</h1>
        <p className={styles.seriesTag}>Namaz Vakitleri Uygulaması</p>
      </section>

      {/* Privacy and Security Content */}
      <section style={{ padding: '2rem 1rem', backgroundColor: 'var(--background)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          
          <Link href="/namaz-vakti" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#D4AF37', textDecoration: 'none', marginBottom: '2rem', fontWeight: 'bold' }}>
            <ArrowLeft size={20} /> Ana Sayfaya Dön
          </Link>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <ShieldCheck size={48} color="#D4AF37" style={{ margin: '0 auto 1rem auto' }} />
            <h2 style={{ color: '#D4AF37', fontSize: '1.8rem', marginBottom: '1rem', lineHeight: '1.3' }}>Neden Üyelik İstemiyoruz? Verileriniz Nasıl Korunuyor?</h2>
          </div>
          
          <div style={{ textAlign: 'left', backgroundColor: 'rgba(21, 57, 43, 0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.2rem', color: '#fff', opacity: 0.95 }}>
              <strong style={{ color: '#D4AF37' }}>Bizim için en büyük öncelik mahremiyetinizdir.</strong> Kaza namazlarınız, çektiğiniz zikirler, tuttuğunuz oruçlar veya hatimleriniz gibi ibadet geçmişinize ait hiçbir kayıt bizim sunucularımıza gönderilmez ve kimseyle paylaşılmaz. 
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', color: '#fff', opacity: 0.95 }}>
              Sizi kayıt olmaya, e-posta vermeye veya şifre ezberlemeye asla zorlamayız! Tüm verileriniz tamamen <strong>sizin telefonunuzun hafızasında</strong>, %100 çevrimdışı (internetsiz) ve güvenli bir şekilde saklanır.
            </p>
            
            <h3 style={{ color: '#D4AF37', fontSize: '1.4rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.8rem' }}>📁</span> Telefon Değiştirirken Verilerim Ne Olacak?
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#fff', opacity: 0.95 }}>
              Emeklerinizin kaybolması imkansızdır! Telefonunuzu değiştirmeden veya uygulamayı silmeden hemen önce uygulamanızın <strong>Ayarlar &gt; Veri Yedekleme</strong> menüsüne girerek tüm kayıtlarınızı tek bir dosya halinde dışa aktarabilirsiniz. 
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginTop: '1rem', color: '#fff', opacity: 0.95 }}>
              Bu dosyayı <strong>Google Drive'a veya telefonunuzun İndirilenler klasörüne</strong> kaydedin. Yeni telefonunuzda uygulamayı kurduktan sonra 'Yedeği Geri Yükle' diyerek bu dosyayı seçebilir ve ibadetlerinize hiçbir şey eksilmeden, güvenle kaldığınız yerden devam edebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2026 Maximora Studio. Tüm Hakları Saklıdır.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
          <Link href="/namaz-vakti-gizlilik" style={{ color: '#D4AF37', textDecoration: 'none' }}>Gizlilik Politikası</Link>
          <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>|</span>
          <Link href="/namaz-vakti" style={{ color: '#D4AF37', textDecoration: 'none' }}>Namaz Vakti Uygulaması</Link>
        </p>
      </footer>
    </div>
  );
}
