"use client";

import React from 'react';
import Link from 'next/link';
import { 
  MonitorSmartphone, 
  Settings, 
  Search, 
  MessageCircle, 
  QrCode, 
  CreditCard,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import styles from './WebTasarim.module.css';

export default function WebTasarimPage() {
  const modules = [
    {
      title: 'WhatsApp Modülü',
      description: 'Ziyaretçileriniz tek tıkla doğrudan WhatsApp üzerinden size ulaşsın ve satışa dönüşsün.',
      icon: <MessageCircle size={28} />
    },
    {
      title: 'Gelişmiş Yönetim Paneli',
      description: 'Sitenizdeki tüm içerikleri, ürünleri ve yazıları kimseye ihtiyaç duymadan kolayca yönetin.',
      icon: <Settings size={28} />
    },
    {
      title: 'Güçlü SEO Altyapısı',
      description: 'Google aramalarında rakiplerinizin önüne geçmenizi sağlayacak kusursuz kod mimarisi.',
      icon: <Search size={28} />
    },
    {
      title: 'QR Kod Entegrasyonu',
      description: 'Müşterilerinize dijital katalog ve sunumlarınızı anında ulaştırmanız için özel QR sistemleri.',
      icon: <QrCode size={28} />
    },
    {
      title: 'Responsive & Mobil Uyumlu',
      description: 'Tüm cihazlarda (Telefon, Tablet, Bilgisayar) eksiksiz çalışan mükemmel arayüzler.',
      icon: <MonitorSmartphone size={28} />
    },
    {
      title: 'Online Ödeme Sistemi',
      description: 'Sanal POS entegrasyonu ile siteniz üzerinden güvenle ve saniyeler içinde ödeme alın.',
      icon: <CreditCard size={28} />
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>WEB TASARIM</div>
          <h1 className={styles.title}>
            Markanızı Dijitalde <br/>
            <span className={styles.goldText}>Zirveye Taşıyoruz.</span>
          </h1>
          <p className={styles.description}>
            Hazır şablonların ötesine geçin. Sadece estetik değil, aynı zamanda işlevsel, kullanıcı dostu ve 
            satışlarınızı artırmaya odaklı premium web arayüzleri geliştiriyoruz.
          </p>
          <Link href="/studio/teklif-al" className={styles.primaryButton}>
            Projeyi Başlat <ArrowRight size={18} />
          </Link>
        </div>
        <div className={styles.heroImageWrapper}>
          <div className={styles.mockupContainer}>
            <div className={styles.mockupScreen}>
              <div className={styles.mockupHeader}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
              <div className={styles.mockupBody}>
                <MonitorSmartphone size={64} opacity={0.3} color="#d4af37" />
                <p>Premium Tasarım Arayüzü</p>
              </div>
            </div>
            <div className={styles.mockupBase}></div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className={styles.modulesSection}>
        <div className={styles.sectionHeader}>
          <h2>Premium Tasarım <span className={styles.goldText}>Modüllerimiz</span></h2>
          <p>İşletmenizin tüm ihtiyaçlarını karşılayacak donanımlı altyapı.</p>
        </div>
        <div className={styles.modulesGrid}>
          {modules.map((mod, index) => (
            <div key={index} className={styles.moduleCard}>
              <div className={styles.iconWrapper}>{mod.icon}</div>
              <h3>{mod.title}</h3>
              <p>{mod.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Split Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresImage}>
           <div className={styles.phoneMockup}>
              <div className={styles.phoneScreen}>
                <div className={styles.phoneNotch}></div>
                <div className={styles.phoneContent}>
                  <MonitorSmartphone size={48} opacity={0.3} color="#d4af37" />
                  <p>Kusursuz Mobil Deneyim</p>
                </div>
              </div>
           </div>
        </div>
        <div className={styles.featuresContent}>
          <h2>Başarıyı <span className={styles.goldText}>Tasarlıyoruz</span></h2>
          <p className={styles.featuresDesc}>
            Hedefimiz, markanızın dijital dünyada güçlü bir varlık göstermesini sağlamak ve sizi rakiplerinizin bir adım önüne taşımaktır. 
          </p>
          
          <ul className={styles.featureList}>
            <li>
              <CheckCircle2 className={styles.listIcon} />
              <div>
                <strong>Modern ve Çarpıcı Arayüz</strong>
                <span>Müşterilerinize ilk saniyede güven ve prestij hissi veren benzersiz görsellik.</span>
              </div>
            </li>
            <li>
              <CheckCircle2 className={styles.listIcon} />
              <div>
                <strong>Kusursuz Mobil Uyumluluk (Responsive)</strong>
                <span>Kullanıcılarınızın %80'inin mobilden geldiğini biliyoruz ve her detayı buna göre optimize ediyoruz.</span>
              </div>
            </li>
            <li>
              <CheckCircle2 className={styles.listIcon} />
              <div>
                <strong>Özgün ve Size Özel Kodlama</strong>
                <span>Kopya tasarımlar kullanmıyor, markanızın karakterini yansıtan özgün projeler üretiyoruz.</span>
              </div>
            </li>
            <li>
              <CheckCircle2 className={styles.listIcon} />
              <div>
                <strong>Işık Hızında Açılış (Performans)</strong>
                <span>Ziyaretçilerinizin sayfadan çıkmasını engelleyen, anında yüklenen ultra hızlı altyapılar.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
