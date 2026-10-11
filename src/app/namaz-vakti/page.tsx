"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { 
  Compass, Clock, BookOpen, ListChecks, Fingerprint, GraduationCap, History, 
  Sun, Heart, MapPin, HandHeart, Feather, Calculator, Book, CalendarCheck, 
  HelpCircle, Library, BookType, Headphones, Baby, MoonStar, Mic, 
  ShieldCheck, CalendarRange, Activity, Coins, Scroll, Bot, Download,
  ChevronRight, ArrowUpRight, Sparkles, CheckCircle2, ChevronDown, RotateCcw,
  Volume2
} from 'lucide-react';

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.namazapp.vakitleri";

// Hikmetname Havuzu
const HIKMET_LIST = [
  {
    arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    meal: '“Bilesiniz ki, kalpler ancak Allah’ı anmakla huzur ve sükûna kavuşur.”',
    source: 'Ra’d Sûresi, 28. Âyet-i Kerîme',
    category: 'Âyet-i Kerîme'
  },
  {
    arabic: 'الدُّعَاءُ مُخُّ الْعِبَادَةِ',
    meal: '“Dua, ibadetin özü ve iliğidir. Kul Rabbine dua ile yaklaşır.”',
    source: 'Tirmizî, Deavât 1',
    category: 'Hadîs-i Şerîf'
  },
  {
    arabic: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ',
    meal: '“Sabır ve namaz ile Allah’tan yardım dileyin. Şüphesiz namaz, huşû duyanlardan başkasına ağır gelir.”',
    source: 'Bakara Sûresi, 45. Âyet-i Kerîme',
    category: 'Âyet-i Kerîme'
  },
  {
    arabic: 'مَنْ صَلَّى عَلَيَّ صَلَاةً صَلَّى اللَّهُ عَلَيْهِ بِهَا عَشْرًا',
    meal: '“Kim bana bir defa salavat getirirse, Allah Teâlâ ona on rahmet tecelli ettirir.”',
    source: 'Müslim, Salât 70',
    category: 'Hadîs-i Şerîf'
  },
  {
    arabic: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ',
    meal: '“Ey kalpleri halden hale çeviren Allah’ım! Benim kalbimi dinin ve rızan üzere sabit kıl.”',
    source: 'Tirmizî, Kader 7',
    category: 'Nebevî Dua'
  },
  {
    arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    meal: '“Şüphesiz her zorlukla beraber bir kolaylık muhakkak vardır.”',
    source: 'İnşirah Sûresi, 6. Âyet-i Kerîme',
    category: 'Âyet-i Kerîme'
  }
];

