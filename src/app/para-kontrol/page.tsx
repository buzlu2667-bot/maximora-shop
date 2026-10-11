"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { 
  Wallet, 
  PieChart, 
  TrendingUp, 
  Layers, 
  Cloud, 
  ShieldCheck, 
  Bot,
  Coins,
  Target,
  Globe,
  PiggyBank,
  Mic,
  Calendar,
  AlertTriangle,
  ArrowRightLeft,
  Bell,
  FileSpreadsheet,
  Calculator,
  Receipt,
  Fingerprint,
  FileText,
  ChevronDown,
  Download,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.bagarakk.parakontrol";

// 16 Gelişmiş Finans Modülü
interface FeatureItem {
  id: string;
  category: 'butce' | 'ai' | 'birikim' | 'guvenlik';
  categoryLabel: string;
  Icon: React.ElementType;
  title: string;
  desc: string;
  tag: string;
  details: string;
}

const featuresData: FeatureItem[] = [
  { 
    id: 'gelir-gider',
    category: 'butce',
    categoryLabel: 'Bütçe & Harcama',
    Icon: Wallet, 
    title: "Gelir & Gider Takibi", 
    desc: "Tüm nakit, kart ve banka harcamalarınızı anlık olarak kaydederek bütçe dengenizi kolayca sağlayın.",
    tag: "Temel Modül",
    details: "Hızlı harcama ekleme kısayolları, kategori bazlı renk kodlamaları ve alt kategoriler ile cüzdanınızın tam röntgenini çekin."
  },
  { 
    id: 'ai-koc',
    category: 'ai',
    categoryLabel: 'Yapay Zeka',
    Icon: Bot, 
    title: "Yapay Zeka Finans Koçu", 
    desc: "Akıllı yapay zeka asistanınız harcamalarınızı analiz eder, size özel bütçe ve tasarruf tavsiyeleri sunar.",
    tag: "AI Destekli",
    details: "Geçmiş harcama alışkanlıklarınızı makine öğrenimi ile inceleyerek ay sonunda nerelerden tasarruf edebileceğinizi nokta atışı raporlar."
  },
  { 
    id: 'sesli-ekleme',
    category: 'ai',
    categoryLabel: 'Yapay Zeka',
    Icon: Mic, 
    title: "Sesli & Akıllı Ekleme", 
    desc: "Harcamalarınızı uzun uzun yazmak yerine sesli komutlarla veya akıllı asistanla saniyeler içinde kaydedin.",
    tag: "Ultra Hızlı",
    details: "'Market 450 lira kredi kartı' demeniz yeterli! Doğal dil işleme (NLP) teknolojisi tutarı, kategoriyi ve ödeme yöntemini otomatik anlar."
  },
  { 
    id: 'canli-kurlar',
    category: 'birikim',
    categoryLabel: 'Yatırım & Kurlar',
    Icon: Globe, 
    title: "Çoklu Para Birimi & Canlı Kurlar", 
    desc: "USD, EUR, Altın ve kripto gibi farklı para birimleriyle işlem yapın, kurları canlı olarak takip edin.",
    tag: "Canlı Veri",
    details: "Merkez Bankası ve serbest piyasa canlı kurlarıyla otomatik kur dönüşümü. Yabancı para birimindeki harcamalarınız anında TL karşılığıyla hesaplanır."
  },
  { 
    id: 'donut-analiz',
    category: 'guvenlik',
    categoryLabel: 'Raporlama',
    Icon: PieChart, 
    title: "Detaylı Analiz & Donut Grafik", 
    desc: "Paranızın tam olarak nereye gittiğini görsel ve etkileşimli grafiklerle detaylıca inceleyin.",
    tag: "Görsel Zeka",
    details: "Kategori bazlı yüzde dağılımları, aylık trend kıyaslamaları ve harcama yoğunluk haritaları parmaklarınızın ucunda."
  },
  { 
    id: 'finansal-takvim',
    category: 'butce',
    categoryLabel: 'Bütçe & Harcama',
    Icon: Calendar, 
    title: "Finansal Takvim & Planlama", 
    desc: "Gelecek ödemelerinizi, taksitlerinizi ve maaş gününüzü takvim üzerinden kolayca planlayın.",
    tag: "Zaman Yönetimi",
    details: "Ayın hangi günlerinde yoğun ödemeniz olduğunu görün, nakit akışınızı önceden yöneterek faiz ve gecikmelerden kurtulun."
  },
  { 
    id: 'limit-uyarisi',
    category: 'ai',
    categoryLabel: 'Yapay Zeka',
    Icon: AlertTriangle, 
    title: "Aylık Limit & AI Uyarısı", 
    desc: "Harcama limitleri belirleyin; limitinizi aşmaya yaklaştığınızda yapay zeka sizi önceden uyarsın.",
    tag: "Önleyici Koruma",
    details: "Kategoriye özel bütçe tavanı tanımlayın. Bütçenin %80'ine ulaştığınızda bildirim alarak ay sonu sürprizlerinden korunun."
  },
  { 
    id: 'kumbara-hedefler',
    category: 'birikim',
    categoryLabel: 'Yatırım & Kurlar',
    Icon: PiggyBank, 
    title: "Kumbara & Hayal Hedefleri", 
    desc: "Hayalleriniz (tatil, araba, teknoloji) için birikim hedefleri belirleyin ve kumbaranızı adım adım büyütün.",
    tag: "Motivasyon",
    details: "Hedefinize kalan gün ve gereken günlük tasarruf miktarını otomatik hesaplayan akıllı motivasyon modülü."
  },
  { 
    id: 'borc-alacak',
    category: 'butce',
    categoryLabel: 'Bütçe & Harcama',
    Icon: ArrowRightLeft, 
    title: "Borç & Alacak (Cari) Takibi", 
    desc: "Kimden ne alacağınız, kime ne borcunuz var unutmayın. Gelişmiş vadesi gelen borç takibi.",
    tag: "Cari Hesap",
    details: "Kişi bazında borç-alacak defteri tutun, kısmi ödemeleri düşün ve vadesi geçen alacaklar için hatırlatıcılar kurun."
  },
  { 
    id: 'gunluk-bildirim',
    category: 'ai',
    categoryLabel: 'Yapay Zeka',
    Icon: Bell, 
    title: "Akıllı Günlük Hatırlatıcılar", 
    desc: "Ödeme günü gelen fatura ve taksitleriniz için otomatik günlük akıllı bildirimler alın.",
    tag: "Otomasyon",
    details: "Kişiselleştirilebilir bildirim saatleri ve sabah bütçe özeti ile finansal disiplininizi her gün diri tutun."
  },
  { 
    id: 'excel-rapor',
    category: 'guvenlik',
    categoryLabel: 'Raporlama',
    Icon: FileSpreadsheet, 
    title: "Excel Rapor Dışa Aktarma (VIP)", 
    desc: "Tüm finansal hareketlerinizi tek tıkla profesyonel Excel formatında dışa aktarın ve arşivleyin.",
    tag: "VIP Özellik",
    details: "Muhasebe ve kişisel arşivleme için formüllü, kategorize edilmiş temiz XLSX tabloları üretin."
  },
  { 
    id: 'hesap-makinesi',
    category: 'birikim',
    categoryLabel: 'Yatırım & Kurlar',
    Icon: Calculator, 
    title: "Dahili Finansal Hesap Makinesi", 
    desc: "Uygulamadan çıkmadan karmaşık hesaplarınızı yapabileceğiniz entegre hesap makinesi.",
    tag: "Pratik Araç",
    details: "Harcama tutarı girerken anlık toplama, çıkarma ve KDV hesaplama imkanı sağlayan kesintisiz deneyim."
  },
  { 
    id: 'fis-fatura',
    category: 'butce',
    categoryLabel: 'Bütçe & Harcama',
    Icon: Receipt, 
    title: "Fiş & Fatura Fotoğraf Kaydı", 
    desc: "Harcamalarınıza ait fiş ve faturaların fotoğraflarını çekerek kalıcı dijital arşiv oluşturun.",
    tag: "Dijital Arşiv",
    details: "Garanti belgeleri ve market fişleri asla solmasın. Fotoğraflı harcama geçmişi ile her harcama belgelensin."
  },
  { 
    id: 'bulut-senkron',
    category: 'guvenlik',
    categoryLabel: 'Güvenlik & Bulut',
    Icon: Cloud, 
    title: "Bulut Yedekleme & Anlık Senkron", 
    desc: "Verileriniz güvenle bulutta saklanır ve tüm cihazlarınızda anlık olarak eşitlenir.",
    tag: "Sıfır Veri Kaybı",
    details: "Telefonunuzu değiştirseniz bile tek bir dokunuşla tüm bütçeniz ve geçmişiniz saniyeler içinde geri yüklenir."
  },
  { 
    id: 'biyometrik-guvenlik',
    category: 'guvenlik',
    categoryLabel: 'Güvenlik & Bulut',
    Icon: Fingerprint, 
    title: "Biyometrik Güvenlik (FaceID / Parmak İzi)", 
    desc: "Biyometrik kilit veya PIN şifreleme ile tüm finansal bilgilerinizi meraklı gözlerden koruyun.",
    tag: "%100 Gizli",
    details: "Banka düzeyinde cihaz içi şifreleme; sizden başka hiç kimse harcamalarınızı ve birikimlerinizi göremez."
  },
  { 
    id: 'pdf-paylasim',
    category: 'guvenlik',
    categoryLabel: 'Raporlama',
    Icon: FileText, 
    title: "Şık PDF Rapor Paylaşımı", 
    desc: "Aylık özetlerinizi veya detaylı harcama raporlarınızı şık PDF belgeleri olarak üretin ve paylaşın.",
    tag: "Resmi Format",
    details: "Grafikli, renkli ve derli toplu PDF özetleri oluşturarak e-posta veya WhatsApp üzerinden kolayca paylaşın."
  }
];

