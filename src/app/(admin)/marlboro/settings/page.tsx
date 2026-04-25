"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save, AlertTriangle, Clock, Megaphone, Palette, Type, Zap, ArrowsUpFromLine } from 'lucide-react';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    maintenance_mode: false,
    maintenance_until: '',
    maintenance_message: '',
    announcement_mode: false,
    announcement_text: '',
    announcement_color: '#d4af37',
    announcement_bg_color: '#111111',
    topbar_mode: false,
    topbar_text: '',
    topbar_color: '#ffffff',
    topbar_bg_color: '#d4af37',
    topbar_speed: 3,
    topbar_height: 40,
    global_discount_percent: 0
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data) {
        setSettings({
          maintenance_mode: data.maintenance_mode || false,
          maintenance_until: data.maintenance_until ? new Date(data.maintenance_until).toISOString().slice(0, 16) : '',
          maintenance_message: data.maintenance_message || '',
          announcement_mode: data.announcement_mode || false,
          announcement_text: data.announcement_text || '',
          announcement_color: data.announcement_color || '#d4af37',
          announcement_bg_color: data.announcement_bg_color || '#111111',
          topbar_mode: data.topbar_mode || false,
          topbar_text: data.topbar_text || '',
          topbar_color: data.topbar_color || '#ffffff',
          topbar_bg_color: data.topbar_bg_color || '#d4af37',
          topbar_speed: data.topbar_speed || 3,
          topbar_height: data.topbar_height || 40,
          global_discount_percent: data.global_discount_percent || 0
        });
      }
    } catch (error) {
      toast.error('Ayarlar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        toast.success('Ayarlar başarıyla kaydedildi');
      } else {
        const errorData = await res.json();
        toast.error(`Hata: ${errorData.error || 'Kaydedilirken bir sorun oluştu'}`);
      }
    } catch (error) {
      toast.error('Bağlantı hatası');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ color: '#666' }}>Yükleniyor...</div>;

  return (
    <div style={{ maxWidth: '800px', paddingBottom: '5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#111' }}>Site Ayarları</h1>
        <button 
          onClick={handleSave} 
          disabled={saving}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            backgroundColor: '#111', 
            color: 'white', 
            padding: '0.8rem 1.5rem', 
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            opacity: saving ? 0.7 : 1
          }}
        >
          <Save size={20} />
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        
        {/* Header Üstü (Kayan Yazı) */}
        <div style={{ marginBottom: '3rem', borderBottom: '1px solid #eee', paddingBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Type size={20} color="#d4af37" />
                Header Üstü (Kayan Yazı)
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Sitenin en tepesinde ince bir şerit halinde kayan yazı gösterir.</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.topbar_mode}
                onChange={(e) => setSettings({ ...settings, topbar_mode: e.target.checked })}
              />
              <span className="slider round"></span>
            </label>
          </div>

          {settings.topbar_mode && (
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Kayan Metin</label>
                <input 
                  type="text" 
                  value={settings.topbar_text}
                  onChange={(e) => setSettings({ ...settings, topbar_text: e.target.value })}
                  placeholder="Duyurunuzu yazın..."
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Yazı Rengi</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input type="color" value={settings.topbar_color} onChange={(e) => setSettings({ ...settings, topbar_color: e.target.value })} style={{ width: '40px', height: '40px', cursor: 'pointer' }} />
                    <input type="text" value={settings.topbar_color} onChange={(e) => setSettings({ ...settings, topbar_color: e.target.value })} style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', width: '100%' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Arka Plan</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input type="color" value={settings.topbar_bg_color} onChange={(e) => setSettings({ ...settings, topbar_bg_color: e.target.value })} style={{ width: '40px', height: '40px', cursor: 'pointer' }} />
                    <input type="text" value={settings.topbar_bg_color} onChange={(e) => setSettings({ ...settings, topbar_bg_color: e.target.value })} style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', width: '100%' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    <Zap size={16} />
                    Hız (1: En Yavaş, 5: En Hızlı)
                  </label>
                  <select 
                    value={settings.topbar_speed} 
                    onChange={(e) => setSettings({ ...settings, topbar_speed: parseInt(e.target.value) })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
                  >
                    <option value={1}>1 (Çok Yavaş)</option>
                    <option value={2}>2 (Yavaş)</option>
                    <option value={3}>3 (Normal)</option>
                    <option value={4}>4 (Hızlı)</option>
                    <option value={5}>5 (Işık Hızı)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    <ArrowsUpFromLine size={16} />
                    Yükseklik ({settings.topbar_height}px)
                  </label>
                  <input 
                    type="range" 
                    min="30" 
                    max="80" 
                    value={settings.topbar_height}
                    onChange={(e) => setSettings({ ...settings, topbar_height: parseInt(e.target.value) })}
                    style={{ width: '100%', cursor: 'pointer', accentColor: '#111' }}
                  />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 'bold', fontSize: '0.8rem', color: '#999' }}>ÖNİZLEME</label>
                <div style={{ 
                  backgroundColor: settings.topbar_bg_color, 
                  height: `${settings.topbar_height}px`,
                  padding: '0 1rem', 
                  borderRadius: '8px', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <span style={{ color: settings.topbar_color, fontSize: '0.85rem', fontWeight: 'bold' }}>
                    {settings.topbar_text || 'ÖNİZLEME YAZISI'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Slider Altı (Nefes Alan) */}
        <div style={{ marginBottom: '3rem', borderBottom: '1px solid #eee', paddingBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Megaphone size={20} color="#d4af37" />
                Slider Altı (Nefes Alan Yazı)
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Ana sayfada slider'ın altında parlayan, sabit bir yazı gösterir.</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.announcement_mode}
                onChange={(e) => setSettings({ ...settings, announcement_mode: e.target.checked })}
              />
              <span className="slider round"></span>
            </label>
          </div>

          {settings.announcement_mode && (
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Duyuru Metni</label>
                <input 
                  type="text" 
                  value={settings.announcement_text}
                  onChange={(e) => setSettings({ ...settings, announcement_text: e.target.value })}
                  placeholder="Duyurunuzu yazın..."
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Yazı Rengi</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input type="color" value={settings.announcement_color} onChange={(e) => setSettings({ ...settings, announcement_color: e.target.value })} style={{ width: '40px', height: '40px', cursor: 'pointer' }} />
                    <input type="text" value={settings.announcement_color} onChange={(e) => setSettings({ ...settings, announcement_color: e.target.value })} style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', width: '100%' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Arka Plan</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input type="color" value={settings.announcement_bg_color} onChange={(e) => setSettings({ ...settings, announcement_bg_color: e.target.value })} style={{ width: '40px', height: '40px', cursor: 'pointer' }} />
                    <input type="text" value={settings.announcement_bg_color} onChange={(e) => setSettings({ ...settings, announcement_bg_color: e.target.value })} style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', width: '100%' }} />
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 'bold', fontSize: '0.8rem', color: '#999' }}>ÖNİZLEME</label>
                <div style={{ 
                  backgroundColor: settings.announcement_bg_color, 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  textAlign: 'center',
                  border: '1px solid rgba(0,0,0,0.1)'
                }}>
                  <span style={{ color: settings.announcement_color, fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {settings.announcement_text || 'ÖNİZLEME YAZISI'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sepet İndirimi Section */}
        <div style={{ marginBottom: '3rem', borderBottom: '1px solid #eee', paddingBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={20} color="#10b981" />
                Genel Sepet İndirimi
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Tüm ürünler için sepette uygulanacak genel yüzde indirim oranı.</p>
            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7' }}>
            <div style={{ maxWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>İndirim Oranı (%)</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="number" 
                  min="0"
                  max="100"
                  value={settings.global_discount_percent}
                  onChange={(e) => setSettings({ ...settings, global_discount_percent: parseInt(e.target.value) || 0 })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1.1rem', fontWeight: 'bold' }}
                />
                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold', color: '#666' }}>%</span>
              </div>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#166534' }}>
              * Bu oran, ürüne özel bir indirim tanımlanmamışsa tüm sepete uygulanır.
            </p>
          </div>
        </div>

        {/* Maintenance Mode Section */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={20} color="#eab308" />
                Bakım Modu
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Aktif edildiğinde, adminler dışındaki tüm ziyaretçiler bakım sayfasını görür.</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.maintenance_mode}
                onChange={(e) => setSettings({ ...settings, maintenance_mode: e.target.checked })}
              />
              <span className="slider round"></span>
            </label>
          </div>
          
          {settings.maintenance_mode && (
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: '#fffbeb', borderRadius: '8px', border: '1px solid #fef3c7' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Bitiş Zamanı (Opsiyonel)</label>
                <input type="datetime-local" value={settings.maintenance_until} onChange={(e) => setSettings({ ...settings, maintenance_until: e.target.value })} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Özel Mesaj</label>
                <textarea value={settings.maintenance_message} onChange={(e) => setSettings({ ...settings, maintenance_message: e.target.value })} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem', minHeight: '80px' }} />
              </div>
            </div>
          )}
        </div>

        {/* CSS for toggle switch */}
        <style jsx>{`
          .switch { position: relative; display: inline-block; width: 50px; height: 26px; }
          .switch input { opacity: 0; width: 0; height: 0; }
          .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; }
          .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 4px; bottom: 4px; background-color: white; transition: .4s; }
          input:checked + .slider { background-color: #111; }
          input:checked + .slider:before { transform: translateX(24px); }
          .slider.round { border-radius: 34px; }
          .slider.round:before { border-radius: 50%; }
        `}</style>
      </div>
    </div>
  );
}
