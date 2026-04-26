"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Mail, Send, User, Tag, AlignLeft, Sparkles, ChevronDown, Image as ImageIcon, Users, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

// --- HAZIR ŞABLONLAR ---
type TemplateVar = { key: string; label: string; placeholder: string; type?: 'text' | 'image' };

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
    id: 'campaign',
    label: '🔥 Yeni Kampanya',
    icon: '🔥',
    subject: 'Günün Fırsatını Kaçırma! 🔥',
    vars: [
      { key: 'title', label: 'Kampanya Başlığı', placeholder: 'Örn: Büyük Yaz İndirimi Başladı!' },
      { key: 'imageUrl', label: 'Kampanya Görseli', placeholder: 'Görsel yükleyin veya link yapıştırın', type: 'image' },
      { key: 'buttonLink', label: 'Buton Linki', placeholder: 'Örn: https://maximora.shop/categories/all' },
    ],
    buildMessage: (v) => `${v.title || '[KAMPANYA BAŞLIĞI]'}\n\n${v.imageUrl ? '![Görsel](' + v.imageUrl + ')\n\n' : ''}Harika fırsatları keşfetmek için hemen sitemizi ziyaret et!\n\nAlışverişe Başla: ${v.buttonLink || 'https://maximora.shop'}`
  },
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
  const [showTemplates, setShowTemplates] = useState(false);
  const [targetType, setTargetType] = useState<'individual' | 'subscribers'>('individual');
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubscriberCount();
  }, []);

  const fetchSubscriberCount = async () => {
    try {
      const res = await fetch('/api/newsletter');
      const data = await res.json();
      if (res.ok) {
        setSubscriberCount(data.length || 0);
      }
    } catch (err) {
      console.error('Failed to fetch subscriber count');
    }
  };

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `campaigns/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('newsletter')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('newsletter')
        .getPublicUrl(filePath);

      handleVarChange('imageUrl', data.publicUrl);
      toast.success('Görsel yüklendi!');
    } catch (error: any) {
      toast.error('Görsel yüklenemedi: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let recipients: string[] = [];
    
    if (targetType === 'individual') {
      if (!emailData.to) {
        toast.error("Lütfen alıcı adresi girin.");
        return;
      }
      recipients = [emailData.to];
    } else {
      try {
        const res = await fetch('/api/newsletter');
        const data = await res.json();
        if (!res.ok) throw new Error('Aboneler çekilemedi.');
        recipients = data.map((d: any) => d.email);
      } catch (err) {
        toast.error("Aboneler çekilemedi.");
        return;
      }
    }

    if (recipients.length === 0) {
      toast.error("Gönderilecek abone bulunamadı.");
      return;
    }

    if (!emailData.subject || !emailData.message) {
      toast.error("Lütfen konu ve mesaj alanlarını doldurun.");
      return;
    }

    setLoading(true);
    try {
      for (const to of recipients) {
        await fetch('/api/marlboro/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...emailData, to })
        });
      }

      toast.success(`${recipients.length} adet e-posta gönderildi! ✨`);
      if (targetType === 'individual') setEmailData(prev => ({ ...prev, to: '' }));
    } catch (error) {
      toast.error("E-posta gönderilemedi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(1rem, 4vw, 2rem)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 800, color: '#111', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Mail size={28} /> E-posta Gönder
        </h1>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>Müşterilerinize veya tüm abonelere profesyonel e-posta gönderin.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setTargetType('individual')}
          style={{ flex: 1, padding: '1rem', borderRadius: '16px', border: '1px solid #ddd', backgroundColor: targetType === 'individual' ? '#111' : 'white', color: targetType === 'individual' ? 'white' : '#666', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          <User size={18} /> Tek Kişiye
        </button>
        <button 
          onClick={() => setTargetType('subscribers')}
          style={{ flex: 1, padding: '1rem', borderRadius: '16px', border: '1px solid #ddd', backgroundColor: targetType === 'subscribers' ? '#111' : 'white', color: targetType === 'subscribers' ? 'white' : '#666', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          <Users size={18} /> Tüm Abonelere ({subscriberCount})
        </button>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', backgroundColor: 'white', color: '#111', border: '1px solid #ddd', borderRadius: '14px', cursor: 'pointer', fontWeight: 700 }}
        >
          <span>{selectedTemplate.icon} {selectedTemplate.label}</span>
          <ChevronDown size={18} style={{ transform: showTemplates ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
        </button>
        {showTemplates && (
          <div style={{ marginTop: '0.5rem', backgroundColor: 'white', border: '1px solid #eee', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
            {TEMPLATES.map(t => (
              <button key={t.id} onClick={() => handleSelectTemplate(t)} style={{ width: '100%', textAlign: 'left', padding: '1rem', background: selectedTemplateId === t.id ? '#f9f5e7' : 'white', border: 'none', borderBottom: '1px solid #f3f3f3', cursor: 'pointer', fontWeight: selectedTemplateId === t.id ? 700 : 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ backgroundColor: 'white', padding: 'clamp(1.25rem, 5vw, 2.5rem)', borderRadius: '28px', border: '1px solid #f0f0f0' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {selectedTemplate.vars.length > 0 && (
            <div style={{ padding: '1.25rem', backgroundColor: '#fafaf5', borderRadius: '16px', border: '1px solid #f0e8c0' }}>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', fontWeight: 800, color: '#d4af37', textTransform: 'uppercase' }}>✨ Şablon Detayları</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedTemplate.vars.map(v => (
                  <div key={v.key}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '0.3rem' }}>{v.label}</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        placeholder={v.placeholder}
                        value={templateVars[v.key] || ''}
                        onChange={e => handleVarChange(v.key, e.target.value)}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                      />
                      {v.type === 'image' && (
                        <>
                          <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*" />
                          <button type="button" onClick={() => fileInputRef.current?.click()} style={{ padding: '0.75rem', borderRadius: '10px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}>
                            {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {targetType === 'individual' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}><User size={14} /> ALICI E-POSTA</label>
              <input
                type="email"
                placeholder="ornek@mail.com"
                value={emailData.to}
                onChange={e => setEmailData({ ...emailData, to: e.target.value })}
                style={{ padding: '1rem', borderRadius: '14px', border: '1px solid #e5e7eb' }}
              />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}><Tag size={14} /> KONU</label>
            <input
              type="text"
              placeholder="E-posta konusu"
              value={emailData.subject}
              onChange={e => setEmailData({ ...emailData, subject: e.target.value })}
              style={{ padding: '1rem', borderRadius: '14px', border: '1px solid #e5e7eb' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}><AlignLeft size={14} /> MESAJ</label>
            <textarea
              value={emailData.message}
              onChange={e => setEmailData({ ...emailData, message: e.target.value })}
              style={{ padding: '1rem', borderRadius: '14px', border: '1px solid #e5e7eb', minHeight: '200px', resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: '1rem', backgroundColor: '#111', color: 'white', padding: '1.1rem', borderRadius: '16px', fontSize: '1rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Gönderiliyor...' : <><Send size={20} /> {targetType === 'subscribers' ? `${subscriberCount} Aboneye Kampanya Başlat` : 'E-posta Gönder'}</>}
          </button>
        </form>
      </div>
    </div>
  );
}
