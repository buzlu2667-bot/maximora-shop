"use client";

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Search, Package, MapPin, Calendar, CreditCard, AlertCircle, Truck } from 'lucide-react';
import styles from './OrderTrack.module.css';

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
    <div className={`container section ${styles.trackContainer}`}>
      <div className={styles.trackWrapper}>
        <div className={styles.header}>
          <h1>Sipariş Takibi</h1>
          <p>Siparişinizin güncel durumunu öğrenmek için aşağıdaki bilgileri kullanabilirsiniz.</p>
        </div>

        <form onSubmit={handleTrack} className={styles.searchForm}>
          <div className={styles.gradientBar}></div>

          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label>Sipariş Numarası</label>
              <input 
                type="text" 
                placeholder="Örn: ORD-581192" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>E-posta / Telefon</label>
              <input 
                type="text" 
                placeholder="Siparişte kullandığınız bilgi" 
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className={styles.inputField}
              />
            </div>
          </div>
          
          <button type="submit" disabled={loading} className={`${styles.submitBtn} btn btn-primary`}>
            {loading ? 'Sorgulanıyor...' : <><Search size={20} /> Siparişimi Bul</>}
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {searched && orders.map((order, idx) => {
            const sc = statusLabels[order.status] || statusLabels.pending;
            return (
              <div key={idx} className={styles.orderCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.orderId}>{order.id}</span>
                    <div className={styles.statusBadge} style={{ backgroundColor: sc.bg, color: sc.color }}>
                      {sc.icon}
                      <span className={styles.statusLabel}>{sc.label}</span>
                    </div>
                  </div>
                  <div className={styles.priceDate}>
                    <p className={styles.totalPrice}>{Number(order.total_amount).toFixed(2)} TL</p>
                    <span className={styles.date}>{new Date(order.created_at).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>

                {order.status === 'cancelled' && order.cancel_reason && (
                  <div className={`${styles.infoBox} ${styles.cancelBox}`}>
                     <div className={`${styles.iconContainer} ${styles.cancelIcon}`}>
                       <AlertCircle size={22} />
                     </div>
                     <div>
                       <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#9f1239', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Siparişiniz İptal Edildi</p>
                       <p style={{ margin: '0.4rem 0 0', fontSize: '1rem', color: '#be123c', lineHeight: '1.5' }}>{order.cancel_reason}</p>
                     </div>
                  </div>
                )}

                {order.tracking_number && (
                  <div className={`${styles.infoBox} ${styles.cargoBox}`}>
                    <div className={`${styles.iconContainer} ${styles.cargoIcon}`}>
                      <Truck size={28} />
                    </div>
                    <div>
                      <p className={styles.cargoTitle} style={{ color: '#1e40af' }}>Kargo Bilgisi</p>
                      <p className={styles.cargoText} style={{ color: '#1e3a8a' }}>
                        {order.cargo_company}: <span className={styles.trackingCode}>{order.tracking_number}</span>
                      </p>
                    </div>
                  </div>
                )}

                <div className={styles.itemsList}>
                  <h4>Sipariş Özeti</h4>
                  <div className={styles.itemsContainer}>
                    {order.items?.map((item: any, i: number) => (
                      <div key={i} className={styles.itemCard}>
                        <div className={styles.productImg}>
                          <img src={item.product?.images?.[0]} alt="" />
                        </div>
                        <div className={styles.itemInfo}>
                          <p>{item.quantity}× {item.product?.name}</p>
                          <p>Birim Fiyat: {Number(item.product?.price).toFixed(2)} TL</p>
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

