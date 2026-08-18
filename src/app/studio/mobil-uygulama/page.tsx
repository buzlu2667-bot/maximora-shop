"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Smartphone,
  BellRing,
  Headset,
  QrCode,
  ScanBarcode,
  Code2,
  LayoutDashboard,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';
import styles from './MobilUygulama.module.css';

export default function MobilUygulamaPage() {
  const openChat = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).$zoho && (window as any).$zoho.salesiq) {
      (window as any).$zoho.salesiq.floatwindow.visible('show');
    }
  };

  const features = [
    {
      title: 'Anlık Bildirim (Push Notification)',
      description: 'Kullanıcılarınıza anında ulaşın. Kampanyalarınızı ve güncellemelerinizi doğrudan telefon ekranlarına gönderin.',
      icon: <BellRing size={28} />
    },
    {
      title: '7/24 Destek Modülü',
      description: 'Uygulama içi canlı destek, video veya fotoğraf gönderimi ile müşteri memnuniyetini en üst düzeye çıkarın.',
      icon: <Headset size={28} />
    },
    {
      title: 'QR & Barkod Okuyucu',
      description: 'Cihazın kamerasını entegre ederek stok sayımı, bilet kontrolü veya hızlı ürün araması yaptırın.',
      icon: <ScanBarcode size={28} />
    },
    {
      title: 'Native & Cross-Platform Kodlama',
      description: 'Android ekosistemi için %100 uyumlu, kusursuz ve yüksek performanslı uygulamalar.',
      icon: <Code2 size={28} />
    },
    {
      title: 'Gelişmiş Yönetim Paneli',
      description: 'Uygulamanızdaki tüm içerikleri, kullanıcıları ve istatistikleri tek bir web panelinden saniyeler içinde yönetin.',
      icon: <LayoutDashboard size={28} />
    },
    {
      title: 'Güvenli Ödeme Sistemleri',
      description: 'Apple Pay, Google Pay ve sanal POS entegrasyonlarıyla uygulama içinden güvenle ödeme alın.',
      icon: <ShieldCheck size={28} />
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>MOBİL UYGULAMA</div>
          <h1 className={styles.title}>
            Fikirlerinizi Cebinize <br/>
            <span className={styles.goldText}>Sığdırıyoruz.</span>
          </h1>
          <p className={styles.description}>
            Müşterilerinizin %80'i mobilde yaşıyor. Markanızı her an erişilebilir kılan, yüksek performanslı, 
            kullanıcı dostu Android mobil uygulamalarıyla dijital dönüşümünüzü tamamlayın.
          </p>
          <button onClick={openChat} className={styles.primaryButton}>
            Uygulamanızı Tasarlayalım <ArrowRight size={18} />
          </button>
        </div>
        <div className={styles.heroImageWrapper}>
          <div className={styles.heroPhone}>
            <div className={styles.phoneNotch}></div>
            <div className={styles.phoneScreen}>
              <div className={styles.appHeader}>
                <Smartphone size={24} color="#d4af37" />
                <span>Premium Arayüz</span>
              </div>
              <div className={styles.appBody}>
                <div className={styles.appCard}></div>
                <div className={styles.appGrid}>
                  <div className={styles.appGridItem}></div>
                  <div className={styles.appGridItem}></div>
                  <div className={styles.appGridItem}></div>
                  <div className={styles.appGridItem}></div>
                </div>
              </div>
              <div className={styles.appTabBar}>
                <div className={styles.tabIcon}></div>
                <div className={`${styles.tabIcon} ${styles.tabActive}`}></div>
                <div className={styles.tabIcon}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>Uygulamanıza Değer Katan <span className={styles.goldText}>Özellikler</span></h2>
          <p>Modern bir mobil uygulamanın sahip olması gereken tüm teknolojik altyapı.</p>
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
          <h2>Neden Bir <span className={styles.goldText}>Mobil Uygulamaya</span> İhtiyacınız Var?</h2>
          <p className={styles.splitDesc}>
            Web siteleri markanızın vitrini ise, mobil uygulamalar markanızın müşterinizin cebindeki şubesidir. 
            Sadakati artırmak ve doğrudan iletişim kurmak için vazgeçilmezdir.
          </p>
          <ul className={styles.checkList}>
            <li>
              <CheckCircle2 className={styles.checkIcon} />
              <div>
                <strong>Kolay ve Anlık Etkileşim</strong>
                <span>Bildirimlerle müşterilerinize anında ulaşabilir, onları sürekli aktif tutabilirsiniz.</span>
              </div>
            </li>
            <li>
              <CheckCircle2 className={styles.checkIcon} />
              <div>
                <strong>Lokasyon Bazlı Özellikler (GPS)</strong>
                <span>Kullanıcının konumuna göre özel teklifler sunabilir veya fiziksel mağazanıza yönlendirebilirsiniz.</span>
              </div>
            </li>
            <li>
              <CheckCircle2 className={styles.checkIcon} />
              <div>
                <strong>Marka Prestiji ve Sadakat</strong>
                <span>Telefonun ana ekranında logonuzun bulunması, markanıza olan güveni ve prestiji zirveye taşır.</span>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.splitImage}>
          <div className={styles.glassCard}>
            <Zap size={64} opacity={0.3} color="#d4af37" />
            <h3>%100 Native Performans</h3>
            <p>Akıcı animasyonlar ve takılmayan arayüzlerle kusursuz bir kullanıcı deneyimi.</p>
          </div>
        </div>
      </section>

      {/* SEO Text Section (Styled beautifully) */}
      <section className={styles.seoSection}>
        <div className={styles.seoContainer}>
          <div className={styles.seoIcon}>
            <Layers size={32} color="#d4af37" />
          </div>
          <h2>Mobil Uygulama Geliştirme <span className={styles.goldText}>Ajansı</span></h2>
          
          <div className={styles.seoContent}>
            <p>
              Teknolojinin hayatımızın merkezine yerleştiği bu dönemde, hedef kitleniz vaktinin çoğunu akıllı telefonlarında geçiriyor. <strong>Maximora Studio</strong> olarak, markanızı sadece web dünyasında değil, müşterilerinizin avuçlarının içinde de zirveye taşıyoruz. Rakip analizi yaparak, klişe şablonların dışına çıkıyor ve tamamen size özgü UX/UI tasarımlarıyla <em>akılda kalıcı mobil deneyimler</em> üretiyoruz.
            </p>
            <p>
              Geliştirdiğimiz Android uygulamalar; sadece güzel görünmekle kalmaz, aynı zamanda yüksek dönüşüm ve satış getirecek şekilde kurgulanır. İster bir e-ticaret markası olun, ister randevu sistemi kullanan bir klinik; ihtiyaçlarınıza özel, hızlı çalışan, güvenlik testlerinden geçmiş ve Google Play standartlarına tam uyumlu projeler teslim ediyoruz. Kodlamadan yayınlanma sürecine kadar tüm teknik detayları biz hallediyoruz, siz sadece uygulamanızın başarısının keyfini çıkarıyorsunuz.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
