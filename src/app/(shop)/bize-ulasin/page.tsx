"use client";

import React, { useState } from 'react';
import { MessageCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(['support', 'hours']);

  const toggleSection = (id: string) => {
    setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      toast.error('Lütfen gerekli alanları doldurun.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Mesaj gönderilemedi');
      }

      toast.success('Mesajınız başarıyla iletildi!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error('Hata:', err);
      toast.error(err.message || 'Bir hata oluştu, lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ 
      maxWidth: '800px', 
      marginTop: '2rem', 
      marginBottom: '4rem', 
      padding: '0 15px', // Mobilde güvenli alan
      boxSizing: 'border-box'
    }}>
      <h1 style={{ 
        fontSize: 'clamp(1.8rem, 7vw, 2.5rem)', 
        fontWeight: 400, 
        marginBottom: '2rem', 
        textAlign: 'center',
        color: '#000'
      }}>
        Bize Ulaşın
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '3rem' }}>
        
        {/* Canlı Destek Bölümü */}
        <div style={{ borderBottom: '1px solid #eee' }}>
          <button 
            onClick={() => toggleSection('support')}
            style={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '1.25rem 0',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <MessageCircle size={22} strokeWidth={1.5} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 'clamp(0.95rem, 4vw, 1.1rem)', fontWeight: 500 }}>
                Maximora Canlı Destek
              </span>
            </div>
            <div style={{ flexShrink: 0 }}>
              {openSections.includes('support') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>
          
          {openSections.includes('support') && (
            <div style={{ padding: '0 0 1.5rem 2.5rem', color: '#555', lineHeight: '1.6', fontSize: '0.95rem' }}>
              <p>Sağ alt köşedeki butonla ekibimize anında ulaşabilirsiniz.</p>
              <p style={{ marginTop: '0.5rem' }}>Genelde 2-5 dakika içinde dönüş sağlıyoruz.</p>
            </div>
          )}
        </div>

        {/* Çalışma Saatleri Bölümü */}
        <div style={{ borderBottom: '1px solid #eee' }}>
          <button 
            onClick={() => toggleSection('hours')}
            style={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '1.25rem 0',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Clock size={22} strokeWidth={1.5} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 'clamp(0.95rem, 4vw, 1.1rem)', fontWeight: 500 }}>
                Çalışma Saatlerimiz
              </span>
            </div>
            <div style={{ flexShrink: 0 }}>
              {openSections.includes('hours') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>
          
          {openSections.includes('hours') && (
            <div style={{ padding: '0 0 1.5rem 2.5rem', color: '#000', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <p><strong>HAFTAİÇİ:</strong> 14:00 - 24:00</p>
              <p><strong>HAFTASONU:</strong> 15:00 - 24:00</p>
            </div>
          )}
        </div>

      </div>

      {/* İletişim Formu */}
      <div style={{ 
        backgroundColor: '#fff', 
        padding: 'clamp(1rem, 5vw, 2rem)', 
        borderRadius: '12px', 
        border: '1px solid #eee',
        boxShadow: '0 2px 15px rgba(0,0,0,0.02)'
      }}>
        <h2 style={{ fontSize: 'clamp(1.2rem, 5vw, 1.8rem)', fontWeight: 500, marginBottom: '1.5rem' }}>Mesaj Gönderin</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Ad Soyad" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', width: '100%', boxSizing: 'border-box' }}
            />
            <input 
              type="email" 
              placeholder="E-posta *" 
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <input 
            type="tel" 
            placeholder="Telefon numarası" 
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }}
          />
          <textarea 
            placeholder="Mesajınız..." 
            rows={4}
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
            style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }}
          />
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              padding: '1rem', 
              borderRadius: '8px', 
              border: 'none', 
              fontSize: '1rem', 
              fontWeight: 600, 
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'background 0.2s'
            }}
          >
            {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </form>
      </div>
    </div>
  );
}
