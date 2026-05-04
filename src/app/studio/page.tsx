import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Code, 
  Database, 
  ShoppingBag, 
  Rocket, 
  ShieldCheck, 
  Zap, 
  Headphones,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'Maximora Studio | Dijital Çözümler & Yazılım',
  description: 'Modern tasarım, güçlü yazılım ve kusursuz deneyimle markanızı bir adım öne çıkarıyoruz. Web tasarım, mobil uygulama ve otomasyon çözümleri.',
};

export default function StudioPage() {
  const services = [
    {
      title: 'Web Tasarım & Geliştirme',
      description: 'Modern, hızlı ve etkileyici web siteleri tasarlıyor ve en güncel teknolojilerle geliştiriyoruz.',
      icon: <Globe size={32} />,
      tags: ['React', 'Next.js', 'UI/UX', 'SEO']
    },
    {
      title: 'Mobil Uygulama',
      description: 'Markanıza özel, güçlü ve kullanıcı dostu iOS & Android mobil uygulamalar geliştiriyoruz.',
      icon: <Smartphone size={32} />,
      tags: ['React Native', 'Expo', 'Mobile UX']
    },
    {
      title: 'Otomasyon & Botlar',
      description: 'Telegram, Discord ve web tabanlı özel botlarla iş süreçlerinizi otomatikleştiriyoruz.',
      icon: <Bot size={32} />,
      tags: ['Telegram API', 'Python', 'Automations']
    },
    {
      title: 'E-Ticaret Sistemleri',
      description: 'Güvenli, hızlı ve kolay yönetilebilir modern e-ticaret altyapıları sunuyoruz.',
      icon: <ShoppingBag size={32} />,
      tags: ['Shopify', 'Custom E-commerce', 'Payment']
    },
    {
      title: 'Özel Yazılım Çözümleri',
      description: 'İhtiyacınıza özel, ölçeklenebilir ve sürdürülebilir yazılım mimarileri kuruyoruz.',
      icon: <Code size={32} />,
      tags: ['Full Stack', 'API Design', 'Cloud']
    },
    {
      title: 'Veritabanı & Altyapı',
      description: 'Verilerinizi güvenle saklayan, yüksek performanslı ve kesintisiz sunucu çözümleri.',
      icon: <Database size={32} />,
      tags: ['PostgreSQL', 'Redis', 'AWS/Vercel']
    }
  ];

  const features = [
    { icon: <Rocket size={20} />, title: 'Hızlı Teslimat', desc: 'Zamanında, eksiksiz teslim.' },
    { icon: <ShieldCheck size={20} />, title: 'Güvenli Altyapı', desc: 'Verileriniz bizimle güvende.' },
    { icon: <Zap size={20} />, title: 'Temiz Kod', desc: 'Sürdürülebilir yazılım.' },
    { icon: <Headphones size={20} />, title: '7/24 Destek', desc: 'Her an yanınızdayız.' }
  ];

  return (
    <div className={styles.studioWrapper}>
      <div className={styles.glowTop}></div>
      <div className={styles.glowBottom}></div>

      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            MAXIMORA STUDIO
          </div>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              Yaratıcı Fikirler • Güçlü Çözümler
            </div>
            <h1 className={styles.title}>
              Fikrinizi <span className={styles.titleHighlight}>Dijitale Taşıyoruz</span>
            </h1>
            <p className={styles.description}>
              Modern tasarım, güçlü yazılım ve kusursuz deneyimle markanızı bir adım öne çıkarıyoruz. Fikirleri gerçeğe dönüştürmek için buradayız.
            </p>
            <div className={styles.ctaGroup}>
              <Link href="#contact" className={styles.ctaButton}>
                Projeyi Başlat
              </Link>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <Image 
              src="/images/studio/hero.png" 
              alt="Maximora Studio Hero" 
              width={800} 
              height={600} 
              className={styles.heroImage}
              priority
            />
          </div>
        </header>

        <div className={styles.featuresBar}>
          <div className={styles.featuresGrid}>
            {features.map((f, i) => (
              <div key={i} className={styles.featureItem}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div className={styles.featureContent}>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className={styles.services}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Neler Yapıyoruz?</h2>
            <p className={styles.description}>İhtiyacınıza özel çözümlerle işinizi bir adım öne taşıyoruz.</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className={styles.serviceTags}>
                  {service.tags.map((tag, j) => (
                    <span key={j} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Fikriniz ne olursa olsun,<br />onun için en iyi çözümü üretiyoruz.</h2>
          <Link href="https://wa.me/905384657526?text=Merhaba" target="_blank" className={styles.ctaButton}>
            İletişime Geç
          </Link>
        </section>

        <p className={styles.footerQuote}>
          "Fikirlerinizi Geleceğe Taşıyoruz."
        </p>
      </div>
    </div>
  );
}
