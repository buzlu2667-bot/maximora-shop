"use client";

import React, { useEffect, useState } from 'react';

export default function MessageBadge() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        // supabaseAdmin kullanan API route → RLS bypass → tüm mesajları görebilir
        const res = await fetch('/api/marlboro/messages?_t=' + Date.now());
        if (!res.ok) return;
        const data = await res.json();
        const unread = (data || []).filter((m: any) => m.is_read === false);
        setUnreadCount(unread.length);
      } catch (e) {
        // sessiz kal
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 5000);
    return () => clearInterval(interval);
  }, []);

  if (unreadCount === 0) return null;

  return (
    <span
      key={unreadCount}
      style={{
        backgroundColor: '#ef4444',
        color: 'white',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        padding: '2px 8px',
        borderRadius: '50px',
        marginLeft: '10px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
        animation: 'badgePulse 0.5s ease-out'
      }}
    >
      {unreadCount}
      <style jsx>{`
        @keyframes badgePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
      `}</style>
    </span>
  );
}
