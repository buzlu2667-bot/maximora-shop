"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import { 
  CarFront, 
  Fuel, 
  Wrench, 
  Bell, 
  Activity, 
  Cloud,
  FileText,
  ShieldCheck,
  BarChart3,
  CalendarDays,
  Camera,
  Coins
} from 'lucide-react';
import Image from 'next/image';

const featuresData = [
  { Icon: CarFront, title: "Çoklu Araç Yönetimi", desc: "Tüm araçlarınızı tek bir garajda toplayın. Hem kişisel araçlarınız hem de ticari filonuz için ideal çözüm." },
  { Icon: Fuel, title: "Yakıt & Maliyet Takibi", desc: "Her yakıt alımınızı litre ve maliyet bazında kaydedin, kilometre başına düşen maliyeti otomatik hesaplayın." },
  { Icon: Wrench, title: "Periyodik Bakım", desc: "Yağ değişimi, filtreler, fren balataları gibi tüm bakım geçmişinizi detaylıca kayıt altına alın." },
  { Icon: Bell, title: "Akıllı Hatırlatıcılar", desc: "Kasko, Trafik Sigortası ve MTV gibi önemli ödeme tarihlerini unutmayın. Zamanı gelince bildirim alın." },
  { Icon: Activity, title: "Kara Kutu Modülü", desc: "Kazalar, lastik değişimleri ve öngörülemeyen masrafları fotoğraflı kanıtlarla arşivleyin." },
  { Icon: Cloud, title: "Bulut Senkronizasyonu", desc: "Verileriniz Supabase altyapısıyla güvenle bulutta saklanır, cihaz değiştirseniz bile asla kaybolmaz." },
  { Icon: BarChart3, title: "Gelişmiş Raporlama", desc: "Aracınızın aylık ve yıllık tüm masraf dağılımını detaylı grafiklerle analiz edin." },
  { Icon: Camera, title: "Fiş & Fatura Kaydı", desc: "Yapılan harcamaların fişlerini kamerayla çekip sisteme yükleyerek kalıcı arşiv oluşturun." }
];

export default function OtoTakipProPage() {
  const [activeModal, setActiveModal] = useState<any>(null);

  return (
    <div className={styles.landing}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(245, 158, 11, 0.1)', 
            padding: '0.5rem 1rem', 
            borderRadius: '100px',
            color: '#F59E0B',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}>
            <span style={{ width: '6px', height: '6px', background: '#F59E0B', borderRadius: '50%' }}></span>
            DİJİTAL GARAJINIZ
          </div>
          
          <h1 className={styles.title}>OtoTakip Pro</h1>
          <p className={styles.subtitle}>
            Aracınızın tüm masraflarını, bakımlarını ve yakıt tüketimini tek bir ekranda yönetin. 
            Güçlü analizler ve akıllı hatırlatıcılarla sürpriz masraflara son verin.
          </p>

          <div className={styles.downloadButtons}>
            <a 
              href="https://play.google.com/store/apps/details?id=com.maximora.autotrackpro" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.playButtonImageWrap}
            >
              <img 
                src="/googlebuton.png" 
                alt="Google Play'den Alın" 
                className={styles.playButtonImage}
              />
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Neden OtoTakip Pro?</h2>
          <p className={styles.sectionDesc}>
            Araç yönetimi hiç bu kadar profesyonel olmamıştı. Sürücüler ve filo yöneticileri için geliştirildi.
          </p>
        </div>

        <div className={styles.featureGrid}>
          {featuresData.map((feature, idx) => (
            <div 
              key={idx} 
              className={styles.featureCard}
              onClick={() => setActiveModal(feature)}
            >
              <div className={styles.iconWrapper}>
                <feature.Icon size={32} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Modal Overlay */}
        {activeModal && (
          <div className={styles.modalOverlay} onClick={() => setActiveModal(null)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <button className={styles.modalClose} onClick={() => setActiveModal(null)}>✕</button>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: '#F59E0B' }}>
                <activeModal.Icon size={48} />
              </div>
              <h3 className={styles.modalTitle}>{activeModal.title}</h3>
              <p className={styles.modalDesc}>{activeModal.desc}</p>
            </div>
          </div>
        )}
      </section>

      {/* Showcase Section */}
      <section className={styles.showcase}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff', textShadow: '0 0 20px rgba(245, 158, 11, 0.4)' }}>Uygulama İçi Görünümler</h2>
        </div>
        <div className={styles.showcaseContainer}>
          <div className={styles.carousel}>
            {/* Using placeholders 1-8. You can upload real screenshots to public/ototakip-pro/ later */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
              <div key={index} className={styles.screenshotWrapper}>
                <img 
                  src={`/ototakip-pro/${i}.png`} 
                  alt={`OtoTakip Pro Ekran ${i}`}
                  className={styles.screenshotImg}
                  onError={(e) => {
                    // Fallback to para-kontrol images for demonstration if ototakip-pro folder is empty
                    (e.target as HTMLImageElement).src = `/para-kontrol/${i}.png`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerText}>
          &copy; 2026 Maximora Studio. Bütün hakları saklıdır.<br/>
          <a href="/ototakip-pro-gizlilik" style={{ color: '#F59E0B', textDecoration: 'none', fontSize: '0.85rem', marginTop: '0.5rem', display: 'inline-block' }}>Gizlilik Politikası</a>
          <span style={{ margin: '0 0.5rem', opacity: 0.3 }}>|</span>
          <span style={{ fontSize: '0.85rem' }}>OtoTakip Pro - Dijital Garajınız</span>
        </div>
      </footer>
    </div>
  );
}
