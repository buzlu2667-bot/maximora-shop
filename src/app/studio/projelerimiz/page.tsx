"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  ArrowRight,
  Monitor, 
  Smartphone, 
  Code2, 
  Palette 
} from 'lucide-react';
import styles from './Projeler.module.css';

export default function ProjelerimizPage() {
  const openChat = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).$zoho && (window as any).$zoho.salesiq) {
      (window as any).$zoho.salesiq.floatwindow.visible('show');
    }
  };

  const projects = [
    {
      title: 'LuxeArch',
      category: 'Kurumsal Web Tasarım',
      desc: 'Ödüllü mimarlık ofisi için tasarladığımız minimalist, portfolyo odaklı ve yüksek performanslı kurumsal web sitesi.',
      tags: ['Next.js', 'UI/UX', 'Animation'],
      theme: 'dark', // Determines the browser mockup style
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
      navItems: ['Projeler', 'Hizmetler', 'İletişim']
    },
    {
      title: 'Gastronomia',
      category: 'E-Ticaret & Sipariş Sistemi',
      desc: 'Lüks restoran zinciri için geliştirdiğimiz masa rezervasyon ve online paket servis entegrasyonlu sipariş platformu.',
      tags: ['E-Ticaret', 'Sipariş Yönetimi', 'Mobil Uyumlu'],
      theme: 'light',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop',
      navItems: ['Menü', 'Rezervasyon', 'Şubeler']
    },
    {
      title: 'Aura SaaS',
      category: 'Özel Yönetim Paneli',
      desc: 'B2B firmaları için geliştirilmiş; satış, stok ve cari takiplerini tek bir noktadan yöneten bulut tabanlı CRM paneli.',
      tags: ['Dashboard', 'CRM', 'React'],
      theme: 'dark',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      navItems: ['Dashboard', 'Raporlar', 'Ayarlar']
    },
    {
      title: 'VillaVibe',
      category: 'Otel & Rezervasyon',
      desc: 'Tatil villaları için özel tasarlanmış, tarih bazlı dinamik fiyatlandırma ve online ödeme altyapısına sahip kiralama sistemi.',
      tags: ['Rezervasyon', 'Ödeme Entegrasyonu'],
      theme: 'light',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop',
      navItems: ['Villalar', 'Bölgeler', 'Destek']
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>PORTFOLYO</div>
          <h1 className={styles.title}>
            Bazı İşler Anlatılmaz, <br/>
            <span className={styles.goldText}>Sadece İzlenir.</span>
          </h1>
          <p className={styles.description}>
            Hayal gücümüzün kodla buluştuğu, her pikselinde mühendislik ve sanat barındıran 
            konsept projelerimiz. İşte dijital ekosistemde yarattığımız bazı imza işler.
          </p>
        </div>
      </section>

      {/* Projects Timeline/Grid */}
      <section className={styles.projectsSection}>
        <div className={styles.projectsContainer}>
          {projects.map((project, idx) => (
            <div key={idx} className={`${styles.projectCard} ${idx % 2 !== 0 ? styles.projectReverse : ''}`}>
              
              {/* Browser Mockup Area */}
              <div className={styles.mockupWrapper}>
                <div className={`${styles.browserWindow} ${project.theme === 'light' ? styles.browserLight : styles.browserDark}`}>
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots}>
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                  <div 
                    className={styles.browserBody}
                    style={{ backgroundImage: `url(${project.image})` }}
                  >
                    <div className={styles.websiteOverlay}></div>
                    <div className={styles.websiteContent}>
                      {/* Fake Website Header */}
                      <div className={styles.websiteHeader}>
                        <div className={styles.websiteLogo}>{project.title}</div>
                        <div className={styles.websiteNav}>
                          {project.navItems.map((item, i) => (
                            <span key={i}>{item}</span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Fake Website Hero */}
                      <div className={styles.websiteHero}>
                        <h3>{project.category}</h3>
                        <div className={styles.websiteHeroBtn}>Keşfet</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details Area */}
              <div className={styles.projectInfo}>
                <div className={styles.categoryBadge}>{project.category}</div>
                <h2>{project.title}</h2>
                <p>{project.desc}</p>
                
                <div className={styles.tagsContainer}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </section>


      
    </div>
  );
}
