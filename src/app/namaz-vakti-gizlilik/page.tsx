"use client";

import React from 'react';
import styles from './page.module.css';
import { Shield, Lock, Eye, Server, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NamazGizlilikPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/namaz-vakti" className={styles.backButton}>
          <ArrowLeft size={20} />
          <span>Geri Dön</span>
        </Link>
        <div className={styles.ornamentTop}></div>
        <h1 className={styles.title}>Gizlilik Politikası</h1>
        <p className={styles.subtitle}>Namaz Vakti - Osmanlı Zümrüt Serisi</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Shield className={styles.icon} color="#D4AF37" />
            <h2>Genel Bakış</h2>
          </div>
          <p>
            Maximora Studio olarak, "Namaz Vakti - Osmanlı Zümrüt Serisi" uygulamamızı kullanan kullanıcılarımızın gizliliğine büyük önem veriyoruz. 
            Bu gizlilik politikası, uygulamamızın hangi verileri topladığını, bu verilerin nasıl kullanıldığını ve güvenliğinin nasıl sağlandığını açıklar.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Eye className={styles.icon} color="#D4AF37" />
            <h2>Toplanan Veriler</h2>
          </div>
          <p>
            Uygulamamız, temel işlevlerini yerine getirebilmek amacıyla minimum düzeyde veri toplamaktadır:
          </p>
          <ul>
            <li>
              <strong>Konum Bilgisi:</strong> Bulunduğunuz yerin namaz vakitlerini hesaplamak ve kıble yönünü doğru bir şekilde belirlemek için konumunuza ihtiyaç duyarız. Bu veri sadece cihazınızda işlenebilir veya vakit hesaplama servislerimize anonim olarak gönderilebilir.
            </li>
            <li>
              <strong>Cihaz Bilgileri:</strong> Uygulama performansını izlemek ve hataları gidermek amacıyla anonim teknik veriler (işletim sistemi sürümü, cihaz modeli vb.) toplanabilir.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Lock className={styles.icon} color="#D4AF37" />
            <h2>Veri Kullanımı ve Paylaşımı</h2>
          </div>
          <p>
            Verileriniz bizim için kutsaldır ve şu prensipler çerçevesinde işlenir:
          </p>
          <ul>
            <li>Veriler yalnızca uygulamanın sunduğu hizmetlerin kalitesini artırmak için kullanılır.</li>
            <li>Kişisel verileriniz asla üçüncü şahıslarla, şirketlerle veya reklam ağlarıyla doğrudan paylaşılmaz.</li>
            <li>Uygulama içerisinde Google AdMob reklamları bulunabilir. Bu reklamlar, Google'ın kendi gizlilik politikalarına tabi olarak anonim reklam kimliklerini kullanabilir.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Server className={styles.icon} color="#D4AF37" />
            <h2>Veri Güvenliği</h2>
          </div>
          <p>
            Verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri alıyoruz. Tüm veri iletimleri şifreli protokoller üzerinden gerçekleştirilir. 
            Konum bilginiz gibi hassas veriler, amacına ulaştıktan sonra sistemlerimizde saklanmaz.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Phone className={styles.icon} color="#D4AF37" />
            <h2>İletişim</h2>
          </div>
          <p>
            Gizlilik politikamız hakkında sorularınız, görüşleriniz veya veri talepleriniz için bizimle iletişime geçebilirsiniz:
          </p>
          <div className={styles.contactInfo}>
            <p><strong>E-posta:</strong> destek@maximorashop.com</p>
          </div>
        </section>

        <div className={styles.lastUpdate}>
          Son Güncelleme: 2 Mayıs 2026
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.ornamentBottom}></div>
        <p>&copy; 2026 Maximora Studio. Tüm Hakları Saklıdır.</p>
      </footer>
    </div>
  );
}
