"use client";

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Search, Package, MapPin, Calendar, CreditCard, AlertCircle, Truck } from 'lucide-react';

export default function OrderTrackPage() {
  const [orderId, setOrderId] = useState('');
  const [contact, setContact] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId && !contact) {
      toast.error("Lütfen en az bir alan doldurun.");
      return;
    }

    setLoading(true);
    setOrders([]);
    setSearched(false);
    try {
      let query = '';
      if (orderId) {
        const idToSearch = orderId.trim().replace(/^#/, '');
        query += `orderId=${encodeURIComponent(idToSearch)}`;
      }
      
      if (contact) {
        const isEmail = contact.includes('@');
        const param = isEmail ? `email=${encodeURIComponent(contact.trim())}` : `phone=${encodeURIComponent(contact.trim())}`;
        query += (query ? '&' : '') + param;
      }

      const res = await fetch(`/api/orders?${query}`);
      const data = await res.json();

      setSearched(true);
      if (data && data.length > 0) {
        setOrders(data);
        toast.success(`${data.length} sipariş bulundu!`);
      } else {
        toast.error("Eşleşen sipariş bulunamadı.");
      }
    } catch (error) {
      toast.error("Sorgulama sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const statusLabels: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    pending:    { label: 'Bekliyor', color: '#92400e', bg: '#fef3c7', icon: <Calendar size={20} /> },
    approved:   { label: 'Onaylandı', color: '#166534', bg: '#dcfce7', icon: <Package size={20} /> },
    processing: { label: 'Hazırlanıyor', color: '#1e40af', bg: '#dbeafe', icon: <Package size={20} /> },
    shipped:    { label: 'Kargoda', color: '#4338ca', bg: '#e0e7ff', icon: <MapPin size={20} /> },
    delivered:  { label: 'Teslim Edildi', color: '#166534', bg: '#dcfce7', icon: <Package size={20} /> },
    cancelled:  { label: 'İptal Edildi', color: '#991b1b', bg: '#fee2e2', icon: <AlertCircle size={20} /> },
  };

  return (
    <div className="container section" style={{ minHeight: '85vh', paddingBottom: '5rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.5px' }}>Sipariş Takibi</h1>
          <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: '1.6' }}>Siparişinizin güncel durumunu öğrenmek için aşağıdaki <br/> bilgileri kullanabilirsiniz.</p>
        </div>

        <form 
          onSubmit={handleTrack}
          style={{ 
            backgroundColor: 'white', 
            padding: '2.5rem', 
            borderRadius: '24px', 
            boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative Gradient */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #e11d48, #fb7185)' }}></div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.6rem', color: '#333', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sipariş Numarası</label>
              <input 
                type="text" 
                placeholder="Örn: ORD-581192" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none', transition: 'all 0.2s' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.6rem', color: '#333', textTransform: 'uppercase', letterSpacing: '0.5px' }}>E-posta / Telefon</label>
              <input 
                type="text" 
                placeholder="Siparişte kullandığınız bilgi" 
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none', transition: 'all 0.2s' }}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem', borderRadius: '14px', fontWeight: 700, boxShadow: '0 10px 20px rgba(225, 29, 72, 0.2)' }}
          >
            {loading ? 'Sorgulanıyor...' : <><Search size={20} style={{ marginRight: '0.5rem' }} /> Siparişimi Bul</>}
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {searched && orders.map((order, idx) => {
            const sc = statusLabels[order.status] || statusLabels.pending;
            return (
              <div key={idx} style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #f0f0f0', boxShadow: '0 20px 50px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#999', fontFamily: 'monospace', letterSpacing: '1px', fontWeight: 600 }}>{order.id}</span>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      marginTop: '0.75rem',
                      padding: '0.6rem 1.5rem',
                      borderRadius: '100px',
                      backgroundColor: sc.bg,
                      color: sc.color,
                      width: 'fit-content'
                    }}>
                      {sc.icon}
                      <span style={{ fontWeight: 800, fontSize: '1rem' }}>{sc.label}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, color: '#e11d48', letterSpacing: '-0.5px' }}>{Number(order.total_amount).toFixed(2)} TL</p>
                    <span style={{ fontSize: '0.9rem', color: '#888', fontWeight: 500 }}>{new Date(order.created_at).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>

                {/* İptal Nedeni */}
                {order.status === 'cancelled' && order.cancel_reason && (
                  <div style={{ marginBottom: '2rem', padding: '1.25rem', backgroundColor: '#fff1f2', borderRadius: '20px', border: '1px solid #fecdd3', display: 'flex', gap: '1rem' }}>
                     <div style={{ backgroundColor: '#e11d48', color: 'white', padding: '0.6rem', borderRadius: '12px', flexShrink: 0, height: 'fit-content' }}>
                       <AlertCircle size={22} />
                     </div>
                     <div>
                       <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#9f1239', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Siparişiniz İptal Edildi</p>
                       <p style={{ margin: '0.4rem 0 0', fontSize: '1rem', color: '#be123c', lineHeight: '1.5' }}>{order.cancel_reason}</p>
                     </div>
                  </div>
                )}

                {/* Kargo Bilgisi */}
                {order.tracking_number && (
                  <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#eff6ff', borderRadius: '24px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ backgroundColor: '#3b82f6', color: 'white', padding: '0.8rem', borderRadius: '16px', boxShadow: '0 8px 15px rgba(59, 130, 246, 0.3)' }}>
                      <Truck size={28} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#1e40af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Kargo Bilgisi</p>
                      <p style={{ margin: '0.3rem 0 0', fontSize: '1.2rem', color: '#1e3a8a', fontWeight: 800 }}>
                        {order.cargo_company}: <span style={{ fontFamily: 'monospace', backgroundColor: 'rgba(255,255,255,0.5)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{order.tracking_number}</span>
                      </p>
                    </div>
                  </div>
                )}

                <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '2rem' }}>
                  <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 800 }}>Sipariş Özeti</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {order.items?.map((item: any, i: number) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', backgroundColor: '#fafafa', padding: '1rem', borderRadius: '20px', border: '1px solid #f8f8f8' }}>
                        <div style={{ width: '60px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: '1px solid #eee' }}>
                          <img src={item.product?.images?.[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem', color: '#111' }}>{item.quantity}× {item.product?.name}</p>
                          <p style={{ margin: '0.3rem 0 0', fontSize: '0.9rem', color: '#777', fontWeight: 500 }}>
                            Birim Fiyat: {Number(item.product?.price).toFixed(2)} TL
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
