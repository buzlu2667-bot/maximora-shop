"use client";

import React, { useState } from 'react';
import { Mail, Send, User, Tag, AlignLeft, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSendEmailPage() {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailData.to || !emailData.subject || !emailData.message) {
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/marlboro/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      if (!res.ok) throw new Error('Gönderim başarısız');

      toast.success("E-posta başarıyla gönderildi! ✨");
      setEmailData({ to: '', subject: '', message: '' });
    } catch (error) {
      toast.error("E-posta gönderilemedi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(1rem, 4vw, 2rem)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 800, color: '#111', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Mail size={28} /> E-posta Gönder
        </h1>
        <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.9rem' }}>Müşterilerinize veya herhangi bir adrese profesyonel e-posta gönderin.</p>
      </div>

      <div style={{ backgroundColor: 'white', padding: 'clamp(1.25rem, 5vw, 2.5rem)', borderRadius: '28px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Alıcı */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={14} /> ALICI E-POSTA
            </label>
            <input 
              type="email" 
              placeholder="ornek@mail.com"
              value={emailData.to}
              onChange={e => setEmailData({ ...emailData, to: e.target.value })}
              style={{ padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #e5e7eb', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={e => e.currentTarget.style.borderColor = '#111'}
              onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Konu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Tag size={14} /> KONU
            </label>
            <input 
              type="text" 
              placeholder="E-posta konusunu yazın"
              value={emailData.subject}
              onChange={e => setEmailData({ ...emailData, subject: e.target.value })}
              style={{ padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #e5e7eb', fontSize: '1rem', outline: 'none' }}
              onFocus={e => e.currentTarget.style.borderColor = '#111'}
              onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Mesaj */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlignLeft size={14} /> MESAJINIZ
            </label>
            <textarea 
              placeholder="Müşteriye iletmek istediğiniz mesajı buraya yazın..."
              value={emailData.message}
              onChange={e => setEmailData({ ...emailData, message: e.target.value })}
              style={{ padding: '1.25rem', borderRadius: '14px', border: '1px solid #e5e7eb', fontSize: '1rem', minHeight: '250px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6' }}
              onFocus={e => e.currentTarget.style.borderColor = '#111'}
              onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginTop: '1rem', padding: '1.25rem', backgroundColor: '#fcfcfc', borderRadius: '16px', border: '1px solid #f3f3f3', display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <div style={{ backgroundColor: '#fffbeb', color: '#d97706', padding: '0.5rem', borderRadius: '10px' }}>
               <Sparkles size={18} />
             </div>
             <p style={{ margin: 0, fontSize: '0.8rem', color: '#666', lineHeight: '1.5' }}>
               Mesajınız otomatik olarak <strong>MAXIMORA</strong> şablonuyla (Logo ve şık tasarım) gönderilecektir.
             </p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              marginTop: '1.5rem',
              backgroundColor: '#111', 
              color: 'white', 
              padding: '1.1rem', 
              borderRadius: '16px', 
              fontSize: '1rem', 
              fontWeight: 700, 
              border: 'none', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.75rem',
              transition: 'all 0.2s',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Gönderiliyor...' : <><Send size={20} /> E-posta Gönder</>}
          </button>
        </form>
      </div>
    </div>
  );
}
