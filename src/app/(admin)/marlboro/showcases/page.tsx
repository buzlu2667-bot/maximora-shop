"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AdminShowcasesPage() {
  const [showcases, setShowcases] = useState<any[]>([]);
  const [newestSettings, setNewestSettings] = useState({
    enabled: true,
    title: 'En Yeni Ürünler',
    layout: 'grid',
    limit: 8
  });
  const [loading, setLoading] = useState(true);

  const categoryBrandMap: Record<string, string[]> = {
    'Kadın Aksesuar': ['Maximora', 'Beymen', 'Vakko'],
    'Erkek Aksesuar': ['canta'],
    'Akıllı Saatler': ['haino-teko']
  };

  useEffect(() => {
    fetchShowcases();
  }, []);

  const fetchShowcases = async () => {
    try {
      const [resShowcases, resNewest] = await Promise.all([
        fetch('/api/showcases'),
        fetch('/api/newest-settings')
      ]);
      
      if (resShowcases.ok) {
        const data = await resShowcases.json();
        setShowcases(data);
      }
      if (resNewest.ok) {
         const dataNewest = await resNewest.json();
         setNewestSettings(dataNewest);
      }
    } catch (e) {
      toast.error('Vitrinler yüklenirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddShowcase = () => {
    const newShowcase = {
      id: Date.now().toString(),
      title: 'Yeni Vitrin',
      category: '',
      brand: '',
      limit: 4,
      layout: 'grid'
    };
    setShowcases([...showcases, newShowcase]);
  };

  const handleRemoveShowcase = (id: string) => {
    setShowcases(showcases.filter(s => s.id !== id));
  };

  const handleChange = (id: string, field: string, value: string | number) => {
    setShowcases(showcases.map(s => {
      if (s.id === id) {
        // Kategori değişince, eski marka yeni kategoride yoksa markayı temizle
        if (field === 'category') {
          return { ...s, [field]: value, brand: '' };
        }
        return { ...s, [field]: value };
      }
      return s;
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newShowcases = [...showcases];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= newShowcases.length) return;
    [newShowcases[index], newShowcases[target]] = [newShowcases[target], newShowcases[index]];
    setShowcases(newShowcases);
  };

  const handleSave = async () => {
    try {
      const [resShowcases, resNewest] = await Promise.all([
        fetch('/api/showcases', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(showcases)
        }),
        fetch('/api/newest-settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newestSettings)
        })
      ]);
      
      if (resShowcases.ok && resNewest.ok) {
        toast.success('Vitrin ayarları başarıyla kaydedildi!');
      } else {
        throw new Error('Kaydetme başarısız');
      }
    } catch (e) {
      toast.error('Kaydedilirken bir hata oluştu.');
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '0.5rem' }}>Ana Sayfa Vitrin Yönetimi</h1>
          <p style={{ color: '#555' }}>Ana sayfada görünecek özel kategorileri ve markaları buradan yönetebilirsiniz.</p>
        </div>
        <button onClick={handleSave} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
          Ayarları Kaydet
        </button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
             <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>En Yeni Ürünler (Varsayılan Vitrin)</h2>
             <p style={{ color: '#666', fontSize: '0.9rem' }}>Bu vitrin öne çıkarılmamış ürünleri en yeni eklenenden itibaren sıralar. İsterseniz tamamen gizleyebilirsiniz.</p>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={newestSettings.enabled}
              onChange={(e) => setNewestSettings({ ...newestSettings, enabled: e.target.checked })}
            />
            <span className="slider round"></span>
          </label>
        </div>

        {newestSettings.enabled && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#666' }}>Vitrin Başlığı</label>
              <input 
                type="text" 
                value={newestSettings.title} 
                onChange={e => setNewestSettings({ ...newestSettings, title: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#666' }}>Gösterim Düzeni</label>
              <select 
                value={newestSettings.layout} 
                onChange={e => setNewestSettings({ ...newestSettings, layout: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white' }}
              >
                <option value="grid">Grid (Alt alta sıralı kartlar)</option>
                <option value="slider">Slider (Yan yana kaydırmalı)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#666' }}>Gösterilecek Ürün Sayısı</label>
              <input 
                type="number" 
                value={newestSettings.limit} 
                onChange={e => setNewestSettings({ ...newestSettings, limit: parseInt(e.target.value) })}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
          </div>
        )}
      </div>

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        {showcases.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', margin: '2rem 0' }}>Henüz vitrin eklemediniz.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {showcases.map((showcase, idx) => (
              <div key={showcase.id} style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Vitrin {idx + 1}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleMove(idx, 'up')} disabled={idx === 0} style={{ padding: '0.3rem', cursor: idx === 0 ? 'not-allowed' : 'pointer' }}>⬆️</button>
                    <button onClick={() => handleMove(idx, 'down')} disabled={idx === showcases.length - 1} style={{ padding: '0.3rem', cursor: idx === showcases.length - 1 ? 'not-allowed' : 'pointer' }}>⬇️</button>
                    <button onClick={() => handleRemoveShowcase(showcase.id)} style={{ color: 'red', marginLeft: '1rem', cursor: 'pointer', border: 'none', background: 'none' }}>Sil (✕)</button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#666' }}>Vitrin Başlığı</label>
                    <input 
                      type="text" 
                      value={showcase.title} 
                      onChange={e => handleChange(showcase.id, 'title', e.target.value)}
                      placeholder="Örn: Maximora Koleksiyonu"
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#666' }}>Kategori Filtresi (Opsiyonel)</label>
                    <select 
                      value={showcase.category || ''} 
                      onChange={e => handleChange(showcase.id, 'category', e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white' }}
                    >
                      <option value="">-- Tüm Kategoriler --</option>
                      {Object.keys(categoryBrandMap).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#666' }}>Marka Filtresi (Opsiyonel)</label>
                    <select 
                      value={showcase.brand || ''} 
                      onChange={e => handleChange(showcase.id, 'brand', e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white' }}
                    >
                      <option value="">-- Tüm Markalar --</option>
                      {showcase.category 
                        ? categoryBrandMap[showcase.category]?.map(b => <option key={b} value={b}>{b}</option>)
                        : Object.values(categoryBrandMap).flat().map(b => <option key={b} value={b}>{b}</option>)
                      }
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#666' }}>Gösterim Düzeni (Görünüm)</label>
                    <select 
                      value={showcase.layout || 'grid'} 
                      onChange={e => handleChange(showcase.id, 'layout', e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white' }}
                    >
                      <option value="grid">Grid (Alt alta sıralı kartlar)</option>
                      <option value="slider">Slider (Yan yana kaydırmalı)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#666' }}>Gösterilecek Ürün Sayısı</label>
                    <input 
                      type="number" 
                      value={showcase.limit} 
                      onChange={e => handleChange(showcase.id, 'limit', parseInt(e.target.value))}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={handleAddShowcase} 
          style={{ marginTop: '2rem', width: '100%', padding: '1rem', border: '2px dashed #d4af37', color: '#d4af37', backgroundColor: '#fffdf5', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Yeni Vitrin Bölümü Ekle
        </button>
      </div>

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
  );
}
