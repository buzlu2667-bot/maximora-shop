"use client";

import React, { useState, useEffect } from 'react';

export default function TopBar() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        setSettings(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchSettings();
  }, []);

  if (!settings?.topbar_mode) return null;

  const color = settings.topbar_color || '#ffffff';
  const bgColor = settings.topbar_bg_color || '#d4af37';
  const height = settings.topbar_height || 40;
  
  // 5 Seviyeli Hız Ayarı (1: En Yavaş, 5: En Hızlı)
  const getSpeed = (s: number) => {
    switch(s) {
      case 1: return '60s'; // Çok Yavaş
      case 2: return '45s'; // Yavaş
      case 3: return '30s'; // Normal
      case 4: return '18s'; // Hızlı
      case 5: return '10s'; // Çok Hızlı
      default: return '25s';
    }
  };

  const speed = getSpeed(settings.topbar_speed || 3);

  return (
    <div className="topbar-main-container" style={{
      width: '100%',
      backgroundColor: bgColor,
      color: color,
      height: `${height}px`,
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1000,
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      lineHeight: `${height}px`
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .topbar-scroller {
          display: inline-block;
          white-space: nowrap;
          padding-left: 100%;
          animation: topbar-marquee ${speed} linear infinite;
          font-family: inherit;
          font-weight: 600;
          font-size: 0.85rem;
        }

        @keyframes topbar-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        .topbar-scroller:hover {
          animation-play-state: paused;
        }
      `}} />
      
      <div className="topbar-scroller">
        {settings.topbar_text}
      </div>
    </div>
  );
}
