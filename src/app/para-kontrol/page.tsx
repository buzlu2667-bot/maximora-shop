"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import { 
  Wallet, 
  PieChart, 
  TrendingUp, 
  Layers, 
  Cloud, 
  ShieldCheck, 
  Bot,
  Coins,
  Target,
  Globe,
  PiggyBank,
  Mic,
  Calendar,
  AlertTriangle,
  ArrowRightLeft,
  Bell,
  FileSpreadsheet,
  Calculator,
  Receipt,
  Fingerprint,
  FileText
} from 'lucide-react';
import Image from 'next/image';

const featuresData = [
  { Icon: Wallet, title: "Gelir & Gider Takibi", desc: "Tüm gelir ve giderlerinizi anlık olarak kaydederek bütçe dengenizi kolayca sağlayın." },
  { Icon: Bot, title: "Yapay Zeka Finans Koçu", desc: "Akıllı yapay zeka asistanınız harcamalarınızı analiz eder, size özel bütçe ve tasarruf tavsiyeleri sunar." },
  { Icon: Mic, title: "Sesli & Akıllı Ekleme", desc: "Harcamalarınızı uzun uzun yazmak yerine sesli komutlarla veya akıllı asistanla anında kaydedin." },
  { Icon: Globe, title: "Çoklu Para Birimi & Canlı Kurlar", desc: "Farklı para birimleriyle işlem yapın, tüm döviz kurlarını canlı olarak sistem üzerinden takip edin." },
  { Icon: PieChart, title: "Detaylı Analiz & Donut Grafik", desc: "Paranızın tam olarak nereye gittiğini görsel ve etkileşimli grafiklerle detaylıca inceleyin." },
  { Icon: Calendar, title: "Finansal Takvim", desc: "Gelecek ödemelerinizi, taksitlerinizi ve gelirlerinizi takvim üzerinden kolayca planlayın." },
  { Icon: AlertTriangle, title: "Aylık Limit & AI Uyarısı", desc: "Harcama limitleri belirleyin; limitinizi aşmaya yaklaştığınızda yapay zeka sizi önceden uyarsın." },
  { Icon: PiggyBank, title: "Kumbara & Hedefler", desc: "Hayalleriniz için birikim hedefleri belirleyin ve kumbaranızdaki paranızı adım adım takip edin." },
  { Icon: ArrowRightLeft, title: "Borç / Alacak Takibi", desc: "Kimden ne alacağınız, kime ne borcunuz var unutmayın. Gelişmiş cari hesap takibi." },
  { Icon: Bell, title: "Günlük Hatırlatıcılar", desc: "Ödeme günü gelen fatura ve taksitleriniz için otomatik günlük bildirimler alın." },
  { Icon: FileSpreadsheet, title: "Excel Rapor (VIP)", desc: "Tüm finansal verilerinizi tek tıkla gelişmiş Excel formatında dışa aktarın ve raporlayın." },
  { Icon: Calculator, title: "Dahili Hesap Makinesi", desc: "Uygulamadan çıkmadan karmaşık hesaplarınızı yapabileceğiniz entegre hesap makinesi." },
  { Icon: Receipt, title: "Fiş & Fatura Kaydı", desc: "Harcamalarınıza ait fiş ve faturaların fotoğraflarını çekerek kalıcı olarak arşivleyin." },
  { Icon: Cloud, title: "Bulut Yedekleme & Senkron", desc: "Verileriniz güvenle bulutta saklanır ve tüm cihazlarınızda anlık olarak eşitlenir." },
  { Icon: Fingerprint, title: "Biyometrik Güvenlik", desc: "FaceID veya parmak izi kilidi ile tüm finansal bilgilerinizi meraklı gözlerden koruyun." },
  { Icon: FileText, title: "PDF Paylaşımı", desc: "Aylık özetlerinizi veya detaylı harcama raporlarınızı şık PDF belgeleri olarak paylaşın." }
];

export default function ParaKontrolPage() {
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
            background: 'rgba(0, 122, 255, 0.1)', 
            padding: '0.5rem 1rem', 
            borderRadius: '100px',
            color: '#00E5FF',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(0, 229, 255, 0.2)'
          }}>
            <span style={{ width: '6px', height: '6px', background: '#00E5FF', borderRadius: '50%' }}></span>
            YENİ NESİL FİNANS YÖNETİMİ
          </div>
          
          <h1 className={styles.title}>Para Kontrol</h1>
          <p className={styles.subtitle}>
            Harcamalarınızı yönetin, bütçenizi planlayın ve finansal özgürlüğünüze giden yolu 
            akıllı analizlerle aydınlatın. Siyahın asaleti, teknolojinin mavisiyle buluştu.
          </p>

          <div className={styles.downloadButtons}>
            <a 
              href="https://play.google.com/store/apps/details?id=com.bagarakk.parakontrol" 
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
          <h2 className={styles.sectionTitle}>Neden Para Kontrol?</h2>
          <p className={styles.sectionDesc}>
            Finansal hayatınızı sadeleştirmek ve kontrolü ele almak için ihtiyacınız olan tüm araçlar.
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
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: '#00E5FF' }}>
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
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff', textShadow: '0 0 20px rgba(0, 122, 255, 0.4)' }}>Uygulama Deneyimi</h2>
        </div>
        <div className={styles.showcaseContainer}>
          <div className={styles.carousel}>
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, index) => (
              <div key={index} className={styles.screenshotWrapper}>
                <img 
                  src={`/para-kontrol/screen${i}.png`} 
                  alt={`Para Kontrol Ekran ${i}`}
                  className={styles.screenshotImg}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
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
          <a href="/para-kontrol-gizlilik" style={{ color: '#00E5FF', textDecoration: 'none', fontSize: '0.85rem', marginTop: '0.5rem', display: 'inline-block' }}>Gizlilik Politikası</a>
          <span style={{ margin: '0 0.5rem', opacity: 0.3 }}>|</span>
          <span style={{ fontSize: '0.85rem' }}>Para Kontrol - Akıllı Finans Asistanı</span>
        </div>
      </footer>
    </div>
  );
}
