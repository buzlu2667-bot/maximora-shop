"use client";

import React, { useState } from 'react';
import { Mail, Send, User, Tag, AlignLeft, Sparkles, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

// --- HAZIR ŞABLONLAR ---
type TemplateVar = { key: string; label: string; placeholder: string };

type Template = {
  id: string;
  label: string;
  icon: string;
  subject: string;
  vars: TemplateVar[];
  buildMessage: (vars: Record<string, string>) => string;
};

const TEMPLATES: Template[] = [
  {
    id: 'cargo',
    label: '🚚 Kargo Bildirimi',
    icon: '🚚',
    subject: 'Siparişin Kargoya Verildi! 🚚',
    vars: [
      { key: 'orderNo', label: 'Sipariş No', placeholder: 'Örn: 1745234567890' },
      { key: 'cargoCompany', label: 'Kargo Firması', placeholder: 'Örn: Aras Kargo' },
      { key: 'trackingNo', label: 'Takip Numarası', placeholder: 'Örn: 123456789' },
    ],
    buildMessage: (v) => `Harika haber! #${v.orderNo || '[SİPARİŞ NO]'} nolu siparişin kargoya verildi.\n\nKargo Firması: ${v.cargoCompany || '[KARGO FİRMASI]'}\nTakip No: ${v.trackingNo || '[TAKİP NO]'}\n\nSiparişin yakında kapında olacak. Şimdiden güzel günlerde kullan! 😊`
  },
  {
    id: 'approved',
    label: '✅ Ödeme Onayı',
    icon: '✅',
    subject: 'Ödemen Onaylandı! ✅',
    vars: [
      { key: 'orderNo', label: 'Sipariş No', placeholder: 'Örn: 1745234567890' },
    ],
    buildMessage: (v) => `Harika haber! #${v.orderNo || '[SİPARİŞ NO]'} nolu siparişinin ödemesi başarıyla onaylandı.\n\nEkibimiz şu anda ürünlerini hazırlamaya başladı. Kargoya verildiğinde seni tekrar takip numarasıyla bilgilendireceğiz. 🙏`
  },
  {
    id: 'order_confirm',
    label: '📦 Sipariş Alındı (Shopier)',
    icon: '📦',
    subject: 'Siparişin Alındı! ✨',
    vars: [
      { key: 'orderNo', label: 'Sipariş No', placeholder: 'Örn: 1745234567890' },
    ],
    buildMessage: (v) => `Harika bir seçim yaptın! #${v.orderNo || '[SİPARİŞ NO]'} nolu siparişin başarıyla bize ulaştı.\n\nÖdemen onaylandıktan sonra hazırlıklara başlayacağız ve kargo aşamasında tekrar bilgilendireceğiz. 😊`
  },
  {
    id: 'cancel',
    label: '❌ İptal Bildirimi',
    icon: '❌',
    subject: 'Sipariş İptali Hakkında',
    vars: [
      { key: 'orderNo', label: 'Sipariş No', placeholder: 'Örn: 1745234567890' },
      { key: 'reason', label: 'İptal Nedeni', placeholder: 'Örn: Stok yetersizliği' },
    ],
    buildMessage: (v) => `Merhaba, #${v.orderNo || '[SİPARİŞ NO]'} nolu siparişin maalesef iptal edilmiştir.\n\nİptal Nedeni: ${v.reason || '[İPTAL NEDENİ]'}\n\nHerhangi bir sorunuz varsa bizimle iletişime geçebilirsiniz. Üzüntümüzü paylaşırız.`
  },
  {
    id: 'iban',
    label: '💳 IBAN Hatırlatma',
    icon: '💳',
    subject: 'IBAN Ödeme Hatırlatması',
    vars: [
      { key: 'orderNo', label: 'Sipariş No', placeholder: 'Örn: 1745234567890' },
      { key: 'amount', label: 'Tutar (TL)', placeholder: 'Örn: 1250.00' },
    ],
    buildMessage: (v) => `Merhaba! #${v.orderNo || '[SİPARİŞ NO]'} nolu siparişiniz için ${v.amount ? v.amount + ' TL' : '[TUTAR]'} tutarında ödeme bekliyoruz.\n\nHesap Sahibi: burak agarak\nIBAN: TR66 0015 7000 0000 0095 7755 66\n\nLütfen açıklama kısmına sipariş numaranızı (#${v.orderNo || '[SİPARİŞ NO]'}) yazmayı unutmayın! 🙏`
  },
  {
    id: 'custom',
    label: '✏️ Serbest Yazım',
    icon: '✏️',
    subject: '',
    vars: [],
    buildMessage: () => ''
  }
];

export default function AdminSendEmailPage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('custom');
  const [templateVars, setTemplateVars] = useState<Record<string, string>>({});
  const [showTemplates, setShowTemplates] = useState(true);

  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const selectedTemplate = TEMPLATES.find(t => t.id === selectedTemplateId)!;

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplateId(template.id);
    setTemplateVars({});
    if (template.id !== 'custom') {
      setEmailData(prev => ({
        ...prev,
        subject: template.subject,
        message: template.buildMessage({})
      }));
    } else {
      setEmailData(prev => ({ ...prev, subject: '', message: '' }));
    }
    setShowTemplates(false);
  };

  const handleVarChange = (key: string, value: string) => {
    const newVars = { ...templateVars, [key]: value };
    setTemplateVars(newVars);
    if (selectedTemplate.id !== 'custom') {
      setEmailData(prev => ({
        ...prev,
        message: selectedTemplate.buildMessage(newVars)
      }));
    }
  };

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
      setEmailData(prev => ({ ...prev, to: '' }));
      setTemplateVars({});
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
        <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.9rem' }}>Müşterilerinize hazır şablonla veya serbest yazarak profesyonel e-posta gönderin.</p>
      </div>

      {/* ŞABLON SEÇİCİ */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            backgroundColor: selectedTemplateId !== 'custom' ? '#111' : 'white',
            color: selectedTemplateId !== 'custom' ? '#d4af37' : '#333',
            border: '1px solid #ddd',
            borderRadius: '14px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.95rem'
          }}
        >
          <span>{selectedTemplate.icon} {selectedTemplate.label}</span>
          <ChevronDown size={18} style={{ transform: showTemplates ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
        </button>

        {showTemplates && (
          <div style={{
            marginTop: '0.5rem',
            backgroundColor: 'white',
            border: '1px solid #eee',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
          }}>
            {TEMPLATES.map((t, i) => (
              <button
                key={t.id}
                onClick={() => handleSelectTemplate(t)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.9rem 1.25rem',
                  background: selectedTemplateId === t.id ? '#f9f5e7' : 'white',
                  border: 'none',
                  borderBottom: i < TEMPLATES.length - 1 ? '1px solid #f3f3f3' : 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: selectedTemplateId === t.id ? 700 : 500,
                  color: selectedTemplateId === t.id ? '#d4af37' : '#333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{t.icon}</span> {t.label.replace(/^\S+\s/, '')}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ backgroundColor: 'white', padding: 'clamp(1.25rem, 5vw, 2.5rem)', borderRadius: '28px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Şablon Değişkenleri */}
          {selectedTemplate.vars.length > 0 && (
            <div style={{ padding: '1.25rem', backgroundColor: '#fafaf5', borderRadius: '16px', border: '1px solid #f0e8c0' }}>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', fontWeight: 800, color: '#d4af37', textTransform: 'uppercase', letterSpacing: '1px' }}>
                ✨ Şablon Bilgilerini Doldur
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedTemplate.vars.map(v => (
                  <div key={v.key}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '0.3rem' }}>{v.label}</label>
                    <input
                      type="text"
                      placeholder={v.placeholder}
                      value={templateVars[v.key] || ''}
                      onChange={e => handleVarChange(v.key, e.target.value)}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

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
              style={{ padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #e5e7eb', fontSize: '1rem', outline: 'none' }}
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
              style={{ padding: '1.25rem', borderRadius: '14px', border: '1px solid #e5e7eb', fontSize: '0.95rem', minHeight: '200px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6' }}
              onFocus={e => e.currentTarget.style.borderColor = '#111'}
              onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginTop: '0.5rem', padding: '1.25rem', backgroundColor: '#fcfcfc', borderRadius: '16px', border: '1px solid #f3f3f3', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ backgroundColor: '#fffbeb', color: '#d97706', padding: '0.5rem', borderRadius: '10px', flexShrink: 0 }}>
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
              marginTop: '1rem',
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
