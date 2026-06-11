"use client";

import React from 'react';
import styles from './page.module.css';
import { ShieldCheck, Lock, Eye, Database, Globe, Bell, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ParaKontrolGizlilikPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/para-kontrol" className={styles.backButton}>
          <ArrowLeft size={20} />
          <span>Uygulamaya Dön</span>
        </Link>
        <div className={styles.accentBar}></div>
        <h1 className={styles.title}>Gizlilik Politikası</h1>
        <p className={styles.subtitle}>Para Kontrol - Akıllı Finans Asistanı</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <ShieldCheck className={styles.icon} color="#00E5FF" />
            <h2>Gizlilik Taahhüdümüz</h2>
          </div>
          <p>
            Para Kontrol uygulaması olarak, finansal verilerinizin mahremiyetine en üst düzeyde önem veriyoruz. 
            Bu politika, verilerinizin güvenliği ve gizliliği konusundaki standartlarımızı açıklar.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Database className={styles.icon} color="#00E5FF" />
            <h2>Veri Toplama ve Depolama</h2>
          </div>
          <p>
            Para Kontrol, kullanıcılarından doğrudan kişisel kimlik bilgisi toplamaz:
          </p>
          <ul>
            <li>
              <strong>Finansal Veriler:</strong> Girdiğiniz abonelik, harcama ve bütçe bilgileri öncelikle cihazınızın yerel hafızasında saklanır.
            </li>
            <li>
              <strong>Bulut Senkronizasyon:</strong> Eğer bulut senkronizasyon özelliğini aktif ederseniz, verileriniz uçtan uca şifrelenerek güvenli sunucularımızda saklanır. Bu verilere sizden başka kimse erişemez.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Eye className={styles.icon} color="#00E5FF" />
            <h2>Veri Kullanımı</h2>
          </div>
          <p>
            Verileriniz yalnızca uygulama deneyiminizi iyileştirmek için kullanılır:
          </p>
          <ul>
            <li>Harcama analizleri ve bütçe hesaplamaları tamamen cihazınızda veya size özel şifreli oturumunuzda yapılır.</li>
            <li>Finansal verileriniz asla reklam amaçlı kullanılmaz veya üçüncü taraf veri şirketlerine satılmaz.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Globe className={styles.icon} color="#00E5FF" />
            <h2>Reklamlar ve Üçüncü Taraflar</h2>
          </div>
          <p>
            Uygulamada Google AdMob reklam servisleri kullanılmaktadır. AdMob, size ilgi çekici reklamlar sunabilmek için anonim cihaz kimliklerini kullanabilir. 
            Bu süreçte harcama verileriniz veya bütçe bilgileriniz asla reklam ağıyla paylaşılmaz.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Bell className={styles.icon} color="#00E5FF" />
            <h2>Güncellemeler</h2>
          </div>
          <p>
            Bu gizlilik politikası, yeni özellikler eklendikçe veya yasal gereksinimler değiştikçe güncellenebilir. 
            Tüm değişiklikler bu sayfa üzerinden şeffaf bir şekilde paylaşılacaktır.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Lock className={styles.icon} color="#00E5FF" />
            <h2>İletişim</h2>
          </div>
          <p>
            Gizlilikle ilgili her türlü sorunuz için teknik ekibimize ulaşabilirsiniz:
          </p>
          <div className={styles.contactInfo}>
            <p style={{ marginBottom: '0.5rem' }}><strong>E-posta:</strong></p>
            <p><a href="mailto:destek@maximorashop.com" className={styles.emailLink}>destek@maximorashop.com</a></p>
          </div>
        </section>

        <div className={styles.lastUpdate}>
          Son Güncelleme: 2 Mayıs 2026
        </div>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2026 Maximora Studio. Bütün Hakları Saklıdır.</p>
      </footer>
    </div>
  );
}