// Sıkça Sorulan Sorular
const FAQ_ITEMS = [
  {
    q: "Banka hesaplarımı veya kart şifrelerimi bağlamak zorunda mıyım?",
    a: "Hayır, kesinlikle! Harcama Rehberi tamamen bağımsız, güvenli ve gizlilik odaklı bir finans takip uygulamasıdır. Banka şifrelerinizi ASLA istemez; verileriniz yalnızca sizin izin verdiğiniz şekilde saklanır."
  },
  {
    q: "İnternet bağlantım olmadığında harcama kaydedebilir miyim?",
    a: "Evet! Harcama Rehberi 'Offline-First' (önce çevrimdışı) prensibiyle geliştirilmiştir. Metroda, uçakta veya internetsiz kaldığınız her yerde harcamalarınızı sesli veya manuel kaydedebilir; internete bağlandığınızda otomatik eşitlenir."
  },
  {
    q: "Yapay Zeka Finans Koçu harcamalarımı nasıl analiz ediyor?",
    a: "Yapay zeka motorumuz, girdiğiniz kategorileri ve haftalık/aylık harcama yoğunluklarını analiz eder. Örneğin; 'Bu ay dışarıdan yemek harcamanız %35 arttı, kahve ve yemek harcamalarında 2.400 TL tasarruf potansiyeli tespit edildi' şeklinde kişiselleştirilmiş rehberlik sunar."
  },
  {
    q: "Telefonumu değiştirirsem eski harcama geçmişim silinir mi?",
    a: "Hayır. Google hesabınızla tek tıkla bulut yedeklemesini açtığınız takdirde, yeni telefonunuza geçtiğinizde aynı hesapla giriş yaparak tüm geçmişinizi, kumbaralarınızı ve fişlerinizi anında geri yükleyebilirsiniz."
  },
  {
    q: "Sesli harcama ekleme Türkçe komutları ne kadar iyi anlıyor?",
    a: "Gelişmiş doğal dil işleme (NLP) motorumuz Türkçe şive ve günlük konuşma kalıplarını mükemmel anlar. 'Market 320 TL nakit', 'Benzin 1500 kredi kartı' gibi kısa cümlelerle harcamanız 2 saniyede kaydedilir."
  },
  {
    q: "Verilerimi Excel veya PDF olarak bilgisayarıma aktarabilir miyim?",
    a: "Kesinlikle! Tek dokunuşla tüm dönemin gelir, gider, borç ve kategori detaylarını içeren formüllü Excel (.xlsx) ve şık tasarımlı PDF raporları oluşturabilir, dilediğiniz yere aktarabilirsiniz."
  }
];

