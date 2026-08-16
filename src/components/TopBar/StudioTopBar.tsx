"use client";

import React, { useState, useEffect } from 'react';

export default function StudioTopBar() {
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

  if (!settings?.studio_topbar_mode) return null;

  const color = settings.studio_topbar_color || '#ffffff';
  const bgColor = settings.studio_topbar_bg_color || '#111111';
  const height = settings.studio_topbar_height || 40;
  
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

  const speed = getSpeed(settings.studio_topbar_speed || 3);

  return (
    <div className="studio-topbar-main-container" style={{
      width: '100%',
      backgroundColor: bgColor,
      color: color,
      height: `${height}px`,
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1000,
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      lineHeight: `${height}px`
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .studio-topbar-scroller {
          display: inline-block;
          white-space: nowrap;
          padding-left: 100%;
          animation: studio-topbar-marquee ${speed} linear infinite;
          font-family: inherit;
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
        }

        @keyframes studio-topbar-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        .studio-topbar-scroller:hover {
          animation-play-state: paused;
        }
      `}} />
      
      <div className="studio-topbar-scroller">
        {settings.studio_topbar_text}
      </div>
    </div>
  );
}
