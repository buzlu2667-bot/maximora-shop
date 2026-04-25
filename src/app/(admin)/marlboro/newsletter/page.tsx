"use client";

import React, { useEffect, useState } from 'react';
import { Mail, Users, Trash2, Download, Search, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Aboneler yüklenemedi.');
    } else {
      setSubscribers(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu aboneyi listeden çıkarmak istediğinize emin misiniz?')) return;

    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Silme işlemi başarısız.');
    } else {
      toast.success('Abone silindi.');
      setSubscribers(subscribers.filter(s => s.id !== id));
    }
  };

  const exportEmails = () => {
    const emails = subscribers.map(s => s.email).join('\n');
    const blob = new Blob([emails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `newsletter_subscribers_${new Date().toLocaleDateString()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredSubscribers = subscribers.filter(s => 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: 'clamp(1rem, 4vw, 2rem)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 800, color: '#111', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Users size={28} /> E-Bülten Aboneleri
          </h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Toplam {subscribers.length} abone kampanyalarınızı bekliyor.</p>
        </div>
        
        <button 
          onClick={exportEmails}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', backgroundColor: '#111', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
        >
          <Download size={18} /> Listeyi Dışa Aktar
        </button>
      </div>

      <div style={{ marginBottom: '1.5rem', position: 'relative', maxWidth: '400px' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
        <input 
          type="text" 
          placeholder="E-posta ile ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: '14px', border: '1px solid #ddd', outline: 'none' }}
        />
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #eee', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '1.25rem', fontSize: '0.85rem', color: '#666', fontWeight: 700 }}>E-POSTA ADRESİ</th>
              <th style={{ padding: '1.25rem', fontSize: '0.85rem', color: '#666', fontWeight: 700 }}>KAYIT TARİHİ</th>
              <th style={{ padding: '1.25rem', fontSize: '0.85rem', color: '#666', fontWeight: 700, textAlign: 'right' }}>İŞLEM</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>Yükleniyor...</td></tr>
            ) : filteredSubscribers.length > 0 ? (
              filteredSubscribers.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '1.25rem', fontWeight: 600, color: '#111' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ padding: '0.5rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}><Mail size={16} /></div>
                      {s.email}
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem', color: '#666', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Calendar size={14} />
                      {new Date(s.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(s.id)}
                      style={{ padding: '0.5rem', backgroundColor: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', opacity: 0.7 }}
                      title="Sil"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={3} style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>Abone bulunamadı.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
