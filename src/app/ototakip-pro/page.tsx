"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { 
  CarFront, 
  Fuel, 
  Wrench, 
  Bell, 
  Activity, 
  Cloud,
  FileText,
  ShieldCheck,
  BarChart3,
  CalendarDays,
  Camera,
  Coins,
  ChevronDown,
  Download,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Gauge,
  ClipboardList,
  Layers,
  ArrowRight,
  FileSpreadsheet
} from 'lucide-react';

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.maximora.autotrackpro";

interface FeatureItem {
  id: string;
  category: 'yakit' | 'bakim' | 'garaj' | 'rapor';
  categoryLabel: string;
  Icon: React.ElementType;
  title: string;
  desc: string;
  tag: string;
  details: string;
}

const featuresData: FeatureItem[] = [
  {
    id: 'coklu-arac',
    category: 'garaj',
    categoryLabel: 'Garaj & Filo',
    Icon: CarFront,
    title: "Çoklu Araç Garajı",
    desc: "Tüm araçlarınızı tek bir dijital garajda toplayın. Hem kişisel araçlarınız hem ticari filonuz için ideal çözüm.",
    tag: "Sınırsız Araç",
    details: "Motosiklet, binek otomobil, hafif ticari veya filo araçlarınızı plaka, şasi no ve ruhsat bilgileriyle ayrı ayrı yönetin."
  },
  {
    id: 'yakit-takip',
    category: 'yakit',
    categoryLabel: 'Yakıt & Masraf',
    Icon: Fuel,
    title: "Yakıt & Tüketim Analizi",
    desc: "Her yakıt alımınızı litre ve tutar bazında kaydedin; kilometre başına düşen yakıt maliyetinizi anında görün.",
    tag: "Net Hesap",
    details: "Depoyu her fullediğinizde tüketim trendinizi hesaplar; agresif sürüş veya arıza kaynaklı tüketim artışlarını hemen yakalar."
  },
  {
    id: 'periyodik-bakim',
    category: 'bakim',
    categoryLabel: 'Bakım & Muayene',
    Icon: Wrench,
    title: "Periyodik Bakım Geçmişi",
    desc: "Motor yağı, filtreler, fren balataları, triger kayışı gibi tüm bakım geçmişinizi detaylıca kayıt altına alın.",
    tag: "Dijital Servis",
    details: "Parça maliyeti, işçilik ücreti ve servis adı bilgileriyle tam servis karnesi oluşturun; aracınızın ikinci el değerini koruyun."
  },
  {
    id: 'akilli-hatirlatici',
    category: 'bakim',
    categoryLabel: 'Bakım & Muayene',
    Icon: Bell,
    title: "Akıllı Hatırlatıcılar & Alarmlar",
    desc: "Kasko, Zorunlu Trafik Sigortası, TÜVTÜRK Muayenesi ve MTV ödeme tarihlerini asla unutmayın. Önceden bildirim alın.",
    tag: "Ceza Önleyici",
    details: "Tarihi yaklaşan veya kilometresi dolan bakım ve resmi işlemler için 30, 15 ve 3 gün kala akıllı telefon bildirimleri alın."
  },
  {
    id: 'kara-kutu',
    category: 'garaj',
    categoryLabel: 'Garaj & Filo',
    Icon: Activity,
    title: "Kara Kutu (Kaza & Olay Kaydı)",
    desc: "Ufak tefek sürtmeler, kaza tutanakları, lastik değişimleri ve rot ayarlarını fotoğraflı kanıtlarla arşivleyin.",
    tag: "Ekspertiz Hazır",
    details: "Kaza tarihi, karşı taraf bilgileri, tramer durumu ve hasar fotoğraflarını güvenle saklayın. Ekspertizde sürpriz yaşamayın."
  },
  {
    id: 'bulut-senkron',
    category: 'rapor',
    categoryLabel: 'Rapor & Bulut',
    Icon: Cloud,
    title: "Güvenli Bulut Senkronizasyonu",
    desc: "Verileriniz uçtan uca şifreli bulut altyapısıyla güvenle saklanır; telefon değiştirseniz bile hiçbir kaydınız kaybolmaz.",
    tag: "%100 Yedekli",
    details: "Google hesabınızla tek dokunuşla eşitleyin. Çevrimdışıyken yaptığınız kayıtlar internete bağlandığınız an buluta yüklenir."
  },
  {
    id: 'masraf-grafikleri',
    category: 'rapor',
    categoryLabel: 'Rapor & Bulut',
    Icon: BarChart3,
    title: "Gelişmiş Masraf Grafikleri",
    desc: "Aracınızın aylık ve yıllık tüm harcama dağılımını (yakıt, bakım, sigorta, ceza) görsel grafiklerle analiz edin.",
    tag: "Görsel Zeka",
    details: "Toplam sahip olma maliyetinizi (TCO) görün; aracınızın size aylık net maliyetini kuruşu kuruşuna öğrenin."
  },
  {
    id: 'fis-kamera',
    category: 'yakit',
    categoryLabel: 'Yakıt & Masraf',
    Icon: Camera,
    title: "Fiş & Fatura Fotoğraf Kaydı",
    desc: "Akaryakıt fişlerinin, servis faturalarının ve parça garanti belgelerinin fotoğrafını çekerek kalıcı dijital arşiv yapın.",
    tag: "Solmayan Arşiv",
    details: "Termal fiş kağıtları zamanla silinir, ancak OtoTakip Pro içerisindeki yüksek çözünürlüklü dijital kopyanız asla kaybolmaz."
  },
  {
    id: 'muayene-sayaci',
    category: 'bakim',
    categoryLabel: 'Bakım & Muayene',
    Icon: CalendarDays,
    title: "TÜVTÜRK Muayene Geri Sayımı",
    desc: "Araç muayene bitiş tarihinize kaç gün kaldığını canlı takip edin, randevu almayı son güne bırakmayın.",
    tag: "Geri Sayım",
    details: "Muayene öncesi yapılması gereken zorunlu kontroller (yangın tüpü, ilk yardım çantası, egzoz emisyon) kontrol listesi sunar."
  },
  {
    id: 'lastik-takibi',
    category: 'bakim',
    categoryLabel: 'Bakım & Muayene',
    Icon: Gauge,
    title: "Yazlık & Kışlık Lastik Takibi",
    desc: "Hangi lastiğin kaç kilometre yol yaptığını, diş derinliğini ve mevsimlik değişim tarihlerini kaydedin.",
    tag: "Mevsimlik Alarm",
    details: "Yasal kış lastiği zorunluluğu tarihlerini hatırlatır, lastik otelindeki takımınızın ömrünü optimize eder."
  },
  {
    id: 'mtv-hesaplama',
    category: 'yakit',
    categoryLabel: 'Yakıt & Masraf',
    Icon: Coins,
    title: "MTV & Resmi Harç Takibi",
    desc: "Motorlu Taşıtlar Vergisi (MTV) 1. ve 2. taksit vadelerini, egzoz muayenesi ve kasko yenileme bütçenizi planlayın.",
    tag: "Finansal Takvim",
    details: "Gelecek dönem resmi ödemelerini bütçenize önceden dahil ederek beklenmedik nakit sıkışıklıklarını engelleyin."
  },
  {
    id: 'ekspertiz-raporu',
    category: 'rapor',
    categoryLabel: 'Rapor & Bulut',
    Icon: FileText,
    title: "Dijital Garaj Karnesi (PDF)",
    desc: "Aracınızı satarken tek tuşla tüm bakım, parça ve yakıt geçmişini içeren şık ve güven verici bir PDF karnesi üretin.",
    tag: "Değerine Satış",
    details: "Alıcıya tam şeffaf bir servis ve bakım günlüğü sunarak aracınızı piyasa değerinin üstünde ve güvenle satın."
  },
  {
    id: 'garaj-notlari',
    category: 'garaj',
    categoryLabel: 'Garaj & Araç',
    Icon: ClipboardList,
    title: "Garaj Notları & Hatırlatıcılar",
    desc: "Aracınıza ait özel parça kodları, boya kodu, usta numaraları ve kişisel araç notlarınızı güvenle saklayın.",
    tag: "Özel Notlar",
    details: "Hangi usta hangi parçayı taktı, bir sonraki sefere ne alınacak unutmayın. Aracınıza özel dijital defter tutun."
  },
  {
    id: 'excel-aktarim',
    category: 'rapor',
    categoryLabel: 'Rapor & Bulut',
    Icon: FileSpreadsheet,
    title: "Excel (.XLSX) Veri Çıktısı",
    desc: "Şirket muhasebesi veya kişisel arşivleme için tüm harcama ve kilometre verilerini formüllü Excel tablosuna aktarın.",
    tag: "Muhasebe Uyumlu",
    details: "Şirket araçlarının akaryakıt ve servis fişlerini tek tıkla muhasebe departmanına iletilebilir formata dönüştürün."
  },
  {
    id: 'ceza-takibi',
    category: 'yakit',
    categoryLabel: 'Yakıt & Masraf',
    Icon: ShieldCheck,
    title: "Trafik Cezası & Radar Kaydı",
    desc: "Trafik cezalarınızı, ihlal türünü ve erken ödeme indirim süresini kaydederek gereksiz faiz ödemekten kurtulun.",
    tag: "İndirim Takibi",
    details: "%25 erken ödeme indirim süresini kaçırmamanız için hatırlatma bildirimleri gönderir."
  },
  {
    id: 'offline-mod',
    category: 'garaj',
    categoryLabel: 'Garaj & Filo',
    Icon: Layers,
    title: "Tam Çevrimdışı Çalışma (Offline-First)",
    desc: "Sanayide, otoparkta veya çekmeyen kırsal yollarda internet olmasa bile harcama ve kilometre kaydı yapın.",
    tag: "Kesintisiz",
    details: "Tüm işlemler yerel bellekte saklanır; internet bağlantısı sağlandığında arka planda bulutla eşitlenir."
  }
];