// 27 Zengin İslami Modül
const featuresData = [
  { category: 'ibadet', Icon: Bot, title: "İmam AI (Yapay Zeka)", desc: "Aklınıza takılan tüm dini ve fıkhi soruları saniyeler içinde cevaplayan akıllı İslami asistanınız.", details: "Kur'an-ı Kerim, muteber hadis külliyatları ve Diyanet fetvaları ışığında güvenilir dini rehberlik." },
  { category: 'ibadet', Icon: Clock, title: "Tam Zamanında Vakitler", desc: "Diyanet ile tam uyumlu, konumunuza özel kesin namaz vakitleri ve ezan bildirimleri.", details: "GPS ile dünya çapında hassas hesaplama, ezan vakti öncesi ve anı sesli ezan hatırlatıcıları." },
  { category: 'ibadet', Icon: Compass, title: "Kıble Pusulası", desc: "Dünyanın neresinde olursanız olun, gelişmiş 3D pusula ile kıblenizi saniyeler içinde bulun.", details: "Cihaz sensörleri ve harita desteğiyle en doğru Kabe istikametini milimetrik tespit edin." },
  { category: 'kuran', Icon: BookOpen, title: "Kur'an-ı Kerim", desc: "Mushaf görünümü ile Kur'an-ı Kerim okuyun, ayetlerin meallerine ve tefsirlerine kolayca ulaşın.", details: "Arapça hat, Latin harfli okunuş, Diyanet meali ve ünlü hafızlardan sesli tilavet dinleme." },
  { category: 'kuran', Icon: Scroll, title: "Haftanın Hutbesi", desc: "Diyanet İşleri Başkanlığı'nın her cuma yayımladığı cuma hutbelerini anında okuyun.", details: "Cuma gününe özel manevi hazırlık ve güncel hutbe arşivine tek tıkla erişim." },
  { category: 'arac', Icon: MapPin, title: "Yakındaki Camiler", desc: "Bulunduğunuz konuma en yakın camileri harita üzerinde kolayca keşfedin ve yol tarifi alın.", details: "Cemaatle namaz kılabilmeniz için mesafe ve rota bilgisiyle cami bulma rehberi." },
  { category: 'zikir', Icon: Fingerprint, title: "Zikirmatik & Tesbihat", desc: "Gelişmiş dijital zikirmatik ile tesbihatlarınızı çekin, zikir hedeflerinizi belirleyin.", details: "Titreşimli geri bildirim, sesli sayaç ve namaz sonrası tesbihat duaları." },
  { category: 'zikir', Icon: HandHeart, title: "Gönül Köprüsü", desc: "Dualarda buluşmak için Gönül Köprüsü ile diğer kullanıcılarla manevi bağ kurun.", details: "Toplu dua halkaları, hasta ve darda olanlar için ortak manevi destek platformu." },
  { category: 'kuran', Icon: Feather, title: "Hikmetname", desc: "Her güne özel seçilmiş altın değerindeki dini sözler ve hikmetli mesajlarla ruhunuzu besleyin.", details: "Günün ayeti, günün hadisi ve İslam büyüklerinden ilham verici hikmetli sözler." },
  { category: 'arac', Icon: Calculator, title: "Zekatmatik", desc: "Mal varlığınızı girerek vermeniz gereken zekat miktarını en doğru ve kolay şekilde hesaplayın.", details: "Nisap miktarı, altın, döviz ve birikimlerinize göre otomatik Diyanet uyumlu hesaplama." },
  { category: 'arac', Icon: Coins, title: "Fitre Hesaplama", desc: "Ailenizin fitre miktarını güncel Diyanet verilerine göre hızlıca ve güvenle hesaplayın.", details: "Ramazan ayı için güncel asgari fitre tutarları üzerinden kişi başı net miktar." },
  { category: 'ibadet', Icon: Book, title: "Resimli Namaz Rehberi", desc: "Beş vakit namazın kılınışını, dualarını ve surelerini resimli ve anlatımlı rehberle öğrenin.", details: "Abdest alışı, namaz rekatları, vacipler ve sehiv secdesi gibi temel fıkıh rehberi." },
  { category: 'ibadet', Icon: CalendarCheck, title: "İbadet Takibi", desc: "Günlük ibadetlerinizi kaydedin, aylık veya yıllık grafiklerle gelişiminizi gözlemleyin.", details: "Namaz, oruç, Kur'an okuma ve zikir hedeflerinizin görsel başarı istatistikleri." },
  { category: 'kuran', Icon: HelpCircle, title: "Dini Bilgi Yarışması", desc: "İslami konulardaki bilgi seviyenizi ölçün ve eğlenerek yeni dini bilgiler öğrenin.", details: "Siyer, fıkıh, akaid ve İslam tarihi kategorilerinde yüzlerce eğitici soru." },
  { category: 'kuran', Icon: Library, title: "Siyer-i Nebi", desc: "Peygamber Efendimiz'in (SAV) örnek hayatını ve İslam tarihinin önemli olaylarını okuyun.", details: "Kronolojik anlatım, Mekke ve Medine dönemleri, sahabelerin örnek hayatları." },
  { category: 'kuran', Icon: BookType, title: "İslami Sözlük", desc: "Dini terimlerin, kavramların ve tasavvufi kelimelerin anlamlarını geniş sözlükten öğrenin.", details: "A'dan Z'ye kapsamlı fıkhi, kelami ve ahlaki kavramlar ansiklopedisi." },
  { category: 'zikir', Icon: Headphones, title: "Huzur Modu", desc: "Dinlendirici doğal sesler eşliğinde zikir veya ibadet yaparken manevi bir atmosfere girin.", details: "Su şırıltısı, yağmur, rüzgar ve ney ezgileriyle dikkatinizi toplayan sakinleştirici mod." },
  { category: 'arac', Icon: Baby, title: "İslami Bebek İsimleri", desc: "Kur'an-ı Kerim'de geçen ve dini anlamı güzel olan kız ve erkek bebek isimlerini inceleyin.", details: "Yüzlerce ismin kökeni, manası ve Kur'an'da geçtiği ayet referansları." },
  { category: 'kuran', Icon: MoonStar, title: "İslami Rüya Tabirleri", desc: "İslami kaynaklara dayanan detaylı rüya tabirleri sözlüğü ile rüyalarınızın anlamını bulun.", details: "İbn-i Sirin ve Nablusi gibi büyük İslam alimlerinin rüya yorumları külliyatı." },
  { category: 'kuran', Icon: Mic, title: "Aşr-ı Şerifler", desc: "Özel günlerde okunan Aşr-ı Şerifleri dinleyin, Arapça ve Türkçe meallerini takip edin.", details: "Kandil, bayram ve cuma günlerine özel seçkin hafızlardan Kur'an tilavetleri." },
  { category: 'zikir', Icon: ShieldCheck, title: "Cevşen-ül Kebir", desc: "Peygamber Efendimiz'e vahyedilen bu eşsiz duayı okuyun ve manevi zırhınızı kuşanın.", details: "100 bablık tam Cevşen metni, Türkçe okunuşu ve açıklamalı manası." },
  { category: 'arac', Icon: CalendarRange, title: "Dini Günler ve Hicri Takvim", desc: "Kandiller, bayramlar ve üç aylar gibi önemli dini günleri kaçırmadan takip edin.", details: "Hicri-Miladi tarih çevirici ve yaklaşan mübarek geceler için geri sayım sayacı." },
  { category: 'ibadet', Icon: ListChecks, title: "Kaza Namazı Takibi", desc: "Kaçırdığınız namazların ve oruçların çetelesini tutun, kaza borçlarınızı kolayca yönetin.", details: "Otomatik düşme sayacı, tamamlanan kazalar ve kaza borcu bitiş tahminleri." },
  { category: 'zikir', Icon: Activity, title: "Düzenli Zikir Programı", desc: "Günlük düzenli zikir hedeflerinizi belirleyin ve programlı bir şekilde ibadet edin.", details: "Sabah ve akşam me'surat duaları, günlük virdler ve haftalık ibadet planı." },
  { category: 'ibadet', Icon: History, title: "Kerâhet Vakitleri", desc: "İbadet edilmesi uygun olmayan kerâhet vakitlerini takip edin, namazlarınızı planlayın.", details: "Güneş doğuşu, zeval vakti ve batış öncesi hassas kerâhet uyarıları." },
  { category: 'zikir', Icon: Heart, title: "Esmaül Hüsna", desc: "Allah'ın 99 ismini, anlamlarını ve faziletlerini keşfedin, derin manalara yolculuk yapın.", details: "Arapça yazılış, zikir sayıları ve her esmanın ruha getirdiği şifa tecellileri." },
  { category: 'kuran', Icon: Sun, title: "40 Hadis-i Şerif", desc: "Peygamber Efendimizin (SAV) seçme hadis-i şeriflerini okuyun ve hayatınıza rehber edinin.", details: "İmam Nevevi'nin 40 Hadis derlemesi, günümüz hayatına dair hikmetli dersler." }
];

