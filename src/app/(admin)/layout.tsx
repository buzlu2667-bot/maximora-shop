"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Lock } from 'lucide-react';
import MessageBadge from './_components/MessageBadge';
import OrderBadge from './_components/OrderBadge';
import { useStore } from '@/store/useStore';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useStore();
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');

  // Eğer kullanıcı zaten admin ise direkt geçiş ver
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Admin değilse ve henüz şifre girmemişse şifre ekranını göster
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
              transition: 'opacity 0.2s'
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

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4', flexDirection: 'column' }}>
      
      {/* Mobil Header */}
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '1rem 1.5rem', 
        backgroundColor: '#111', 
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid #222'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, display: 'flex' }}
          >
            {isSidebarOpen ? <ArrowLeft size={24} /> : <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ width: '20px', height: '2px', backgroundColor: '#d4af37' }}></div>
              <div style={{ width: '15px', height: '2px', backgroundColor: '#d4af37' }}></div>
              <div style={{ width: '20px', height: '2px', backgroundColor: '#d4af37' }}></div>
            </div>}
          </button>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, letterSpacing: '1px' }}>MAXIMORA <span style={{ color: '#d4af37' }}>ADM</span></h1>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/marlboro/messages" style={{ color: 'white' }}><MessageBadge /></Link>
          <Link href="/marlboro/orders" style={{ color: 'white' }}><OrderBadge /></Link>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Admin Sidebar (Drawer on mobile, fixed on large screens via CSS logic) */}
        <aside style={{ 
          width: '280px', 
          backgroundColor: '#111', 
          color: 'white', 
          padding: '2rem 1.5rem', 
          flexShrink: 0,
          position: 'fixed',
          top: '60px',
          bottom: 0,
          left: isSidebarOpen ? '0' : '-280px',
          zIndex: 999,
          transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowY: 'auto',
          boxShadow: isSidebarOpen ? '20px 0 50px rgba(0,0,0,0.5)' : 'none'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/marlboro" onClick={() => setIsSidebarOpen(false)} style={{ color: '#ccc', textDecoration: 'none', padding: '0.8rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)' }}>Panel Özeti</Link>
            <Link href="/marlboro/products" onClick={() => setIsSidebarOpen(false)} style={{ color: '#ccc', textDecoration: 'none', padding: '0.8rem' }}>Ürünler Listesi</Link>
            <Link href="/marlboro/products/new" onClick={() => setIsSidebarOpen(false)} style={{ color: '#ccc', textDecoration: 'none', padding: '0.8rem' }}>Yeni Ürün Ekle</Link>
            <Link href="/marlboro/orders" onClick={() => setIsSidebarOpen(false)} style={{ color: '#ccc', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem' }}>
              <span>Siparişler</span> <OrderBadge />
            </Link>
            <Link href="/marlboro/coupons" onClick={() => setIsSidebarOpen(false)} style={{ color: '#ccc', textDecoration: 'none', padding: '0.8rem' }}>Kuponlar</Link>
            
            <div style={{ margin: '1rem 0', height: '1px', backgroundColor: '#222' }}></div>
            
            <Link href="/marlboro/showcases" onClick={() => setIsSidebarOpen(false)} style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold', padding: '0.8rem' }}>Vitrin Yönetimi</Link>
            <Link href="/marlboro/slider" onClick={() => setIsSidebarOpen(false)} style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold', padding: '0.8rem' }}>Slider Yönetimi</Link>
            <Link href="/marlboro/promo-block" onClick={() => setIsSidebarOpen(false)} style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold', padding: '0.8rem' }}>Tanıtım Bloğu</Link>
            <Link href="/marlboro/popup" onClick={() => setIsSidebarOpen(false)} style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold', padding: '0.8rem' }}>Duyuru Popup</Link>
            
            <div style={{ margin: '1rem 0', height: '1px', backgroundColor: '#222' }}></div>

            <Link href="/marlboro/users" onClick={() => setIsSidebarOpen(false)} style={{ color: '#ccc', textDecoration: 'none', padding: '0.8rem' }}>Kullanıcılar</Link>
            <Link href="/marlboro/messages" onClick={() => setIsSidebarOpen(false)} style={{ color: '#ccc', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem' }}>
              <span>Gelen Mesajlar</span> <MessageBadge />
            </Link>
            <Link href="/marlboro/send-email" onClick={() => setIsSidebarOpen(false)} style={{ color: '#d4af37', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.8rem' }}>
              <Mail size={16} /> E-posta Gönder
            </Link>
            <Link href="/marlboro/settings" onClick={() => setIsSidebarOpen(false)} style={{ color: '#ccc', textDecoration: 'none', padding: '0.8rem' }}>Site Ayarları</Link>
            
            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #222' }}>
              <Link href="/" style={{ color: '#d4af37', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', padding: '0.8rem' }}>
                <ArrowLeft size={16} /> Siteye Dön
              </Link>
            </div>
          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            style={{ 
              position: 'fixed', 
              top: '60px', 
              left: 0, 
              right: 0, 
              bottom: 0, 
              backgroundColor: 'rgba(0,0,0,0.5)', 
              zIndex: 998,
              backdropFilter: 'blur(2px)'
            }}
          />
        )}

        {/* Admin Content */}
        <main style={{ flex: 1, padding: '1.5rem', width: '100%', overflowX: 'hidden' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
