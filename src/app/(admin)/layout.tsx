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

  // Admin değilse ve henüz şifre girmemişse şifre ekranını göster
  if (!isAdmin && !isAuthorized) {
    return (
      <div style={{ 
        display: 'flex', 
        height: '100vh', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#111', 
        color: 'white',
        flexDirection: 'column',
        gap: '2rem',
        fontFamily: 'sans-serif'
      }}>
        <Lock size={48} color="#d4af37" />
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Gizli Bölge</h2>
          <p style={{ color: '#888' }}>Devam etmek için şifre gerekli</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px' }}>
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
              textAlign: 'center'
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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      {/* Admin Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#111', color: 'white', padding: '2rem', flexShrink: 0 }}>
        <h2 style={{ color: 'white', marginBottom: '2rem', fontSize: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>MAXIMORA Yönetim</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/marlboro" style={{ color: '#ccc', textDecoration: 'none' }}>Panel Özeti</Link>
          <Link href="/marlboro/products" style={{ color: '#ccc', textDecoration: 'none' }}>Ürünler Listesi</Link>
          <Link href="/marlboro/products/new" style={{ color: '#ccc', textDecoration: 'none' }}>Yeni Ürün Ekle</Link>
          <Link href="/marlboro/orders" style={{ color: '#ccc', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            Siparişler <OrderBadge />
          </Link>
          <Link href="/marlboro/coupons" style={{ color: '#ccc', textDecoration: 'none' }}>Kuponlar</Link>
          <Link href="/marlboro/showcases" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold' }}>Vitrin Yönetimi</Link>
          <Link href="/marlboro/slider" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold' }}>Slider Yönetimi</Link>
          <Link href="/marlboro/promo-block" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold' }}>Tanıtım Bloğu (Banner)</Link>
          <Link href="/marlboro/popup" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold' }}>Duyuru Popup</Link>
          <Link href="/marlboro/users" style={{ color: '#ccc', textDecoration: 'none' }}>Kullanıcılar</Link>
          <Link href="/marlboro/messages" style={{ color: '#ccc', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            Gelen Mesajlar <MessageBadge />
          </Link>
          <Link href="/marlboro/send-email" style={{ color: '#d4af37', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Mail size={16} /> E-posta Gönder
          </Link>
          <Link href="/marlboro/settings" style={{ color: '#ccc', textDecoration: 'none' }}>Site Ayarları</Link>
          
          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #333' }}>
            <Link href="/" style={{ color: '#d4af37', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <ArrowLeft size={16} /> Siteye Dön
            </Link>
          </div>
        </nav>
      </aside>

      {/* Admin Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