// Sıkça Sorulan Sorular
const FAQ_ITEMS = [
  {
    q: "Namaz vakitleri Diyanet İşleri Başkanlığı ile tam uyumlu mu?",
    a: "Evet, uygulamamızdaki namaz vakitleri Diyanet İşleri Başkanlığı'nın resmi veritabanı ve koordinat hesaplama algoritmalarıyla %100 uyumludur. Konumunuza göre milimetrik doğrulukta hesaplanır."
  },
  {
    q: "İnternet bağlantım olmadığında vakitleri görebilir miyim?",
    a: "Kesinlikle evet. Uygulamayı ilk kez açtığınızda bulunduğunuz şehrin 30 günlük vakit verileri cihazınıza yerel olarak kaydedilir; böylece internetsiz veya uçak modundayken bile ezan vakitlerini ve pusulayı sorunsuz kullanabilirsiniz."
  },
  {
    q: "İmam AI (Yapay Zeka) dini asistanı fetvaları nereden alıyor?",
    a: "İmam AI, Kur'an-ı Kerim âyetleri, Kütüb-i Sitte hadis külliyatı ve Diyanet İşleri Başkanlığı Din İşleri Yüksek Kurulu'nun muteber fetvaları taranarak eğitilmiştir. Fıkhi ve akidevi konularda güvenilir rehberlik sağlar."
  },
  {
    q: "Kıble pusulası için internet veya GPS gerekiyor mu?",
    a: "Pusula, cihazınızın yerleşik manyetik manyetometre sensörünü kullanır. GPS açık olduğunda en doğru Kabe açısı (derece) saniyeler içinde hesaplanır ve internet gerektirmez."
  },
  {
    q: "Ezan vakti alarmları telefonun bataryasını tüketir mi?",
    a: "Hayır. Uygulamamız Android sisteminin en güncel arka plan optimizasyon standartlarına göre geliştirilmiştir. Pil tasarrufu modu açıkken bile yalnızca ezan vaktinde uyanır ve minimum pil tüketir."
  },
  {
    q: "Kaza namazı çetelesi ve zikir hedeflerim telefon değişince silinir mi?",
    a: "Google hesabınızla giriş yaptığınız takdirde kaza namazları, zikir sayaçları ve ibadet takipleriniz güvenli bulut sunucularımıza şifreli olarak yedeklenir. Telefon değiştirseniz bile tüm kayıtlarınız korunur."
  }
];

