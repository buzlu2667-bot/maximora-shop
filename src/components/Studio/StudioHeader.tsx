"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import styles from './StudioHeader.module.css';

export default function StudioHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openChat = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).$zoho && (window as any).$zoho.salesiq) {
      (window as any).$zoho.salesiq.floatwindow.visible('show');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { 
      name: 'Hizmetlerimiz', 
      path: '#',
      subLinks: [
        { name: 'Web Tasarım', path: '/studio/web-tasarim' },
        { name: 'E-Ticaret Paketleri', path: '/studio/e-ticaret-paketleri' },
        { name: 'Mobil Uygulama', path: '/studio/mobil-uygulama' },
        { name: 'Özel Yazılım', path: '/studio/ozel-yazilim' },
        { name: 'SEO Hizmeti', path: '/studio/seo-hizmeti' },
      ]
    },
    { name: 'Ürünlerimiz', path: '/studio/urunlerimiz' },
    { 
      name: 'Projelerimiz', 
      path: '#',
      subLinks: [
        { name: 'Web Siteleri', path: '/studio/projelerimiz' },
        { 
          name: 'Mobil Uygulamalar', 
          path: '#',
          subLinks: [
            { name: 'Namaz Vakitleri', path: 'https://www.maximorashop.com/namaz-vakti', external: true },
            { name: 'Para Kontrol', path: 'https://www.maximorashop.com/para-kontrol', external: true },
            { name: 'Oto Takip Pro', path: 'https://www.maximorashop.com/ototakip-pro', external: true },
          ]
        }
      ]
    },
    { name: 'Kurumsal', path: '/studio/kurumsal' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/studio" className={styles.logo}>
          MAXIMORA <span className={styles.goldText}>STUDIO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <div key={link.name} className={styles.navItem}>
              {link.subLinks ? (
                <>
                  <span className={styles.navLink} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {link.name} <ChevronDown size={14} className={styles.chevronIcon} />
                  </span>
                  <div className={styles.dropdown}>
                    {link.subLinks.map(sub => (
                      (sub as any).subLinks ? (
                        <div key={sub.name} className={styles.nestedDropdownContainer}>
                          <span className={styles.dropdownLink} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                            {sub.name} <ChevronRight size={14} className={styles.chevronIconRight} />
                          </span>
                          <div className={styles.nestedDropdown}>
                            {(sub as any).subLinks.map((nested: any) => (
                              <Link 
                                key={nested.name} 
                                href={nested.path} 
                                className={styles.dropdownLink}
                                target={nested.external ? "_blank" : "_self"}
                                rel={nested.external ? "noopener noreferrer" : undefined}
                              >
                                {nested.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link 
                          key={sub.name} 
                          href={sub.path} 
                          className={styles.dropdownLink}
                          target={(sub as any).external ? "_blank" : "_self"}
                          rel={(sub as any).external ? "noopener noreferrer" : undefined}
                        >
                          {sub.name}
                        </Link>
                      )
                    ))}
                  </div>
                </>
              ) : (
                <Link href={link.path} className={styles.navLink}>
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className={styles.actions}>
          <button onClick={openChat} className={styles.contactBtn}>
            İletişime Geç <ArrowRight size={16} />
          </button>
          
          {/* Mobile Menu Button */}
          <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${mobileMenuOpen ? styles.mobileNavOpen : ''}`}>
        {navLinks.map((link) => (
          <div key={link.name}>
            {link.subLinks ? (
              <>
                <div className={styles.mobileNavLink} style={{ color: '#d4af37', borderBottom: 'none', paddingBottom: '0.5rem' }}>
                  {link.name}
                </div>
                <div className={styles.mobileSubNav}>
                  {link.subLinks.map(sub => (
                    (sub as any).subLinks ? (
                      <div key={sub.name} className={styles.mobileNestedContainer}>
                        <div className={styles.mobileSubNavLink} style={{ color: '#d4af37', borderBottom: 'none', paddingBottom: '0.25rem', pointerEvents: 'none' }}>
                          {sub.name}
                        </div>
                        <div className={styles.mobileNestedNav}>
                          {(sub as any).subLinks.map((nested: any) => (
                            <Link 
                              key={nested.name} 
                              href={nested.path} 
                              className={styles.mobileSubNavLink}
                              style={{ paddingLeft: '15%' }}
                              onClick={() => setMobileMenuOpen(false)}
                              target={nested.external ? "_blank" : "_self"}
                              rel={nested.external ? "noopener noreferrer" : undefined}
                            >
                              {nested.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link 
                        key={sub.name} 
                        href={sub.path} 
                        className={styles.mobileSubNavLink}
                        onClick={() => setMobileMenuOpen(false)}
                        target={(sub as any).external ? "_blank" : "_self"}
                        rel={(sub as any).external ? "noopener noreferrer" : undefined}
                      >
                        {sub.name}
                      </Link>
                    )
                  ))}
                </div>
              </>
            ) : (
              <Link 
                href={link.path} 
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            )}
          </div>
        ))}
        <button 
          onClick={(e) => {
            setMobileMenuOpen(false);
            openChat(e);
          }}
          className={styles.mobileContactBtn}
        >
          İletişime Geç
        </button>
      </div>
    </header>
  );
}
