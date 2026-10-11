"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { 
  Coffee, 
  Sparkles, 
  Compass, 
  MessageCircle, 
  PhoneCall, 
  Moon, 
  HeartHandshake, 
  Hand, 
  Zap, 
  ShieldCheck, 
  Star, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  ArrowUpRight, 
  Download, 
  Eye, 
  Flame,
  Radio
} from 'lucide-react';

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.falizo.app";

// 8 Fortune categories
const fortuneFeatures = [
  {
    id: 'coffee',
    icon: Coffee,
    title: 'Kahve Falı',
    desc: 'Fincan ve tabağınızın fotoğraflarını yükleyin. Usta ve deneyimli falcılarımız telvenizdeki gizli sembolleri, aşk ve kısmet işaretlerini özenle yorumlasın.',
    tag: 'En Popüler',
    details: 'Kahve falı modülünde fincan içi, tabak ve dip fotoğrafları yüksek çözünürlükte incelenir. Aşk, para, kısmet ve yol işaretleri usta yorumcularımızca derinlemesine analiz edilir.'
  },
  {
    id: 'tarot',
    icon: Sparkles,
    title: 'Tarot & Katina Falı',
    desc: 'Rider-Waite ve Katina desteleriyle 3 Kart, Kelt Haçı ve Aşk Açılımı yapın. Geçmişin köklerini ve geleceğin kapılarını aralayın.',
    tag: 'Kadim Bilgelik',
    details: 'Kartların ters ve düz anlamları, enerjisel kombinasyonları ve kader rotanız profesyonel tarot yorumcuları tarafından açılır.'
  },
  {
    id: 'live_chat',
    icon: PhoneCall,
    title: 'Canlı Sesli & Yazılı Seans',
    desc: 'Seçtiğiniz uzman mistik yorumcu ile Agora altyapısıyla anlık canlı sesli arama veya mesajlaşma yaparak aklınızdaki soruları birebir sorun.',
    tag: 'Canlı Görüşme',
    details: 'Gerçek zamanlı, uçtan uca şifreli sesli seans deneyimi. Falcınız fincanınızı canlı incelerken sesini dinleyin ve sohbet edin.'
  },
  {
    id: 'dream',
    icon: Moon,
    title: 'Rüya Tabirleri',
    desc: 'Gördüğünüz rüyayı anlatın; bilinçaltınızın evrene fısıldadığı manevi mesajları, İslami ve ezoterik kaynaklar ışığında öğrenin.',
    tag: 'Bilinçaltı',
    details: 'Sembolik varlıklar, renkler ve hisler kadim rüya külliyatlarına göre incelenir, hayatınızdaki dönüm noktalarına ışık tutar.'
  },
  {
    id: 'horoscope',
    icon: Compass,
    title: 'Günlük Burç & Astroloji',
    desc: 'Güneş, Ay ve Yükselen burcunuza özel günlük enerjiler, gezegen hareketleri ve yıldız haritası analizleri her sabah güncellenir.',
    tag: 'Kozmik Takvim',
    details: 'Merkür retroları, dolunay etkileri ve gezegen geçişlerinin burcunuza özel etkileri detaylı grafiklerle sunulur.'
  },
  {
    id: 'love_match',
    icon: HeartHandshake,
    title: 'Aşk & Enerji Uyumu',
    desc: 'Partnerinizle aranızdaki burç, numeroloji ve enerji frekansı uyumunu hesaplayın. İlişkinizin geleceğini ve kilit noktalarını keşfedin.',
    tag: 'İlişki Analizi',
    details: 'Doğum haritalarınızın çakışması (Synastry) üzerinden aşk bağı, iletişim gücü ve evlilik potansiyeli puanlanır.'
  },
  {
    id: 'palm',
    icon: Hand,
    title: 'El Falı (Palmistry)',
    desc: 'Avucunuzun fotoğrafını çekin; hayat, akıl, kalp ve kader çizgileriniz kadim kiromansi prensipleriyle analiz edilsin.',
    tag: 'Biyo-Enerji',
    details: 'Avuç içi tepe noktaları, parmak oranları ve ana çizgilerin yönü kaderinizdeki fırsatları ve potansiyelleri gösterir.'
  },
  {
    id: 'daily_energy',
    icon: Zap,
    title: 'Günlük Kozmik Enerji',
    desc: 'Günün numerolojik sayısı, şanslı rengi, kristali ve olumlamasıyla frekansınızı yükseltin; güne kozmik kalkanla başlayın.',
    tag: 'Ruhsal Rehber',
    details: 'Her güne özel meditasyon frekansı ve ruh halinizi dengeleyen mistik rehberlik bildirimleri.'
  }
];

