"use client";

import React, { useEffect, useState } from 'react';

export default function OrderBadge() {
  const [newOrderCount, setNewOrderCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        // supabaseAdmin kullanan API route → RLS bypass → tüm siparişleri görebilir
        const res = await fetch('/api/orders?_t=' + Date.now());
        if (!res.ok) return;
        const data = await res.json();
        const newOrders = (data || []).filter((o: any) => o.is_new === true);
        setNewOrderCount(newOrders.length);
      } catch (e) {
        // sessiz kal
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 5000);
    return () => clearInterval(interval);
  }, []);

  if (newOrderCount === 0) return null;

  return (
    <span
      key={newOrderCount}
      style={{
        backgroundColor: '#f59e0b',
        color: 'white',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        padding: '2px 8px',
        borderRadius: '50px',
        marginLeft: '10px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)',
        animation: 'orderPulse 0.5s ease-out'
      }}
    >
      {newOrderCount}
      <style jsx>{`
        @keyframes orderPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
      `}</style>
    </span>
  );
}
