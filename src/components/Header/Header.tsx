"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import { useStore } from '@/store/useStore';
import { ChevronDown, Menu, X, User, LogOut, LogIn, UserPlus, ShoppingBag, Search, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import SearchOverlay from './SearchOverlay';
import TopBar from '../TopBar/TopBar';

export default function Header() {
  const { cart, favorites, user, setUser, syncUserData, logout } = useStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const lastSyncedId = React.useRef<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUserId = session?.user?.id || null;
      
      // Eğer kullanıcı ID'si değişmediyse tekrar senkronize etme (Döngü kırıcı)
      if (currentUserId === lastSyncedId.current) return;
      
      lastSyncedId.current = currentUserId;

      if (currentUserId) {
        await syncUserData(currentUserId);
      } else if (event === 'SIGNED_OUT') {
        logout();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sayfa değiştiğinde mobil menüyü kapat
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileCategory = (cat: string) => {
    setMobileCategoryOpen(prev => prev === cat ? null : cat);
  };

  const handleUserLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error(e);
    } finally {
      logout();
      setUserMenuOpen(false);
      setIsMobileMenuOpen(false);
      router.push('/');
    }
  };

  return (
    <>
      <TopBar />
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          
          {/* SOL TARAF: Hamburger ve Arama (Mobilde yan yana) */}
          <div className={styles.leftActions}>
            <button className={styles.hamburger} aria-label="Menü" onClick={() => setIsMobileMenuOpen(true)}>
               <Menu size={26} />
            </button>
            <button 
              className={`${styles.iconBtn} ${styles.mobileSearchBtn}`} 
              aria-label="Ara"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={22} />
            </button>
          </div>

          {/* Logo (Orta) */}
          <Link href="/" className={styles.logo}>
            <img src="/logo-gold.png" alt="Maximora" className={styles.logoImage} />
          </Link>
          
          {/* Masaüstü Navigation Menüsü (PC'de Görünür) */}
          <nav className={styles.nav}>
            {/* ... navigation links ... */}
            <div className={styles.hasMegaMenu}>
               <div className={styles.navLink}>
                  Kadın Aksesuar <ChevronDown size={14} />
               </div>
               <div className={styles.megaMenu}>
                  <div className={styles.megaCol}>
                     <span className={styles.megaTitle}>ÇANTA MARKALARI</span>
                     <Link href="/brand/beymen" className={styles.megaLink}>Beymen</Link>
                     <Link href="/brand/vakko" className={styles.megaLink}>Vakko</Link>
                     <Link href="/brand/maximora" className={styles.megaLink}>Maximora</Link>
                  </div>
               </div>
            </div>

            <div className={styles.hasMegaMenu}>
               <div className={styles.navLink}>
                  Erkek Aksesuar <ChevronDown size={14} />
               </div>
               <div className={styles.megaMenu}>
                  <div className={styles.megaCol}>
                     <span className={styles.megaTitle}>KATEGORİLER</span>
                     <Link href="/brand/canta" className={styles.megaLink}>Çanta</Link>
                  </div>
               </div>
            </div>

            <div className={styles.hasMegaMenu}>
               <div className={styles.navLink}>
                  Akıllı Saatler <ChevronDown size={14} />
               </div>
               <div className={styles.megaMenu}>
                  <div className={styles.megaCol}>
                     <span className={styles.megaTitle}>KOLEKSİYONLAR</span>
                     <Link href="/brand/haino-teko" className={styles.megaLink}>Haino Teko Serisi</Link>
                  </div>
               </div>
            </div>

            <Link href="/bize-ulasin" className={styles.navLink}>
              Bize Ulaşın
            </Link>

            <Link href="/orders/track" className={styles.navLink}>
              Siparişinizi Takip Edin
            </Link>
          </nav>

          {/* Sağ İkonlar: Hesap, Favoriler, Sepet */}
          <div className={styles.actions}>
            {/* Arama (Masaüstünde burada kalır) */}
            <button 
              className={`${styles.iconBtn} ${styles.desktopSearchBtn}`} 
              aria-label="Ara"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={22} />
            </button>

            {/* Kullanıcı ikonu */}
            <div style={{ position: 'relative' }}>
              <button
                aria-label="Hesabım"
                className={styles.iconBtn}
                onClick={() => {
                  if (window.innerWidth < 1025) {
                    router.push('/hesabim');
                  } else {
                    setUserMenuOpen(prev => !prev);
                  }
                }}
              >
                <User size={22} />
                {mounted && user && (
                  <span style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e', border: '1.5px solid white' }} />
                )}
              </button>
              
              {/* Dropdown (Sadece Masaüstü) */}
              {userMenuOpen && (
                <div className={styles.userDropdown} onMouseLeave={() => setUserMenuOpen(false)}>
                  {user ? (
                    <>
                      <div className={styles.dropdownHeader}>
                        <span className={styles.userWelcome}>Hoş Geldin</span>
                        <span className={styles.userMail}>{user.name || user.email}</span>
                      </div>
                      <Link href="/hesabim" className={styles.dropdownItem} onClick={() => setUserMenuOpen(false)}>
                        <User size={18} /> Hesabım
                      </Link>
                      {user.role === 'admin' && (
                        <Link href="/marlboro" className={styles.dropdownItem} style={{ color: '#d4af37' }} onClick={() => setUserMenuOpen(false)}>
                          <ShieldCheck size={18} /> Admin Paneli
                        </Link>
                      )}
                      <Link href="/hesabim" className={styles.dropdownItem} onClick={() => setUserMenuOpen(false)}>
                        <ShoppingBag size={18} /> Siparişlerim
                      </Link>
                      <button onClick={handleUserLogout} className={`${styles.dropdownItem} ${styles.dropdownLogout}`}>
                        <LogOut size={18} /> Çıkış Yap
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className={styles.dropdownItem} onClick={() => setUserMenuOpen(false)}>
                        <LogIn size={18} /> Giriş Yap
                      </Link>
                      <Link href="/register" className={styles.dropdownItem} onClick={() => setUserMenuOpen(false)}>
                        <UserPlus size={18} /> Kayıt Ol
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link href="/favorites" aria-label="Favoriler" className={styles.iconBtn}>
               <div style={{ position: 'relative' }}>
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                 </svg>
                 {mounted && favorites && favorites.length > 0 && (
                   <span className={styles.cartBadge}>{favorites.length}</span>
                 )}
               </div>
            </Link>

            <Link href="/cart" aria-label="Sepet" className={styles.iconBtn}>
               <div style={{ position: 'relative' }}>
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <circle cx="9" cy="21" r="1"></circle>
                   <circle cx="20" cy="21" r="1"></circle>
                   <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                 </svg>
                 {mounted && cartItemCount > 0 && (
                   <span className={styles.cartBadge}>{cartItemCount}</span>
                 )}
               </div>
            </Link>
          </div>
        </div>
      </header>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Mobil Menü Sistemi (Off-canvas) */}
      <div 
        className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOverlayOpen : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
         <div className={styles.mobileMenuHeader}>
            <img src="/logo-gold.png" alt="Maximora" style={{ height: '45px', width: 'auto' }} />
            <button className={styles.mobileMenuClose} onClick={() => setIsMobileMenuOpen(false)}>
               <X size={28} />
            </button>
         </div>

         <div className={styles.mobileNav}>
            <div className={styles.mobileNavItem}>
               <button className={styles.mobileNavBtn} onClick={() => toggleMobileCategory('kadin')}>
                  Kadın Aksesuar 
                  <ChevronDown size={18} style={{ transform: mobileCategoryOpen === 'kadin' ? 'rotate(180deg)' : 'rotate(0)' }} className={styles.iconTransition} />
               </button>
               {mobileCategoryOpen === 'kadin' && (
                 <div className={styles.mobileSubMenu}>
                    <span className={styles.mobileSubTitle}>ÇANTA MARKALARI</span>
                    <Link href="/brand/beymen" className={styles.mobileSubLink}>Beymen</Link>
                    <Link href="/brand/vakko" className={styles.mobileSubLink}>Vakko</Link>
                    <Link href="/brand/maximora" className={styles.mobileSubLink}>Maximora</Link>
                 </div>
               )}
            </div>

            <div className={styles.mobileNavItem}>
               <button className={styles.mobileNavBtn} onClick={() => toggleMobileCategory('erkek')}>
                  Erkek Aksesuar <ChevronDown size={18} style={{ transform: mobileCategoryOpen === 'erkek' ? 'rotate(180deg)' : 'rotate(0)' }} className={styles.iconTransition} />
               </button>
               {mobileCategoryOpen === 'erkek' && (
                 <div className={styles.mobileSubMenu}>
                    <span className={styles.mobileSubTitle}>KATEGORİLER</span>
                    <Link href="/brand/canta" className={styles.mobileSubLink}>Çanta</Link>
                 </div>
               )}
            </div>

            <div className={styles.mobileNavItem}>
               <button className={styles.mobileNavBtn} onClick={() => toggleMobileCategory('saat')}>
                  Akıllı Saatler <ChevronDown size={18} style={{ transform: mobileCategoryOpen === 'saat' ? 'rotate(180deg)' : 'rotate(0)' }} className={styles.iconTransition} />
               </button>
               {mobileCategoryOpen === 'saat' && (
                 <div className={styles.mobileSubMenu}>
                    <span className={styles.mobileSubTitle}>KOLEKSİYONLAR</span>
                    <Link href="/brand/haino-teko" className={styles.mobileSubLink}>Haino Teko Serisi</Link>
                 </div>
               )}
            </div>

            <Link href="/bize-ulasin" className={styles.mobileNavLink}>Bize Ulaşın</Link>
            <Link href="/orders/track" className={styles.mobileNavLink}>Siparişinizi Takip Edin</Link>
         </div>
         
         {/* Mobil Menü Alt Bilgi Gösterimi */}
         <div className={styles.mobileFooter}>
            {user ? (
              <>
                <Link href="/hesabim" className={styles.mobileFooterLink} onClick={() => setIsMobileMenuOpen(false)}>Hesabım</Link>
                {user.role === 'admin' && (
                  <Link href="/marlboro" className={styles.mobileFooterLink} style={{ color: '#d4af37' }} onClick={() => setIsMobileMenuOpen(false)}>Admin Paneli</Link>
                )}
                <button onClick={handleUserLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e11d48', fontSize: '0.9rem', padding: '0.5rem 0' }}>Çıkış Yap</button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.mobileFooterLink} onClick={() => setIsMobileMenuOpen(false)}>Giriş Yap</Link>
                <Link href="/register" className={styles.mobileFooterLink} onClick={() => setIsMobileMenuOpen(false)}>Kayıt Ol</Link>
              </>
            )}
            <Link href="/favorites" className={styles.mobileFooterLink}>Favorilerim</Link>
         </div>
      </div>
    </>
  );
}
