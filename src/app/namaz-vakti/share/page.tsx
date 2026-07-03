"use client";

import { useEffect } from 'react';

export default function NamazVaktiRedirect() {
  useEffect(() => {
    const playStoreUrl = "https://play.google.com/store/apps/details?id=com.namazapp.vakitleri";
    
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      
      if (/android/i.test(userAgent)) {
          window.location.href = 'intent://#Intent;scheme=namazapp;package=com.namazapp.vakitleri;end;';
          setTimeout(() => {
              window.location.href = playStoreUrl;
          }, 2000);
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
          window.location.href = playStoreUrl; 
      } else {
          window.location.href = playStoreUrl;
      }
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0fdf4', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <title>Namaz Vakitleri & Kıble</title>
      <meta property="og:title" content="Namaz Vakitleri & Kıble" />
      <meta property="og:description" content="Ezan vakitlerini kaçırmayın, kıbleyi doğru bulun. Uygulamayı indirmek için tıklayın." />
      <meta property="og:image" content="https://www.maximorashop.com/namaz/screen1.png" />
      
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '90%', width: '400px' }}>
        <h1 style={{ color: '#16a34a', marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>Yönlendiriliyorsunuz...</h1>
        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '15px', lineHeight: '1.5' }}>Namaz Vakitleri & Kıble uygulamasına aktarılıyorsunuz. Lütfen bekleyin.</p>
        
        <div style={{
          border: '4px solid rgba(22, 163, 74, 0.1)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          borderLeftColor: '#16a34a',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
      </div>
      
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
