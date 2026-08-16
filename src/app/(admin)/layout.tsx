"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Lock } from 'lucide-react';
import MessageBadge from './_components/MessageBadge';
import OrderBadge from './_components/OrderBadge';
import { useStore } from '@/store/useStore';

const SIDEBAR_LINKS = [
  { href: '/marlboro', label: 'Panel Özeti', color: '#ccc', bold: false },
  { href: '/marlboro/products', label: 'Ürünler Listesi', color: '#ccc', bold: false },
  { href: '/marlboro/products/new', label: 'Yeni Ürün Ekle', color: '#ccc', bold: false },
  { href: '/marlboro/coupons', label: 'Kuponlar', color: '#ccc', bold: false },
  { href: '/marlboro/campaigns', label: 'Kampanyalar', color: '#10b981', bold: true },
  { href: '/marlboro/showcases', label: 'Vitrin Yönetimi', color: '#d4af37', bold: true },
  { href: '/marlboro/slider', label: 'Slider Yönetimi', color: '#d4af37', bold: true },
  { href: '/marlboro/promo-block', label: 'Tanıtım Bloğu (Banner)', color: '#d4af37', bold: true },
  { href: '/marlboro/popup', label: 'Duyuru Popup', color: '#d4af37', bold: true },
  { href: '/marlboro/studio-popup', label: 'Studio Popup', color: '#d4af37', bold: true },
  { href: '/marlboro/coupon-popup', label: '🎁 Hediye Kupon Popup', color: '#10b981', bold: true },
  { href: '/marlboro/users', label: 'Kullanıcılar', color: '#ccc', bold: false },
  { href: '/marlboro/newsletter', label: 'E-Bülten Aboneleri', color: '#d4af37', bold: true },
  { href: '/marlboro/settings', label: 'Site Ayarları', color: '#ccc', bold: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useStore();
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === 'admin';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Tefal74851213') {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Hatalı şifre kanka!');
    }
  };

  if (!isAdmin && !isAuthorized) {
    return (
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111',
        color: 'white',
        flexDirection: 'column',
        gap: '2rem',
        fontFamily: 'sans-serif',
        padding: '2rem'
      }}>
        <Lock size={48} color="#d4af37" />
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Gizli Bölge</h2>
          <p style={{ color: '#888' }}>Devam etmek için şifre gerekli</p>
        </div>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '320px' }}>
          <input
            type="password"
            placeholder="Şifreyi gir kanka..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '14px',
              borderRadius: '10px',
              border: '1px solid #333',
              backgroundColor: '#1a1a1a',
              color: 'white',
              fontSize: '1rem',
              outline: 'none',
              textAlign: 'center',
              width: '100%'
            }}
            autoFocus
          />
          {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}
          <button
            type="submit"
            style={{
              padding: '14px',
              borderRadius: '10px',
              backgroundColor: '#d4af37',
              color: 'black',
              fontWeight: 'bold',
              cursor: 'pointer',
              border: 'none',
              fontSize: '1rem',
            }}
          >
            Giriş Yap
          </button>
        </form>
        <Link href="/" style={{ color: '#888', fontSize: '0.9rem', textDecoration: 'none', marginTop: '1rem' }}>
          ← Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  const SidebarContent = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {SIDEBAR_LINKS.slice(0, 4).map(link => (
        <Link key={link.href} href={link.href} onClick={onLinkClick}
          style={{ color: link.color, textDecoration: 'none', fontWeight: link.bold ? 'bold' : 'normal', padding: '0.6rem 0.4rem' }}>
          {link.label}
        </Link>
      ))}

      <Link href="/marlboro/orders" onClick={onLinkClick}
        style={{ color: '#ccc', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.4rem' }}>
        Siparişler <OrderBadge />
      </Link>

      <div style={{ margin: '0.75rem 0', height: '1px', backgroundColor: '#333' }} />

      {SIDEBAR_LINKS.slice(4, 8).map(link => (
        <Link key={link.href} href={link.href} onClick={onLinkClick}
          style={{ color: link.color, textDecoration: 'none', fontWeight: link.bold ? 'bold' : 'normal', padding: '0.6rem 0.4rem' }}>
          {link.label}
        </Link>
      ))}

      <div style={{ margin: '0.75rem 0', height: '1px', backgroundColor: '#333' }} />

      {SIDEBAR_LINKS.slice(8).map(link => (
        <Link key={link.href} href={link.href} onClick={onLinkClick}
          style={{ color: link.color, textDecoration: 'none', fontWeight: link.bold ? 'bold' : 'normal', padding: '0.6rem 0.4rem' }}>
          {link.label}
        </Link>
      ))}

      <Link href="/marlboro/messages" onClick={onLinkClick}
        style={{ color: '#ccc', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.4rem' }}>
        Gelen Mesajlar <MessageBadge />
      </Link>

      <Link href="/marlboro/send-email" onClick={onLinkClick}
        style={{ color: '#d4af37', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 'bold', padding: '0.6rem 0.4rem' }}>
        <Mail size={16} /> E-posta Gönder
      </Link>

      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #333' }}>
        <Link href="/" style={{ color: '#d4af37', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Siteye Dön
        </Link>
      </div>
    </nav>
  );

  return (
    <>
      <style>{`
        /* PC: klasik sidebar düzeni */
        .admin-wrapper {
          display: flex;
          min-height: 100vh;
          background-color: #f4f4f4;
        }
        .admin-mobile-header { display: none; }
        .admin-sidebar-desktop {
          width: 250px;
          background-color: #111;
          color: white;
          padding: 2rem;
          flex-shrink: 0;
          min-height: 100vh;
        }
        .admin-sidebar-desktop h2 {
          color: white;
          margin-bottom: 2rem;
          font-size: 1.5rem;
          border-bottom: 1px solid #333;
          padding-bottom: 1rem;
        }
        .admin-main {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          overflow-x: hidden;
        }
        /* Mobil drawer - sadece mobilde görünür */
        .admin-mobile-overlay { display: none; }
        .admin-sidebar-mobile { display: none; }

        /* MOBİL */
        @media (max-width: 768px) {
          .admin-wrapper { flex-direction: column; }

          /* Masaüstü sidebar gizle */
          .admin-sidebar-desktop { display: none; }

          /* Mobil header göster */
          .admin-mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1.25rem;
            background-color: #111;
            color: white;
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 1px solid #222;
          }

          .admin-main {
            padding: 1rem;
          }

          /* Mobil drawer sidebar */
          .admin-sidebar-mobile {
            display: block;
            position: fixed;
            top: 0;
            bottom: 0;
            left: -280px;
            width: 280px;
            background-color: #111;
            color: white;
            padding: 1.5rem;
            z-index: 1001;
            overflow-y: auto;
            transition: left 0.3s ease;
          }
          .admin-sidebar-mobile.open {
            left: 0;
            box-shadow: 5px 0 30px rgba(0,0,0,0.5);
          }

          .admin-mobile-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.55);
            z-index: 1000;
            backdrop-filter: blur(2px);
          }
        }
      `}</style>

      <div className="admin-wrapper">

        {/* MOBİL HEADER - sadece mobilde görünür */}
        <header className="admin-mobile-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}
              aria-label="Menüyü Aç"
            >
              <div style={{ width: '22px', height: '2px', backgroundColor: '#d4af37' }} />
              <div style={{ width: '16px', height: '2px', backgroundColor: '#d4af37' }} />
              <div style={{ width: '22px', height: '2px', backgroundColor: '#d4af37' }} />
            </button>
            <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '1px' }}>
              MAXIMORA <span style={{ color: '#d4af37' }}>YÖNETİM</span>
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/marlboro/messages" style={{ color: 'white' }}><MessageBadge /></Link>
            <Link href="/marlboro/orders" style={{ color: 'white' }}><OrderBadge /></Link>
          </div>
        </header>

        {/* MOBİL DRAWER */}
        {isMobileMenuOpen && (
          <div className="admin-mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
        )}
        <aside className={`admin-sidebar-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #333' }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1rem' }}>MAXIMORA YÖNETİM</span>
            <button onClick={() => setIsMobileMenuOpen(false)}
              style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1 }}>
              ✕
            </button>
          </div>
          <SidebarContent onLinkClick={() => setIsMobileMenuOpen(false)} />
        </aside>

        {/* MASAÜSTÜ SIDEBAR - sadece PC'de görünür */}
        <aside className="admin-sidebar-desktop">
          <h2>MAXIMORA Yönetim</h2>
          <SidebarContent />
        </aside>

        {/* ANA İÇERİK */}
        <main className="admin-main">
          {children}
        </main>

      </div>
    </>
  );
}
