"use client";

import React from 'react';
import styles from './page.module.css';
import { ShieldCheck, Lock, Eye, Database, Globe, Bell, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OtoTakipProGizlilikPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/ototakip-pro" className={styles.backButton}>
          <ArrowLeft size={20} />
          <span>Uygulamaya Dön</span>
        </Link>
        <div className={styles.accentBar}></div>
        <h1 className={styles.title}>Gizlilik Politikası</h1>
        <p className={styles.subtitle}>OtoTakip Pro - Dijital Garajınız</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <ShieldCheck className={styles.icon} color="#F59E0B" />
            <h2>Gizlilik Taahhüdümüz</h2>
          </div>
          <p>
            OtoTakip Pro uygulaması olarak, araçlarınıza ve finansal durumunuza ait verilerinizin mahremiyetine en üst düzeyde önem veriyoruz. 
            Bu politika, verilerinizin güvenliği ve gizliliği konusundaki standartlarımızı açıklar. Google Play standartlarına tam uyumlu olarak çalışıyoruz.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Database className={styles.icon} color="#F59E0B" />
            <h2>Veri Toplama ve Depolama</h2>
          </div>
          <p>
            OtoTakip Pro, kullanıcılarına kesintisiz bir deneyim sunmak için bazı verileri depolar:
          </p>
          <ul>
            <li>
              <strong>Araç ve Maliyet Verileri:</strong> Eklediğiniz araç bilgileri, yakıt harcamaları, bakım kayıtları ve kara kutu notları, Supabase tabanlı güvenli bulut sunucularımızda saklanır.
            </li>
            <li>
              <strong>Kullanıcı Kimliği:</strong> E-posta ve şifrenizle oluşturduğunuz hesabınız, uygulamanın farklı cihazlarda senkronize çalışması için güvenli bir şekilde (Hashlenerek) korunur.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Eye className={styles.icon} color="#F59E0B" />
            <h2>Veri Kullanımı</h2>
          </div>
          <p>
            Verileriniz yalnızca uygulama deneyiminizi iyileştirmek için kullanılır:
          </p>
          <ul>
            <li>Harcama analizleri, yakıt tüketimi ortalamaları ve bakım hatırlatmaları tamamen size özel olarak hesaplanır.</li>
            <li>Araç bilgileriniz ve harcama verileriniz <strong>asla üçüncü taraf kurumlarla, sigorta şirketleriyle veya servislerle paylaşılmaz ya da satılmaz.</strong></li>
          </ul>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Lock className={styles.icon} color="#F59E0B" />
            <h2>Veri Güvenliği ve Silme Hakkı</h2>
          </div>
          <p>
            Tüm veri transferleri SSL sertifikaları ile uçtan uca şifrelenir. Uygulama içerisinden <strong>"Hesabımı Sil"</strong> seçeneğini kullanarak dilediğiniz zaman tüm verilerinizin sunucularımızdan geri döndürülemez şekilde silinmesini talep edebilirsiniz.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Globe className={styles.icon} color="#F59E0B" />
            <h2>Reklamlar ve Üçüncü Taraflar</h2>
          </div>
          <p>
            OtoTakip Pro, ücretsiz sürümünü desteklemek amacıyla Google AdMob reklam servislerini kullanabilir. AdMob, reklam kişiselleştirme amacıyla anonim cihaz kimliklerini kullanabilir. Araç veya maliyet verileriniz reklam ağlarıyla kesinlikle paylaşılmaz.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Bell className={styles.icon} color="#F59E0B" />
            <h2>Güncellemeler</h2>
          </div>
          <p>
            Bu gizlilik politikası, yeni özellikler eklendikçe veya yasal gereksinimler (örneğin KVKK / GDPR) değiştikçe güncellenebilir. 
            Tüm değişiklikler bu sayfa üzerinden şeffaf bir şekilde paylaşılacaktır.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <ShieldCheck className={styles.icon} color="#F59E0B" />
            <h2>İletişim</h2>
          </div>
          <p>
            Gizlilikle ilgili her türlü sorunuz veya veri silme talepleriniz için teknik ekibimize ulaşabilirsiniz:
          </p>
          <div className={styles.contactInfo}>
            <p style={{ marginBottom: '0.5rem' }}><strong>E-posta:</strong></p>
            <p><a href="mailto:destek@maximorashop.com" className={styles.emailLink}>destek@maximorashop.com</a></p>
          </div>
        </section>

        <div className={styles.lastUpdate}>
          Son Güncelleme: 28 Haziran 2026
        </div>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2026 Maximora Studio. Bütün Hakları Saklıdır.</p>
      </footer>
    </div>
  );
}
