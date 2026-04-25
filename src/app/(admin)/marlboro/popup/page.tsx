"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Save, Megaphone, Image as ImageIcon, Link as LinkIcon, Trash2, Eye } from 'lucide-react';

export default function PopupSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    enabled: false,
    title: '',
    content: '',
    image: '',
    buttonText: '',
    buttonLink: '',
    id: '' // Bu aslında duyurunun benzersiz ID'si (tarih damgası) olacak
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.popup_settings) {
          setSettings(data.popup_settings);
        }
      }
    } catch (err) {
      console.error('Popup ayarları yüklenemedi:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Her kayıtta yeni bir ID oluşturuyoruz ki müşterilerin karşısına tekrar çıksın (eğer bir şey değiştiyse)
      const newSettings = { 
        ...settings, 
        id: Date.now().toString() // Yeni benzersiz ID
      };

      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ popup_settings: newSettings })
      });

      if (res.ok) {
        setSettings(newSettings);
        toast.success('Duyuru başarıyla güncellendi ve yayına alındı!');
      } else {
        toast.error('Ayarlar kaydedilemedi.');
      }
    } catch (err) {
      toast.error('Bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Yükleniyor...</div>;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Megaphone className="text-primary" /> Duyuru Popup Yönetimi
          </h1>
          <p className="text-gray-500 text-sm mt-1">Sitenize giren müşterileri karşılayan özel duyuru penceresi.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
        >
          <Save size={18} /> {saving ? 'Kaydediliyor...' : 'Yayınla'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Alanı */}
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <span className="font-semibold block">Duyuru Aktif mi?</span>
              <span className="text-xs text-gray-500">Kapatırsanız kimse görmez.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.enabled}
                onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duyuru Başlığı</label>
            <input
              type="text"
              value={settings.title}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Örn: Yeni Sezon İndirimi!"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duyuru İçeriği</label>
            <textarea
              value={settings.content}
              onChange={(e) => setSettings({ ...settings, content: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none h-32"
              placeholder="Müşterilere ne söylemek istersiniz?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <ImageIcon size={16} /> Görsel URL (Opsiyonel)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={settings.image}
                onChange={(e) => setSettings({ ...settings, image: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                placeholder="https://..."
              />
              {settings.image && (
                <button 
                  onClick={() => setSettings({ ...settings, image: '' })}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buton Yazısı</label>
              <input
                type="text"
                value={settings.buttonText}
                onChange={(e) => setSettings({ ...settings, buttonText: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="Örn: Hemen İncele"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buton Linki</label>
              <input
                type="text"
                value={settings.buttonLink}
                onChange={(e) => setSettings({ ...settings, buttonLink: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="/categories/new"
              />
            </div>
          </div>
        </div>

        {/* Önizleme Alanı */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Eye size={16} /> Canlı Önizleme
          </label>
          <div className="relative border-4 border-dashed border-gray-100 rounded-3xl p-8 min-h-[500px] flex items-center justify-center bg-gray-50/50">
            {settings.enabled ? (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-[320px] w-full animate-in fade-in zoom-in duration-300">
                {settings.image && (
                  <img src={settings.image} alt="Önizleme" className="w-full h-48 object-cover" />
                )}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{settings.title || 'Başlık Buraya'}</h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {settings.content || 'Duyuru metniniz burada görünecek. Müşterileriniz bu alandan haberdar olacak.'}
                  </p>
                  <button className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm tracking-wide uppercase">
                    {settings.buttonText || 'BUTON YAZISI'}
                  </button>
                  <button className="mt-4 text-gray-400 text-xs hover:text-gray-600">Pencereyi Kapat</button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <Megaphone size={48} className="mx-auto mb-4 opacity-20" />
                <p>Popup şu an devre dışı.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
