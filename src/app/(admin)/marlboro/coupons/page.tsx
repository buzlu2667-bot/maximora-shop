"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2, Plus, Ticket } from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // New Coupon Form
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount_type: 'percentage',
    discount_value: '',
    min_amount: '0',
    usage_limit: ''
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/marlboro/coupons');
      const data = await res.json();
      setCoupons(data);
    } catch (err) {
      toast.error('Kuponlar yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discount_value) return;

    setIsAdding(true);
    try {
      const res = await fetch('/api/marlboro/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCoupon,
          discount_value: Number(newCoupon.discount_value),
          min_amount: Number(newCoupon.min_amount)
        })
      });

      if (res.ok) {
        toast.success('Kupon oluşturuldu!');
        setNewCoupon({ code: '', discount_type: 'percentage', discount_value: '', min_amount: '0', usage_limit: '' });
        fetchCoupons();
      } else {
        toast.error('Kupon oluşturulamadı (Kod zaten var olabilir).');
      }
    } catch (err) {
      toast.error('Bir hata oluştu.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm('Bu kuponu silmek istediğinize emin misiniz?')) return;

    try {
      const res = await fetch(`/api/marlboro/coupons?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Kupon silindi.');
        setCoupons(coupons.filter(c => c.id !== id));
      }
    } catch (err) {
      toast.error('Kupon silinemedi.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>İndirim Kuponları</h1>
          <p style={{ color: '#666' }}>Müşterileriniz için özel indirim kodları tanımlayın.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Create Coupon Form */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={20} /> Yeni Kupon Oluştur
          </h3>
          <form onSubmit={handleAddCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Kupon Kodu</label>
              <input 
                type="text" 
                placeholder="Örn: YAZ20" 
                value={newCoupon.code}
                onChange={e => setNewCoupon({...newCoupon, code: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', textTransform: 'uppercase' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>İndirim Tipi</label>
              <select 
                value={newCoupon.discount_type}
                onChange={e => setNewCoupon({...newCoupon, discount_type: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                <option value="percentage">Yüzde (%)</option>
                <option value="fixed">Sabit Tutar (TL)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>İndirim Değeri</label>
              <input 
                type="number" 
                placeholder={newCoupon.discount_type === 'percentage' ? 'Örn: 20' : 'Örn: 100'} 
                value={newCoupon.discount_value}
                onChange={e => setNewCoupon({...newCoupon, discount_value: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Min. Sepet Tutarı (Opsiyonel)</label>
              <input 
                type="number" 
                placeholder="Örn: 500" 
                value={newCoupon.min_amount}
                onChange={e => setNewCoupon({...newCoupon, min_amount: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Kullanım Limiti (Boş bırakırsanız sınırsız)</label>
              <input 
                type="number" 
                placeholder="Örn: 10" 
                value={newCoupon.usage_limit}
                onChange={e => setNewCoupon({...newCoupon, usage_limit: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={isAdding}
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}
            >
              {isAdding ? 'Oluşturuluyor...' : 'Kuponu Kaydet'}
            </button>
          </form>
        </div>

        {/* Coupon List */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #eee', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>Kod</th>
                <th style={{ padding: '1rem' }}>İndirim</th>
                <th style={{ padding: '1rem' }}>Min. Tutar</th>
                <th style={{ padding: '1rem' }}>Kullanım</th>
                <th style={{ padding: '1rem' }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}>Yükleniyor...</td></tr>
              ) : coupons.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>Kupon bulunamadı.</td></tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Ticket size={16} color="var(--color-primary)" />
                        <strong style={{ letterSpacing: '1px' }}>{coupon.code}</strong>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {coupon.discount_type === 'percentage' ? `%${coupon.discount_value}` : `${coupon.discount_value} TL`}
                    </td>
                    <td style={{ padding: '1rem', color: '#666' }}>{coupon.min_amount} TL</td>
                    <td style={{ padding: '1rem', color: '#666' }}>
                      <span style={{ fontWeight: 600, color: (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) ? '#ef4444' : '#111' }}>
                        {coupon.used_count}
                      </span>
                      {coupon.usage_limit ? ` / ${coupon.usage_limit}` : ' / ∞'}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button 
                        onClick={() => handleDeleteCoupon(coupon.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
