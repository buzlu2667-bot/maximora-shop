'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Server, Phone, Camera, Headphones } from 'lucide-react';

export default function FalizoPrivacyPolicy() {
  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        
        {/* Header */}
        <div style={styles.header}>
          <Link href="/" style={styles.backButton}>
            <ArrowLeft size={20} />
            <span style={{ marginLeft: '8px' }}>Geri Dön</span>
          </Link>
          <h1 style={styles.title}>Gizlilik Politikası</h1>
          <p style={styles.subtitle}>Falizo - Canlı Fal & Astroloji</p>
        </div>

        {/* Content */}
        <div style={styles.content}>
          <p style={styles.introText}>
            Maximora Studio olarak, "Falizo - Canlı Fal & Astroloji" uygulamamızı kullanan kullanıcılarımızın gizliliğine ve güvenliğine büyük önem veriyoruz. Bu politika, fal ve astroloji hizmetlerimizden yararlanırken verilerinizin nasıl korunduğunu açıklar.
          </p>

          {/* Section 1 */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <Eye color="#D4AF37" size={24} />
              <h2 style={styles.sectionTitle}>Toplanan Veriler</h2>
            </div>
            <ul style={styles.list}>
              <li style={styles.listItem}><strong>Profil Bilgileri:</strong> Doğru astrolojik analizler ve fal yorumları sunabilmek için doğum tarihi, cinsiyet ve ilişki durumu gibi bilgileriniz toplanır.</li>
              <li style={styles.listItem}><strong>Hesap Bilgileri:</strong> Güvenli giriş yapabilmeniz için (Google veya E-posta) hesap bilgileriniz güvenle saklanır.</li>
              <li style={styles.listItem}><strong>Cihaz Bilgileri:</strong> Uygulamanın sorunsuz çalışması ve hataların giderilmesi için anonim cihaz bilgileri toplanabilir.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <Camera color="#D4AF37" size={24} />
              <h2 style={styles.sectionTitle}>Medya ve Ses Verileri</h2>
            </div>
            <p style={styles.text}>
              Canlı fal deneyimi sunabilmek için gönderdiğiniz kahve fincanı fotoğrafları ve sesli mesajlar sadece falcınıza iletilmek üzere geçici olarak sunucularımızda şifreli şekilde işlenir. Bu veriler fal yorumunuz tamamlandıktan sonra güvenli bir şekilde arşivlenir ve 3. şahıslarla asla paylaşılmaz.
            </p>
          </section>

          {/* Section 3 */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <Lock color="#D4AF37" size={24} />
              <h2 style={styles.sectionTitle}>Veri Kullanımı ve Paylaşımı</h2>
            </div>
            <ul style={styles.list}>
              <li style={styles.listItem}>Verileriniz yalnızca size özel fal ve astroloji hizmetleri sunmak için kullanılır.</li>
              <li style={styles.listItem}>Uygulama içerisinde Google AdMob reklamları gösterilebilir ve bu servisler kendi gizlilik politikalarına tabi olarak anonim reklam kimlikleri kullanabilir.</li>
              <li style={styles.listItem}>Kişisel özel verileriniz, fal sonuçlarınız veya fotoğraflarınız hiçbir kurum, şirket veya reklam ağıyla satılmaz veya paylaşılmaz.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <Server color="#D4AF37" size={24} />
              <h2 style={styles.sectionTitle}>Veri Güvenliği</h2>
            </div>
            <p style={styles.text}>
              Verileriniz bulut (Supabase) altyapımızda uçtan uca şifreleme yöntemleriyle korunmaktadır. Ödeme işlemleri doğrudan Google Play altyapısı üzerinden gerçekleşir ve kredi kartı bilgileriniz hiçbir şekilde sunucularımıza ulaşmaz veya kaydedilmez.
            </p>
          </section>

          {/* Section 5 */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <Phone color="#D4AF37" size={24} />
              <h2 style={styles.sectionTitle}>İletişim & Haklarınız</h2>
            </div>
            <p style={styles.text}>
              Hesabınızı ve size ait tüm verileri dilediğiniz zaman uygulama içindeki "Hesabımı Sil" butonundan kalıcı olarak silebilirsiniz. Her türlü şikayet, soru ve veri silme talebi için bizimle iletişime geçebilirsiniz:
            </p>
            <div style={styles.contactBox}>
              <p><strong>E-posta:</strong> destek@maximorashop.com</p>
              <p><strong>Geliştirici:</strong> Maximora Studio</p>
            </div>
          </section>

          <div style={styles.lastUpdate}>Son Güncelleme: 9 Ekim 2026</div>
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>© 2026 Maximora Studio. Tüm Hakları Saklıdır.</p>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0A0A0C', // Falizo dark theme background
    color: '#F8F9FA',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '20px 16px',
    display: 'flex',
    justifyContent: 'center',
  },
  contentWrapper: {
    maxWidth: '800px',
    width: '100%',
  },
  header: {
    marginBottom: '40px',
    borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
    paddingBottom: '24px',
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#D4AF37',
    textDecoration: 'none',
    fontWeight: '600',
    marginBottom: '24px',
    fontSize: '15px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    margin: '0 0 8px 0',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: '16px',
    color: '#D4AF37',
    margin: 0,
    fontWeight: '500',
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '32px',
  },
  introText: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#E0E0E0',
    margin: 0,
  },
  section: {
    backgroundColor: '#151519',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
    color: '#FFFFFF',
  },
  text: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#CCCCCC',
    margin: 0,
  },
  list: {
    margin: 0,
    paddingLeft: '20px',
    color: '#CCCCCC',
  },
  listItem: {
    fontSize: '15px',
    lineHeight: '1.7',
    marginBottom: '12px',
  },
  contactBox: {
    marginTop: '16px',
    padding: '16px',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: '12px',
    borderLeft: '4px solid #D4AF37',
    color: '#FFFFFF',
  },
  lastUpdate: {
    fontSize: '14px',
    color: '#888888',
    textAlign: 'right' as const,
    marginTop: '16px',
    fontStyle: 'italic',
  },
  footer: {
    marginTop: '60px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    textAlign: 'center' as const,
    color: '#666666',
    fontSize: '14px',
  }
};