export default function NamazLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<any>(null);
  
  // Hikmetname State
  const [currentHikmetIndex, setCurrentHikmetIndex] = useState(0);

  // Kategori Filtresi State
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ibadet' | 'kuran' | 'zikir' | 'arac'>('all');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll(`.${styles.revealItem}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selectedCategory]);

  // Yeni Hikmet Çekme
  const handleNextHikmet = () => {
    setCurrentHikmetIndex((prev) => (prev + 1) % HIKMET_LIST.length);
  };

  const currentHikmet = HIKMET_LIST[currentHikmetIndex];

  // Filtrelenmiş Özellikler
  const filteredFeatures = selectedCategory === 'all' 
    ? featuresData 
    : featuresData.filter(f => f.category === selectedCategory);

  useEffect(() => {
    document.body.style.backgroundColor = '#03140C';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className={styles.landing}>
        {/* Ambient emerald lights */}
        <div className={styles.spaceBackground} />
        <div className={styles.starsOverlay} />

        {/* Custom Emerald Glass Header */}
        <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
          <div className={styles.container}>
            <div className={styles.headerInner}>
              <Link href="/namaz-vakti" className={styles.brand}>
                <Image 
                  src="/namaz/icon.png" 
                  alt="Namaz Vakti Logo" 
                  width={44} 
                  height={44} 
                  className={styles.brandLogo}
                />
                <div className={styles.brandTextWrapper}>
                  <span className={styles.brandName}>Namaz Vakti</span>
                  <span className={styles.brandTagline}>Osmanlı Zümrüt Serisi</span>
                </div>
              </Link>

              <nav className={styles.navLinks}>
                <a href="#hero" className={styles.navLink}>Ana Sayfa</a>
                <a href="#hikmetname" className={styles.navLink}>Hikmetname</a>
                <a href="#ozellikler" className={styles.navLink}>27 Modül</a>
                <a href="#ekranlar" className={styles.navLink}>Ekranlar</a>
                <a href="#sss" className={styles.navLink}>SSS</a>
              </nav>

              <a 
                href={PLAY_STORE_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.headerCta}
              >
                <Download size={16} />
                <span>Google Play'den İndir</span>
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              
              {/* Left Column: Hero Text */}
              <div className={`${styles.heroContent} ${styles.revealItem}`}>
                <div className={styles.heroBadge}>
                  <span className={styles.pulseDot} />
                  <span className={styles.badgeText}>Osmanlı Zümrüt Serisi • Diyanet Uyumlu</span>
                </div>

                <h1 className={styles.heroTitle}>
                  Huzurun ve İbadetin <br />
                  <span className={styles.goldGradientText}>Zümrüt Asaleti</span>
                </h1>

                <p className={styles.heroSubtitle}>
                  Osmanlı’nın kadim estetiğini zümrüt yeşili ve varaklı altınla buluşturan, modern cam arayüzüyle ibadetlerinize huşû katan en kapsamlı namaz vakti uygulaması.
                </p>

                <div className={styles.heroActionGroup}>
                  <a 
                    href={PLAY_STORE_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.playStoreBtn}
                  >
                    <Image 
                      src="/googlebuton.png" 
                      alt="Google Play'den İndirin" 
                      width={180} 
                      height={58} 
                      className={styles.playStoreImg}
                    />
                  </a>

                  <a href="#ozellikler" className={styles.secondaryCtaBtn}>
                    <Sparkles size={18} />
                    <span>27 Modülü Keşfet</span>
                  </a>
                </div>

                {/* Stats Bar */}
                <div className={styles.heroStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>27+</span>
                    <span className={styles.statLabel}>Zengin İslami Modül</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>%100</span>
                    <span className={styles.statLabel}>Diyanet Hassasiyeti</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>İmam AI</span>
                    <span className={styles.statLabel}>Akıllı Fıkıh Asistanı</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Dome / Portal Showcase */}
              <div className={`${styles.cylinderStage} ${styles.revealItem}`}>
                <div className={styles.cylinderAura} />
                <div className={styles.cylinderRing} />
                <div className={styles.cylinderRingInner} />

                {/* Floating Glass Chips */}
                <div className={styles.floatingBadgeTop}>
                  <div className={styles.pulseDot} style={{ background: '#F2D474', boxShadow: '0 0 10px #F2D474' }} />
                  <div className={styles.badgeTextCol}>
                    <span className={styles.badgeTitle}>Diyanet Uyumlu</span>
                    <span className={styles.badgeSubtitle}>Kesin Vakitler & Ezanlar</span>
                  </div>
                </div>

                <div className={styles.floatingBadgeBottom}>
                  <Compass size={20} color="#34D399" />
                  <div className={styles.badgeTextCol}>
                    <span className={styles.badgeTitle}>Hassas Kıble</span>
                    <span className={styles.badgeSubtitle}>3D Canlı Pusula</span>
                  </div>
                </div>

                <div className={styles.floatingBadgeCenter}>
                  <Bot size={18} color="#F2D474" />
                  <div className={styles.badgeTextCol}>
                    <span className={styles.badgeTitle}>İmam AI Aktif</span>
                    <span className={styles.badgeSubtitle}>Dini Sorulara Yanıt</span>
                  </div>
                </div>

                {/* Main 3D Cylinder Frame Visual featuring Mosque BG */}
                <div className={styles.cylinderFrame}>
                  <div className={styles.cylinderImageWrapper}>
                    <Image 
                      src="/namaz/mosque_bg.jpg" 
                      alt="Namaz Vakti Osmanlı Zümrüt Camii Atmosferi" 
                      width={600} 
                      height={660} 
                      priority 
                      className={styles.cylinderImage}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Günün Hikmetnamesi & Âyet-i Kerîmesi (Manevi Pusula) */}
        <section id="hikmetname" className={styles.hikmetSection}>
          <div className={styles.container}>
            <div className={`${styles.hikmetCard} ${styles.revealItem}`}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#F2D474', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <Sparkles size={16} />
                <span>GÜNÜN HİKMETNAMESİ • {currentHikmet.category}</span>
              </div>

              <div className={styles.hikmetArabic}>
                {currentHikmet.arabic}
              </div>

              <div className={styles.hikmetMeaning}>
                {currentHikmet.meal}
              </div>

              <div className={styles.hikmetSource}>
                — {currentHikmet.source}
              </div>

              <button 
                type="button"
                className={styles.secondaryCtaBtn}
                style={{ display: 'inline-flex', margin: '0 auto', cursor: 'pointer' }}
                onClick={handleNextHikmet}
              >
                <Feather size={16} />
                <span>Yeni Hikmet Oku</span>
              </button>
            </div>
          </div>
        </section>

        {/* 27 Islamic Features Grid with Filter Tabs */}
        <section id="ozellikler" className={styles.featuresSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} ${styles.revealItem}`}>
              <div className={styles.sectionPill}>
                <BookOpen size={14} />
                <span>27 Zengin İslami Hizmet</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Ruhunuza Şifa Olacak <span className={styles.goldGradientText}>Eşsiz Özellikler</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                İbadet hayatınızı düzenleyen, manevi bilginizi zenginleştiren ve sizi her an kıbleye yönelten hepsi bir arada İslami kütüphane.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className={`${styles.categoryTabs} ${styles.revealItem}`}>
              <button 
                type="button" 
                className={`${styles.categoryBtn} ${selectedCategory === 'all' ? styles.categoryBtnActive : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                Tümü (27)
              </button>
              <button 
                type="button" 
                className={`${styles.categoryBtn} ${selectedCategory === 'ibadet' ? styles.categoryBtnActive : ''}`}
                onClick={() => setSelectedCategory('ibadet')}
              >
                Vakit & İbadet (7)
              </button>
              <button 
                type="button" 
                className={`${styles.categoryBtn} ${selectedCategory === 'kuran' ? styles.categoryBtnActive : ''}`}
                onClick={() => setSelectedCategory('kuran')}
              >
                Kur'an & İlim (9)
              </button>
              <button 
                type="button" 
                className={`${styles.categoryBtn} ${selectedCategory === 'zikir' ? styles.categoryBtnActive : ''}`}
                onClick={() => setSelectedCategory('zikir')}
              >
                Zikir & Dua (6)
              </button>
              <button 
                type="button" 
                className={`${styles.categoryBtn} ${selectedCategory === 'arac' ? styles.categoryBtnActive : ''}`}
                onClick={() => setSelectedCategory('arac')}
              >
                Hesaplama & Araçlar (5)
              </button>
            </div>

            <div className={styles.featuresGrid}>
              {filteredFeatures.map((feature, idx) => {
                const IconComp = feature.Icon;
                return (
                  <div 
                    key={idx} 
                    className={`${styles.featureCard} ${styles.revealItem}`}
                    onClick={() => setActiveModal(feature)}
                  >
                    <div className={styles.featureIconBox}>
                      <IconComp size={28} color="#F2D474" />
                    </div>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDesc}>{feature.desc}</p>
                    <div className={styles.featureBadge}>
                      <span>Detayları İncele</span>
                      <ChevronRight size={15} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Infinite Auto-Glide App Screens Showcase */}
        <section id="ekranlar" className={styles.showcaseSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} ${styles.revealItem}`}>
              <div className={styles.sectionPill}>
                <Sparkles size={14} />
                <span>Cam Tasarım & Zümrüt Estetik</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Uygulamadan <span className={styles.emeraldGradientText}>Göz Alıcı Kareler</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Osmanlı zümrüt desenleri ve akıcı arayüzü ile ibadetlerinizi huzurla takip edin.
              </p>
            </div>

            <div className={styles.screenshotsMarqueeContainer}>
              <div className={styles.screenshotsTrack}>
                {['screen1', '2', '3', '4', '5', '6', '7', '8', '9', 'screen1', '2', '3', '4', '5', '6', '7', '8', '9'].map((screenName, i) => (
                  <div key={i} className={styles.screenMockup}>
                    <img 
                      src={`/namaz/${screenName}.png`} 
                      alt={`Namaz Vakti Uygulama Arayüzü ${i + 1}`} 
                      className={styles.screenImg}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sıkça Sorulan Sorular (SSS) Accordion Section */}
        <section id="sss" className={styles.faqSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} ${styles.revealItem}`}>
              <div className={styles.sectionPill}>
                <HelpCircle size={14} />
                <span>Merak Edilenler</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Sıkça Sorulan <span className={styles.goldGradientText}>Sorular</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Namaz Vakti Osmanlı Zümrüt Serisi hakkında merak ettiğiniz tüm detaylar.
              </p>
            </div>

            <div className={`${styles.faqList} ${styles.revealItem}`}>
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
                    <button 
                      type="button"
                      className={styles.faqQuestion}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    >
                      <span>{item.q}</span>
                      <ChevronDown 
                        size={20} 
                        style={{ 
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                          color: '#F2D474',
                          flexShrink: 0
                        }} 
                      />
                    </button>
                    {isOpen && (
                      <div className={styles.faqAnswer}>
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Download Banner */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={`${styles.ctaBox} ${styles.revealItem}`}>
              <h2 className={styles.ctaTitle}>
                Manevi Yolculuğunuza <br />
                <span className={styles.goldGradientText}>Bugün Başlayın</span>
              </h2>
              <p className={styles.ctaSubtitle}>
                Namaz Vakti uygulamasını hemen Google Play'den ücretsiz indirin; ezan bildirimlerinden İmam AI desteğine kadar tüm özelliklerden anında faydalanın.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                <a 
                  href={PLAY_STORE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.playStoreBtn}
                >
                  <Image 
                    src="/googlebuton.png" 
                    alt="Google Play'den İndirin" 
                    width={200} 
                    height={64} 
                    className={styles.playStoreImg}
                  />
                </a>
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', opacity: 0.85, fontSize: '0.85rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={16} color="#F2D474" />
                  Diyanet İşleri Başkanlığı Veri Hassasiyeti
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={16} color="#F2D474" />
                  Kesintisiz Ezan Alarmları
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={16} color="#F2D474" />
                  %100 Güvenli & Ücretsiz Kullanım
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.container}>
            <div className={styles.footerGrid}>
              <div className={styles.footerCol}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Image 
                    src="/namaz/icon.png" 
                    alt="Namaz Vakti Logo" 
                    width={36} 
                    height={36} 
                    style={{ borderRadius: '10px' }} 
                  />
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>Namaz Vakti</span>
                </div>
                <p style={{ fontSize: '0.88rem', lineHeight: '1.6', margin: 0, color: '#8DBCA5' }}>
                  Osmanlı Zümrüt Serisi: Diyanet uyumlu namaz vakitleri, Kıble pusulası, İmam AI ve 27 zengin İslami modül tek bir cam arayüzde. Maximora Studio güvencesiyle.
                </p>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Hızlı Bağlantılar</h4>
                <ul className={styles.footerLinks}>
                  <li><a href="#hero" className={styles.footerLink}>Ana Sayfa</a></li>
                  <li><a href="#hikmetname" className={styles.footerLink}>Hikmetname</a></li>
                  <li><a href="#ozellikler" className={styles.footerLink}>27 Modül</a></li>
                  <li><a href="#ekranlar" className={styles.footerLink}>Ekranlar</a></li>
                  <li><a href="#sss" className={styles.footerLink}>Sıkça Sorulan Sorular</a></li>
                </ul>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Yasal & Güvenlik</h4>
                <ul className={styles.footerLinks}>
                  <li><Link href="/namaz-vakti-gizlilik" className={styles.footerLink}>Gizlilik Politikası</Link></li>
                  <li><Link href="/namaz-vakti-veri-guvenligi" className={styles.footerLink}>Veri Güvenliği ve Yedekleme</Link></li>
                  <li><a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Google Play Mağazası</a></li>
                  <li><a href="mailto:destek@maximorashop.com" className={styles.footerLink}>destek@maximorashop.com</a></li>
                </ul>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Maximora Ekosistemi</h4>
                <ul className={styles.footerLinks}>
                  <li><Link href="/falizo-home" className={styles.footerLink}>Falizo: Kahve Falı & Tarot</Link></li>
                  <li><Link href="/ototakip-pro" className={styles.footerLink}>Oto Takip Pro</Link></li>
                  <li><Link href="/para-kontrol" className={styles.footerLink}>Harcama Rehberi</Link></li>
                  <li><Link href="/studio" className={styles.footerLink}>Maximora Studio</Link></li>
                </ul>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <span>&copy; 2026 Maximora Studio. Tüm Hakları Saklıdır.</span>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <Link href="/namaz-vakti-gizlilik" style={{ color: '#F2D474', textDecoration: 'none' }}>Gizlilik Politikası</Link>
                <span>|</span>
                <Link href="/namaz-vakti-veri-guvenligi" style={{ color: '#F2D474', textDecoration: 'none' }}>Veri Güvenliği</Link>
                <span>|</span>
                <span style={{ color: '#8DBCA5' }}>Geliştirici: Maximora Studio</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Feature Detail Modal */}
        {activeModal && (
          <div className={styles.modalOverlay} onClick={() => setActiveModal(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button type="button" className={styles.modalClose} onClick={() => setActiveModal(null)}>✕</button>
              <div className={styles.featureIconBox} style={{ margin: '0 auto 1.25rem' }}>
                <activeModal.Icon size={32} color="#F2D474" />
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.75rem' }}>
                {activeModal.title}
              </h3>
              <p style={{ color: '#E2F5EC', fontSize: '0.98rem', lineHeight: '1.7', margin: '0 0 1.5rem' }}>
                {activeModal.details || activeModal.desc}
              </p>
              <a 
                href={PLAY_STORE_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.secondaryCtaBtn}
                style={{ display: 'inline-flex' }}
              >
                <Download size={16} />
                <span>Uygulamada Kullan</span>
              </a>
            </div>
          </div>
        )}

      </div>
  );
}
