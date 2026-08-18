"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Code, 
  Database, 
  ShoppingBag, 
  ArrowRight,
  Cpu,
  Palette,
  Code2, 
  Headphones, 
  Zap,
  Search,
  Layout,
  Rocket,
  ChevronDown
} from 'lucide-react';
import styles from './page.module.css';



export default function StudioPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openChat = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).$zoho && (window as any).$zoho.salesiq) {
      (window as any).$zoho.salesiq.floatwindow.visible('show');
    }
  };

  const services = [
    {
      title: 'Web Tasarım',
      description: 'Markanıza değer katan, estetik ve dönüşüm odaklı premium web arayüzleri.',
      icon: <Globe size={28} strokeWidth={1.5} />,
      tags: ['UI/UX', 'Next.js', 'SEO']
    },
    {
      title: 'Mobil Deneyim',
      description: 'Kullanıcı alışkanlıklarına yön veren, akıcı Android uygulamaları.',
      icon: <Smartphone size={28} strokeWidth={1.5} />,
      tags: ['React Native', 'Mobile UX']
    },
    {
      title: 'E-Ticaret',
      description: 'Satışlarınızı katlayan, güvenli ve hızlı modern e-ticaret altyapıları.',
      icon: <ShoppingBag size={28} strokeWidth={1.5} />,
      tags: ['Custom E-commerce', 'Shopify']
    },
    {
      title: 'Yazılım Çözümleri',
      description: 'Karmaşık süreçleri basitleştiren, özel geliştirilmiş güçlü sistemler.',
      icon: <Code size={28} strokeWidth={1.5} />,
      tags: ['Full Stack', 'API']
    },
    {
      title: 'Otomasyon',
      description: 'İş yükünüzü sıfıra indiren akıllı botlar ve süreç otomasyonları.',
      icon: <Bot size={28} strokeWidth={1.5} />,
      tags: ['Telegram Bot', 'Python']
    },
    {
      title: 'Altyapı',
      description: 'Kesintisiz performans için en üst düzey veritabanı ve sunucu yönetimi.',
      icon: <Database size={28} strokeWidth={1.5} />,
      tags: ['Cloud', 'PostgreSQL']
    },
    {
      title: 'Yapay Zeka (AI)',
      description: 'İş süreçlerinizi hızlandıran, verimliliği katlayan özel yapay zeka entegrasyonları.',
      icon: <Cpu size={28} strokeWidth={1.5} />,
      tags: ['OpenAI', 'Custom AI']
    },
    {
      title: 'Marka Kimliği',
      description: 'Premium algısını güçlendiren, akılda kalıcı kurumsal kimlik ve dijital stratejiler.',
      icon: <Palette size={28} strokeWidth={1.5} />,
      tags: ['Branding', 'Logo Tasarım']
    }
  ];

  const faqs = [
    {
      question: 'Projeler ortalama ne kadar sürede tamamlanıyor?',
      answer: 'Projenin kapsamına ve ihtiyaçlarına göre değişmekle birlikte, standart kurumsal web sitelerini genellikle 1 hafta içerisinde teslim ediyor, daha kapsamlı e-ticaret ve yazılım projelerini ise en hızlı şekilde projelendirip canlıya alıyoruz.'
    },
    {
      question: 'Fiyatlandırma politikanız nasıl?',
      answer: 'Hazır ve kısıtlayıcı paketler sunmak yerine, markanızın vizyonuna ve projenizin gereksinimlerine özel terzi işi fiyatlandırma yapıyoruz. Net bir teklif için projenizi dinlemeyi çok isteriz.'
    },
    {
      question: 'Sadece web sitesi mi yapıyorsunuz?',
      answer: 'Hayır, biz tam donanımlı bir dijital atölyeyiz. Web ve mobil uygulama geliştirme, e-ticaret altyapısı, yapay zeka entegrasyonları, otomasyon botları ve marka kimliği gibi geniş bir yelpazede premium çözümler sunuyoruz.'
    },
    {
      question: 'Proje bittikten sonra destek sağlıyor musunuz?',
      answer: 'Kesinlikle. İşimiz projeyi yayına alıp bırakmak değil. Teslimattan sonra da altyapı bakımı, güvenlik güncellemeleri ve 7/24 teknik destek konularında yanınızda olmaya devam ediyoruz.'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>
      <div className={styles.glowSpotlight}></div>
      
      {/* Navigation - Moved to StudioHeader */}

      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>DİJİTAL ATÖLYE</div>
          <h1 className={styles.title}>
            Fikrinizi <br />
            <span className={styles.goldText}>Geleceğe</span> Taşıyoruz.
          </h1>
          <p className={styles.description}>
            Sıradan olanı reddediyoruz. Markanızın hak ettiği premium dijital deneyimi, en ileri teknolojilerle kusursuz bir şekilde inşa ediyoruz.
          </p>
          <div className={styles.ctaWrapper}>
            <Link href="/studio/teklif-al" className={styles.primaryButton}>
              Projeyi Başlat <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </header>

      {/* Why Us Bar */}
      <div className={styles.featuresBar}>
        <div className={styles.featuresInner}>
          <div className={styles.featureItem}>
            <Code2 size={24} className={styles.featureIcon} />
            <span>Modern & Temiz Kod</span>
          </div>
          <div className={styles.featureItem}>
            <Palette size={24} className={styles.featureIcon} />
            <span>Kusursuz Tasarım</span>
          </div>
          <div className={styles.featureItem}>
            <Zap size={24} className={styles.featureIcon} />
            <span>Yüksek Performans</span>
          </div>
          <div className={styles.featureItem}>
            <Headphones size={24} className={styles.featureIcon} />
            <span>7/24 Teknik Destek</span>
          </div>
        </div>
      </div>



      {/* Services Grid */}
      <section className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <h2>Uzmanlık Alanlarımız</h2>
          <p>Dijital dünyadaki tüm ihtiyaçlarınız için kusursuz çözümler.</p>
        </div>
        
        <div className={styles.grid}>
          {services.map((service, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardIcon}>
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className={styles.tags}>
                {service.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className={styles.sectionHeader}>
          <h2>Nasıl Çalışıyoruz?</h2>
          <p>Fikrinizi hayata geçirirken izlediğimiz 4 kusursuz adım.</p>
        </div>
        
        <div className={styles.processGrid}>
          <div className={styles.processStep}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepIcon}><Search size={32} /></div>
            <h3>Keşif & Analiz</h3>
            <p>Projenizi dinliyor, hedeflerinizi anlıyor ve en uygun stratejiyi belirliyoruz.</p>
          </div>
          <div className={styles.processStep}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepIcon}><Layout size={32} /></div>
            <h3>UI/UX Tasarım</h3>
            <p>Kullanıcı deneyimini merkeze alarak, markanıza özel premium arayüzler tasarlıyoruz.</p>
          </div>
          <div className={styles.processStep}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepIcon}><Code size={32} /></div>
            <h3>Geliştirme</h3>
            <p>En güncel ve modern teknolojilerle, güvenli ve ölçeklenebilir kod yazıyoruz.</p>
          </div>
          <div className={styles.processStep}>
            <div className={styles.stepNumber}>04</div>
            <div className={styles.stepIcon}><Rocket size={32} /></div>
            <h3>Teslimat & Destek</h3>
            <p>Projenizi yayına alıyor ve sonrasında 7/24 kesintisiz destekle yanınızda oluyoruz.</p>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <h2>Sıkça Sorulan Sorular</h2>
          <p>Aklınıza takılan tüm soruların cevapları burada.</p>
        </div>
        
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${openFaq === index ? styles.active : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className={styles.faqQuestion}>
                <h3>{faq.question}</h3>
                <ChevronDown size={20} className={styles.faqIcon} />
              </div>
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Footer - Moved to StudioFooter */}
    </div>
  );
}
