"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Package, 
  CreditCard, 
  BarChart3, 
  ShieldCheck, 
  Settings,
  ArrowRight,
  CheckCircle2,
  X,
  Box,
  Truck,
  Globe,
  Store,
  Database,
  Search,
  Megaphone,
  MessageCircle,
  Users
} from 'lucide-react';
import styles from './ETicaret.module.css';

export default function ETicaretPaketleriPage() {
  const features = [
    {
      title: 'Gelişmiş Stok Yönetimi',
      description: 'Binlerce ürünü, varyantı ve stok durumunu tek bir panelden kolayca yönetin.',
      icon: <Package size={28} />
    },
    {
      title: 'Sınırsız Ürün Kapasitesi',
      description: 'Kategori veya ürün sınırı olmadan, mağazanızı dilediğiniz kadar büyütün.',
      icon: <Box size={28} />
    },
    {
      title: 'Güvenli Ödeme Altyapısı',
      description: 'Sanal POS, iyzico, Stripe gibi sistemlerle 3D Secure güvencesinde ödeme alın.',
      icon: <CreditCard size={28} />
    },
    {
      title: 'Kargo Entegrasyonları',
      description: 'Tüm kargo firmalarıyla tam entegre çalışarak operasyonel yükünüzü hafifletin.',
      icon: <Truck size={28} />
    },
    {
      title: 'Uluslararası E-İhracat',
      description: 'Çoklu dil ve para birimi desteği ile ürünlerinizi tüm dünyaya satın.',
      icon: <Globe size={28} />
    },
    {
      title: 'Detaylı Satış Raporları',
      description: 'Müşteri davranışlarını ve satış istatistiklerinizi anlık olarak analiz edin.',
      icon: <BarChart3 size={28} />
    },
    {
      title: 'Pazaryeri Entegrasyonları',
      description: 'Trendyol, Hepsiburada ve Amazon gibi platformlarla tek merkezden entegre çalışın.',
      icon: <Store size={28} />
    },
    {
      title: 'XML & Toplu Veri Yönetimi',
      description: 'Tedarikçi entegrasyonlarıyla tek tıkla on binlerce ürünü otomatik olarak güncelleyin.',
      icon: <Database size={28} />
    },
    {
      title: 'Dinamik SEO Altyapısı',
      description: 'Arama motorlarında üst sıralarda çıkmanızı sağlayan hatasız ve güçlü kod mimarisi.',
      icon: <Search size={28} />
    },
    {
      title: 'Akıllı Pazarlama Araçları',
      description: 'Hediye çeki, indirim senaryoları ve sepette kalan ürün hatırlatıcıları ile satışı artırın.',
      icon: <Megaphone size={28} />
    },
    {
      title: 'WhatsApp & Canlı Destek',
      description: 'Müşterilerinize anında yanıt vererek satın alma süreçlerini doğrudan hızlandırın.',
      icon: <MessageCircle size={28} />
    },
    {
      title: 'B2B Bayi Altyapısı',
      description: 'Sadece bayilere özel giriş, fiyatlandırma ve cari tahsilat imkanı ile toptan satış yapın.',
      icon: <Users size={28} />
    }
  ];

  const packages = [
    {
      name: 'Başlangıç',
      desc: 'Yeni başlayan e-ticaret girişimleri için ideal altyapı.',
      features: [
        { text: 'Özel Premium Tasarım', included: true },
        { text: 'Google Mobil Uyumluluk', included: true },
        { text: 'Ücretsiz Hosting & SSL (1 Yıl)', included: true },
        { text: 'Kurumsal Mail (5 Adet)', included: true },
        { text: 'Gelişmiş Yönetim Paneli', included: true },
        { text: '500 Ürün Kapasitesi', included: true },
        { text: 'Sınırsız Kategori & Sayfa', included: true },
        { text: 'İletişim & Harita Modülü', included: true },
        { text: 'WhatsApp Canlı Destek', included: true },
        { text: 'Sanal POS (iyzico vb.)', included: true },
        { text: 'Standart SEO Altyapısı', included: true },
        { text: 'Dinamik Site Haritası', included: true },
        { text: 'Kargo Entegrasyonu', included: false },
        { text: 'Pazaryeri Entegrasyonu', included: false },
        { text: 'Çoklu Dil ve Kur (E-İhracat)', included: false },
        { text: 'Ek Modül Geliştirme Talebi', included: false },
      ]
    },
    {
      name: 'Profesyonel',
      desc: 'İşini büyütmek isteyen orta ölçekli işletmeler için.',
      highlight: true,
      features: [
        { text: 'Özel Premium Tasarım', included: true },
        { text: 'Google Mobil Uyumluluk', included: true },
        { text: 'Ücretsiz Hosting & SSL (1 Yıl)', included: true },
        { text: 'Kurumsal Mail (10 Adet)', included: true },
        { text: 'Gelişmiş Yönetim Paneli', included: true },
        { text: 'Sınırsız Ürün Kapasitesi', included: true },
        { text: 'Sınırsız Kategori & Sayfa', included: true },
        { text: 'İletişim & Harita Modülü', included: true },
        { text: 'WhatsApp Canlı Destek', included: true },
        { text: 'Sanal POS (iyzico vb.)', included: true },
        { text: 'Gelişmiş SEO Optimizasyonu', included: true },
        { text: 'Dinamik Site Haritası', included: true },
        { text: 'Kargo Entegrasyonu', included: true },
        { text: 'Pazaryeri (Trendyol, Hepsiburada)', included: true },
        { text: 'Toplu Ürün (XML/Excel) Yükleme', included: true },
        { text: 'İndirim & Kupon Modülü', included: true },
        { text: 'Terk Edilen Sepet Kurtarma', included: true },
        { text: 'Sosyal Medya (Instagram) Feed', included: true },
        { text: 'Çoklu Dil ve Kur (E-İhracat)', included: false },
        { text: 'Ek Modül Geliştirme Talebi', included: false },
      ]
    },
    {
      name: 'Premium',
      desc: 'Sınırları kaldırmak isteyen büyük çaplı markalar için.',
      features: [
        { text: 'Özel Premium Tasarım', included: true },
        { text: 'Google Mobil Uyumluluk', included: true },
        { text: 'VIP Sunucu & SSL (1 Yıl)', included: true },
        { text: 'Sınırsız Kurumsal Mail', included: true },
        { text: 'Gelişmiş Yönetim Paneli', included: true },
        { text: 'Sınırsız Ürün Kapasitesi', included: true },
        { text: 'Sınırsız Kategori & Sayfa', included: true },
        { text: 'İletişim & Harita Modülü', included: true },
        { text: 'WhatsApp Canlı Destek', included: true },
        { text: 'Sanal POS (Tüm Bankalar)', included: true },
        { text: 'Gelişmiş SEO Optimizasyonu', included: true },
        { text: 'Dinamik Site Haritası', included: true },
        { text: 'Kargo Entegrasyonu', included: true },
        { text: 'Tüm Pazaryeri Entegrasyonları', included: true },
        { text: 'Toplu Ürün (XML/Excel) Yükleme', included: true },
        { text: 'İndirim & Kupon Modülü', included: true },
        { text: 'Terk Edilen Sepet Kurtarma', included: true },
        { text: 'Sosyal Medya (Instagram) Feed', included: true },
        { text: 'Çoklu Dil ve Kur (E-İhracat)', included: true },
        { text: 'B2B Bayi Altyapısı', included: true },
        { text: 'ERP & Muhasebe Entegrasyonu', included: true },
        { text: 'Ek Modül Geliştirme Talebi', included: true },
        { text: 'Otomatik Veritabanı Yedekleme', included: true },
      ]
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
          <div className={styles.badge}>E-TİCARET</div>
          <h1 className={styles.title}>
            Satışlarınızı Katlayacak <br/>
            <span className={styles.goldText}>Güçlü Altyapı.</span>
          </h1>
          <p className={styles.description}>
            Kısıtlayıcı hazır paketlere mahkum olmayın. Sizin kurallarınıza göre çalışan, tam özelleştirilebilir, 
            yüksek dönüşüm odaklı premium e-ticaret sistemleriyle gerçek bir mağaza deneyimi sunuyoruz.
          </p>
        </div>
        <div className={styles.heroImageWrapper}>
          <div className={styles.dashboardMockup}>
            <div className={styles.mockupHeader}>
              <div className={styles.mockupDots}>
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className={styles.mockupBody}>
               <div className={styles.mockupSidebar}></div>
               <div className={styles.mockupContent}>
                 <div className={styles.mockupStatCards}>
                   <div className={styles.statCard}></div>
                   <div className={styles.statCard}></div>
                   <div className={styles.statCard}></div>
                 </div>
                 <div className={styles.mockupChart}>
                   <BarChart3 size={48} opacity={0.2} color="#d4af37" />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>Sınırları Kaldıran <span className={styles.goldText}>Özellikler</span></h2>
          <p>E-ticaret sitenizi bir adım öteye taşıyacak donanımlı modüller.</p>
        </div>
        <div className={styles.grid}>
          {features.map((item, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Split Info Section */}
      <section className={styles.splitSection}>
        <div className={styles.splitContent}>
          <h2>Mağazanız <span className={styles.goldText}>Gösterişli</span> Olmalı.</h2>
          <p className={styles.splitDesc}>
            Standart e-ticaret paketleri markanızı sınırlar. Biz, fiziksel mağazanızın ihtişamını dijitale taşıyoruz.
          </p>
          <ul className={styles.checkList}>
            <li>
              <ShieldCheck className={styles.checkIcon} />
              <div>
                <strong>Güçlü ve Güvenli Altyapı</strong>
                <span>Tüm verileriniz üst düzey sunucularda barınır, müşterileriniz güvenle alışveriş yapar.</span>
              </div>
            </li>
            <li>
              <ShoppingCart className={styles.checkIcon} />
              <div>
                <strong>Kusursuz Kullanıcı Deneyimi (UX)</strong>
                <span>Müşteriyi yormayan, sepete eklemeyi ve ödemeyi kolaylaştıran modern akış tasarımları.</span>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.splitImage}>
          <div className={styles.glassCard}>
            <ShoppingCart size={64} opacity={0.3} color="#d4af37" />
            <h3>%100 Dönüşüm Odaklı</h3>
            <p>Tasarımın her detayı satışı artırmak için kurgulanır.</p>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className={styles.pricingSection}>
        <div className={styles.sectionHeader}>
          <h2>E-Ticaret <span className={styles.goldText}>Paketlerimiz</span></h2>
          <p>İşletmenizin ölçeğine en uygun premium altyapıyı seçin.</p>
        </div>
        
        <div className={styles.pricingGrid}>
          {packages.map((pkg, idx) => (
            <div key={idx} className={`${styles.pricingCard} ${pkg.highlight ? styles.highlighted : ''}`}>
              {pkg.highlight && <div className={styles.popularBadge}>En Çok Tercih Edilen</div>}
              <h3>{pkg.name}</h3>
              <p className={styles.pkgDesc}>{pkg.desc}</p>
              
              <div className={styles.priceAction}>
                <span className={styles.priceText}>Projenize Özel Fiyat</span>
                <button 
                  onClick={openChat}
                  className={pkg.highlight ? styles.goldButton : styles.outlineButton}
                >
                  Detaylı Bilgi Alın
                </button>
              </div>

              <div className={styles.divider}></div>

              <ul className={styles.pkgFeatures}>
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} style={{ opacity: feature.included ? 1 : 0.5 }}>
                    {feature.included ? (
                      <CheckCircle2 size={18} className={styles.checkIconSmall} />
                    ) : (
                      <X size={18} color="#666" style={{ flexShrink: 0 }} />
                    )}
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
