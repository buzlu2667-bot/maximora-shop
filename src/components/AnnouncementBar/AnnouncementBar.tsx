"use client";

import React, { useState, useEffect } from 'react';

export default function AnnouncementBar() {
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

  if (!settings?.announcement_mode) return null;

  const color = settings.announcement_color || '#d4af37';
  const bgColor = settings.announcement_bg_color || '#111';

  return (
    <div style={{
      width: '100%',
      backgroundColor: bgColor,
      padding: '0.8rem 0',
      borderBottom: `1px solid rgba(255,255,255,0.05)`,
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      <div className="breathing-text" style={{
        color: color,
        fontSize: '0.9rem',
        fontWeight: 600,
        letterSpacing: '0.5px',
        display: 'inline-block'
      }}>
        {settings.announcement_text}
      </div>

      <style jsx>{`
        .breathing-text {
          animation: breathe 3s ease-in-out infinite;
        }

        @keyframes breathe {
          0% {
            opacity: 0.6;
            transform: scale(0.98);
            text-shadow: 0 0 0px transparent;
          }
          50% {
            opacity: 1;
            transform: scale(1);
            text-shadow: 0 0 10px ${color}44;
          }
          100% {
            opacity: 0.6;
            transform: scale(0.98);
            text-shadow: 0 0 0px transparent;
          }
        }

        @media (max-width: 768px) {
          .breathing-text {
            font-size: 0.75rem;
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
}
