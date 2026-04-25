"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

type Slide = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
  textPosition: string; // 'center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
};

export default function AdminSliderPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await fetch('/api/slider');
      if (res.ok) {
        const data = await res.json();
        setSlides(data);
      }
    } catch (e) {
      toast.error('Slider verileri yüklenirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      image: '',
      title: '',
      subtitle: '',
      link: '',
      textPosition: 'center',
    };
    setSlides([...slides, newSlide]);
  };

  const handleRemoveSlide = (id: string) => {
    setSlides(slides.filter(s => s.id !== id));
  };

  const handleChange = (id: string, field: string, value: string) => {
    setSlides(slides.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...slides];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= newSlides.length) return;
    [newSlides[index], newSlides[target]] = [newSlides[target], newSlides[index]];
    setSlides(newSlides);
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
      const res = await fetch('/api/slider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slides),
      });
      if (res.ok) {
        toast.success('Slider başarıyla kaydedildi!');
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
      <style>{`
        @media (max-width: 768px) {
          .sl-header { flex-direction: column !important; align-items: flex-start !important; }
          .sl-header h1 { font-size: 1.4rem !important; }
          .sl-header button { width: 100% !important; }
          .sl-slide-row { flex-direction: column !important; }
          .sl-slide-actions { flex-wrap: wrap !important; }
          .sl-inline-row { flex-direction: column !important; }
        }
      `}</style>
      <div className="sl-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '0.5rem' }}>Ana Sayfa Slider Yönetimi</h1>
          <p style={{ color: '#555' }}>Ana sayfadaki büyük kayan görselleri, üzerine yazılacak yazıları ve linkleri yönetin.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ padding: '0.75rem 2rem', whiteSpace: 'nowrap' }}>
          {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
        </button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        {slides.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', margin: '2rem 0' }}>Henüz slider eklemediniz.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {slides.map((slide, idx) => (
              <div key={slide.id} style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', position: 'relative', backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Slayt {idx + 1}</h3>
                  <div className="sl-slide-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleMove(idx, 'up')} disabled={idx === 0} style={{ padding: '0.3rem', cursor: idx === 0 ? 'not-allowed' : 'pointer', background: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>⬆️ Yukarı</button>
                    <button onClick={() => handleMove(idx, 'down')} disabled={idx === slides.length - 1} style={{ padding: '0.3rem', cursor: idx === slides.length - 1 ? 'not-allowed' : 'pointer', background: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>⬇️ Aşağı</button>
                    <button onClick={() => handleRemoveSlide(slide.id)} style={{ color: 'white', backgroundColor: '#ef4444', border: 'none', borderRadius: '4px', padding: '0.3rem 0.8rem', cursor: 'pointer', marginLeft: '1rem' }}>Sil</button>
                  </div>
                </div>

                <div className="sl-slide-row" style={{ display: 'flex', gap: '2rem' }}>
                  {/* Görsel Yükleme Alanı */}
                  <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: 600, color: '#333' }}>Görsel Seç</label>
                    {slide.image ? (
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
                        <img src={slide.image} alt="Slider Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button 
                          onClick={() => handleChange(slide.id, 'image', '')} 
                          style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,0,0,0.8)', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Görseli Kaldır
                        </button>
                      </div>
                    ) : (
                      <div style={{ width: '100%', aspectRatio: '16/9', border: '2px dashed #ccc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', position: 'relative' }}>
                        {uploading === slide.id ? (
                          <span style={{ color: '#666' }}>Yükleniyor...</span>
                        ) : (
                          <>
                            <span style={{ color: '#666' }}>Bilgisayardan Seçmek İçin Tıkla</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => e.target.files && handleFileUpload(slide.id, e.target.files[0])}
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
                        value={slide.image} 
                        onChange={e => handleChange(slide.id, 'image', e.target.value)}
                        placeholder="https://site.com/image.jpg"
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                    </div>
                  </div>

                  {/* İçerik Ayarları Alanı */}
                  <div style={{ flex: '2', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Başlık (İsteğe Bağlı)</label>
                      <input 
                        type="text" 
                        value={slide.title} 
                        onChange={e => handleChange(slide.id, 'title', e.target.value)}
                        placeholder="Örn: Yeni Sezon Çantalar"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                      <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.2rem' }}>Eğer yazısız sadece görsel istiyorsanız boş bırakın.</p>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Alt Başlık (İsteğe Bağlı)</label>
                      <input 
                        type="text" 
                        value={slide.subtitle} 
                        onChange={e => handleChange(slide.id, 'subtitle', e.target.value)}
                        placeholder="Stilinizi tamamlayacak özel parçalar"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                    </div>

                    <div className="sl-inline-row" style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: '1' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Bağlantı (Link)</label>
                        <input 
                          type="text" 
                          value={slide.link} 
                          onChange={e => handleChange(slide.id, 'link', e.target.value)}
                          placeholder="/categories/yeni-sezon"
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </div>
                      
                      <div style={{ flex: '1' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Yazı Konumu</label>
                        <select 
                          value={slide.textPosition} 
                          onChange={e => handleChange(slide.id, 'textPosition', e.target.value)}
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white' }}
                        >
                          <option value="center">Ortada</option>
                          <option value="top-left">Sol Üst</option>
                          <option value="bottom-left">Sol Alt</option>
                          <option value="top-right">Sağ Üst</option>
                          <option value="bottom-right">Sağ Alt</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={handleAddSlide} 
          style={{ marginTop: '2rem', width: '100%', padding: '1.5rem', border: '2px dashed #111', color: '#111', backgroundColor: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
        >
          + Yeni Görsel Ekle
        </button>
      </div>
    </div>
  );
}
