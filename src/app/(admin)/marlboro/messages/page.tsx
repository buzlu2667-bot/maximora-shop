"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, Trash2, Calendar, User, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();

    // Canlı takip: Yeni mesaj gelirse listeyi yenile
    const channel = supabase
      .channel('admin_messages_page')
      .on(
        'postgres_changes',
        { event: '*', table: 'contact_messages', schema: 'public' },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      toast.error('Mesajlar yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
      toast.success('Okundu olarak işaretlendi.');
    } catch (err) {
      toast.error('Hata oluştu.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu mesajı kalıcı olarak silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Mesaj silindi.');
      setMessages(messages.filter(m => m.id !== id));
    } catch (err) {
      toast.error('Hata oluştu.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Gelen Mesajlar</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>İletişim formu üzerinden gönderilen tüm müşteri talepleri.</p>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : messages.length === 0 ? (
        <div style={{ backgroundColor: 'white', padding: '4rem', textAlign: 'center', borderRadius: '16px', border: '1px solid #eee' }}>
          <MessageSquare size={48} color="#ccc" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: '#999' }}>Henüz gelen mesaj yok.</h3>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              style={{ 
                backgroundColor: 'white', 
                padding: '2rem', 
                borderRadius: '16px', 
                border: msg.is_read ? '1px solid #eee' : '2px solid #ef4444', 
                boxShadow: msg.is_read ? '0 4px 12px rgba(0,0,0,0.03)' : '0 10px 25px rgba(239, 68, 68, 0.1)', 
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
            >
              {!msg.is_read && (
                <span style={{ 
                  position: 'absolute', 
                  top: '-10px', 
                  left: '20px', 
                  backgroundColor: '#ef4444', 
                  color: 'white', 
                  fontSize: '0.7rem', 
                  fontWeight: 'bold', 
                  padding: '2px 10px', 
                  borderRadius: '50px',
                  boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)'
                }}>
                  YENİ MESAJ
                </span>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#111', fontWeight: 700 }}>
                    <User size={18} color="#999" /> {msg.name || 'İsimsiz'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555' }}>
                    <Mail size={18} color="#999" /> {msg.email}
                  </div>
                  {msg.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555' }}>
                      <Phone size={18} color="#999" /> {msg.phone}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.9rem' }}>
                    <Calendar size={18} color="#999" /> {new Date(msg.created_at).toLocaleString('tr-TR')}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {!msg.is_read && (
                    <button 
                      onClick={() => handleMarkAsRead(msg.id)}
                      style={{ background: '#f0fdf4', border: 'none', color: '#16a34a', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}
                    >
                      <CheckCircle size={16} /> Okundu
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    style={{ background: '#fff5f5', border: 'none', color: '#ef4444', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}
                  >
                    <Trash2 size={16} /> Sil
                  </button>
                </div>
              </div>

              <div style={{ 
                backgroundColor: msg.is_read ? '#f9fafb' : '#fff8f8', 
                padding: '1.5rem', 
                borderRadius: '12px', 
                color: '#333', 
                lineHeight: '1.6', 
                whiteSpace: 'pre-wrap', 
                border: '1px solid #f1f1f1' 
              }}>
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