const FAQ_ITEMS = [
  {
    q: "OtoTakip Pro ile birden fazla aracı aynı anda takip edebilir miyim?",
    a: "Evet! OtoTakip Pro sınırsız çoklu araç garajını destekler. İster ailenizdeki 2-3 aracı, ister firmanızdaki hafif ticari araç ve kurye filosunu tek bir hesap üzerinden plaka bazında kolayca yönetebilirsiniz."
  },
  {
    q: "Kilometre başına yakıt maliyetimi nasıl hesaplıyor?",
    a: "Her yakıt aldığınızda güncel araç kilometresini ve aldığınız yakıt miktarını (litre ve tutar) girersiniz. Sistem bir önceki alımınızla karşılaştırarak 100 kilometredeki net tüketiminizi (lt/100km) ve kilometre başına maliyetinizi (₺/km) kuruşu kuruşuna hesaplar."
  },
  {
    q: "Muayene veya kasko tarihim yaklaşınca nasıl haberdar olurum?",
    a: "Uygulamaya ruhsat bilgilerinizi ve poliçe bitiş tarihlerini bir kez kaydettikten sonra sistem otomatik alarmlar kurar. 30 gün, 15 gün ve 3 gün kala telefonunuza sesli ve görsel bildirimler göndererek gecikme cezası yemenizi önler."
  },
  {
    q: "Telefonumu değiştirirsem bakım ve kaza geçmişim kaybolur mu?",
    a: "Kesinlikle hayır! Verileriniz uçtan uca şifreli güvenli bulut altyapısıyla anlık olarak eşitlenir. Yeni bir telefona geçtiğinizde aynı Google hesabıyla giriş yaptığınız anda tüm araçlarınız, fiş fotoğraflarınız ve geçmişiniz saniyeler içinde geri gelir."
  },
  {
    q: "Aracımı satarken bakım geçmişini alıcıya nasıl kanıtlayabilirim?",
    a: "Uygulamada yer alan 'Dijital Garaj Karnesi' modülü sayesinde tek tuşla profesyonel bir PDF raporu oluşturabilirsiniz. Bu raporda yapılan tüm periyodik bakımlar, değişen orijinal parçalar ve kilometre dökümü yer alır; aracınızın değerini korur."
  },
  {
    q: "İnternetim çekmediğinde (sanayide veya bodrum otoparkında) çalışır mı?",
    a: "Evet. OtoTakip Pro tamamen 'Offline-First' mimariyle geliştirilmiştir. Çevrimdışıyken yakıt fişi veya bakım notu ekleyebilirsiniz. İnternete bağlandığınız an verileriniz otomatik olarak buluta eşitlenir."
  }
];

