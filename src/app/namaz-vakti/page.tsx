"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import { 
  Compass, Clock, BookOpen, ListChecks, Fingerprint, GraduationCap, History, 
  Sun, Heart, MapPin, HandHeart, Feather, Calculator, Book, CalendarCheck, 
  HelpCircle, Library, BookType, Headphones, Baby, MoonStar, Mic, 
  ShieldCheck, CalendarRange, Activity, Coins, Scroll
} from 'lucide-react';
import Image from 'next/image';

const featuresData = [
  { Icon: Clock, title: "Tam Zamanında", desc: "Diyanet ile tam uyumlu, konumunuza özel kesin namaz vakitleri ve bildirimler." },
  { Icon: Compass, title: "Kıble Pusulası", desc: "Dünyanın neresinde olursanız olun, gelişmiş pusula ile kıblenizi saniyeler içinde bulun." },
  { Icon: BookOpen, title: "Kur'an-ı Kerim", desc: "Mushaf görünümü ile Kur'an-ı Kerim okuyun, ayetlerin meallerine kolayca ulaşın." },
  { Icon: Scroll, title: "Haftanın Hutbesi", desc: "Diyanet İşleri Başkanlığı'nın her hafta yayımladığı cuma hutbelerini anında okuyun." },
  { Icon: MapPin, title: "Cami Bul", desc: "Bulunduğunuz konuma en yakın camileri harita üzerinde kolayca keşfedin ve yol tarifi alın." },
  { Icon: HandHeart, title: "Gönül Köprüsü", desc: "Dualarda buluşmak için Gönül Köprüsü ile diğer kullanıcılarla manevi bağ kurun." },
  { Icon: Feather, title: "Hikmetname", desc: "Her güne özel seçilmiş altın değerindeki dini sözler ve hikmetli mesajlarla ruhunuzu besleyin." },
  { Icon: Calculator, title: "Zekatmatik", desc: "Mal varlığınızı girerek vermeniz gereken zekat miktarını en doğru ve kolay şekilde hesaplayın." },
  { Icon: Coins, title: "Fitre Hesaplama", desc: "Ailenizin fitre miktarını güncel Diyanet verilerine göre hızlıca hesaplayın." },
  { Icon: Book, title: "Namaz Rehberi", desc: "Beş vakit namazın kılınışını, dualarını ve surelerini resimli ve anlatımlı rehberle öğrenin." },
  { Icon: CalendarCheck, title: "İbadet Takibi", desc: "Günlük ibadetlerinizi kaydedin, aylık veya yıllık grafiklerle gelişiminizi gözlemleyin." },
  { Icon: HelpCircle, title: "Bilgi Yarışması", desc: "İslami konulardaki bilgi seviyenizi ölçün ve eğlenerek yeni dini bilgiler öğrenin." },
  { Icon: Library, title: "Siyer-i Nebi", desc: "Peygamber Efendimiz'in (SAV) örnek hayatını ve İslam tarihinin önemli olaylarını okuyun." },
  { Icon: BookType, title: "İslami Sözlük", desc: "Dini terimlerin, kavramların ve tasavvufi kelimelerin anlamlarını geniş sözlükten öğrenin." },
  { Icon: Headphones, title: "Huzur Modu", desc: "Dinlendirici sesler eşliğinde zikir veya ibadet yaparken manevi bir atmosfere girin." },
  { Icon: Baby, title: "Bebek İsimleri", desc: "Kur'an-ı Kerim'de geçen ve dini anlamı güzel olan kız ve erkek bebek isimlerini inceleyin." },
  { Icon: MoonStar, title: "Rüya Tabirleri", desc: "İslami kaynaklara dayanan detaylı rüya tabirleri sözlüğü ile rüyalarınızın anlamını bulun." },
  { Icon: Mic, title: "Aşr-ı Şerifler", desc: "Özel günlerde okunan Aşr-ı Şerifleri dinleyin, Arapça ve Türkçe meallerini takip edin." },
  { Icon: ShieldCheck, title: "Cevşen-ül Kebir", desc: "Peygamber Efendimiz'e vahyedilen bu eşsiz duayı okuyun ve manevi zırhınızı kuşanın." },
  { Icon: CalendarRange, title: "Dini Günler ve Geceler", desc: "Kandiller, bayramlar ve üç aylar gibi önemli dini günleri kaçırmadan takvimden takip edin." },
  { Icon: ListChecks, title: "Kaza Takibi", desc: "Kaçırdığınız namazların ve oruçların çetelesini tutun, kaza borçlarınızı kolayca yönetin." },
  { Icon: Fingerprint, title: "Zikirmatik", desc: "Gelişmiş dijital zikirmatik ile tesbihatlarınızı çekin, zikir hedeflerinizi belirleyin." },
  { Icon: Activity, title: "Zikir Programı", desc: "Günlük düzenli zikir hedeflerinizi belirleyin ve programlı bir şekilde ibadet edin." },
  { Icon: History, title: "Kerâhet Vakitleri", desc: "İbadet edilmesi uygun olmayan kerâhet vakitlerini takip edin, ibadetlerinizi planlayın." },
  { Icon: Heart, title: "Esmaül Hüsna", desc: "Allah'ın 99 ismini, anlamlarını ve faziletlerini keşfedin, derin manalara yolculuk yapın." },
  { Icon: Sun, title: "40 Hadis", desc: "Peygamber Efendimizin (SAV) seçme hadis-i şeriflerini okuyun ve hayatınıza rehber edinin." }
];

export default function NamazLandingPage() {
  const [activeModal, setActiveModal] = useState<any>(null);

  return (
    <div className={styles.landing}>
      {/* Hero Section */}
      <section className={styles.hero}>
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
            className={styles.playButtonImageWrap}
          >
            <img 
              src="/googlebuton.png" 
              alt="Google Play'den Alın" 
              className={styles.playButtonImage}
            />
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
          {featuresData.map((feature, idx) => (
            <div 
              key={idx} 
              className={styles.featureCard}
              onClick={() => setActiveModal(feature)}
            >
              <feature.Icon className={styles.featureIcon} color="#D4AF37" />
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Modal Overlay */}
        {activeModal && (
          <div className={styles.modalOverlay} onClick={() => setActiveModal(null)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <button className={styles.modalClose} onClick={() => setActiveModal(null)}>✕</button>
              <activeModal.Icon size={48} color="#D4AF37" className={styles.modalIcon} />
              <h3 className={styles.modalTitle}>{activeModal.title}</h3>
              <p className={styles.modalDesc}>{activeModal.desc}</p>
            </div>
          </div>
        )}
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
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
          <a href="/namaz-vakti-gizlilik" style={{ color: '#D4AF37', textDecoration: 'none' }}>Gizlilik Politikası</a>
          <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>|</span>
          <a href="/namaz-vakti-veri-guvenligi" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 'bold' }}>Veri Güvenliği ve Yedekleme</a>
        </p>
      </footer>
    </div>
  );
}
