"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function OrderBadge() {
  const [newOrderCount, setNewOrderCount] = useState(0);

  useEffect(() => {
    const fetchNewOrderCount = async () => {
      const { count } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('is_new', true);
      
      setNewOrderCount(count || 0);
    };

    fetchNewOrderCount();

    const channel = supabase
      .channel('admin_orders_realtime')
      .on(
        'postgres_changes',
        { event: '*', table: 'orders', schema: 'public' },
        () => {
          fetchNewOrderCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (newOrderCount === 0) return null;

  return (
    <span 
      key={newOrderCount}
      style={{ 
        backgroundColor: '#f59e0b', // Siparişler için turuncu/sarı daha ayırt edici olur
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
