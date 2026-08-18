"use client";

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Search, 
  Link as LinkIcon, 
  PenTool, 
  Gauge, 
  MapPin,
  ArrowRight,
  BarChart,
  CheckCircle2,
  FileText
} from 'lucide-react';
import styles from './SeoHizmeti.module.css';

export default function SeoHizmetiPage() {
  const features = [
    {
      title: 'Kapsamlı Teknik SEO',
      description: 'Web sitenizin Google botları tarafından kusursuz okunmasını sağlayan altyapı ve kod optimizasyonları.',
      icon: <Search size={28} />
    },
    {
      title: 'Hız ve Performans',
      description: 'Sayfa açılış hızınızı artırarak hem kullanıcı deneyimini hem de arama motoru sıralamalarınızı yükseltiyoruz.',
      icon: <Gauge size={28} />
    },
    {
      title: 'Kaliteli Backlink İnşası',
      description: 'Otoriter sitelerden alınan organik bağlantılarla markanızın dijital dünyadaki itibarını ve gücünü artırıyoruz.',
      icon: <LinkIcon size={28} />
    },
    {
      title: 'İçerik Pazarlaması (Blog)',
      description: 'Hedef kitlenizin aradığı kelimelere odaklı, SEO uyumlu ve dikkat çekici blog içerikleri üretiyoruz.',
      icon: <PenTool size={28} />
    },
    {
      title: 'Yerel SEO (Local SEO)',
      description: 'Google Haritalar (My Business) optimizasyonu ile fiziksel müşterilerin sizi çok daha kolay bulmasını sağlıyoruz.',
      icon: <MapPin size={28} />
    },
    {
      title: 'Rakip & Kelime Analizi',
      description: 'Sektörünüzdeki rakipleri inceliyor, size en çok dönüşüm getirecek niş anahtar kelimeleri tespit ediyoruz.',
      icon: <BarChart size={28} />
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>TEKNİK SEO ALTYAPISI</div>
          <h1 className={styles.title}>
            Arama Sonuçlarında <br/>
            <span className={styles.goldText}>Zirveyi Hedefleyin.</span>
          </h1>
          <p className={styles.description}>
            Harika bir web sitesine sahip olmak yeterli değildir; önemli olan müşterilerinizin sizi bulabilmesidir. 
            Google algoritma kurallarına %100 uyumlu, organik büyüme stratejilerimizle rakiplerinizi geride bırakın.
          </p>

        </div>
        <div className={styles.heroImageWrapper}>
          <div className={styles.searchMockup}>
            <div className={styles.searchHeader}>
              <div className={styles.searchBar}>
                <Search size={16} color="#888" />
                <span>seo uyumlu hızlı web sitesi</span>
              </div>
            </div>
            <div className={styles.searchResults}>
              <div className={styles.resultItem}>
                <div className={styles.resultUrl}>https://www.maximorashop.com › teknik-seo</div>
                <div className={styles.resultTitle}>SEO Uyumlu Temiz Kod & Kusursuz Altyapı | Maximora</div>
                <div className={styles.resultDesc}>
                  Google'ın sevdiği temiz kod (Clean Code) mimarisi ve ultra yüksek sayfa açılış hızlarıyla web sitenizi arama motorlarına hazır teslim ediyoruz.
                </div>
              </div>
              <div className={styles.resultItem} style={{opacity: 0.5}}>
                <div className={styles.resultUrl}>https://www.hazirtemalar.com › standart-siteler</div>
                <div className={styles.resultTitle}>Standart ve Yavaş Web Tasarımları</div>
                <div className={styles.resultDesc}>
                  Gereksiz kod bloklarıyla dolu, sayfa hızı düşük ve arama motorları tarafından zor okunan sıradan hazır web siteleri...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>Organik Büyüme <span className={styles.goldText}>Modüllerimiz</span></h2>
          <p>İhtiyacınıza özel olarak şekillenen, sonuç odaklı SEO stratejileri.</p>
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
          <h2>Kalıcı Başarı İçin <span className={styles.goldText}>Doğru Temeller</span></h2>
          <p className={styles.splitDesc}>
            SEO paketlerimiz; markanızın sektördeki rekabet gücüne, ürün yelpazesine ve hedeflerine göre özel olarak yapılandırılır.
          </p>
          <ul className={styles.checkList}>
            <li>
              <CheckCircle2 className={styles.checkIcon} />
              <div>
                <strong>Title ve Description Optimizasyonu</strong>
                <span>Arama sonuçlarında tıklama oranınızı (CTR) artıracak, Google botlarının sitenizi anlamasını sağlayacak doğru meta etiketleri.</span>
              </div>
            </li>
            <li>
              <CheckCircle2 className={styles.checkIcon} />
              <div>
                <strong>Hiyerarşik İçerik ve URL Yapısı</strong>
                <span>H1, H2, H3 başlık yapılarının doğru kullanımı ve temiz (SEO-friendly) URL mimarisi ile kusursuz site içi navigasyon.</span>
              </div>
            </li>
            <li>
              <CheckCircle2 className={styles.checkIcon} />
              <div>
                <strong>Güvenlik (SSL) Standartları</strong>
                <span>Google algoritmasının en önem verdiği kriterlerden olan güncel güvenlik sertifikaları ve veri şifreleme altyapısı.</span>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.splitImage}>
          <div className={styles.glassCard}>
            <TrendingUp size={64} opacity={0.3} color="#d4af37" />
            <h3>%300 Organik Trafik</h3>
            <p>Doğru uygulanan bir SEO çalışması, reklama harcadığınız bütçeyi düşürürken kalıcı müşteri sayınızı katlar.</p>
          </div>
        </div>
      </section>

      {/* SEO Editorial Text Section */}
      <section className={styles.seoSection}>
        <div className={styles.seoContainer}>
          <div className={styles.seoIcon}>
            <FileText size={32} color="#d4af37" />
          </div>
          <h2>Uzman SEO <span className={styles.goldText}>Danışmanlığı</span></h2>
          
          <div className={styles.seoContent}>
            <p>
              Markanızın ne kadar iyi bir web sitesi veya e-ticaret altyapısı olursa olsun, içerik, görsel ve başlıkların <strong>Google algoritmalarına</strong> (SEO kurallarına) tam uyumlu olması zorunludur. Doğru yapılandırılmamış bir site, internetin devasa okyanusunda kaybolmaya mahkumdur. Biz, arama motorlarının tam olarak ne istediğini biliyor ve sitenizi bu standartlara göre milimetrik olarak optimize ediyoruz.
            </p>
            <p>
              SEO süreçleri, kulaktan dolma bilgilerle veya geçici hilelerle yönetilemez. Uzman kadromuzla, rakiplerinizin açıklarını yakalıyor, potansiyel müşterilerinizin arama trendlerini analiz ediyoruz. Yalnızca sizi ilk sayfaya taşımakla kalmıyor; doğru görsel optimizasyonları, backlink mimarisi ve zengin içeriklerle (blog, rehber vs.) sektörünüzün <em>otoriter markası</em> olmanızı sağlıyoruz. Maksimum geri dönüş (ROI) için yatırımlarınızı en doğru dijital kanallara yönlendiriyoruz.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