// Tarot cards for interactive picker
const sampleTarotCards = [
  {
    id: 'major_00',
    name: 'Deli (The Fool)',
    image: '/falizo-site/tarot/major_00.jpg',
    meaning: 'Önünüzde yepyeni, bembeyaz bir sayfa açılıyor. Korkularınızı geride bırakıp cesaretle ilk adımı atma zamanı. Evren sizi destekliyor!'
  },
  {
    id: 'major_01',
    name: 'Büyücü (The Magician)',
    image: '/falizo-site/tarot/major_01.jpg',
    meaning: 'İhtiyacınız olan tüm güç, zeka ve kaynaklar şu an ellerinizin arasında. İstediğiniz gerçekliği yaratacak kudrete sahipsiniz, harekete geçin!'
  },
  {
    id: 'major_06',
    name: 'Aşıklar (The Lovers)',
    image: '/falizo-site/tarot/major_06.jpg',
    meaning: 'Kalbinizde güçlü bir çekim ve önemli bir dönüm noktası var. İç sesinizi dinleyerek sevgi ve dürüstlük dolu bir seçim yapmalısınız.'
  },
  {
    id: 'major_10',
    name: 'Kader Çarkı (Wheel of Fortune)',
    image: '/falizo-site/tarot/major_10.jpg',
    meaning: 'Kaderin rüzgarları yön değiştiriyor! Şans ve beklenmedik fırsatlar kapınızda. Döngünün yükseliş evresindesiniz, hazırlıklı olun.'
  },
  {
    id: 'major_19',
    name: 'Güneş (The Sun)',
    image: '/falizo-site/tarot/major_19.jpg',
    meaning: 'Karanlık bulutlar dağılıyor! Saf neşe, başarı, aydınlanma ve sağlık sizinle. Tüm şüpheler yerini parlak bir aydınlığa bırakıyor.'
  }
];

// Featured Tellers
const tellersData = [
  {
    id: 'leyla',
    name: 'Mistik Aşk Rehberi',
    title: 'Aşk & İlişkiler Uzmanı',
    rating: '5.0',
    reviews: 'Aktif Yorumcu',
    avatar: '/falizo-site/tellers/leyla.png',
    style: 'Empatik, Sıcakkanlı, Kalp Gözü Açık',
    bio: 'Aşk hayatındaki düğümleri çözen, partnerler arasındaki gizli duygusal frekansları ve bağı hisseden usta rehber.',
    capabilities: ['Kahve Falı', 'Tarot', 'Katina', 'Aşk Uyumu']
  },
  {
    id: 'efraz',
    name: 'Kadim Sır Rehberi',
    title: 'Gerçekler & Yüzleşme',
    rating: '4.9',
    reviews: 'Aktif Yorumcu',
    avatar: '/falizo-site/tellers/efraz.png',
    style: 'Net, Sezgisel, Derin',
    bio: 'Hayatındaki engelleri, arkandan dönen gizli durumları ve geleceğin dönüm noktalarını net bir dille ortaya koyar.',
    capabilities: ['Kahve Falı', 'Tarot', 'Astroloji', 'Rüya Tabiri']
  },
  {
    id: 'melek',
    name: 'Ruhsal Kozmik Rehber',
    title: 'Kariyer & İçsel Huzur',
    rating: '5.0',
    reviews: 'Aktif Yorumcu',
    avatar: '/falizo-site/tellers/melek.png',
    style: 'Sakin, Felsefi, Bilge',
    bio: 'Kariyer kararları, parasal kısmet kapıları ve içsel enerji blokajlarını çözmek için derin manevi okumalar yapar.',
    capabilities: ['Kahve Falı', 'Tarot', 'El Falı', 'Günlük Enerji']
  }
];

