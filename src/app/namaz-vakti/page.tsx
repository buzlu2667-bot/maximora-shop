"use client";

import React from 'react';
import styles from './page.module.css';
import { Compass, Clock, BookOpen, Bell, Map, Shield, ListChecks, Fingerprint, GraduationCap, History, Sun, Heart } from 'lucide-react';
import Image from 'next/image';

export default function NamazLandingPage() {
  return (
    <div className={styles.landing}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.topNav}>
          <a href="/" className={styles.backToShop}>
            Mağazaya Git
          </a>
        </div>
        <div className={styles.ornament}>
          <Image 
            src="/logo-gold.png" 
            alt="Maximora Logo" 
            width={120} 
            height={120} 
            className={styles.goldLogo}
          />
        </div>
        <h1 className={styles.title}>Namaz Vakti</h1>
        <p className={styles.seriesTag}>Osmanlı Zümrüt Serisi</p>
        <p className={styles.subtitle}>
          Osmanlı'nın asaletini zümrüt yeşiliyle buluşturan, modern ve sade arayüzüyle 
          ibadetlerinize eşlik eden en şık namaz vakti uygulaması.
        </p>

        <div className={styles.downloadButtons}>
          <a 
            href="https://play.google.com/store/apps/details?id=com.namazapp.vakitleri" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.playButton}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.523 15.3414L20.6136 12.2508L3.63916 2.5002C3.41407 2.37053 3.16781 2.30256 2.91716 2.30103C2.66651 2.2995 2.41829 2.36444 2.18916 2.4912L12.1892 12.4912L17.523 15.3414Z" fill="#EA4335"/>
              <path d="M2.18916 22.4912C2.41829 22.618 2.66651 22.6829 2.91716 22.6814C3.16781 22.6798 3.41407 22.6119 3.63916 22.4822L20.6136 12.7316L17.523 9.641L12.1892 12.4912L2.18916 22.4912Z" fill="#34A853"/>
              <path d="M2.18916 2.4912L1.87916 2.8012C1.75131 2.92901 1.67916 3.10238 1.67916 3.2832C1.67916 3.46402 1.75131 3.63738 1.87916 3.76519L11.8792 13.7652L12.1892 13.4552V11.5272L2.18916 2.4912Z" fill="#FBBC04"/>
              <path d="M12.1892 12.4912L2.18916 22.4912C2.31697 22.619 2.49034 22.6912 2.67116 22.6912C2.85198 22.6912 3.02534 22.6191 3.15316 22.4912L13.1532 12.4912L12.1892 11.5272V12.4912Z" fill="#4285F4"/>
            </svg>
            <div className={styles.playButtonText}>
              <span className={styles.getItOn}>HEMEN İNDİR</span>
              <span className={styles.googlePlay}>Google Play</span>
            </div>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ color: '#D4AF37', fontSize: '2.5rem', marginBottom: '1rem' }}>Eşsiz Özellikler</h2>
          <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
            Ruhunuzu dinlendiren tasarımıyla ibadet hayatınızı kolaylaştıran her şey burada.
          </p>
        </div>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <Clock className={styles.featureIcon} color="#D4AF37" />
            <h3 className={styles.featureTitle}>Tam Zamanında</h3>
            <p className={styles.featureDesc}>
              Diyanet ile tam uyumlu, konumunuza özel kesin namaz vakitleri ve bildirimler.
            </p>
          </div>

          <div className={styles.featureCard}>
            <Compass className={styles.featureIcon} color="#D4AF37" />
            <h3 className={styles.featureTitle}>Kıble Pusulası</h3>
            <p className={styles.featureDesc}>
              Dünyanın neresinde olursanız olun, gelişmiş pusula ile kıblenizi saniyeler içinde bulun.
            </p>
          </div>

          <div className={styles.featureCard}>
            <BookOpen className={styles.featureIcon} color="#D4AF37" />
            <h3 className={styles.featureTitle}>Kur'an-ı Kerim</h3>
            <p className={styles.featureDesc}>
              Mushaf görünümü ile Kur'an-ı Kerim okuyun, ayetlerin meallerine kolayca ulaşın.
            </p>
          </div>

          <div className={styles.featureCard}>
            <ListChecks className={styles.featureIcon} color="#D4AF37" />
            <h3 className={styles.featureTitle}>Kaza Takibi</h3>
            <p className={styles.featureDesc}>
              Kaçırdığınız namazların ve oruçların çetelesini tutun, kaza borçlarınızı kolayca yönetin.
            </p>
          </div>

          <div className={styles.featureCard}>
            <Fingerprint className={styles.featureIcon} color="#D4AF37" />
            <h3 className={styles.featureTitle}>Zikirmatik</h3>
            <p className={styles.featureDesc}>
              Gelişmiş dijital zikirmatik ile tesbihatlarınızı çekin, zikir hedeflerinizi belirleyin.
            </p>
          </div>

          <div className={styles.featureCard}>
            <GraduationCap className={styles.featureIcon} color="#D4AF37" />
            <h3 className={styles.featureTitle}>Namaz Öğren</h3>
            <p className={styles.featureDesc}>
              Resimli ve anlatımlı rehberler ile namaz kılmayı adım adım, en doğru şekilde öğrenin.
            </p>
          </div>

          <div className={styles.featureCard}>
            <History className={styles.featureIcon} color="#D4AF37" />
            <h3 className={styles.featureTitle}>Kerâhet Vakitleri</h3>
            <p className={styles.featureDesc}>
              İbadet edilmesi uygun olmayan kerâhet vakitlerini takip edin, ibadetlerinizi planlayın.
            </p>
          </div>

          <div className={styles.featureCard}>
            <Heart className={styles.featureIcon} color="#D4AF37" />
            <h3 className={styles.featureTitle}>Esmaül Hüsna</h3>
            <p className={styles.featureDesc}>
              Allah'ın 99 ismini, anlamlarını ve faziletlerini keşfedin, derin manalara yolculuk yapın.
            </p>
          </div>

          <div className={styles.featureCard}>
            <Sun className={styles.featureIcon} color="#D4AF37" />
            <h3 className={styles.featureTitle}>40 Hadis</h3>
            <p className={styles.featureDesc}>
              Peygamber Efendimizin (SAV) seçme hadis-i şeriflerini okuyun ve hayatınıza rehber edinin.
            </p>
          </div>
        </div>
      </section>

      {/* Screenshots / App Showcase */}
      <section className={styles.screenshots}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: '#D4AF37', fontSize: '2rem' }}>Uygulamadan Görüntüler</h2>
        </div>
        <div className={styles.screenshotTrack}>
          {['screen1', '2', '3', '4', '5', '6', '7', '8', '9'].map((name, index) => (
            <img 
              key={index} 
              src={`/namaz/${name}.png`} 
              alt={`Namaz Vakti Ekran ${name}`}
              className={styles.screenshotImg}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ))}
          {/* Sonsuz döngü hissi için listeyi tekrarlayalım */}
          {['screen1', '2', '3', '4', '5', '6', '7', '8', '9'].map((name, index) => (
            <img 
              key={index + 10} 
              src={`/namaz/${name}.png`} 
              alt={`Namaz Vakti Ekran ${name}`}
              className={styles.screenshotImg}
            />
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2026 Maximora Studio. Tüm Hakları Saklıdır.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>Osmanlı Zümrüt Serisi - Namaz Vakti Uygulaması</p>
      </footer>
    </div>
  );
}
