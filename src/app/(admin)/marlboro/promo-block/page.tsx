"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

type PromoBlock = {
  id: string;
  enabled: boolean;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  imagePosition: 'right' | 'left';
};

export default function AdminPromoBlockPage() {
  const [promos, setPromos] = useState<PromoBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetchPromo();
  }, []);

  const fetchPromo = async () => {
    try {
      const res = await fetch('/api/promo-block');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setPromos(data.map((p, i) => ({ ...p, id: p.id || `promo-${i}` })));
        } else if (data && typeof data === 'object') {
          // Geriye dönük uyumluluk
          setPromos([{ ...data, id: data.id || 'default-1' }]);
        }
      }
    } catch (e) {
      toast.error('Banner verileri yüklenirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBlock = () => {
    const newBlock: PromoBlock = {
      id: Date.now().toString(),
      enabled: true,
      title: 'Yeni Tanıtım Bloğu',
      description: '',
      buttonText: 'İncele',
      buttonLink: '/',
      image: '',
      imagePosition: 'right'
    };
    setPromos([...promos, newBlock]);
  };

  const handleRemoveBlock = (id: string) => {
    setPromos(promos.filter(p => p.id !== id));
  };

  const handleChange = (id: string, field: keyof PromoBlock, value: any) => {
    setPromos(promos.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newPromos = [...promos];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= newPromos.length) return;
    [newPromos[index], newPromos[target]] = [newPromos[target], newPromos[index]];
    setPromos(newPromos);
  };

  const handleFileUpload = async (id: string, file: File) => {
    if (!file) return;
    setUploading(id);
    const formData = new FormData();
    formData.append('files', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Yükleme başarısız');
      const data = await res.json();
      if (data.urls && data.urls.length > 0) {
        handleChange(id, 'image', data.urls[0]);
        toast.success('Görsel başarıyla yüklendi!');
      }
    } catch (e: any) {
      toast.error(e.message || 'Görsel yüklenirken hata oluştu.');
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/promo-block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(promos),
      });
      if (res.ok) {
        toast.success('Banner ayarları başarıyla kaydedildi!');
      } else {
        throw new Error('Kaydetme başarısız');
      }
    } catch (e: any) {
      toast.error('Kaydedilirken hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '0.5rem' }}>Tanıtım Blokları (Bannerlar)</h1>
          <p style={{ color: '#555' }}>Ana sayfada istediğiniz kadar "Lüksü Yeniden Tanımlıyoruz" tarzında blok ekleyebilirsiniz.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
          {saving ? 'Kaydediliyor...' : 'Tüm Ayarları Kaydet'}
        </button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        
        {promos.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', margin: '2rem 0' }}>Henüz tanıtım bloğu eklemediniz.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {promos.map((promo, idx) => (
              <div key={promo.id} style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', position: 'relative', backgroundColor: promo.enabled ? '#fff' : '#f9f9f9', opacity: promo.enabled ? 1 : 0.6 }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Blok {idx + 1}</h3>
                    <label className="switch" style={{ transform: 'scale(0.8)' }}>
                      <input 
                        type="checkbox" 
                        checked={promo.enabled}
                        onChange={(e) => handleChange(promo.id, 'enabled', e.target.checked)}
                      />
                      <span className="slider round"></span>
                    </label>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>{promo.enabled ? 'Aktif' : 'Gizli'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleMove(idx, 'up')} disabled={idx === 0} style={{ padding: '0.3rem', cursor: idx === 0 ? 'not-allowed' : 'pointer', background: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>⬆️ Yukarı</button>
                    <button onClick={() => handleMove(idx, 'down')} disabled={idx === promos.length - 1} style={{ padding: '0.3rem', cursor: idx === promos.length - 1 ? 'not-allowed' : 'pointer', background: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>⬇️ Aşağı</button>
                    <button onClick={() => handleRemoveBlock(promo.id)} style={{ color: 'white', backgroundColor: '#ef4444', border: 'none', borderRadius: '4px', padding: '0.3rem 0.8rem', cursor: 'pointer', marginLeft: '1rem' }}>Sil (✕)</button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '3rem' }}>
                  {/* Sol: Ayarlar */}
                  <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Başlık</label>
                      <input 
                        type="text" 
                        value={promo.title} 
                        onChange={e => handleChange(promo.id, 'title', e.target.value)}
                        placeholder="Örn: Lüksü Yeniden Tanımlıyoruz"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Açıklama (İsteğe Bağlı)</label>
                      <textarea 
                        value={promo.description} 
                        onChange={e => handleChange(promo.id, 'description', e.target.value)}
                        placeholder="Detaylı açıklama girin..."
                        rows={3}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: '1' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Buton Yazısı (İsteğe Bağlı)</label>
                        <input 
                          type="text" 
                          value={promo.buttonText} 
                          onChange={e => handleChange(promo.id, 'buttonText', e.target.value)}
                          placeholder="Örn: Hikayemiz"
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </div>
                      
                      <div style={{ flex: '1' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Buton Linki</label>
                        <input 
                          type="text" 
                          value={promo.buttonLink} 
                          onChange={e => handleChange(promo.id, 'buttonLink', e.target.value)}
                          placeholder="/about"
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Görsel Konumu</label>
                      <select 
                        value={promo.imagePosition} 
                        onChange={e => handleChange(promo.id, 'imagePosition', e.target.value as 'left' | 'right')}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white' }}
                      >
                        <option value="right">Yazı Solda, Görsel Sağda</option>
                        <option value="left">Görsel Solda, Yazı Sağda</option>
                      </select>
                    </div>
                  </div>

                  {/* Sağ: Görsel Yükleme */}
                  <div style={{ flex: '1' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Görsel (Banner Resmi)</label>
                    
                    {promo.image ? (
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '1rem' }}>
                        <img src={promo.image} alt="Promo Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button 
                          onClick={() => handleChange(promo.id, 'image', '')} 
                          style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,0,0,0.8)', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Görseli Kaldır
                        </button>
                      </div>
                    ) : (
                      <div style={{ width: '100%', aspectRatio: '4/3', border: '2px dashed #ccc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa', position: 'relative', marginBottom: '1rem' }}>
                        {uploading === promo.id ? (
                          <span style={{ color: '#666' }}>Yükleniyor...</span>
                        ) : (
                          <>
                            <span style={{ color: '#666', textAlign: 'center', padding: '1rem' }}>Bilgisayardan Seçmek İçin Tıklayın<br/>veya Sürükleyin</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => e.target.files && handleFileUpload(promo.id, e.target.files[0])}
                              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                            />
                          </>
                        )}
                      </div>
                    )}
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.3rem' }}>Veya manuel URL girin:</label>
                      <input 
                        type="url" 
                        value={promo.image} 
                        onChange={e => handleChange(promo.id, 'image', e.target.value)}
                        placeholder="https://site.com/image.jpg"
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={handleAddBlock} 
          style={{ marginTop: '2rem', width: '100%', padding: '1.5rem', border: '2px dashed #111', color: '#111', backgroundColor: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
        >
          + Yeni Tanıtım Bloğu Ekle
        </button>

        {/* Switch CSS */}
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
