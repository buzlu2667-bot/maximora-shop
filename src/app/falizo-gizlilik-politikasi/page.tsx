"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Eye, 
  Lock, 
  Server, 
  Phone, 
  Camera, 
  Headphones, 
  FileText, 
  AlertTriangle, 
  HelpCircle,
  Sparkles,
  UserCheck
} from 'lucide-react';
import styles from './page.module.css';

export default function FalizoPrivacyPolicy() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: 'body { background-color: #08060F !important; margin: 0; padding: 0; }' }} />

      <div className={styles.privacyPage}>
        {/* Ambient cosmic glows */}
        <div className={styles.spaceBackground} />
        <div className={styles.starsOverlay} />

        <div className={styles.contentWrapper}>
          
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerTopBar}>
              <Link href="/falizo-home" className={styles.backButton}>
                <ArrowLeft size={18} />
                <span>Falizo Ana Sayfasına Dön</span>
              </Link>

              <div className={styles.brandPill}>
                <Sparkles size={14} />
                <span>Resmi Kullanıcı ve Veri Güvenliği Protokolü</span>
              </div>
            </div>

            <h1 className={styles.title}>
              Gizlilik Politikası ve <span className={styles.goldGradientText}>Kullanıcı Sözleşmesi</span>
            </h1>
            <p className={styles.subtitle}>Falizo: Kahve Falı & Tarot — Maximora Studio</p>
          </div>

          {/* Intro Box */}
          <div className={styles.introBox}>
            <p style={{ margin: 0 }}>
              Maximora Studio (“Şirketimiz”, “Falizo”) olarak, “Falizo: Kahve Falı & Tarot” mobil uygulamamızı tercih eden tüm kullanıcılarımızın kişisel mahremiyetine, bilgi güvenliğine ve dijital haklarına en üst düzeyde hassasiyet gösteriyoruz. Bu politika; 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK), Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) ve Google Play Geliştirici Politikaları uyarınca, uygulamamızı kullanırken işlenen verilerinizin kapsamını, amacını, hukuki dayanağını ve yasal haklarınızı ayrıntılı olarak düzenler.
            </p>
          </div>

          {/* Legal Disclaimer / Eğlence Amaçlı Hizmet Beyanı (Hukuki Koruma Kalkanı) */}
          <div className={styles.legalNoticeBox}>
            <AlertTriangle className={styles.legalNoticeIcon} size={28} color="#F59E0B" />
            <div>
              <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#FBBF24', fontSize: '1.05rem' }}>
                Hukuki Sorumluluk Reddi Beyanı (Eğlence ve Kültürel Amaçlı Servis):
              </strong>
              <span>
                Falizo uygulamasında sunulan kahve falı, tarot, astroloji, rüya tabirleri ve mistik yorumlar <strong>tamamen eğlence, motivasyon, kültürel gelenek ve bireysel içgörü</strong> amaçlıdır. Uygulamada yer alan hiçbir fal yorumu, tavsiye veya öngörü; tıbbi, psikolojik, hukuki, yatırım veya finansal bir teşhis veya kesin gelecek taahhüdü niteliği taşımaz. Kullanıcıların yorumlara dayanarak alacakları kişisel, maddi veya manevi kararlardan dolayı Maximora Studio ve bünyesindeki yorumcular hiçbir hukuki veya cezai sorumluluk kabul etmez.
              </span>
            </div>
          </div>

          {/* Sections List */}
          <div className={styles.sectionList}>
            
            {/* Section 1 */}
            <section className={styles.cardSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconCircle}>
                  <Eye color="#F2D474" size={22} />
                </div>
                <h2 className={styles.sectionTitle}>1. Toplanan Kişisel Veriler ve Toplanma Amacı</h2>
              </div>
              <p className={styles.sectionText}>
                Uygulamamızın sunduğu kehanet ve fal deneyimini kişiselleştirmek ve hesabınızı güvenle yönetebilmek amacıyla aşağıdaki veriler işlenmektedir:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <strong>Profil Bilgileri:</strong> Astroloji transitleri, burç uyumu ve doğum haritası hesaplamalarının doğru yapılabilmesi adına ad/rumuz, doğum tarihi, cinsiyet, ilişki durumu ve burç bilgileriniz.
                </li>
                <li className={styles.bulletItem}>
                  <strong>Hesap ve Kimlik Doğrulama:</strong> Google Sign-In veya E-posta ile güvenli oturum açabilmeniz, satın aldığınız kredilerin ve fal geçmişinizin korunması amacıyla kullanıcı kimliği (UID) ve e-posta adresi.
                </li>
                <li className={styles.bulletItem}>
                  <strong>Teknik ve Cihaz Verileri:</strong> Uygulamanın kararlılığını sağlamak, çökme (crash) analizlerini gerçekleştirmek ve sahte hesapları engellemek amacıyla cihaz modeli, işletim sistemi sürümü ve anonim cihaz tanıtıcıları.
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className={styles.cardSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconCircle}>
                  <Camera color="#F2D474" size={22} />
                </div>
                <h2 className={styles.sectionTitle}>2. Kamera, Fotoğraf ve Medya Verilerinin İşlenmesi</h2>
              </div>
              <p className={styles.sectionText}>
                Kahve falı ve el falı hizmetlerimizde fincan veya avuç içi fotoğrafları yüklenmektedir. Bu verilerle ilgili güvenlik taahhütlerimiz şunlardır:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Yüklediğiniz kahve fincanı veya tabak fotoğrafları yalnızca ilgili fal talebinizin yorumlanması ve analizi amacıyla sunucularımızda şifreli olarak işlenir.
                </li>
                <li className={styles.bulletItem}>
                  Kullanıcının yüzünü, kimliğini veya çevresini gösteren alakasız fotoğraflar sisteme yüklendiğinde otomatik olarak elenir ve depolanmaz.
                </li>
                <li className={styles.bulletItem}>
                  Görselleriniz üçüncü taraf şirketlere, veri simsarlarına veya reklam sağlayıcılarına kesinlikle devredilmez, satılmaz veya ticari amaçla paylaşılamaz.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className={styles.cardSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconCircle}>
                  <Headphones color="#F2D474" size={22} />
                </div>
                <h2 className={styles.sectionTitle}>3. Canlı Sesli Seanslar ve İletişim Güvenliği</h2>
              </div>
              <p className={styles.sectionText}>
                Uygulama üzerinden gerçekleştirilen canlı sesli seanslar dünya standartlarında güvenli RTC (Agora) bağlantı altyapısıyla çalışmaktadır:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <strong>Numara Gizliliği:</strong> Canlı seans esnasında telefon numaranız, soyadınız veya özel kişisel iletişim bilgileriniz karşı tarafa (falcıya) asla gösterilmez. İletişim yalnızca uygulama içi güvenli bağlantıyla sağlanır.
                </li>
                <li className={styles.bulletItem}>
                  <strong>Ses Kayıtları:</strong> Canlı sesli görüşmeler kullanıcının rızası ve bilgisi dışında kaydedilmez veya dinlenmez; sadece uçtan uca anlık ses iletimi olarak gerçekleşir.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className={styles.cardSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconCircle}>
                  <Lock color="#F2D474" size={22} />
                </div>
                <h2 className={styles.sectionTitle}>4. Ödemeler, Faturalandırma ve Google Play Güvencesi</h2>
              </div>
              <p className={styles.sectionText}>
                Falizo uygulamasında yapılan kredi satın alma ve uygulama içi ürün ödemeleri %100 doğrudan <strong>Google Play Faturalandırma Altyapısı (Google Play In-App Billing)</strong> üzerinden gerçekleştirilir:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Kredi kartı numaranız, CVV kodunuz veya banka hesap bilgileriniz asla sunucularımıza ulaşmaz, kaydedilmez ve sistemimizde tutulmaz.
                </li>
                <li className={styles.bulletItem}>
                  Ödemeleriniz Google’ın uluslararası PCI-DSS uyumlu finansal güvenlik kalkanı altında gerçekleşir.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className={styles.cardSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconCircle}>
                  <Server color="#F2D474" size={22} />
                </div>
                <h2 className={styles.sectionTitle}>5. Veri Saklama, Güvenlik ve Şifreleme</h2>
              </div>
              <p className={styles.sectionText}>
                Verileriniz yüksek güvenlikli kurumsal bulut sunucularımızda endüstri standardı SSL/TLS 256-bit uçtan uca şifreleme protokolleriyle korunur. Sistemlerimize yetkisiz erişimler gelişmiş güvenlik duvarları ve sıkı kimlik doğrulama protokolleriyle engellenir.
              </p>
            </section>

            {/* Section 6 */}
            <section className={styles.cardSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconCircle}>
                  <UserCheck color="#F2D474" size={22} />
                </div>
                <h2 className={styles.sectionTitle}>6. Kullanıcı Hakları ve Hesabımı Silme (Data Deletion)</h2>
              </div>
              <p className={styles.sectionText}>
                KVKK ve GDPR kapsamında tüm kullanıcılarımız aşağıdaki haklara koşulsuz sahiptir:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <strong>Hesap ve Veri Silme:</strong> Uygulama içindeki <em>Ayarlar &gt; Hesabımı Sil</em> menüsünden tek bir tıkla hesabınızı, fal geçmişinizi, yüklediğiniz tüm fotoğrafları ve profilinizi kalıcı olarak silebilirsiniz.
                </li>
                <li className={styles.bulletItem}>
                  <strong>Talep Hakkı:</strong> Verilerinizin durumunu öğrenmek, düzeltilmesini talep etmek veya sistemden tamamen arındırılmasını istemek için destek ekibimize e-posta gönderebilirsiniz.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className={styles.cardSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconCircle}>
                  <Phone color="#F2D474" size={22} />
                </div>
                <h2 className={styles.sectionTitle}>7. İletişim ve Veri Sorumlusu</h2>
              </div>
              <p className={styles.sectionText}>
                Gizlilik politikamız, kullanıcı sözleşmemiz veya kişisel veri haklarınızla ilgili her türlü soru, itiraz, geri bildirim veya yasal bildirim için resmi iletişim kanallarımız:
              </p>
              <div className={styles.contactBox}>
                <p style={{ margin: '0 0 0.4rem' }}><strong>Geliştirici &amp; Veri Sorumlusu:</strong> Maximora Studio</p>
                <p style={{ margin: '0 0 0.4rem' }}><strong>Resmi Destek E-Posta:</strong> <a href="mailto:destek@maximorashop.com" style={{ color: '#F2D474', textDecoration: 'none' }}>destek@maximorashop.com</a></p>
                <p style={{ margin: 0 }}><strong>Web Sitesi:</strong> <a href="https://maximorashop.com/falizo-home" style={{ color: '#F2D474', textDecoration: 'none' }}>maximorashop.com/falizo-home</a></p>
              </div>
            </section>

          </div>

          <div className={styles.lastUpdate}>
            Yürürlük Tarihi: 11 Ekim 2026 | Sürüm: 1.1.5 (Güncel &amp; Yasal Olarak Bağlayıcı)
          </div>

          {/* Footer */}
          <footer className={styles.footer}>
            <p style={{ margin: 0 }}>&copy; 2026 Maximora Studio. Tüm Hakları Saklıdır.</p>
          </footer>

        </div>
      </div>
    </>
  );
}
