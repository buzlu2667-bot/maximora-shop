"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Save, Ticket, Gift, Eye, Trash2, Megaphone } from 'lucide-react';

export default function CouponPopupPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    enabled: false,
    floatingIconEnabled: true,
    title: 'Sana Özel Hediye Kuponu! 🎁',
    content: 'Bu kuponu sepette kullanarak indirim kazanabilirsin.',
    couponCode: '',
    amount: '',
    buttonText: 'KUPONU AL',
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
        if (data.coupon_popup_settings) {
          setSettings({
            enabled: data.coupon_popup_settings.enabled || false,
            floatingIconEnabled: data.coupon_popup_settings.floatingIconEnabled ?? true,
            title: data.coupon_popup_settings.title || '',
            content: data.coupon_popup_settings.content || '',
            couponCode: data.coupon_popup_settings.couponCode || '',
            amount: data.coupon_popup_settings.amount || '',
            buttonText: data.coupon_popup_settings.buttonText || '',
            id: data.coupon_popup_settings.id || ''
          });
        }
      }
    } catch (err) {
      console.error('Kupon ayarları yüklenemedi:', err);
    } finally {
      setLoading(false);
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
        body: JSON.stringify({ coupon_popup_settings: newSettings })
      });

      if (res.ok) {
        setSettings(newSettings);
        toast.success('Hediye Kuponu ayarları güncellendi! 🎁');
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111', margin: 0 }}>Hediye Kupon Popup</h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Oyunlaştırılmış kupon deneyimi ile satışları artır.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{ 
            backgroundColor: '#10b981', 
            color: 'white', 
            padding: '1rem 2.5rem', 
            borderRadius: '12px', 
            fontWeight: '800', 
            border: 'none', 
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
          }}
        >
          {saving ? 'KAYDEDİLİYOR...' : 'AYARLARI KAYDET'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="coupon-grid">
        <style>{`
          @media (max-width: 900px) {
            .coupon-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        
        {/* Form Bölümü */}
        <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '1.25rem', 
            backgroundColor: settings.enabled ? '#ecfdf5' : '#f9fafb', 
            borderRadius: '15px',
            marginBottom: '1.5rem',
            border: settings.enabled ? '1px solid #10b981' : '1px solid #eee'
          }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', color: settings.enabled ? '#065f46' : '#111' }}>Kupon Popup Aktif mi?</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Açtığın an müşteriler kupon kutusunu görmeye başlar.</p>
            </div>
            <input 
              type="checkbox" 
              checked={settings.enabled}
              onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
              style={{ width: '24px', height: '24px', cursor: 'pointer' }}
            />
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '1.25rem', 
            backgroundColor: '#f9fafb', 
            borderRadius: '15px',
            marginBottom: '2rem',
            border: '1px solid #eee'
          }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#111' }}>Yüzen İkon Görünsün mü?</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Sağ altta "Hediye" ikonu sürekli takip eder.</p>
            </div>
            <input 
              type="checkbox" 
              checked={settings.floatingIconEnabled}
              onChange={(e) => setSettings({ ...settings, floatingIconEnabled: e.target.checked })}
              style={{ width: '24px', height: '24px', cursor: 'pointer' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#444', marginBottom: '0.5rem' }}>Popup Başlığı</label>
            <input
              type="text"
              value={settings.title}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
              placeholder="Örn: SANA ÖZEL SÜRPRİZ! 🎁"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#444', marginBottom: '0.5rem' }}>Kupon Açıklaması</label>
            <textarea
              value={settings.content}
              onChange={(e) => setSettings({ ...settings, content: e.target.value })}
              style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', minHeight: '100px' }}
              placeholder="Kupon hakkında bilgi ver..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#444', marginBottom: '0.5rem' }}>Kupon Kodu</label>
              <input
                type="text"
                value={settings.couponCode}
                onChange={(e) => setSettings({ ...settings, couponCode: e.target.value.toUpperCase() })}
                style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1.1rem', fontWeight: 'bold', color: '#10b981' }}
                placeholder="Örn: HOSGELDIN20"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#444', marginBottom: '0.5rem' }}>Kupon Tutarı (Görsel)</label>
              <input
                type="text"
                value={settings.amount}
                onChange={(e) => setSettings({ ...settings, amount: e.target.value })}
                style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
                placeholder="Örn: 100 TL İndirim"
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#444', marginBottom: '0.5rem' }}>Buton Yazısı</label>
            <input
              type="text"
              value={settings.buttonText}
              onChange={(e) => setSettings({ ...settings, buttonText: e.target.value })}
              style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}
              placeholder="Örn: KUPONU KOPYALA"
            />
          </div>
        </div>

        {/* Önizleme */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#888', textTransform: 'uppercase', margin: 0, letterSpacing: '1px' }}>Canlı Önizleme</h3>
           
           {/* Floating Icon Preview */}
           <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #eee' }}>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>Yüzen İkon Tasarımı:</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  backgroundColor: '#10b981', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)'
                }}>
                  <Ticket size={30} />
                </div>
                <span style={{ fontSize: '0.9rem', color: '#111', fontWeight: 600 }}>← Bu ikon sağ altta görünür.</span>
              </div>
           </div>

           {/* Popup Preview */}
           <div style={{ 
             backgroundColor: '#f4f4f4', 
             borderRadius: '25px', 
             padding: '2rem', 
             display: 'flex', 
             alignItems: 'center', 
             justifyContent: 'center',
             minHeight: '400px',
             backgroundImage: 'radial-gradient(#ddd 1px, transparent 1px)',
             backgroundSize: '15px 15px'
           }}>
             <div style={{ 
               backgroundColor: 'white', 
               width: '320px', 
               borderRadius: '25px', 
               padding: '2.5rem 2rem', 
               textAlign: 'center',
               boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
               position: 'relative'
             }}>
               <div style={{ 
                 width: '70px', 
                 height: '70px', 
                 backgroundColor: '#ecfdf5', 
                 color: '#10b981', 
                 borderRadius: '50%', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 margin: '0 auto 1.5rem auto'
               }}>
                 <Gift size={35} />
               </div>
               <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.4rem', fontWeight: 800 }}>{settings.title}</h4>
               {settings.amount && (
                 <div style={{ backgroundColor: '#10b981', color: 'white', display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
                    {settings.amount}
                 </div>
               )}
               <p style={{ margin: '0 0 2rem 0', fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>{settings.content}</p>
               
               <div style={{ 
                 backgroundColor: '#f9fafb', 
                 padding: '1.25rem', 
                 borderRadius: '15px', 
                 border: '2px dashed #10b981', 
                 marginBottom: '1.5rem' 
               }}>
                 <span style={{ display: 'block', fontSize: '0.75rem', color: '#888', fontWeight: 600, marginBottom: '0.25rem' }}>KUPON KODUN:</span>
                 <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#111', letterSpacing: '2px' }}>{settings.couponCode || 'KOD_BURADA'}</span>
               </div>

               <button style={{ 
                 width: '100%', 
                 backgroundColor: '#111', 
                 color: 'white', 
                 padding: '1rem', 
                 borderRadius: '12px', 
                 fontWeight: 700, 
                 border: 'none' 
               }}>
                 {settings.buttonText}
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