// Zodiac Signs
const zodiacSigns = [
  { name: 'Koç', dates: '21 Mar - 19 Nis', img: '/falizo-site/zodiac/aries.png', element: 'Ateş' },
  { name: 'Boğa', dates: '20 Nis - 20 May', img: '/falizo-site/zodiac/taurus.png', element: 'Toprak' },
  { name: 'İkizler', dates: '21 May - 20 Haz', img: '/falizo-site/zodiac/gemini.png', element: 'Hava' },
  { name: 'Yengeç', dates: '21 Haz - 22 Tem', img: '/falizo-site/zodiac/cancer.png', element: 'Su' },
  { name: 'Aslan', dates: '23 Tem - 22 Ağu', img: '/falizo-site/zodiac/leo.png', element: 'Ateş' },
  { name: 'Başak', dates: '23 Ağu - 22 Eyl', img: '/falizo-site/zodiac/virgo.png', element: 'Toprak' },
  { name: 'Terazi', dates: '23 Eyl - 22 Eki', img: '/falizo-site/zodiac/libra.png', element: 'Hava' },
  { name: 'Akrep', dates: '23 Eki - 21 Kas', img: '/falizo-site/zodiac/scorpio.png', element: 'Su' },
  { name: 'Yay', dates: '22 Kas - 21 Ara', img: '/falizo-site/zodiac/sagittarius.png', element: 'Ateş' },
  { name: 'Oğlak', dates: '22 Ara - 19 Oca', img: '/falizo-site/zodiac/capricorn.png', element: 'Toprak' },
  { name: 'Kova', dates: '20 Oca - 18 Şub', img: '/falizo-site/zodiac/aquarius.png', element: 'Hava' },
  { name: 'Balık', dates: '19 Şub - 20 Mar', img: '/falizo-site/zodiac/pisces.png', element: 'Su' }
];

// FAQs
const faqs = [
  {
    q: 'Falımı kimler yorumluyor?',
    a: 'Falizo’da fallarınız alanında uzmanlaşmış, hisleri kuvvetli ve yılların deneyimine sahip usta mistik yorumcularımız tarafından gizlilik prensipleriyle tek tek özenle incelenip yorumlanır.'
  },
  {
    q: 'Canlı sesli seans nasıl işliyor?',
    a: 'Uygulama üzerinden seans talebi oluşturduğunuzda falcınızla güvenli sesli bağlantı kurulur. Telefon numaranız ve bilgileriniz tamamen gizli kalır, doğrudan uygulama içinden canlı sesli görüşme sağlarsınız.'
  },
  {
    q: 'Fotoğraflarım ve kişisel bilgilerim güvende mi?',
    a: 'Kesinlikle evet. Gönderdiğiniz kahve fincanı veya el fotoğrafları yalnızca yorumlama amacıyla uçtan uca şifreli olarak işlenir. 3. şahıslarla asla paylaşılmaz.'
  },
  {
    q: 'Fal sonuçlarım ne kadar sürede elime ulaşır?',
    a: 'Canlı ve gerçek yorumcularımızın sesli ve yazılı detaylı incelemeleri fincanınızın yoğunluğuna göre ortalama 15-30 dakika içinde tarafınıza iletilir.'
  },
  {
    q: 'Nasıl ücretsiz kredi kazanabilirim?',
    a: 'Uygulama içerisinden arkadaş davet kodunuzu paylaşarak, davet ettiğiniz her 2 arkadaşınız için 25 + 25 olmak üzere toplam 50 kredi hediye kazanırsınız. Kazandığınız kredileri dilediğiniz falda kullanabilirsiniz.'
  }
];

