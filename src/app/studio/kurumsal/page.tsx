"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Rocket, 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  Code2
} from 'lucide-react';
import styles from './Kurumsal.module.css';

export default function KurumsalPage() {
  const openChat = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).$zoho && (window as any).$zoho.salesiq) {
      (window as any).$zoho.salesiq.floatwindow.visible('show');
    }
  };

  const values = [
    {
      title: 'İnovasyon ve Ar-Ge',
      description: 'Sıradan ve kopyala-yapıştır işleri reddediyoruz. Her projeye, sektörü sarsacak yenilikçi bir teknoloji gözüyle bakıyoruz.',
      icon: <Lightbulb size={32} />
    },
    {
      title: 'Performans Odaklılık',
      description: 'Güzel görünen ama çalışmayan siteler yapmayız. Odak noktamız daima hız, dönüşüm oranları ve satış artışıdır.',
      icon: <Rocket size={32} />
    },
    {
      title: 'Sonsuz Şeffaflık',
      description: 'Sürpriz faturalar, gizli maliyetler yok. Projenin her aşamasında müşterimizle aynı masada oturur, kod seviyesinde şeffaf çalışırız.',
      icon: <ShieldCheck size={32} />
    },
    {
      title: 'Mükemmeliyetçilik',
      description: 'Pixel-perfect (piksel kusursuzluğu) tasarım anlayışımız ve temiz kod (clean code) mimarimizle dünya standartlarında ürünler çıkarırız.',
      icon: <Target size={32} />
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>BİZ KİMİZ?</div>
          <h1 className={styles.title}>
            Dijitalde Kuralları <br/>
            <span className={styles.goldText}>Yeniden Yazıyoruz.</span>
          </h1>
          <p className={styles.description}>
            Biz sadece bir web tasarım ajansı değiliz; markanızın dijital dünyadaki büyüme ortağıyız. 
            Teknolojiyi sanatla buluşturuyor, hayallerinizi yüksek performanslı koda dönüştürüyoruz.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>10<span className={styles.goldText}>+</span></div>
            <div className={styles.statLabel}>Yıllık Sektör Tecrübesi</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>%<span className={styles.goldText}>100</span></div>
            <div className={styles.statLabel}>Mobil Uyumluluk & Hız</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>7<span className={styles.goldText}>/</span>24</div>
            <div className={styles.statLabel}>Kesintisiz Teknik Destek</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>∞</div>
            <div className={styles.statLabel}>Yenilikçi Kod Mimarı</div>
          </div>
        </div>
      </section>

      {/* Story / About Section */}
      <section className={styles.storySection}>
        <div className={styles.storyGrid}>
          <div className={styles.storyContent}>
            <h2><span className={styles.goldText}>Maximora Studio</span> Nedir?</h2>
            <p>
              Dijital dünya her saniye değişirken, standart şablonlar ve eski nesil ajans mantığıyla büyümek imkansızdır. 
              <strong> Maximora Studio</strong>, tam da bu kısırdöngüyü kırmak için kuruldu. Bizim felsefemizde müşteriye sadece "site teslim etmek" yoktur. Biz, markanızın dijital ekosistemini inşa ederiz.
            </p>
            <p>
              Yazılım mühendisleri, UI/UX tasarımcıları ve büyüme (growth) stratejistlerinden oluşan ekibimizle; 
              e-ticaretten özel yazılıma, mobil uygulamalardan SEO danışmanlığına kadar her alanda <em>dünya standartlarında</em>, 
              anahtar teslim çözümler sunuyoruz. Sizin başarınız, bizim yazdığımız en iyi referans kodudur.
            </p>
            
            <div className={styles.ceoQuote}>
              <div className={styles.quoteIcon}>"</div>
              <p>Amacımız müşterilerimize sadece bir web sitesi satmak değil; onlara rakiplerinin önüne geçecekleri güçlü bir dijital altyapı sunmaktır.</p>
              <span className={styles.quoteAuthor}>- Maximora Studio Kurucu Ekibi</span>
            </div>
          </div>
          
          <div className={styles.storyImage}>
            <div className={styles.glassCard}>
              <div className={styles.glassHeader}>
                <div className={styles.glassDots}><span></span><span></span><span></span></div>
                <div className={styles.glassTitle}>manifesto.ts</div>
              </div>
              <div className={styles.glassBody}>
                <pre>
                  <code>
                    <span className={styles.keyword}>const</span> <span className={styles.variable}>Maximora</span> = {'{'}
                    <br/>
                    {'  '}vision: <span className={styles.string}>"Geleceği Kodlamak"</span>,
                    <br/>
                    {'  '}mission: <span className={styles.string}>"Sıfır Hata, Yüksek Dönüşüm"</span>,
                    <br/>
                    {'  '}passion: <span className={styles.keyword}>true</span>,
                    <br/>
                    {'  '}
                    <span className={styles.function}>build</span>() {'{'}
                    <br/>
                    {'    '}<span className={styles.keyword}>while</span> (project.isNotPerfect) {'{'}
                    <br/>
                    {'      '}improveAndRefactor();
                    <br/>
                    {'    }'}
                    <br/>
                    {'    '}<span className={styles.keyword}>return</span> <span className={styles.string}>"Başarı"</span>;
                    <br/>
                    {'  }'}
                    <br/>
                    {'}'};
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.sectionHeader}>
          <h2>Kurumsal <span className={styles.goldText}>Değerlerimiz</span></h2>
          <p>Bizi diğer yazılım ajanslarından ayıran DNA'mız.</p>
        </div>
        <div className={styles.valuesGrid}>
          {values.map((val, idx) => (
            <div key={idx} className={styles.valueCard}>
              <div className={styles.valueIcon}>{val.icon}</div>
              <h3>{val.title}</h3>
              <p>{val.description}</p>
            </div>
          ))}
        </div>
      </section>



    </div>
  );
}
