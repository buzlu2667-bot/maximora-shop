"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/useStore';
import { MapPin, Package, Ticket, Zap, ChevronDown, ChevronUp, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './Account.module.css';

const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  pending:    { label: 'Bekliyor', color: '#92400e', bg: '#fef3c7' },
  approved:   { label: 'Onaylandı', color: '#166534', bg: '#dcfce7' },
  processing: { label: 'Hazırlanıyor', color: '#1e40af', bg: '#dbeafe' },
  shipped:    { label: 'Kargoda', color: '#4338ca', bg: '#e0e7ff' },
  delivered:  { label: 'Teslim Edildi', color: '#166534', bg: '#dcfce7' },
  cancelled:  { label: 'İptal', color: '#991b1b', bg: '#fee2e2' },
};

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, creditBalance, setCreditBalance } = useStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'credit' | 'savings'>('orders');
  const [profile, setProfile] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  // Pagination States
  const [ordersPage, setOrdersPage] = useState(1);
  const [savingsPage, setSavingsPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    let isMounted = true;

    if (!user?.id) {
      const t = setTimeout(() => {
        // Eğer kullanıcı çıkış yapıyorsa yönlendirmeyi iptal et
        if (window.location.pathname !== '/hesabim' && window.location.pathname !== '/login') return;
        
        if (!useStore.getState().user && isMounted) {
           router.push('/login');
        }
      }, 500);
      return () => { clearTimeout(t); isMounted = false; };
    }

    setCheckingAuth(false);
    fetchMyOrders(user.id);
    fetchProfile(user.id);

    return () => { isMounted = false; };
  }, [router, user?.id]);

  // Krediyi 2 saniyede bir arka planda taze çek
  useEffect(() => {
    if (!user?.id) return;
    const interval = setInterval(() => fetchProfile(user.id), 2000);
    return () => clearInterval(interval);
  }, [user?.id]);

  const fetchProfile = async (userId: string) => {
    try {
      // /api/profile → supabaseAdmin kullanır → RLS bypass → cache yok → her zaman taze veri
      const res = await fetch(`/api/profile?userId=${userId}&_t=${Date.now()}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data && !data.error) {
        setProfile({ ...data });
        setCreditBalance(Number(data.credit_balance) || 0);
      }
    } catch (e) {
      // sessiz kal
    }
  };


  const fetchMyOrders = async (userId: string) => {
    setLoadingOrders(true);
    try {
      const res = await fetch(`/api/orders?userId=${userId}&t=${Date.now()}`);
      const data = await res.json();
      setOrders(data);
    } catch {
      toast.error('Siparişler yüklenemedi.');
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = () => {
    toast.success('Çıkış yapıldı! Görüşürüz 👋', { duration: 2000 });

    supabase.auth.signOut().catch(() => {});

    setTimeout(() => {
      logout();
      window.location.href = '/';
    }, 1200);
  };

  if (checkingAuth || !user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className={`container section ${styles.container}`}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Hesabım</h1>
          <p className={styles.headerEmail}>{user.email}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={handleLogout} className={`${styles.logoutBtn} btn btn-secondary`}>
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Tabs Container with Scroll Hint */}
      <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
        <div className={styles.tabs}>
          {(['orders', 'savings', 'credit'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOrdersPage(1);
                setSavingsPage(1);
              }}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              style={{ position: 'relative' }}
            >
              <div className={styles.tabIcon}>
                {tab === 'orders' ? <Package size={20} /> : tab === 'savings' ? <Zap size={20} /> : <Ticket size={20} />}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>{tab === 'orders' ? 'Siparişlerim' : tab === 'savings' ? 'Kazançlarım' : 'Mağaza Kredisi'}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                   ({tab === 'orders' ? orders.length : tab === 'savings' ? orders.filter(o => (o.cart_discount > 0 || o.multi_item_discount_amount > 0 || o.coupon_discount > 0 || o.used_credit > 0)).length : creditBalance > 0 ? '1' : '0'})
                </span>
                
                {tab === 'credit' && creditBalance > 0 && (
                  <span style={{ 
                    width: '8px', 
                    height: '8px', 
                    backgroundColor: '#e11d48', 
                    borderRadius: '50%', 
                    display: 'inline-block',
                    marginLeft: '2px',
                    transform: 'translateY(-4px)'
                  }} />
                )}
              </div>
            </button>
          ))}
        </div>
        
        {/* Mobile Scroll Hint */}
        <div className={styles.scrollHint}>
          <span>Kaydır</span>
          <ArrowRight size={12} />
        </div>
      </div>

      {/* Siparişler */}
      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {loadingOrders ? (
            <p style={{ color: 'var(--color-text-muted)' }}>Siparişler yükleniyor...</p>
          ) : orders.length === 0 ? (
            <div className={styles.emptyCredit}>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Henüz siparişiniz bulunmamaktadır.</p>
              <Link href="/" className="btn btn-primary">Alışverişe Başla</Link>
            </div>
          ) : (
            <>
              {orders.slice((ordersPage - 1) * itemsPerPage, ordersPage * itemsPerPage).map((order: any) => {
                const sc = statusLabels[order.status] || statusLabels.pending;
                return (
                  <div key={order.id} style={{ border: '1px solid var(--color-border)', borderRadius: '20px', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <div>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#666', fontWeight: 800 }}>#{order.id}</span>
                        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
                          <span style={{ backgroundColor: sc.bg, color: sc.color, padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>{sc.label}</span>
                          <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 500 }}>{new Date(order.created_at).toLocaleDateString('tr-TR')}</span>
                        </div>
                      </div>
                      <span style={{ fontWeight: 900, fontSize: '1.2rem', color: '#111' }}>{Number(order.total_amount).toFixed(2)} TL</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {(order.items || []).map((item: any, i: number) => {
                        const selectedColor = item.selectedVariants?.['color'];
                        const colorVariant = item.product?.variants?.find((v: any) => v.id === 'color');
                        const variantImg = selectedColor && colorVariant?.imageGroups?.[selectedColor]?.[0];
                        const img = variantImg || item.product?.images?.[0];
                        return (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#fafafa', padding: '0.75rem', borderRadius: '12px' }}>
                            {img && (
                              <div style={{ width: '50px', height: '65px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid #eee', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              </div>
                            )}
                            <div>
                              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#111' }}>{item.product?.name}</p>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.1rem' }}>
                                <span style={{ fontSize: '0.8rem', color: '#666' }}>{item.quantity} adet</span>
                                {selectedColor && (
                                  <span style={{ fontSize: '0.75rem', color: '#111', backgroundColor: '#eee', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>{selectedColor}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Sipariş Özeti Detayı */}
                    <div style={{ marginTop: '1.25rem', borderTop: '1px solid #eee', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {order.cart_discount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#ea580c' }}>
                          <span>🏷️ Sepet İndirimi</span>
                          <span>-{Number(order.cart_discount).toFixed(2)} TL</span>
                        </div>
                      )}
                      {order.multi_item_discount_amount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#0ea5e9' }}>
                          <span>⚡ Kampanya İndirimi</span>
                          <span>-{Number(order.multi_item_discount_amount).toFixed(2)} TL</span>
                        </div>
                      )}
                      {order.coupon_discount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#16a34a' }}>
                          <span>🎟️ Kupon ({order.coupon_code})</span>
                          <span>-{Number(order.coupon_discount).toFixed(2)} TL</span>
                        </div>
                      )}
                      {order.used_credit > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#7c3aed' }}>
                          <span>💜 Mağaza Kredisi</span>
                          <span>-{Number(order.used_credit).toFixed(2)} TL</span>
                        </div>
                      )}
                    </div>

                    {/* Kargo Bilgisi */}
                    {order.tracking_number && (
                      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <MapPin size={20} color="#1e40af" />
                        <div>
                          <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase' }}>Kargo Bilgisi</p>
                          <p style={{ margin: '0.1rem 0 0', fontSize: '0.9rem', color: '#1e3a8a', fontWeight: 700 }}>
                            {order.cargo_company}: <span style={{ fontFamily: 'monospace' }}>{order.tracking_number}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Siparişler Pagination */}
              {orders.length > itemsPerPage && (
                <div className={styles.pagination}>
                  <button onClick={() => setOrdersPage(p => Math.max(1, p - 1))} disabled={ordersPage === 1}><ChevronLeft size={20} /></button>
                  <span>Sayfa {ordersPage} / {Math.ceil(orders.length / itemsPerPage)}</span>
                  <button onClick={() => setOrdersPage(p => Math.min(Math.ceil(orders.length / itemsPerPage), p + 1))} disabled={ordersPage >= Math.ceil(orders.length / itemsPerPage)}><ChevronRight size={20} /></button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Kazançlarım */}
      {activeTab === 'savings' && (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
          {(() => {
            const allSavingsOrders = orders.filter(o => (Number(o.cart_discount) > 0 || Number(o.multi_item_discount_amount) > 0 || Number(o.coupon_discount) > 0 || Number(o.used_credit) > 0));
            const totalSavings = allSavingsOrders.reduce((sum, o) => sum + Number(o.cart_discount) + Number(o.multi_item_discount_amount) + Number(o.coupon_discount) + Number(o.used_credit || 0), 0);
            
            if (totalSavings === 0) {
               return (
                <div className={styles.emptyCredit}>
                  <Zap size={48} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
                  <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111' }}>Henüz bir indirim kazanmadınız.</p>
                  <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>Kampanyaları takip ederek tasarruf etmeye başlayın!</p>
                </div>
               );
            }

            const paginatedSavings = allSavingsOrders.slice((savingsPage - 1) * itemsPerPage, savingsPage * itemsPerPage);

            return (
              <>
                <div className={styles.savingsHero}>
                  <div className={styles.savingsLabel}>Toplam Tasarrufunuz</div>
                  <div className={styles.savingsAmount}>{totalSavings.toFixed(2)} TL</div>
                  <p style={{ margin: '1rem 0 0', opacity: 0.8, fontSize: '0.9rem' }}>
                    Maximora Shop ile yaptığınız alışverişlerde bu tutarı cebinizde tuttunuz! 🚀
                  </p>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <Ticket size={20} /> İndirim Geçmişi
                </h3>

                <div className={styles.savingsGrid}>
                   {paginatedSavings.map((order) => {
                     const orderTotalSaving = Number(order.cart_discount) + Number(order.multi_item_discount_amount) + Number(order.coupon_discount) + Number(order.used_credit || 0);
                     return (
                       <div key={order.id} className={styles.savingsCard}>
                          <div className={styles.savingsCardLabel}>
                             <span className={styles.savingsCardTitle}>#{order.id} nolu Sipariş</span>
                             <span className={styles.savingsCardDate}>{new Date(order.created_at).toLocaleDateString('tr-TR')}</span>
                          </div>
                          <div className={styles.savingsCardValue}>
                             -{orderTotalSaving.toFixed(2)} TL
                          </div>
                       </div>
                     );
                   })}
                </div>

                {/* Kazançlarım Pagination */}
                {allSavingsOrders.length > itemsPerPage && (
                  <div className={styles.pagination} style={{ marginTop: '2.5rem' }}>
                    <button onClick={() => setSavingsPage(p => Math.max(1, p - 1))} disabled={savingsPage === 1}><ChevronLeft size={20} /></button>
                    <span>Sayfa {savingsPage} / {Math.ceil(allSavingsOrders.length / itemsPerPage)}</span>
                    <button onClick={() => setSavingsPage(p => Math.min(Math.ceil(allSavingsOrders.length / itemsPerPage), p + 1))} disabled={savingsPage >= Math.ceil(allSavingsOrders.length / itemsPerPage)}><ChevronRight size={20} /></button>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* Mağaza Kredisi */}
      {activeTab === 'credit' && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
          {creditBalance > 0 ? (
            <div className={styles.creditCard}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className={styles.cardChip}></div>
                  <Ticket size={24} opacity={0.5} />
                </div>
                <p className={styles.cardTitle}>MEVCUT BAKİYE</p>
                <p className={styles.cardBalance}>{creditBalance.toFixed(2)} TL</p>
              </div>
              
              <div className={styles.cardFooter}>
                <div>
                  <p className={styles.cardNumber}>**** **** **** {user.id.slice(-4)}</p>
                  <p className={styles.cardHolder}>{user.email?.split('@')[0]}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.6rem', opacity: 0.6, margin: 0 }}>VALID THRU</p>
                  <p style={{ fontSize: '0.9rem', margin: 0, fontWeight: 700 }}>12/29</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.emptyCredit} style={{ width: '100%' }}>
              <Ticket size={48} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111' }}>Mağaza krediniz bulunmuyor.</p>
              <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>Alışveriş yaptıkça kredi kazanabilirsiniz.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