export default function OtoTakipProPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<FeatureItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'yakit' | 'bakim' | 'garaj' | 'rapor'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // İnteraktif Yakıt Simülatörü State'leri
  const [monthlyKm, setMonthlyKm] = useState<number>(1500);
  const [fuelType, setFuelType] = useState<'benzin' | 'dizel' | 'lpg' | 'elektrik'>('benzin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Yakıt hesaplama formülleri
  const fuelRates = {
    benzin: { price: 44.8, avgPer100: 7.4, name: 'Benzin' },
    dizel: { price: 43.9, avgPer100: 5.6, name: 'Dizel' },
    lpg: { price: 22.8, avgPer100: 9.2, name: 'LPG / Otogaz' },
    elektrik: { price: 7.2, avgPer100: 17.5, name: 'Elektrik (kWh)' }
  };

  const currentRate = fuelRates[fuelType];
  const monthlyConsumption = (monthlyKm / 100) * currentRate.avgPer100;
  const monthlyCost = Math.round(monthlyConsumption * currentRate.price);
  const costPerKm = (monthlyCost / monthlyKm).toFixed(2);
  const yearlyCost = monthlyCost * 12;

  const filteredFeatures = selectedCategory === 'all'
    ? featuresData
    : featuresData.filter(f => f.category === selectedCategory);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: 'body { background-color: #060709 !important; margin: 0; padding: 0; }' }} />

      <div className={styles.landing}>
        {/* Ambient background glows */}
        <div className={styles.spaceBackground} />
        <div className={styles.starsOverlay} />

        {/* Fixed Carbon Glass Header */}
        <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
          <div className={styles.container}>
            <div className={styles.headerInner}>
              <Link href="/ototakip-pro" className={styles.brand}>
                <Image 
                  src="/ototakip-pro/icon.png" 
                  alt="OtoTakip Pro Logo" 
                  width={44} 
                  height={44} 
                  className={styles.brandLogo}
                />
                <div className={styles.brandTextWrapper}>
                  <span className={styles.brandName}>OtoTakip Pro</span>
                  <span className={styles.brandTagline}>Dijital Garaj & Araç Asistanı</span>
                </div>
              </Link>

              <nav className={styles.navLinks}>
                <a href="#hero" className={styles.navLink}>Ana Sayfa</a>
                <a href="#simulator" className={styles.navLink}>Yakıt Simülatörü</a>
                <a href="#ozellikler" className={styles.navLink}>Tüm Modüller</a>
                <a href="#garaj" className={styles.navLink}>Garaj Deneyimi</a>
                <a href="#sss" className={styles.navLink}>S.S.S.</a>
              </nav>

              <a 
                href={PLAY_STORE_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.headerCta}
              >
                <Download size={16} />
                <span>Hemen İndir</span>
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              
              {/* Left Column: Hero Text */}
              <div className={styles.heroContent}>
                <div className={styles.heroBadge}>
                  <span className={styles.pulseDot} />
                  <span className={styles.badgeText}>AKILLI DİJİTAL GARAJ & FİLO YÖNETİMİ</span>
                </div>

                <h1 className={styles.heroTitle}>
                  Aracınızın Tüm Kontrolü, <br />
                  <span className={styles.amberGradientText}>Cebinizdeki Garajda.</span>
                </h1>

                <p className={styles.heroSubtitle}>
                  Yakıt tüketiminizi kuruşu kuruşuna hesaplayın, periyodik bakımları, kasko ve TÜVTÜRK muayene tarihlerini asla kaçırmayın. Tek araçtan ticari filolara kadar aracınızın değerini koruyan profesyonel dijital asistan.
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
                      priority
                    />
                  </a>

                  <a href="#simulator" className={styles.secondaryCtaBtn}>
                    <Sparkles size={18} />
                    <span>Yakıt Maliyetini Hesapla</span>
                  </a>
                </div>

                {/* Stats Bar */}
                <div className={styles.heroStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>%30 Tasarruf</span>
                    <span className={styles.statLabel}>Optimize Yakıt & Bakım</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>0 Ceza & Gecikme</span>
                    <span className={styles.statLabel}>Akıllı Muayene / MTV Uyarısı</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>Bulut Senkron</span>
                    <span className={styles.statLabel}>Şifreli Bulut Güvencesi</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Automotive Phone Stage & Floating Badges */}
              <div className={styles.phoneStage}>
                <div className={styles.phoneAura} />
                <div className={styles.phoneRing} />

                {/* Floating Badges */}
                <div className={styles.floatingBadgeTop}>
                  <div className={styles.badgeIconBox} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
                    <Bell size={20} />
                  </div>
                  <div className={styles.badgeTextCol}>
                    <span className={styles.badgeTitle}>Muayene Alarmı Aktif</span>
                    <span className={styles.badgeSubtitle}>Kalan: 24 Gün • Randevu Hatırlatıldı</span>
                  </div>
                </div>

                <div className={styles.floatingBadgeBottom}>
                  <div className={styles.badgeIconBox} style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
                    <Fuel size={20} />
                  </div>
                  <div className={styles.badgeTextCol}>
                    <span className={styles.badgeTitle}>Net Kilometre Maliyeti</span>
                    <span className={styles.badgeSubtitle}>₺{costPerKm} / km Ortalama Tüketim</span>
                  </div>
                </div>

                <div className={styles.floatingBadgeCenter}>
                  <div className={styles.badgeIconBox} style={{ background: 'rgba(255, 107, 0, 0.15)', color: '#FF6B00' }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div className={styles.badgeTextCol}>
                    <span className={styles.badgeTitle}>Kara Kutu Aktif</span>
                    <span className={styles.badgeSubtitle}>Ekspertiz Kanıt Arşivi</span>
                  </div>
                </div>

                {/* Phone Mockup with In-Phone Digital Garage UI */}
                <div className={styles.phoneFrame}>
                  <div className={styles.phoneScreen}>
                    {/* Car Card Inside Phone */}
                    <div className={styles.garageCardHeader}>
                      <span className={styles.carPlate}>34 MAX 2026</span>
                      <span className={styles.carModelName}>BMW 320i Sedan</span>
                      <span className={styles.carOdometer}>● 84.350 km • Aktif Garajda</span>
                    </div>

                    <div className={styles.garageMiniGrid}>
                      <div className={styles.garageMiniItem}>
                        <span className={miniLabelClass()}>Yakıt Deposu</span>
                        <span className={styles.miniItemVal} style={{ color: '#F59E0B' }}>%82 Dolu</span>
                      </div>
                      <div className={styles.garageMiniItem}>
                        <span className={miniLabelClass()}>Motor Yağı</span>
                        <span className={styles.miniItemVal} style={{ color: '#10B981' }}>%94 Sağlıklı</span>
                      </div>
                      <div className={styles.garageMiniItem}>
                        <span className={miniLabelClass()}>Kasko Süresi</span>
                        <span className={styles.miniItemVal}>86 Gün Kaldı</span>
                      </div>
                      <div className={styles.garageMiniItem}>
                        <span className={miniLabelClass()}>Son Tüketim</span>
                        <span className={styles.miniItemVal} style={{ color: '#00E5FF' }}>6.8 lt/100km</span>
                      </div>
                    </div>

                    {/* Recent Expense items inside screen */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                      <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>Son Garaj Hareketleri</span>
                      <div className={styles.garageLogItem}>
                        <span>Shell V-Power 45.2 lt</span>
                        <strong style={{ color: '#F59E0B' }}>₺2.025</strong>
                      </div>
                      <div className={styles.garageLogItem} style={{ borderLeftColor: '#10B981' }}>
                        <span>Yağ & Filtre Bakımı</span>
                        <strong style={{ color: '#10B981' }}>₺4.200</strong>
                      </div>
                      <div className={styles.garageLogItem} style={{ borderLeftColor: '#6366F1' }}>
                        <span>Kasko Poliçe Taksiti</span>
                        <strong style={{ color: '#A5B4FC' }}>₺3.150</strong>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Signature Interactive Module: Yakıt & Masraf Simülatörü */}
        <section id="simulator" className={styles.simulatorSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionPill}>
                <Sparkles size={14} />
                <span>İNTERAKTİF SİMÜLATÖR</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Aylık Yakıt Maliyetinizi Hesaplayın
              </h2>
              <p className={styles.sectionDesc}>
                Yaptığınız kilometreyi ve yakıt tipinizi seçin; OtoTakip Pro motorunun sizin için hesapladığı net maliyeti ve tasarruf imkanını görün.
              </p>
            </div>

            <div className={styles.simulatorCard}>
              {/* Controls */}
              <div className={styles.simulatorControls}>
                <div className={controlGroupClass()}>
                  <div className={styles.controlHeader}>
                    <span className={styles.controlLabel}>Aylık Yapılan Ortalama Yol</span>
                    <span className={styles.controlValue}>{monthlyKm.toLocaleString('tr-TR')} km</span>
                  </div>
                  <input 
                    type="range" 
                    min={300} 
                    max={6000} 
                    step={100} 
                    value={monthlyKm} 
                    onChange={(e) => setMonthlyKm(Number(e.target.value))}
                    className={styles.rangeSlider}
                  />
                </div>

                <div className={styles.controlGroup}>
                  <span className={styles.controlLabel}>Araç Yakıt Türü</span>
                  <div className={styles.categoryGrid}>
                    <button 
                      type="button"
                      className={`${styles.categoryButton} ${fuelType === 'benzin' ? styles.categoryButtonActive : ''}`}
                      onClick={() => setFuelType('benzin')}
                    >
                      <span>Benzin (Ort. 7.4 lt)</span>
                      <CheckCircle2 size={16} />
                    </button>
                    <button 
                      type="button"
                      className={`${styles.categoryButton} ${fuelType === 'dizel' ? styles.categoryButtonActive : ''}`}
                      onClick={() => setFuelType('dizel')}
                    >
                      <span>Dizel (Ort. 5.6 lt)</span>
                      <CheckCircle2 size={16} />
                    </button>
                    <button 
                      type="button"
                      className={`${styles.categoryButton} ${fuelType === 'lpg' ? styles.categoryButtonActive : ''}`}
                      onClick={() => setFuelType('lpg')}
                    >
                      <span>LPG / Otogaz (Ort. 9.2 lt)</span>
                      <CheckCircle2 size={16} />
                    </button>
                    <button 
                      type="button"
                      className={`${styles.categoryButton} ${fuelType === 'elektrik' ? styles.categoryButtonActive : ''}`}
                      onClick={() => setFuelType('elektrik')}
                    >
                      <span>Elektrik (Ort. 17.5 kWh)</span>
                      <CheckCircle2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Calculator Result Box */}
              <div className={styles.simulatorResult}>
                <div className={styles.aiHeader}>
                  <div className={styles.aiIconWrapper}>
                    <Gauge size={22} />
                  </div>
                  <div>
                    <h3 className={styles.aiTitle}>OtoTakip Pro Tüketim Raporu</h3>
                    <span className={styles.aiSubtitle}>● Güncel Akaryakıt Verileriyle Hesaplanmıştır</span>
                  </div>
                </div>

                <div className={styles.metricsRow}>
                  <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Aylık Yakıt Harcaması</span>
                    <span className={styles.metricVal} style={{ color: '#F59E0B' }}>
                      ₺{monthlyCost.toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Kilometre Başı Maliyet</span>
                    <span className={styles.metricVal} style={{ color: '#10B981' }}>
                      ₺{costPerKm} / km
                    </span>
                  </div>
                </div>

                <div className={styles.aiAdviceBox}>
                  🏎️ <strong>Tasarruf Tavsiyesi:</strong> Yılda yaklaşık <strong>₺{yearlyCost.toLocaleString('tr-TR')}</strong> yakıt harcamaktasınız. OtoTakip Pro ile hava filtresi periyotlarını geciktirmeyerek ve lastik basınçlarını doğru tutarak yılda ortalama <strong>₺{(yearlyCost * 0.12).toFixed(0)}</strong> tasarruf edebilirsiniz.
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Rich Features Grid with Category Tabs */}
        <section id="ozellikler" className={styles.featuresSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionPill}>
                <Layers size={14} />
                <span>16 GÜÇLÜ ÖZELLİK</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Aracınız İçin İhtiyacınız Olan <br />
                Her Şey Tek Bir Garajda
              </h2>
              <p className={styles.sectionDesc}>
                OtoTakip Pro, sıradan bir not defteri değil; aracınızın ikinci el değerini artıran profesyonel dijital servis karnesidir.
              </p>
            </div>

            {/* Category Tabs */}
            <div className={styles.categoryTabs}>
              <button 
                type="button"
                className={`${styles.tabBtn} ${selectedCategory === 'all' ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                Tümü ({featuresData.length})
              </button>
              <button 
                type="button"
                className={`${styles.tabBtn} ${selectedCategory === 'yakit' ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedCategory('yakit')}
              >
                Yakıt & Masraf
              </button>
              <button 
                type="button"
                className={`${styles.tabBtn} ${selectedCategory === 'bakim' ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedCategory('bakim')}
              >
                Bakım & Muayene
              </button>
              <button 
                type="button"
                className={`${styles.tabBtn} ${selectedCategory === 'garaj' ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedCategory('garaj')}
              >
                Garaj & Araçlar
              </button>
              <button 
                type="button"
                className={`${styles.tabBtn} ${selectedCategory === 'rapor' ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedCategory('rapor')}
              >
                Rapor & Bulut
              </button>
            </div>

            {/* Grid */}
            <div className={styles.featureGrid}>
              {filteredFeatures.map((feature) => (
                <div 
                  key={feature.id} 
                  className={styles.featureCard}
                  onClick={() => setActiveModal(feature)}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.iconWrapper}>
                      <feature.Icon size={26} />
                    </div>
                    <span className={styles.cardTag}>{feature.tag}</span>
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                  <div className={styles.cardCta}>
                    <span>Detayları İncele</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Dijital Garaj Deneyimi (Showcase Cards) */}
        <section id="garaj" className={styles.garageShowcaseSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionPill}>
                <CarFront size={14} />
                <span>DİJİTAL GARAJ</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Neden OtoTakip Pro?
              </h2>
              <p className={styles.sectionDesc}>
                Araç sahipleri, sürücüler ve filo yöneticileri için sıfırdan tasarlandı.
              </p>
            </div>

            <div className={styles.garageCardsGrid}>
              <div className={styles.garageFeatureBox}>
                <div className={styles.boxIconWrapper}>
                  <CarFront size={24} />
                </div>
                <h3 className={styles.boxTitle}>Çoklu Araç Garajı</h3>
                <p className={styles.boxDesc}>
                  Binek aracınız, şirket arabanız veya motosikletiniz tek ekranda. Ayrı ayrı kilometre ve masraf takibi yapın.
                </p>
              </div>

              <div className={styles.garageFeatureBox}>
                <div className={styles.boxIconWrapper}>
                  <Fuel size={24} />
                </div>
                <h3 className={styles.boxTitle}>Hassas Yakıt Analitiği</h3>
                <p className={styles.boxDesc}>
                  Her dolumda kilometrenizi kontrol edin. Tüketim anomalilerini ve yakıt masraflarını grafiklerle net görün.
                </p>
              </div>

              <div className={styles.garageFeatureBox}>
                <div className={styles.boxIconWrapper}>
                  <Bell size={24} />
                </div>
                <h3 className={styles.boxTitle}>Resmi Tarih Alarmları</h3>
                <p className={styles.boxDesc}>
                  TÜVTÜRK muayenesi, trafik sigortası ve MTV taksitlerini unutmaya son. 30 gün önceden akıllı hatırlatıcı bildirimler alın.
                </p>
              </div>

              <div className={styles.garageFeatureBox}>
                <div className={styles.boxIconWrapper}>
                  <ShieldCheck size={24} />
                </div>
                <h3 className={styles.boxTitle}>Değer Katan Ekspertiz Raporu</h3>
                <p className={styles.boxDesc}>
                  Aracınızı satarken yapılan her bakımın, değişen her parçanın fotoğraflı PDF dökümünü alıcıya gösterin, güven kazanın.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Sıkça Sorulan Sorular (Accordion) */}
        <section id="sss" className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionPill}>
                <Sparkles size={14} />
                <span>MERAK EDİLENLER</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Sıkça Sorulan Sorular
              </h2>
              <p className={styles.sectionDesc}>
                OtoTakip Pro hakkında aklınıza takılan tüm soruların yanıtları burada.
              </p>
            </div>

            <div className={styles.faqList}>
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
                  >
                    <div 
                      className={styles.faqHeader}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    >
                      <h3 className={styles.faqQuestion}>{item.q}</h3>
                      <ChevronDown 
                        size={20} 
                        className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`} 
                      />
                    </div>
                    {isOpen && (
                      <div className={styles.faqBody}>
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className={styles.ctaBanner}>
          <div className={styles.container}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} />
              <h2 className={styles.ctaTitle}>
                Aracınızın Kontrolünü <br />
                <span className={styles.amberGradientText}>Bugün Ele Alın.</span>
              </h2>
              <p className={styles.ctaSubtitle}>
                OtoTakip Pro ile sürpriz arızaları ve gecikme cezalarını önleyin, aracınızın ikinci el değerini zirveye taşıyın. Google Play üzerinden hemen ücretsiz indirin!
              </p>
              <div className={styles.ctaBtnGroup}>
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
            </div>
          </div>
        </section>

        {/* Rich Footer */}
        <footer className={styles.footer}>
          <div className={styles.container}>
            <div className={styles.footerGrid}>
              
              <div className={styles.footerBrandCol}>
                <Link href="/ototakip-pro" className={styles.brand}>
                  <Image 
                    src="/ototakip-pro/icon.png" 
                    alt="OtoTakip Pro Logo" 
                    width={40} 
                    height={40} 
                    className={styles.brandLogo}
                  />
                  <div className={styles.brandTextWrapper}>
                    <span className={styles.brandName}>OtoTakip Pro</span>
                    <span className={styles.brandTagline}>Dijital Garajınız</span>
                  </div>
                </Link>
                <p className={styles.footerDesc}>
                  Aracınızın tüm masraflarını, periyodik bakımlarını ve yakıt tüketimini tek bir ekranda yönetin. Maximora Studio güvencesiyle geliştirilmiştir.
                </p>
              </div>

              <div>
                <h4 className={styles.footerColTitle}>Hızlı Erişim</h4>
                <ul className={styles.footerLinks}>
                  <li><a href="#hero" className={styles.footerLink}>Ana Sayfa</a></li>
                  <li><a href="#simulator" className={styles.footerLink}>Yakıt Simülatörü</a></li>
                  <li><a href="#ozellikler" className={styles.footerLink}>Garaj Modülleri</a></li>
                  <li><a href="#garaj" className={styles.footerLink}>Neden OtoTakip Pro?</a></li>
                  <li><a href="#sss" className={styles.footerLink}>Sıkça Sorulanlar</a></li>
                </ul>
              </div>

              <div>
                <h4 className={styles.footerColTitle}>Maximora Ekosistemi</h4>
                <ul className={styles.footerLinks}>
                  <li><Link href="/namaz-vakti" className={styles.footerLink}>Namaz Vakti (İslami Asistan)</Link></li>
                  <li><Link href="/falizo-home" className={styles.footerLink}>Falizo (Kahve Falı & Tarot)</Link></li>
                  <li><Link href="/para-kontrol" className={styles.footerLink}>Harcama Rehberi (Bütçe Takibi)</Link></li>
                </ul>
              </div>

              <div>
                <h4 className={styles.footerColTitle}>Yasal & Güvenlik</h4>
                <ul className={styles.footerLinks}>
                  <li><Link href="/ototakip-pro-gizlilik" className={styles.footerLink}>Gizlilik Politikası</Link></li>
                  <li><a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Google Play Store</a></li>
                </ul>
              </div>

            </div>

            <div className={styles.footerBottom}>
              <span>&copy; {new Date().getFullYear()} Maximora Studio. Bütün hakları saklıdır.</span>
              <span>OtoTakip Pro • Akıllı Dijital Garaj & Filo Yönetimi</span>
            </div>
          </div>
        </footer>

        {/* Feature Detail Modal */}
        {activeModal && (
          <div className={styles.modalOverlay} onClick={() => setActiveModal(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button 
                type="button"
                className={styles.modalClose} 
                onClick={() => setActiveModal(null)}
              >
                ✕
              </button>
              <div className={styles.modalIconWrapper}>
                <activeModal.Icon size={34} />
              </div>
              <h3 className={styles.modalTitle}>{activeModal.title}</h3>
              <p className={styles.modalDesc}>{activeModal.desc}</p>
              <div className={styles.modalDetailsBox}>
                🔧 <strong>Detaylı Bilgi:</strong> {activeModal.details}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

function controlGroupClass(): string {
  return styles.controlGroup;
}

function miniLabelClass(): string {
  return styles.miniItemLabel;
}
