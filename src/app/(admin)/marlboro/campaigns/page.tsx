"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Plus, Trash2, Info, Zap, Gift } from 'lucide-react';

interface MultiItemDiscount {
  rank: number;
  percent: number;
}

export default function CampaignsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [discounts, setDiscounts] = useState<MultiItemDiscount[]>([]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data && data.multi_item_discounts) {
        setDiscounts(data.multi_item_discounts);
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
        body: JSON.stringify({ multi_item_discounts: discounts })
      });

      if (res.ok) {
        toast.success('Kampanya ayarları başarıyla kaydedildi');
      } else {
        toast.error('Ayarlar kaydedilemedi');
      }
    } catch (error) {
      toast.error('Bağlantı hatası');
    } finally {
      setSaving(false);
    }
  };

  const addDiscount = () => {
    const nextRank = discounts.length > 0 ? Math.max(...discounts.map(d => d.rank)) + 1 : 2;
    setDiscounts([...discounts, { rank: nextRank, percent: 10 }]);
  };

  const removeDiscount = (index: number) => {
    setDiscounts(discounts.filter((_, i) => i !== index));
  };

  const updateDiscount = (index: number, field: keyof MultiItemDiscount, value: number) => {
    const newDiscounts = [...discounts];
    newDiscounts[index] = { ...newDiscounts[index], [field]: value };
    setDiscounts(newDiscounts);
  };

  if (loading) return <div style={{ color: '#666' }}>Yükleniyor...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111', margin: 0 }}>Kampanya Yönetimi</h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Çoklu ürün alımlarında uygulanacak otomatik indirimleri yönetin.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            backgroundColor: '#10b981', 
            color: 'white', 
            padding: '1rem 2rem', 
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.2)',
            opacity: saving ? 0.7 : 1
          }}
        >
          <Save size={20} />
          {saving ? 'KAYDEDİLİYOR...' : 'YAYINLA'}
        </button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#f0fdf4', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid #dcfce7' }}>
          <Zap size={24} color="#10b981" />
          <div>
            <h4 style={{ margin: 0, color: '#166534', fontWeight: 700 }}>Çoklu Ürün İndirimi Mantığı</h4>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#166534', opacity: 0.8 }}>
              Sistem sepetteki tüm ürünleri fiyata göre sıralar. Tanımladığınız sıradaki (rank) ürünlere belirtilen indirim oranını uygular. 
              Genellikle 1. ürün tam fiyattır, 2. ve sonrakilere indirim uygulanır.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {discounts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '2px dashed #eee', borderRadius: '20px' }}>
              <Gift size={48} color="#ddd" style={{ marginBottom: '1rem' }} />
              <p style={{ color: '#999', margin: 0 }}>Henüz bir kampanya tanımlanmamış.</p>
              <button onClick={addDiscount} style={{ marginTop: '1.5rem', background: '#111', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                İndirim Tanımla
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: '1.5rem', padding: '0 1rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#888', textTransform: 'uppercase' }}>Kaçıncı Ürün?</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#888', textTransform: 'uppercase' }}>İndirim Oranı (%)</span>
                <span></span>
              </div>

              {discounts.sort((a,b) => a.rank - b.rank).map((discount, index) => (
                <div key={index} style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 80px', 
                  gap: '1.5rem', 
                  alignItems: 'center',
                  backgroundColor: '#f9f9f9',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  border: '1px solid #eee'
                }}>
                  <div style={{ position: 'relative' }}>
                    <select 
                      value={discount.rank}
                      onChange={(e) => updateDiscount(index, 'rank', parseInt(e.target.value))}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', fontWeight: 600 }}
                    >
                      {[2,3,4,5,6,7,8,9,10].map(r => (
                        <option key={r} value={r}>{r}. Ürün</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="number" 
                      min="0" 
                      max="100"
                      value={discount.percent}
                      onChange={(e) => updateDiscount(index, 'percent', parseInt(e.target.value) || 0)}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', fontWeight: 600 }}
                    />
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 900, color: '#bbb' }}>%</span>
                  </div>
                  <button 
                    onClick={() => removeDiscount(index)}
                    style={{ background: '#fee2e2', color: '#ef4444', border: 'none', width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}

              <button 
                onClick={addDiscount}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  background: 'none', 
                  border: '2px dashed #ddd', 
                  padding: '1.25rem', 
                  borderRadius: '16px', 
                  color: '#666', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                <Plus size={20} /> Yeni İndirim Kademesi Ekle
              </button>
            </>
          )}
        </div>

        <div style={{ marginTop: '3rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <Info size={20} color="#999" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.6 }}>
              <strong>Önemli Bilgi:</strong> Ürünler sepetteki en pahalıdan en ucuza doğru sıralanır. 
              Örneğin "2. Ürün: %10" derseniz, sepetteki en pahalı 2. ürünün fiyatı üzerinden %10 indirim yapılır. 
              Sadece buraya eklediğiniz kademeler için indirim uygulanır, otomatik devam etmez.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
