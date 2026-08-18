"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Settings, 
  Database, 
  Network, 
  Cpu, 
  LineChart,
  ArrowRight,
  TerminalSquare,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import styles from './OzelYazilim.module.css';

export default function OzelYazilimPage() {
  const features = [
    {
      title: 'İş Süreçleri Otomasyonu',
      description: 'Manuel ve tekrar eden işlerinizi yazılıma devredin. Hata payını sıfıra indirin ve zamandan %80 tasarruf edin.',
      icon: <Cpu size={28} />
    },
    {
      title: 'Özel CRM & ERP Sistemleri',
      description: 'Şirketinizin tam ihtiyacına göre şekillenmiş, hazır paketlerin hantallığından uzak müşteri ve kaynak yönetim panelleri.',
      icon: <LineChart size={28} />
    },
    {
      title: 'API & Servis Entegrasyonları',
      description: 'Kullandığınız muhasebe, kargo, ödeme veya 3. parti yazılımları tek bir merkezde kusursuzca konuşturun.',
      icon: <Network size={28} />
    },
    {
      title: 'Gelişmiş Veritabanı Mimarisi',
      description: 'Milyonlarca satır veriyi saniyeler içinde işleyebilen, yüksek performanslı ve güvenli veritabanı tasarımları.',
      icon: <Database size={28} />
    },
    {
      title: 'Ölçeklenebilir Altyapı',
      description: 'Mikroservis mimarisi ile projeniz büyüdükçe tıkanmayan, trafiğe anında yanıt verebilen esnek sistemler.',
      icon: <Settings size={28} />
    },
    {
      title: 'B2B Bayi & Satış Portalları',
      description: 'Sadece iş ortaklarınıza özel fiyatlandırma, sipariş ve cari takip yapabileceğiniz kapalı devre platformlar.',
      icon: <ShieldCheck size={28} />
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>ÖZEL YAZILIM</div>
          <h1 className={styles.title}>
            Hayallerinizdeki Projeyi <br/>
            <span className={styles.goldText}>Koda Döküyoruz.</span>
          </h1>
          <p className={styles.description}>
            Hazır paketlere sığmayan, benzersiz iş modelleriniz için sıfırdan mimari kuruyoruz. 
            İhtiyaçlarınızı analiz ediyor, en güncel teknolojilerle size özel, güvenli ve yüksek performanslı yazılımlar geliştiriyoruz.
          </p>

        </div>
        <div className={styles.heroImageWrapper}>
          <div className={styles.codeEditor}>
            <div className={styles.editorHeader}>
              <div className={styles.editorDots}>
                <span></span><span></span><span></span>
              </div>
              <div className={styles.editorTitle}>system.ts — Maximora</div>
            </div>
            <div className={styles.editorBody}>
              <pre>
                <code>
                  <span className={styles.keyword}>const</span> <span className={styles.variable}>initializeProject</span> = <span className={styles.keyword}>async</span> (idea: Idea) <span className={styles.keyword}>=&gt;</span> {'{'}
                  <br/>
                  {'  '}
                  <span className={styles.keyword}>try</span> {'{'}
                  <br/>
                  {'    '}
                  <span className={styles.keyword}>const</span> architecture = <span className={styles.keyword}>await</span> Engine.<span className={styles.function}>build</span>(idea.specs);
                  <br/>
                  {'    '}
                  <span className={styles.keyword}>const</span> software = <span className={styles.keyword}>await</span> Developer.<span className={styles.function}>code</span>(architecture);
                  <br/>
                  {'    '}
                  <span className={styles.keyword}>return</span> software.<span className={styles.function}>deploy</span>();
                  <br/>
                  {'  } '}
                  <span className={styles.keyword}>catch</span> (error) {'{'}
                  <br/>
                  {'    '}
                  <span className={styles.comment}>// Impossible with Maximora</span>
                  <br/>
                  {'  }'}
                  <br/>
                  {'}'};
                  <br/><br/>
                  <span className={styles.function}>initializeProject</span>({'{'} name: <span className={styles.string}>"Next Big Thing"</span> {'}'});
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>Projelerinizi Uçuracak <span className={styles.goldText}>Çözümler</span></h2>
          <p>Yalnızca kod yazmıyor, şirketinizin dijital omurgasını inşa ediyoruz.</p>
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
          <h2>Neden <span className={styles.goldText}>Özel Yazılım</span> Geliştirmelisiniz?</h2>
          <p className={styles.splitDesc}>
            Rakiplerinizle aynı hazır sistemleri kullanarak fark yaratamazsınız. Kendi kurallarınızı koyduğunuz bir altyapı, sektörde liderliğin ilk adımıdır.
          </p>
          <ul className={styles.checkList}>
            <li>
              <CheckCircle2 className={styles.checkIcon} />
              <div>
                <strong>Tam Kontrol ve Bağımsızlık</strong>
                <span>Lisans veya kısıtlamalara takılmadan, yazılımın her bir zerresine hükmedin. Sistemin tek sahibi siz olun.</span>
              </div>
            </li>
            <li>
              <CheckCircle2 className={styles.checkIcon} />
              <div>
                <strong>Mükemmel Uyum</strong>
                <span>İş akışınızı yazılıma uydurmak yerine, yazılımı iş akışınıza göre şekillendiririz. Her menü, her buton tam istediğiniz gibi çalışır.</span>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.splitImage}>
          <div className={styles.glassCard}>
            <TerminalSquare size={64} opacity={0.3} color="#d4af37" />
            <h3>Sınır Yok.</h3>
            <p>Hayal edebildiğiniz her fonksiyon, uzman mühendis kadromuz tarafından koda dökülebilir.</p>
          </div>
        </div>
      </section>

      {/* Process / SEO Text Section */}
      <section className={styles.processSection}>
        <div className={styles.processContainer}>
          <div className={styles.sectionHeader}>
            <h2>Nasıl Çalışıyoruz?</h2>
            <p>Fikrinizin koda, kodun gerçeğe dönüşme serüveni.</p>
          </div>
          
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}>1</div>
              <div className={styles.timelineContent}>
                <h3>Analiz & Strateji</h3>
                <p>Projenizi dinliyor, sektörünüzü ve rakiplerinizi inceliyoruz. En doğru teknoloji yığınını (Tech Stack) belirliyoruz.</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}>2</div>
              <div className={styles.timelineContent}>
                <h3>UX/UI Tasarım</h3>
                <p>Yazılımın görsel prototiplerini hazırlıyor, kullanıcı deneyimini kusursuzlaştırarak onayınıza sunuyoruz.</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}>3</div>
              <div className={styles.timelineContent}>
                <h3>Geliştirme (Kodlama)</h3>
                <p>Temiz, güvenli ve sürdürülebilir bir kod mimarisi ile projenizi adım adım inşa ediyoruz.</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}>4</div>
              <div className={styles.timelineContent}>
                <h3>Test & Canlıya Alma</h3>
                <p>Performans, güvenlik ve kullanıcı testlerini tamamlıyor; projenizi sorunsuz bir şekilde yayınlıyoruz.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
