"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Archive, ArchiveRestore, Truck, XCircle, Info, MapPin, Calendar, CreditCard, ChevronRight, Package, Search, CheckCircle, Mail, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);
  
  // Modal states
  const [modalType, setModalType] = useState<'none' | 'cargo' | 'cancel' | 'email'>('none');
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [activeCustomerEmail, setActiveCustomerEmail] = useState<string | null>(null);
  const [cargoData, setCargoData] = useState({ company: '', tracking: '' });
  const [cancelReason, setCancelReason] = useState('');
  
  const [searchTerm, setSearchTerm] = useState("");
  
  // Email state
  const [emailContent, setEmailContent] = useState({ subject: '', message: '' });
  const [sendingEmail, setSendingEmail] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders?_t=' + Date.now());
      if (!res.ok) throw new Error('API hatası');
      const data = await res.json();
      setOrders(data || []);
    } catch (error) {
      toast.error("Siparişler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsSeen = async (id: string) => {
    try {
      const res = await fetch(`/api/orders?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_new: false })
      });

      if (!res.ok) throw new Error('Güncelleme başarısız');
      
      setOrders(orders.map(o => o.id === id ? { ...o, is_new: false } : o));
      toast.success('Sipariş görüldü olarak işaretlendi.');
    } catch (err: any) {
      toast.error('Görüldü yapılamadı.');
    }
  };

  const handleSendEmail = async () => {
    if (!activeCustomerEmail || !emailContent.subject || !emailContent.message) {
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }

    setSendingEmail(true);
    try {
      const res = await fetch('/api/marlboro/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: activeCustomerEmail,
          subject: emailContent.subject,
          message: emailContent.message
        })
      });

      if (!res.ok) throw new Error('Mail gönderilemedi');

      toast.success("E-posta başarıyla gönderildi!");
      setModalType('none');
      setEmailContent({ subject: '', message: '' });
    } catch (error) {
      toast.error("E-posta gönderilirken hata oluştu.");
    } finally {
      setSendingEmail(false);
    }
  };

  const toggleArchive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/orders?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_archived: !currentStatus })
      });

      if (!res.ok) throw new Error('Arşivleme başarısız');

      fetchOrders();
      toast.success(currentStatus ? "Sipariş aktiflere alındı." : "Sipariş arşivlendi.");
    } catch (error) {
      toast.error("Hata oluştu.");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (newStatus === 'shipped') {
      setActiveOrderId(id);
      setModalType('cargo');
      return;
    }
    if (newStatus === 'cancelled') {
      setActiveOrderId(id);
      setModalType('cancel');
      return;
    }
    updateStatus(id, newStatus);
  };

  const updateStatus = async (id: string, newStatus: string, extraData: any = {}) => {
    try {
      const res = await fetch(`/api/orders?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: newStatus,
          is_new: false,
          ...extraData
        })
      });

      if (!res.ok) throw new Error('Güncelleme başarısız');

      toast.success("Durum güncellendi.");
      setModalType('none');
      setCargoData({ company: '', tracking: '' });
      setCancelReason('');
      fetchOrders();
    } catch (error) {
      toast.error("Güncelleme hatası.");
    }
  };

  const statusColors: Record<string, { bg: string; color: string; label: string }> = {
    pending:    { bg: '#fef3c7', color: '#92400e', label: 'Bekliyor' },
    approved:   { bg: '#dcfce7', color: '#166534', label: 'Onaylandı' },
    processing: { bg: '#dbeafe', color: '#1e40af', label: 'Hazırlanıyor' },
    shipped:    { bg: '#e0e7ff', color: '#4338ca', label: 'Kargoda' },
    delivered:  { bg: '#dcfce7', color: '#166534', label: 'Teslim Edildi' },
    cancelled:  { bg: '#fee2e2', color: '#991b1b', label: 'İptal' },
  };

  const filteredOrders = orders
    .filter(o => !!o.is_archived === showArchived)
    .filter(o => {
      if (!searchTerm) return true;
      const s = searchTerm.toLowerCase();
      return (
        o.id?.toLowerCase().includes(s) ||
        o.customer_email?.toLowerCase().includes(s) ||
        o.payment_method?.toLowerCase().includes(s) ||
        o.shipping_address?.toLowerCase().includes(s)
      );
    });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(0.5rem, 3vw, 1.5rem)' }}>
      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.4rem, 5vw, 2.2rem)', color: '#111', margin: 0, fontWeight: 800 }}>{showArchived ? 'Arşivlenmiş Siparişler' : 'Gelen Siparişler'}</h1>
          <p style={{ color: '#666', marginTop: '0.4rem', fontSize: '0.9rem' }}>Toplam {filteredOrders.length} sipariş listeleniyor.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', minWidth: '280px' }}>
            <input 
              type="text" 
              placeholder="Sipariş No, E-posta veya Ödeme Tipi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.75rem 1rem 0.75rem 2.5rem', 
                borderRadius: '12px', 
                border: '1px solid #ddd', 
                fontSize: '0.9rem',
                outline: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            />
            <Search size={18} color="#999" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <button 
            onClick={() => setShowArchived(!showArchived)}
            className="btn"
            style={{ 
              backgroundColor: showArchived ? '#111' : '#f3f4f6', 
              color: showArchived ? 'white' : '#111',
              display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '12px', padding: '0.75rem 1.2rem', fontSize: '0.85rem', fontWeight: 600
            }}
          >
            {showArchived ? <ArchiveRestore size={18} /> : <Archive size={18} />}
            {showArchived ? 'Aktiflere Dön' : 'Arşivi Aç'}
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>Siparişler yükleniyor...</div>
      ) : filteredOrders.length === 0 ? (
        <div style={{ backgroundColor: 'white', padding: '5rem 2rem', textAlign: 'center', borderRadius: '24px', border: '1px solid #eee' }}>
           <h3 style={{ color: '#aaa', fontWeight: 500 }}>{showArchived ? 'Arşiviniz boş.' : 'Henüz hiç aktif siparişiniz yok.'}</h3>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
           {filteredOrders.map((order, idx) => {
             const sc = statusColors[order.status] || statusColors.pending;
             const isNew = order.is_new !== false;

             return (
               <div 
                 key={idx} 
                 style={{ 
                   backgroundColor: 'white', 
                   borderRadius: '24px', 
                   border: isNew ? '2px solid #f59e0b' : '1px solid #f0f0f0', 
                   padding: '1.25rem', 
                   boxShadow: isNew ? '0 10px 30px rgba(245, 158, 11, 0.1)' : '0 4px 25px rgba(0,0,0,0.02)', 
                   position: 'relative', 
                   transition: 'all 0.3s ease'
                 }}
               >
                  {isNew && (
                    <span style={{ position: 'absolute', top: '-12px', left: '30px', backgroundColor: '#f59e0b', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', padding: '4px 12px', borderRadius: '50px', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)', zIndex: 10 }}>YENİ SİPARİŞ</span>
                  )}
                  
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', backgroundColor: sc.color, borderRadius: '24px 0 0 24px' }}></div>

                  {/* Header Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f8f8f8', paddingBottom: '1.25rem', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                     <div style={{ flex: '1 1 300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                          <span style={{ fontSize: '0.8rem', color: '#bbb', fontWeight: 600, fontFamily: 'monospace' }}>#{order.id}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                           <span style={{ backgroundColor: order.payment_method === 'shopier' ? '#ecfdf5' : '#eff6ff', color: order.payment_method === 'shopier' ? '#047857' : '#1d4ed8', padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>{order.payment_method || 'IBAN'}</span>
                           <div style={{ position: 'relative' }}>
                             <select 
                               value={order.status} 
                               onChange={(e) => handleStatusChange(order.id, e.target.value)}
                               style={{ backgroundColor: sc.bg, color: sc.color, padding: '0.3rem 1.8rem 0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800, border: 'none', cursor: 'pointer', outline: 'none', appearance: 'none' }}
                             >
                               {Object.entries(statusColors).map(([key, value]) => (
                                 <option key={key} value={key}>{value.label}</option>
                               ))}
                             </select>
                             <div style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: sc.color }}>
                               <ChevronRight size={12} style={{ transform: 'rotate(90deg)' }} />
                             </div>
                           </div>
                           <span style={{ fontSize: '0.8rem', color: '#999', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={14} /> {new Date(order.created_at).toLocaleString('tr-TR')}</span>
                        </div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        {order.customer_email && (
                          <button 
                            onClick={() => {
                              setActiveCustomerEmail(order.customer_email);
                              setEmailContent({ subject: `Siparişiniz Hakkında - #${order.id}`, message: '' });
                              setModalType('email');
                            }}
                            style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#374151', cursor: 'pointer', padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                          >
                            <Mail size={16} /> E-posta Gönder
                          </button>
                        )}
                        {isNew && (
                          <button onClick={() => handleMarkAsSeen(order.id)} style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#d97706', cursor: 'pointer', padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle size={16} /> Görüldü</button>
                        )}
                        <div style={{ textAlign: 'right', minWidth: '120px' }}>
                          {(order.cart_discount > 0 || order.coupon_discount > 0 || order.used_credit > 0) && (
                            <div style={{ fontSize: '0.75rem', marginBottom: '0.3rem', lineHeight: '1.8' }}>
                              {order.cart_discount > 0 && (
                                <div style={{ color: '#ea580c', fontWeight: 700 }}>🏷️ Sepet İndirimi: -{Number(order.cart_discount).toFixed(2)} TL</div>
                              )}
                              {order.coupon_discount > 0 && (
                                <div style={{ color: '#16a34a', fontWeight: 700 }}>🎟️ Kupon ({order.coupon_code}): -{Number(order.coupon_discount).toFixed(2)} TL</div>
                              )}
                              {order.used_credit > 0 && (
                                <div style={{ color: '#7c3aed', fontWeight: 700 }}>💜 Kredi: -{Number(order.used_credit).toFixed(2)} TL</div>
                              )}
                            </div>
                          )}
                          <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', color: '#111', margin: 0, fontWeight: 900 }}>{Number(order.total_amount).toFixed(2)} TL</h2>
                        </div>
                        <button onClick={() => toggleArchive(order.id, !!order.is_archived)} style={{ background: '#f8f8f8', border: '1px solid #eee', color: '#888', cursor: 'pointer', padding: '0.6rem', borderRadius: '12px' }}>{order.is_archived ? <ArchiveRestore size={18} /> : <Archive size={18} />}</button>
                     </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                     <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}><Info size={14} color="#aaa" /><h4 style={{ fontSize: '0.75rem', color: '#aaa', margin: 0, textTransform: 'uppercase', fontWeight: 700 }}>Müşteri & Teslimat</h4></div>
                        <div style={{ backgroundColor: '#fafafa', padding: '1rem', borderRadius: '16px', border: '1px solid #f3f3f3' }}>
                          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6', color: '#444', whiteSpace: 'pre-line' }}>{order.shipping_address || 'Adres bilgisi girilmemiş.'}</p>
                          <div style={{ marginTop: '0.75rem', borderTop: '1px solid #eee', paddingTop: '0.75rem' }}>
                            {order.customer_email && <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>📧 {order.customer_email}</p>}
                            {order.customer_phone && <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>📞 {order.customer_phone}</p>}
                          </div>
                          {(order.cargo_company || order.tracking_number) && (
                            <div style={{ marginTop: '0.75rem', borderTop: '1px solid #eee', paddingTop: '0.75rem', backgroundColor: '#f0f9ff', padding: '0.5rem', borderRadius: '8px' }}>
                              <p style={{ margin: 0, fontSize: '0.75rem', color: '#0369a1', fontWeight: 700 }}>🚚 KARGO BİLGİSİ</p>
                              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#0c4a6e' }}>{order.cargo_company} - <strong>{order.tracking_number}</strong></p>
                            </div>
                          )}
                        </div>
                     </div>
                     <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}><Package size={14} color="#aaa" /><h4 style={{ fontSize: '0.75rem', color: '#aaa', margin: 0, textTransform: 'uppercase', fontWeight: 700 }}>Sipariş İçeriği</h4></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                           {order.items?.map((item: any, i: number) => (
                             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#fff', borderRadius: '14px', padding: '0.75rem', border: '1px solid #f3f3f3' }}>
                                <div style={{ width: '45px', height: '60px', borderRadius: '10px', overflow: 'hidden' }}><img src={item.product?.images?.[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /></div>
                                <div style={{ flex: 1 }}><p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem' }}>{item.quantity}× {item.product?.name}</p><p style={{ margin: 0, fontSize: '0.8rem', color: '#e11d48', fontWeight: 800 }}>{item.product?.price?.toFixed(2)} TL</p></div>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
             );
           })}
        </div>
      )}

      {/* MODALLAR */}
      {modalType !== 'none' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
           <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '28px', width: '100%', maxWidth: '480px', boxShadow: '0 25px 70px rgba(0,0,0,0.3)' }}>
              {modalType === 'email' ? (
                <>
                  <div style={{ backgroundColor: '#f3f4f6', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', marginBottom: '1.25rem' }}>
                    <Mail size={28} />
                  </div>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem', fontWeight: 800 }}>E-posta Gönder</h3>
                  <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Alıcı: <strong>{activeCustomerEmail}</strong></p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input 
                      type="text" placeholder="Konu" 
                      value={emailContent.subject} onChange={e => setEmailContent({...emailContent, subject: e.target.value})}
                      style={{ padding: '0.9rem 1.2rem', borderRadius: '14px', border: '1px solid #e0e0e0', width: '100%', fontSize: '0.95rem' }}
                    />
                    <textarea 
                      placeholder="Mesajınız..." 
                      value={emailContent.message} onChange={e => setEmailContent({...emailContent, message: e.target.value})}
                      style={{ padding: '0.9rem 1.2rem', borderRadius: '14px', border: '1px solid #e0e0e0', width: '100%', minHeight: '180px', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'none' }}
                    />
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <button onClick={() => setModalType('none')} style={{ flex: 1, padding: '0.9rem', borderRadius: '14px', border: '1px solid #eee', background: 'white', cursor: 'pointer', fontWeight: 600 }}>İptal</button>
                      <button 
                        onClick={handleSendEmail} 
                        disabled={sendingEmail}
                        style={{ flex: 1, padding: '0.9rem', borderRadius: '14px', border: 'none', background: '#111', color: 'white', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                      >
                        {sendingEmail ? 'Gönderiliyor...' : <><Send size={18} /> Gönder</>}
                      </button>
                    </div>
                  </div>
                </>
              ) : modalType === 'cargo' ? (
                <>
                  <div style={{ backgroundColor: '#eff6ff', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', marginBottom: '1.25rem' }}>
                    <Truck size={28} />
                  </div>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem', fontWeight: 800 }}>Kargo Bilgileri</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <input type="text" placeholder="Kargo Firması" value={cargoData.company} onChange={e => setCargoData({...cargoData, company: e.target.value})} style={{ padding: '0.9rem 1.2rem', borderRadius: '14px', border: '1px solid #e0e0e0', width: '100%' }} />
                    <input type="text" placeholder="Takip Numarası" value={cargoData.tracking} onChange={e => setCargoData({...cargoData, tracking: e.target.value})} style={{ padding: '0.9rem 1.2rem', borderRadius: '14px', border: '1px solid #e0e0e0', width: '100%' }} />
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                      <button onClick={() => setModalType('none')} style={{ flex: 1, padding: '0.9rem', borderRadius: '14px', border: '1px solid #eee', background: 'white' }}>Vazgeç</button>
                      <button onClick={() => updateStatus(activeOrderId!, 'shipped', { cargo_company: cargoData.company, tracking_number: cargoData.tracking })} style={{ flex: 1, padding: '0.9rem', borderRadius: '14px', border: 'none', background: '#e11d48', color: 'white' }}>Kaydet</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ backgroundColor: '#fff1f2', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e11d48', marginBottom: '1.25rem' }}>
                    <XCircle size={28} />
                  </div>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem', fontWeight: 800 }}>Siparişi İptal Et</h3>
                  <textarea placeholder="İptal Nedeni..." value={cancelReason} onChange={e => setCancelReason(e.target.value)} style={{ padding: '0.9rem 1.2rem', borderRadius: '14px', border: '1px solid #e0e0e0', width: '100%', minHeight: '110px' }} />
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                    <button onClick={() => setModalType('none')} style={{ flex: 1, padding: '0.9rem', borderRadius: '14px', border: '1px solid #eee', background: 'white' }}>Geri Dön</button>
                    <button onClick={() => updateStatus(activeOrderId!, 'cancelled', { cancel_reason: cancelReason })} style={{ flex: 1, padding: '0.9rem', borderRadius: '14px', border: 'none', background: '#111', color: 'white' }}>İptal Et</button>
                  </div>
                </>
              )}
           </div>
        </div>
      )}
    </div>
  );
}