export default function FalizoHomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);
  const [drawnCard, setDrawnCard] = useState<any>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const zodiacTrackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Scroll listener for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Zodiac scroll helper
  const handleZodiacScroll = (direction: 'left' | 'right') => {
    if (!zodiacTrackRef.current) return;
    const amount = direction === 'left' ? -300 : 300;
    zodiacTrackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Zodiac mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!zodiacTrackRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - zodiacTrackRef.current.offsetLeft;
    scrollLeftRef.current = zodiacTrackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !zodiacTrackRef.current) return;
    e.preventDefault();
    const x = e.pageX - zodiacTrackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    zodiacTrackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll(`.${styles.revealItem}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Tarot card flip handler
  const handleCardClick = (index: number) => {
    if (flippedCardIndex === index) return;
    const card = sampleTarotCards[index % sampleTarotCards.length];
    setFlippedCardIndex(index);
    setDrawnCard(card);
  };

  return (
    <>
      {/* Background style fix */}
      <style dangerouslySetInnerHTML={{ __html: 'body { background-color: #08060F !important; margin: 0; padding: 0; }' }} />

      <div className={styles.landing}>
        {/* Ambient background glows */}
        <div className={styles.spaceBackground} />
        <div className={styles.starsOverlay} />

        {/* Fixed Glass Header */}
        <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
          <div className={styles.container}>
            <div className={styles.headerInner}>
              <Link href="/falizo-home" className={styles.brand}>
                <Image 
                  src="/falizo-site/uygulamaiconu2.png" 
                  alt="Falizo Logo" 
                  width={44} 
                  height={44} 
                  className={styles.brandLogo}
                />
                <div className={styles.brandTextWrapper}>
                  <span className={styles.brandName}>Falizo<span className={styles.brandNameSub}>: Kahve Falı & Tarot</span></span>
                  <span className={styles.brandTagline}>Canlı & Gerçek Falcılar</span>
                </div>
              </Link>

              <nav className={styles.navLinks}>
                <a href="#hero" className={styles.navLink}>Ana Sayfa</a>
                <a href="#tarot" className={styles.navLink}>Tarot Deneyimi</a>
                <a href="#ozellikler" className={styles.navLink}>Fal Türleri</a>
                <a href="#falcilar" className={styles.navLink}>Mistik Falcılar</a>
                <a href="#burclar" className={styles.navLink}>Burçlar</a>
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
              <div className={`${styles.heroContent} ${styles.revealItem}`}>
                <div className={styles.heroBadge}>
                  <span className={styles.pulseDot} />
                  <span className={styles.badgeText}>Gerçek & Canlı Falcılarla Birebir Seans</span>
                </div>

                <h1 className={styles.heroTitle}>
                  Kaderinin Şifrelerini Çözmeye <br />
                  <span className={styles.goldGradientText}>Hazır Mısın?</span>
                </h1>

                <p className={styles.heroSubtitle}>
                  Falizo; kahve falı, tarot, rüya tabirleri ve astrolojiyi kristal cam tasarımın zarafetiyle sunar. Fincanınızı yükleyin, usta falcılarla canlı sesli görüşün ve yıldızların fısıltısını keşfedin.
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

                  <a href="#tarot" className={styles.secondaryCtaBtn}>
                    <Sparkles size={18} />
                    <span>Günün Kartını Çek</span>
                  </a>
                </div>

                {/* Stats Bar */}
                <div className={styles.heroStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>8 Mistik</span>
                    <span className={styles.statLabel}>Fal & Kehanet Modülü</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>%100</span>
                    <span className={styles.statLabel}>Gizli & Kişiye Özel</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>7/24</span>
                    <span className={styles.statLabel}>Canlı Uzman Rehber</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Cylinder / Hologram Portal Showcase */}
              <div className={`${styles.cylinderStage} ${styles.revealItem}`}>
                <div className={styles.cylinderAura} />
                <div className={styles.cylinderRing} />
                <div className={styles.cylinderRingInner} />

                {/* Floating Glass Chips */}
                <div className={styles.floatingBadgeTop}>
                  <div className={styles.pulseDot} style={{ background: '#22C55E', boxShadow: '0 0 10px #22C55E' }} />
                  <div className={styles.badgeTextCol}>
                    <span className={styles.badgeTitle}>Canlı Falcılar Aktif</span>
                    <span className={styles.badgeSubtitle}>Sesli & Yazılı Seans</span>
                  </div>
                </div>

                <div className={styles.floatingBadgeBottom}>
                  <div className={styles.pulseDot} style={{ background: '#F2D474', boxShadow: '0 0 10px #F2D474' }} />
                  <div className={styles.badgeTextCol}>
                    <span className={styles.badgeTitle}>Özel Canlı Seans</span>
                    <span className={styles.badgeSubtitle}>Birebir Sesli Yorum</span>
                  </div>
                </div>

                <div className={styles.floatingBadgeCenter}>
                  <Coffee size={18} color="#F2D474" />
                  <div className={styles.badgeTextCol}>
                    <span className={styles.badgeTitle}>Fincan Analizi</span>
                    <span className={styles.badgeSubtitle}>%99 Yüksek İsabet</span>
                  </div>
                </div>

                {/* Main 3D Cylinder Visual */}
                <div className={styles.cylinderFrame}>
                  <div className={styles.cylinderImageWrapper}>
                    <Image 
                      src="/falizo-site/auth_gateway.png" 
                      alt="Falizo Kozmik Geçit ve Cam Tasarım" 
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

        {/* Interactive Tarot Card Drawer Section */}
        <section id="tarot" className={styles.tarotSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} ${styles.revealItem}`}>
              <div className={styles.sectionPill}>
                <Sparkles size={14} />
                <span>İnteraktif Kehanet Deneyimi</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Günün <span className={styles.goldGradientText}>Tarot Kartını</span> Çek
              </h2>
              <p className={styles.sectionSubtitle}>
                Aklından bir soru tut, derin bir nefes al ve seni en çok çeken kartın üzerine dokun.
              </p>
            </div>

            <div className={`${styles.tarotDrawBox} ${styles.revealItem}`}>
              <div className={styles.tarotCardsContainer}>
                {[0, 1, 2].map((idx) => {
                  const card = sampleTarotCards[idx];
                  const isFlipped = flippedCardIndex === idx;

                  return (
                    <div 
                      key={idx} 
                      className={styles.tarotCardWrapper}
                      onClick={() => handleCardClick(idx)}
                    >
                      <div className={`${styles.tarotCardInner} ${isFlipped ? styles.tarotCardFlipped : ''}`}>
                        {/* Back of Card */}
                        <div className={styles.tarotCardBack}>
                          <div className={styles.cardBackOrnament}>
                            <span className={styles.cardBackSymbol}>🔮</span>
                            <span className={styles.cardBackText}>KART {idx + 1}</span>
                            <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>DOKUN VE AÇ</span>
                          </div>
                        </div>

                        {/* Front of Card */}
                        <div className={styles.tarotCardFront}>
                          <img 
                            src={card.image} 
                            alt={card.name} 
                            className={styles.tarotCardImg}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Revealed Card Guidance Panel */}
              {drawnCard && (
                <div className={styles.tarotResultPanel}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#F2D474', marginBottom: '0.5rem', fontWeight: 700 }}>
                    <Sparkles size={18} />
                    <span>SEÇTİĞİNİZ KART</span>
                  </div>
                  <h3 className={styles.tarotResultTitle}>{drawnCard.name}</h3>
                  <p className={styles.tarotResultDesc}>{drawnCard.meaning}</p>
                  
                  <div style={{ marginTop: '1.5rem' }}>
                    <a 
                      href={PLAY_STORE_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.secondaryCtaBtn}
                      style={{ display: 'inline-flex' }}
                    >
                      <span>Falizo ile Tam 10 Kartlık Kelt Haçı Açılımı Yap</span>
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 8 Fortune Categories Section */}
        <section id="ozellikler" className={styles.featuresSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} ${styles.revealItem}`}>
              <div className={styles.sectionPill}>
                <Coffee size={14} />
                <span>8 Eşsiz Mistik Modül</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Her Soruna Özel Bir <span className={styles.purpleGradientText}>Kehanet Kapısı</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Falizo, sıradan bir fal uygulamasından çok daha fazlası. Ruhsal yolculuğunuzun her adımında yanınızda olan kapsamlı bir kozmik kütüphane.
              </p>
            </div>

            <div className={styles.featuresGrid}>
              {fortuneFeatures.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div 
                    key={feat.id} 
                    className={`${styles.featureCard} ${styles.revealItem}`}
                    onClick={() => setSelectedFeature(feat)}
                  >
                    <div className={styles.featureIconBox}>
                      <IconComponent size={28} color="#F2D474" />
                    </div>
                    <h3 className={styles.featureTitle}>{feat.title}</h3>
                    <p className={styles.featureDesc}>{feat.desc}</p>
                    <div className={styles.featureBadge}>
                      <span>{feat.tag}</span>
                      <ChevronRight size={15} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tellers Showcase Section */}
        <section id="falcilar" className={styles.tellersSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} ${styles.revealItem}`}>
              <div className={styles.sectionPill}>
                <Radio size={14} />
                <span>Usta Yorumcular</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Gerçek <span className={styles.goldGradientText}>Mistik Falcılarımızla</span> Tanışın
              </h2>
              <p className={styles.sectionSubtitle}>
                Her biri kendi alanında uzmanlaşmış, yüz binlerce fala rehberlik etmiş mistik yorumcularımızla dilediğiniz an iletişime geçin.
              </p>
            </div>

            <div className={styles.tellersGrid}>
              {tellersData.map((teller) => (
                <div key={teller.id} className={`${styles.tellerCard} ${styles.revealItem}`}>
                  <div className={styles.tellerTop}>
                    <div className={styles.tellerAvatarWrapper}>
                      <img 
                        src={teller.avatar} 
                        alt={teller.name} 
                        className={styles.tellerAvatar}
                      />
                      <span className={styles.onlineIndicator} title="Çevrimiçi" />
                    </div>
                    <div className={styles.tellerInfo}>
                      <h3 className={styles.tellerName}>{teller.name}</h3>
                      <span className={styles.tellerTitle}>{teller.title}</span>
                      <div className={styles.tellerRating}>
                        <Star size={15} fill="#FBBF24" color="#FBBF24" />
                        <span>{teller.rating} ({teller.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <p className={styles.tellerBio}>{teller.bio}</p>

                  <div className={styles.capabilitiesList}>
                    {teller.capabilities.map((cap, i) => (
                      <span key={i} className={styles.capabilityPill}>{cap}</span>
                    ))}
                  </div>

                  <a 
                    href={PLAY_STORE_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.consultBtn}
                  >
                    <PhoneCall size={16} />
                    <span>Canlı Seans Başlat</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zodiac Strip */}
        <section id="burclar" className={styles.zodiacSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} ${styles.revealItem}`}>
              <div className={styles.sectionPill}>
                <Compass size={14} />
                <span>Gökyüzü Rehberliği</span>
              </div>
              <h2 className={styles.sectionTitle}>
                12 Burcun <span className={styles.purpleGradientText}>Kozmik Döngüsü</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Her gün güncellenen gezegen geçişleri ve transit açılarıyla burcunuzun gizli güçlerini keşfedin.
              </p>
            </div>

            <div className={styles.zodiacWrapper}>
              <button 
                type="button"
                className={`${styles.zodiacNavBtn} ${styles.zodiacNavPrev}`}
                onClick={() => handleZodiacScroll('left')}
                aria-label="Önceki Burçlar"
              >
                <ChevronLeft size={22} />
              </button>

              <div 
                ref={zodiacTrackRef}
                className={styles.zodiacTrack}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
              >
                {zodiacSigns.map((z, idx) => (
                  <div key={idx} className={styles.zodiacCard}>
                    <img src={z.img} alt={z.name} className={styles.zodiacImg} draggable={false} />
                    <h4 className={styles.zodiacName}>{z.name}</h4>
                    <span className={styles.zodiacDates}>{z.dates}</span>
                    <span style={{ fontSize: '0.7rem', color: '#F2D474', marginTop: '0.3rem', fontWeight: 600 }}>{z.element}</span>
                  </div>
                ))}
              </div>

              <button 
                type="button"
                className={`${styles.zodiacNavBtn} ${styles.zodiacNavNext}`}
                onClick={() => handleZodiacScroll('right')}
                aria-label="Sonraki Burçlar"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </section>

        {/* App Screens Showcase */}
        <section className={styles.showcaseSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} ${styles.revealItem}`}>
              <div className={styles.sectionPill}>
                <Eye size={14} />
                <span>Cam Tasarım Estetiği</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Göz Alıcı <span className={styles.goldGradientText}>Uygulama Deneyimi</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Karanlık modun asaleti ve akıcı cam arayüzü ile fal bakmak hiç bu kadar büyüleyici olmamıştı.
              </p>
            </div>

            <div className={styles.screenshotsMarqueeContainer}>
              <div className={styles.screenshotsTrack}>
                {['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'].map((imgName, i) => (
                  <div key={i} className={styles.screenMockup}>
                    <img 
                      src={`/falizo-site/görüntüler/${imgName}`} 
                      alt={`Falizo Uygulama Arayüzü ${(i % 7) + 1}`} 
                      className={styles.screenImg}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="sss" className={styles.faqSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} ${styles.revealItem}`}>
              <div className={styles.sectionPill}>
                <CheckCircle2 size={14} />
                <span>Merak Edilenler</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Sıkça Sorulan <span className={styles.goldGradientText}>Sorular</span>
              </h2>
            </div>

            <div className={`${styles.faqList} ${styles.revealItem}`}>
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
                  >
                    <button 
                      className={styles.faqQuestion}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown 
                        size={20} 
                        style={{ 
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                          color: '#F2D474'
                        }} 
                      />
                    </button>
                    {isOpen && (
                      <div className={styles.faqAnswer}>
                        <p style={{ margin: 0 }}>{faq.a}</p>
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
                Geleceğini Keşfetmeye <br />
                <span className={styles.goldGradientText}>Bugün Başla</span>
              </h2>
              <p className={styles.ctaSubtitle}>
                Falizo’yu şimdi ücretsiz indir; ilk falına özel hoş geldin kredisini kap ve usta falcılarla anında sohbete başla!
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
                  %100 Gizli & Güvenli Altyapı
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Zap size={16} color="#F2D474" />
                  Hızlı Yorumlama Garantisi
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Star size={16} color="#F2D474" />
                  Doğrulanmış Gerçek Falcılar
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
                    src="/falizo-site/uygulamaiconu2.png" 
                    alt="Falizo Logo" 
                    width={36} 
                    height={36} 
                    style={{ borderRadius: '10px' }} 
                  />
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>Falizo: Kahve Falı & Tarot</span>
                </div>
                <p style={{ fontSize: '0.88rem', lineHeight: '1.6', margin: 0, color: '#9E91B8' }}>
                  Kahve falı, tarot açılımları ve usta mistik falcıların buluştuğu yeni nesil kehanet platformu. Maximora Studio güvencesiyle.
                </p>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Hızlı Bağlantılar</h4>
                <ul className={styles.footerLinks}>
                  <li><a href="#hero" className={styles.footerLink}>Ana Sayfa</a></li>
                  <li><a href="#tarot" className={styles.footerLink}>Tarot Deneyimi</a></li>
                  <li><a href="#ozellikler" className={styles.footerLink}>Fal Türleri</a></li>
                  <li><a href="#falcilar" className={styles.footerLink}>Mistik Falcılar</a></li>
                  <li><a href="#burclar" className={styles.footerLink}>Burç Kuşağı</a></li>
                </ul>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Yasal & Güvenlik</h4>
                <ul className={styles.footerLinks}>
                  <li>
                    <Link href="/falizo-gizlilik-politikasi" className={styles.footerLink}>
                      Gizlilik Politikası
                    </Link>
                  </li>
                  <li>
                    <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                      Google Play Mağazası
                    </a>
                  </li>
                  <li>
                    <a href="mailto:destek@maximorashop.com" className={styles.footerLink}>
                      destek@maximorashop.com
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Maximora Ekosistemi</h4>
                <ul className={styles.footerLinks}>
                  <li><Link href="/namaz-vakti" className={styles.footerLink}>Namaz Vakti Uygulaması</Link></li>
                  <li><Link href="/ototakip-pro" className={styles.footerLink}>Oto Takip Pro</Link></li>
                  <li><Link href="/para-kontrol" className={styles.footerLink}>Harcama Rehberi</Link></li>
                  <li><Link href="/studio" className={styles.footerLink}>Maximora Studio</Link></li>
                </ul>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <span>&copy; 2026 Maximora Studio. Tüm Hakları Saklıdır.</span>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <Link href="/falizo-gizlilik-politikasi" style={{ color: '#F2D474', textDecoration: 'none' }}>
                  Gizlilik ve Veri Güvenliği
                </Link>
                <span>|</span>
                <span style={{ color: '#9E91B8' }}>Geliştirici: Maximora Studio</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Feature Detail Modal */}
        {selectedFeature && (() => {
          const ModalIcon = selectedFeature.icon;
          return (
            <div className={styles.modalOverlay} onClick={() => setSelectedFeature(null)}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalClose} onClick={() => setSelectedFeature(null)}>✕</button>
                <div className={styles.featureIconBox} style={{ margin: '0 auto 1.25rem' }}>
                  <ModalIcon size={32} color="#F2D474" />
                </div>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.75rem' }}>
                  {selectedFeature.title}
                </h3>
                <p style={{ color: '#EADCF8', fontSize: '0.98rem', lineHeight: '1.7', margin: '0 0 1.5rem' }}>
                  {selectedFeature.details}
                </p>
                <a 
                  href={PLAY_STORE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.consultBtn}
                >
                  <Download size={16} />
                  <span>Uygulamada Fal Baktır</span>
                </a>
              </div>
            </div>
          );
        })()}

      </div>
    </>
  );
}
