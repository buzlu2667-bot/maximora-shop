"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function MessageBadge() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const { count } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);
      
      setUnreadCount(count || 0);
    };

    fetchUnreadCount();

    // Canlı bağlantı kanalı
    const channelId = Math.random().toString(36).substring(7);
    const channel = supabase
      .channel(`messages_realtime_${channelId}`)
      .on(
        'postgres_changes',
        { event: '*', table: 'contact_messages', schema: 'public' },
        (payload) => {
          console.log('Canlı Değişiklik:', payload);
          fetchUnreadCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