export default function ParaKontrolPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<FeatureItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'butce' | 'ai' | 'birikim' | 'guvenlik'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // İnteraktif Simülatör State'leri
  const [monthlyIncome, setMonthlyIncome] = useState<number>(45000);
  const [spendCategory, setSpendCategory] = useState<'dengeli' | 'tasarruf' | 'yatirim'>('dengeli');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simülatör Dinamik Hesaplamaları (50/30/20 kuralı & senaryolar)
  const savingsRate = spendCategory === 'tasarruf' ? 0.35 : spendCategory === 'yatirim' ? 0.45 : 0.25;
  const estimatedSavings = Math.round(monthlyIncome * savingsRate);
  const yearlyPotential = estimatedSavings * 12;
  const livingExpenses = Math.round(monthlyIncome * (1 - savingsRate));

  const filteredFeatures = selectedCategory === 'all' 
    ? featuresData 
    : featuresData.filter(f => f.category === selectedCategory);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: 'body { background-color: #030712 !important; margin: 0; padding: 0; }' }} />

      <div className={styles.landing}>
        {/* Ambient background glows */}
        <div className={styles.spaceBackground} />
        <div className={styles.starsOverlay} />

        {/* Fixed Cyber Glass Header */}
        <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
          <div className={styles.container}>
            <div className={styles.headerInner}>
              <Link href="/para-kontrol" className={styles.brand}>
                <div className={styles.brandIconWrapper}>
                  <Wallet size={24} />
                </div>
                <div className={styles.brandTextWrapper}>
                  <span className={styles.brandName}>Harcama Rehberi</span>
                  <span className={styles.brandTagline}>Bütçe & Gider Takibi</span>
                </div>
              </Link>

              <nav className={styles.navLinks}>
                <a href="#hero" className={styles.navLink}>Ana Sayfa</a>
                <a href="#simulator" className={styles.navLink}>AI Simülatör</a>
                <a href="#ozellikler" className={styles.navLink}>Tüm Modüller</a>
                <a href="#ekranlar" className={styles.navLink}>Ekranlar</a>
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
                  <span className={styles.badgeText}>YENİ NESİL YAPAY ZEKA DESTEKLİ FİNANS</span>
                </div>

                <h1 className={styles.heroTitle}>
                  Harcamalarınızı Yönetin, <br />
                  <span className={styles.cyanGradientText}>Geleceğinizi İnşa Edin.</span>
                </h1>

                <p className={styles.heroSubtitle}>
                  Gelir ve giderlerinizi anlık takip edin, sesli komutlarla saniyeler içinde harcama kaydedin ve Yapay Zeka Finans Koçu ile tasarruf hedeflerinize emin adımlarla ulaşın. Siyahın asaleti, teknolojinin elektrik mavisiyle buluştu.
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
                    <span>AI Simülasyonu Dene</span>
                  </a>
                </div>

                {/* Stats Bar */}
                <div className={styles.heroStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>16+ Akıllı</span>
                    <span className={styles.statLabel}>Finans & Rapor Modülü</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>%100 Güvenli</span>
                    <span className={styles.statLabel}>Biyometrik & Offline Koruma</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>7/24 AI</span>
                    <span className={styles.statLabel}>Finansal Koç & Tavsiye</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Phone Stage & Floating Badges */}
              <div className={styles.phoneStage}>
                <div className={styles.phoneAura} />
                <div className={styles.phoneRing} />

                {/* Floating Badges */}
                <div className={styles.floatingBadgeTop}>
                  <div className={styles.badgeIconBox} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
                    <Bot size={20} />
                  </div>
                  <div className={styles.badgeTextCol}>
                    <span className={styles.badgeTitle}>AI Finans Koçu Aktif</span>
                    <span className={styles.badgeSubtitle}>Bu ay +₺3.400 Tasarruf Fırsatı</span>
                  </div>
                </div>

                <div className={styles.floatingBadgeBottom}>
                  <div className={styles.badgeIconBox} style={{ background: 'rgba(0, 229, 255, 0.15)', color: '#00E5FF' }}>
                    <Globe size={20} />
                  </div>
                  <div className={styles.badgeTextCol}>
                    <span className={styles.badgeTitle}>Canlı Serbest Piyasa Kurları</span>
                    <span className={styles.badgeSubtitle}>USD • EUR • Gram Altın Eşitlendi</span>
                  </div>
                </div>

                <div className={styles.floatingBadgeCenter}>
                  <div className={styles.badgeIconBox} style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818CF8' }}>
                    <Fingerprint size={20} />
                  </div>
                  <div className={styles.badgeTextCol}>
                    <span className={styles.badgeTitle}>Biyometrik Kalkan</span>
                    <span className={styles.badgeSubtitle}>FaceID & Parmak İzi</span>
                  </div>
                </div>

                {/* Main Phone Mockup */}
                <div className={styles.phoneFrame}>
                  <div className={styles.phoneScreen}>
                    <img 
                      src="/para-kontrol/1.png" 
                      alt="Harcama Rehberi Uygulama Ekranı" 
                      className={styles.phoneImage}
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Signature Interactive Module: Canlı Bütçe & Tasarruf Simülatörü */}
        <section id="simulator" className={styles.simulatorSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionPill}>
                <Sparkles size={14} />
                <span>İNTERAKTİF SİMÜLATÖR</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Yapay Zeka ile Bütçenizi Test Edin
              </h2>
              <p className={styles.sectionDesc}>
                Aylık gelirinizi ve hedefinizi seçin; Harcama Rehberi yapay zeka algoritmasının sizin için yaratabileceği birikim potansiyelini anında görün.
              </p>
            </div>

            <div className={styles.simulatorCard}>
              {/* Controls */}
              <div className={styles.simulatorControls}>
                <div className={controlGroupClass()}>
                  <div className={styles.controlHeader}>
                    <span className={styles.controlLabel}>Aylık Net Geliriniz</span>
                    <span className={styles.controlValue}>₺{monthlyIncome.toLocaleString('tr-TR')}</span>
                  </div>
                  <input 
                    type="range" 
                    min={15000} 
                    max={150000} 
                    step={2500} 
                    value={monthlyIncome} 
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className={styles.rangeSlider}
                  />
                </div>

                <div className={styles.controlGroup}>
                  <span className={styles.controlLabel}>Finansal Hedef Stratejiniz</span>
                  <div className={styles.categoryGrid}>
                    <button 
                      type="button"
                      className={`${styles.categoryButton} ${spendCategory === 'dengeli' ? styles.categoryButtonActive : ''}`}
                      onClick={() => setSpendCategory('dengeli')}
                    >
                      <span>Dengeli Yaşam (50/30/20)</span>
                      <CheckCircle2 size={16} />
                    </button>
                    <button 
                      type="button"
                      className={`${styles.categoryButton} ${spendCategory === 'tasarruf' ? styles.categoryButtonActive : ''}`}
                      onClick={() => setSpendCategory('tasarruf')}
                    >
                      <span>Sıkı Tasarruf & Birikim</span>
                      <CheckCircle2 size={16} />
                    </button>
                    <button 
                      type="button"
                      className={`${styles.categoryButton} ${spendCategory === 'yatirim' ? styles.categoryButtonActive : ''}`}
                      onClick={() => setSpendCategory('yatirim')}
                    >
                      <span>Agresif Yatırım & Hedef</span>
                      <CheckCircle2 size={16} />
                    </button>
                    <button 
                      type="button"
                      className={styles.categoryButton}
                      onClick={() => setMonthlyIncome(prev => Math.min(prev + 10000, 150000))}
                    >
                      <span>Gelir Arttır (+₺10.000)</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Live AI Result Box */}
              <div className={styles.simulatorResult}>
                <div className={styles.aiHeader}>
                  <div className={styles.aiIconWrapper}>
                    <Bot size={22} />
                  </div>
                  <div>
                    <h3 className={styles.aiTitle}>AI Finans Koçu Analizi</h3>
                    <span className={styles.aiSubtitle}>● Optimize Edilmiş Bütçe Planı</span>
                  </div>
                </div>

                <div className={styles.metricsRow}>
                  <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Aylık Önerilen Birikim</span>
                    <span className={styles.metricVal} style={{ color: '#00E5FF' }}>
                      ₺{estimatedSavings.toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Yıllık Birikim Potansiyeli</span>
                    <span className={styles.metricVal} style={{ color: '#10B981' }}>
                      ₺{yearlyPotential.toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>

                <div className={styles.aiAdviceBox}>
                  🤖 <strong>AI Koç Önerisi:</strong> Aylık ₺{livingExpenses.toLocaleString('tr-TR')} temel gider sınırında kalarak yılda <strong>₺{yearlyPotential.toLocaleString('tr-TR')}</strong> tasarruf edebilirsiniz. Bu tutarla 1 yılda hayalinizdeki tatili finanse edebilir veya döviz kumbarasında altın birikimi başlatabilirsiniz.
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
                Her Kuruşun Hesabını Tutan <br />
                Kapsamlı Finans Paketi
              </h2>
              <p className={styles.sectionDesc}>
                Harcama Rehberi, sadece bir harcama defteri değil; cebinizdeki profesyonel finans müdürüdür.
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
                className={`${styles.tabBtn} ${selectedCategory === 'butce' ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedCategory('butce')}
              >
                Bütçe & Harcama
              </button>
              <button 
                type="button"
                className={`${styles.tabBtn} ${selectedCategory === 'ai' ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedCategory('ai')}
              >
                Yapay Zeka & Asistan
              </button>
              <button 
                type="button"
                className={`${styles.tabBtn} ${selectedCategory === 'birikim' ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedCategory('birikim')}
              >
                Yatırım & Kurlar
              </button>
              <button 
                type="button"
                className={`${styles.tabBtn} ${selectedCategory === 'guvenlik' ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedCategory('guvenlik')}
              >
                Raporlama & Güvenlik
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

        {/* App Showcase Screen Carousel */}
        <section id="ekranlar" className={styles.showcaseSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionPill}>
                <Sparkles size={14} />
                <span>UYGULAMA ARAYÜZÜ</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Kusursuz Karanlık Mod & Akıcı Tasarım
              </h2>
              <p className={styles.sectionDesc}>
                Göz yormayan OLED siyahı, akıcı geçişler ve zengin interaktif grafiklerle finans yönetimi artık bir zevk.
              </p>
            </div>
          </div>

          <div className={styles.carouselContainer}>
            <div className={styles.carouselTrack}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8].map((imgNum, idx) => (
                <div key={idx} className={styles.screenshotWrapper}>
                  <img 
                    src={`/para-kontrol/${imgNum}.png`} 
                    alt={`Harcama Rehberi Ekranı ${imgNum}`} 
                    className={styles.screenshotImg}
                    loading="lazy"
                  />
                </div>
              ))}
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
                Harcama Rehberi hakkında aklınıza takılan tüm soruların yanıtları burada.
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
                Finansal Özgürlüğünüze <br />
                <span className={styles.cyanGradientText}>Bugün Adım Atın.</span>
              </h2>
              <p className={styles.ctaSubtitle}>
                Harcama Rehberi ile gereksiz harcamaları durdurun, yapay zekanın gücüyle geleceğinize yatırım yapın. Google Play üzerinden ücretsiz hemen indirin!
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
                <Link href="/para-kontrol" className={styles.brand}>
                  <div className={styles.brandIconWrapper}>
                    <Wallet size={20} />
                  </div>
                  <div className={styles.brandTextWrapper}>
                    <span className={styles.brandName}>Harcama Rehberi</span>
                    <span className={styles.brandTagline}>Bütçe & Gider Takibi</span>
                  </div>
                </Link>
                <p className={styles.footerDesc}>
                  Harcama Rehberi ile bütçenizi planlayın, giderlerinizi kontrol altına alın ve finansal hedeflerinize emin adımlarla ulaşın. Maximora Studio güvencesiyle geliştirilmiştir.
                </p>
              </div>

              <div>
                <h4 className={styles.footerColTitle}>Hızlı Erişim</h4>
                <ul className={styles.footerLinks}>
                  <li><a href="#hero" className={styles.footerLink}>Ana Sayfa</a></li>
                  <li><a href="#simulator" className={styles.footerLink}>AI Simülatör</a></li>
                  <li><a href="#ozellikler" className={styles.footerLink}>Finans Modülleri</a></li>
                  <li><a href="#ekranlar" className={styles.footerLink}>Ekran Görüntüleri</a></li>
                  <li><a href="#sss" className={styles.footerLink}>Sıkça Sorulanlar</a></li>
                </ul>
              </div>

              <div>
                <h4 className={styles.footerColTitle}>Maximora Ekosistemi</h4>
                <ul className={styles.footerLinks}>
                  <li><Link href="/namaz-vakti" className={styles.footerLink}>Namaz Vakti (İslami Asistan)</Link></li>
                  <li><Link href="/falizo-home" className={styles.footerLink}>Falizo (Kahve Falı & Tarot)</Link></li>
                  <li><Link href="/ototakip-pro" className={styles.footerLink}>OtoTakip Pro (Dijital Garaj)</Link></li>
                </ul>
              </div>

              <div>
                <h4 className={styles.footerColTitle}>Yasal & Güvenlik</h4>
                <ul className={styles.footerLinks}>
                  <li><Link href="/para-kontrol-gizlilik" className={styles.footerLink}>Gizlilik Politikası</Link></li>
                  <li><a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Google Play Store</a></li>
                </ul>
              </div>

            </div>

            <div className={styles.footerBottom}>
              <span>&copy; {new Date().getFullYear()} Maximora Studio. Bütün hakları saklıdır.</span>
              <span>Harcama Rehberi • Güvenli, Şifreli & Biyometrik Korumalı Finans</span>
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
                💡 <strong>Detaylı Bilgi:</strong> {activeModal.details}
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
