"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  QrCode, 
  Building, 
  Car, 
  Newspaper, 
  PackageSearch, 
  Briefcase,
  Key,
  Scissors,
  CarFront,
  Home,
  Coffee,
  Truck,
  Smartphone
} from 'lucide-react';
import styles from './Urunler.module.css';

export default function UrunlerimizPage() {
  const products = [
    {
      title: 'QR Menü Yazılımı',
      desc: 'Kafe ve restoranlar için temassız, kolay güncellenebilir ve çoklu dil destekli akıllı dijital menü sistemi.',
      icon: <QrCode size={40} color="#d4af37" />,
      tag: 'En Çok Satan',
      price: 'Fiyat Alın'
    },
    {
      title: 'Otel & Rezervasyon Sistemi',
      desc: 'Oteller ve villalar için online rezervasyon alabilen, oda takibi ve ödeme entegrasyonuna sahip hazır web çözümü.',
      icon: <Building size={40} color="#d4af37" />,
      tag: 'Popüler',
      price: 'Fiyat Alın'
    },
    {
      title: 'Rent a Car (Araç Kiralama)',
      desc: 'Tarih bazlı araç arama, kasko seçenekleri ve filo yönetimi sunan profesyonel araç kiralama yazılımı.',
      icon: <Car size={40} color="#d4af37" />,
      price: 'Fiyat Alın'
    },
    {
      title: 'Haber & Medya Scripti',
      desc: 'Google News uyumlu, son dakika bandı ve gelişmiş editör onay mekanizmalarına sahip haber platformu.',
      icon: <Newspaper size={40} color="#d4af37" />,
      price: 'Fiyat Alın'
    },
    {
      title: 'B2B Bayi Sipariş Sistemi',
      desc: 'Toptan satış yapan firmalar için bayilere özel cari, stok ve sipariş takip portalı.',
      icon: <Briefcase size={40} color="#d4af37" />,
      tag: 'Kurumsal',
      price: 'Fiyat Alın'
    },
    {
      title: 'Kurye & Paket Otomasyonu',
      desc: 'Motor kurye firmaları veya paket servis işletmeleri için anlık konum ve teslimat takip yazılımı.',
      icon: <PackageSearch size={40} color="#d4af37" />,
      price: 'Fiyat Alın'
    },
    {
      title: 'Çilingir & Acil Servis Sitesi',
      desc: '7/24 hizmet veren çilingir, tesisatçı gibi acil servis işletmeleri için SEO odaklı, tek tıkla arama özellikli hazır site.',
      icon: <Key size={40} color="#d4af37" />,
      price: 'Fiyat Alın'
    },
    {
      title: 'Güzellik Salonu & Kuaför',
      desc: 'Kuaför, berber ve güzellik merkezleri için online randevu modüllü, personel ve saat seçimli modern web sitesi.',
      icon: <Scissors size={40} color="#d4af37" />,
      tag: 'Yeni',
      price: 'Fiyat Alın'
    },
    {
      title: 'Oto Galeri Yazılımı',
      desc: 'Araç alım-satım yapan galeriler için gelişmiş filtreleme, hasar kaydı ve ilan yönetimi özellikli premium sistem.',
      icon: <CarFront size={40} color="#d4af37" />,
      tag: 'Popüler',
      price: 'Fiyat Alın'
    },
    {
      title: 'Emlak & Gayrimenkul',
      desc: 'Emlak ofisleri için harita destekli, danışman atamalı ve 360° sanal tur entegrasyonlu ilan platformu.',
      icon: <Home size={40} color="#d4af37" />,
      price: 'Fiyat Alın'
    },
    {
      title: 'Cafe & Restoran Sitesi',
      desc: 'Mekanınızın ambiyansını yansıtan, online paket servis ve masa rezervasyon modülü içeren hazır web çözümü.',
      icon: <Coffee size={40} color="#d4af37" />,
      price: 'Fiyat Alın'
    },
    {
      title: 'Nakliyat & Lojistik',
      desc: 'Evden eve nakliyat ve lojistik firmaları için mesafe hesaplamalı otomatik fiyat teklif modüllü kurumsal site.',
      icon: <Truck size={40} color="#d4af37" />,
      price: 'Fiyat Alın'
    }
  ];

  const openChat = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).$zoho && (window as any).$zoho.salesiq) {
      (window as any).$zoho.salesiq.floatwindow.visible('show');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>HAZIR ÇÖZÜMLER</div>
          <h1 className={styles.title}>
            Ürünlerimiz
          </h1>
          <p className={styles.description}>
            Müşterilerinize mükemmel bir deneyim sunmak ve işletmenizi modernleştirmek için tüm yazılım ürünlerimizi inceleyebilirsiniz.
          </p>
          <button onClick={openChat} className={styles.heroContactBtn}>
            İletişime Geçin
          </button>
        </div>
      </section>

      {/* Products Grid */}
      <section className={styles.productsSection}>
        <div className={styles.grid}>
          {products.map((product, idx) => (
            <div key={idx} className={styles.productCard}>
              
              {/* Image Area - Mimicking the large photo headers */}
              <div className={styles.productImageWrapper}>
                <div className={styles.productImagePlaceholder}>
                  {product.icon}
                  <div className={styles.imageOverlay}></div>
                </div>
                {product.tag && <div className={styles.productTag}>{product.tag}</div>}
              </div>
              
              {/* Content Area */}
              <div className={styles.productInfo}>
                <h3>{product.title}</h3>
                <p>{product.desc}</p>
                <div className={styles.productAction}>
                  <button onClick={openChat} className={styles.actionBtn}>
                    Bilgi ve Fiyat Alın
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile App Separation Banner */}
      <section className={styles.mobileBannerSection}>
        <div className={styles.mobileBannerContainer}>
          <div className={styles.mobileBannerContent}>
            <div className={styles.mobileIconWrapper}>
              <Smartphone size={48} color="#d4af37" />
            </div>
            <h2>Hazır Paketlere Sığamıyor Musunuz?</h2>
            <h3>Hayalinizdeki <span className={styles.goldText}>Mobil Uygulamayı</span> Baştan Yaratıyoruz.</h3>
            <p>
              Yukarıdaki hazır çözümler işinizi çözmüyorsa veya tamamen size özel, dünyada eşi benzeri olmayan 
              bir projeniz varsa; Android platformu için ne isterseniz sıfırdan kodluyoruz. 
              Sınır yok, imkansız yok.
            </p>
            <div className={styles.mobileBannerActions}>
              <Link href="/studio/mobil-uygulama" className={styles.actionBtnSecondary}>
                Uygulama Geliştirme Detayları
              </Link>
              <button onClick={openChat} className={styles.actionBtn}>
                Projenizi Anlatın
              </button>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
