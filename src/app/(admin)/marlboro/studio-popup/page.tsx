"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Save, Megaphone, Image as ImageIcon, Link as LinkIcon, Trash2, Eye } from 'lucide-react';

export default function StudioPopupSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [settings, setSettings] = useState({
    enabled: false,
    title: '',
    content: '',
    image: '',
    buttonText: '',
    buttonLink: '',
    id: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.studio_popup_settings) {
          setSettings({
            enabled: data.studio_popup_settings.enabled || false,
            title: data.studio_popup_settings.title || '',
            content: data.studio_popup_settings.content || '',
            image: data.studio_popup_settings.image || '',
            buttonText: data.studio_popup_settings.buttonText || '',
            buttonLink: data.studio_popup_settings.buttonLink || '',
            id: data.studio_popup_settings.id || ''
          });
        }
      }
    } catch (err) {
      console.error('Popup ayarları yüklenemedi:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('files', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        const url = data.urls[0];
        setSettings(prev => ({ ...prev, image: url }));
        toast.success('Resim yüklendi!');
      } else {
        toast.error('Resim yüklenemedi.');
      }
    } catch (err) {
      toast.error('Yükleme sırasında bir hata oluştu.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const newSettings = { 
        ...settings, 
        id: Date.now().toString() 
      };

      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studio_popup_settings: newSettings })
      });

      if (res.ok) {
        setSettings(newSettings);
        toast.success('Duyuru başarıyla yayına alındı! 🚀');
      } else {
        toast.error('Ayarlar kaydedilemedi.');
      }
    } catch (err) {
      toast.error('Bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', color: '#666' }}>Yükleniyor kanka...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <style>{`
        @media (max-width: 768px) {
          .popup-header { flex-direction: column !important; align-items: flex-start !important; gap: 1rem; }
          .popup-header h1 { font-size: 1.5rem !important; }
          .popup-header button { width: 100% !important; }
          .popup-grid { grid-template-columns: 1fr !important; }
          .popup-btn-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div className="popup-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111', margin: 0 }}>Duyuru Popup Yönetimi</h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Müşterilerini şik bir duyuru ile karşıla.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || uploading}
          style={{ 
            backgroundColor: '#d4af37', 
            color: 'black', 
            padding: '1rem 2.5rem', 
            borderRadius: '12px', 
            fontWeight: '800', 
            border: 'none', 
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
            whiteSpace: 'nowrap'
          }}
        >
          {saving ? 'KAYDEDİLİYOR...' : 'YAYINLA'}
        </button>
      </div>

      <div className="popup-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Ayarlar Formu */}
        <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '1.25rem', 
            backgroundColor: settings.enabled ? '#f0fdf4' : '#f9fafb', 
            borderRadius: '15px',
            marginBottom: '2rem',
            border: settings.enabled ? '1px solid #bcf0da' : '1px solid #eee'
          }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', color: settings.enabled ? '#166534' : '#111' }}>Popup Aktif mi?</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Açtığın an tüm müşteriler görmeye başlar.</p>
            </div>
            <input 
              type="checkbox" 
              checked={settings.enabled}
              onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
              style={{ width: '24px', height: '24px', cursor: 'pointer' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#444', marginBottom: '0.5rem' }}>Duyuru Başlığı</label>
            <input
              type="text"
              value={settings.title}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
              placeholder="Örn: BÜYÜK YAZ İNDİRİMİ!"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#444', marginBottom: '0.5rem' }}>Duyuru Metni</label>
            <textarea
              value={settings.content}
              onChange={(e) => setSettings({ ...settings, content: e.target.value })}
              style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', minHeight: '120px', resize: 'vertical' }}
              placeholder="Müşterilerine ne söylemek istersin?"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#444', marginBottom: '0.5rem' }}>Kampanya Görseli</label>
            <div style={{ 
              border: '2px dashed #ddd', 
              padding: '2rem', 
              borderRadius: '15px', 
              textAlign: 'center',
              backgroundColor: '#fafafa',
              position: 'relative'
            }}>
              {uploading ? (
                <p style={{ margin: 0, fontWeight: 600, color: '#d4af37' }}>Yükleniyor...</p>
              ) : settings.image ? (
                <div style={{ position: 'relative' }}>
                  <img src={settings.image} alt="Seçilen" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '10px' }} />
                  <button 
                    onClick={() => setSettings({ ...settings, image: '' })}
                    style={{ position: 'absolute', top: -10, right: -10, backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}
                  >✕</button>
                </div>
              ) : (
                <>
                  <ImageIcon style={{ color: '#ccc', marginBottom: '0.5rem' }} size={40} />
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>Bilgisayardan resim seç</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                  />
                </>
              )}
            </div>
          </div>

          <div className="popup-btn-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.5rem' }}>Buton Yazısı</label>
              <input
                type="text"
                value={settings.buttonText}
                onChange={(e) => setSettings({ ...settings, buttonText: e.target.value })}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #ddd' }}
                placeholder="Örn: ALIŞVERİŞE BAŞLA"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.5rem' }}>Buton Linki</label>
              <input
                type="text"
                value={settings.buttonLink}
                onChange={(e) => setSettings({ ...settings, buttonLink: e.target.value })}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #ddd' }}
                placeholder="Örn: /categories/all"
              />
            </div>
          </div>
        </div>

        {/* Canlı Önizleme */}
        <div style={{ padding: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#888', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '1px' }}>Canlı Önizleme</h3>
          <div style={{ 
            backgroundColor: '#f0f0f0', 
            borderRadius: '30px', 
            padding: '3rem', 
            minHeight: '600px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundImage: 'radial-gradient(#ddd 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}>
            {settings.enabled ? (
              <div style={{ 
                backgroundColor: (settings.title || settings.content) ? 'white' : 'rgba(255, 255, 255, 0.9)', 
                backdropFilter: (settings.title || settings.content) ? 'none' : 'blur(12px)',
                width: '320px', 
                borderRadius: '25px', 
                overflow: 'hidden', 
                boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
                border: '1px solid #eee'
              }}>
                {settings.image && (
                  <div style={{ width: '100%', maxHeight: '250px', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src={settings.image} alt="Preview" style={{ width: '100%', height: 'auto', maxHeight: '250px', objectFit: 'contain' }} />
                  </div>
                )}
                <div style={{ 
                  padding: (!settings.title && !settings.content) ? '1.5rem 2rem 2rem 2rem' : '2.5rem 2rem 2rem 2rem', 
                  textAlign: 'center' 
                }}>
                  {settings.title ? (
                    <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.5rem', fontWeight: 800 }}>{settings.title}</h4>
                  ) : (
                    settings.content && <div style={{ height: '0.5rem' }}></div>
                  )}
                  {settings.content && (
                    <p style={{ margin: '0 0 2rem 0', fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>{settings.content}</p>
                  )}
                  <button style={{ width: '100%', backgroundColor: '#111', color: 'white', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'default' }}>
                    {settings.buttonText || 'BUTON YAZISI'}
                  </button>
                  <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#999', textDecoration: 'underline' }}>Pencereyi Kapat</p>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#bbb' }}>
                <Eye size={64} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                <p style={{ fontWeight: 600 }}>Popup şu an devre dışı.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
