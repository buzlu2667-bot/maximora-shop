"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/useStore';
import { MapPin, AlertCircle, Package, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites'>('orders');
  const { favorites } = useStore();

  const [profile, setProfile] = useState<any>(null);

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      // Eğer store'da user varsa zaten giriş yapılmıştır
      if (user) {
        setCheckingAuth(false);
        fetchMyOrders();
        fetchProfile();
        return;
      }

      // F5 durumunda store henüz dolmamış olabilir, Supabase session'ı kontrol et
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
      } else {
        // Session varsa syncUserData'nın store'u doldurmasını bekle (veya manuel devam et)
        setCheckingAuth(false);
      }
    };

    checkUser();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (data) setProfile(data);
  };

  const fetchMyOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    try {
      const res = await fetch(`/api/orders?userId=${user.id}`);
      const data = await res.json();
      setOrders(data);
    } catch {
      toast.error('Siparişler yüklenemedi.');
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error(e);
    } finally {
      logout();
      toast.success('Çıkış yapıldı.');
      router.push('/');
    }
  };

  const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
    pending:    { label: 'Bekliyor', color: '#92400e', bg: '#fef3c7' },
    approved:   { label: 'Onaylandı', color: '#166534', bg: '#dcfce7' },
    processing: { label: 'Hazırlanıyor', color: '#1e40af', bg: '#dbeafe' },
    shipped:    { label: 'Kargoda', color: '#4338ca', bg: '#e0e7ff' },
    delivered:  { label: 'Teslim Edildi', color: '#166534', bg: '#dcfce7' },
    cancelled:  { label: 'İptal', color: '#991b1b', bg: '#fee2e2' },
  };

  if (checkingAuth && !user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Yükleniyor...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container section">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '0.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Hesabım</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>{user.email}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Mağaza Kredisi - Sadece varsa göster */}
          {profile?.credit_balance > 0 && (
            <div style={{ 
              background: 'linear-gradient(135deg, #111 0%, #333 100%)', 
              padding: '0.75rem 1.25rem', 
              borderRadius: '12px', 
              color: 'white', 
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.8, fontWeight: 700, letterSpacing: '0.5px' }}>Mağaza Kredisi</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{Number(profile.credit_balance).toFixed(2)} TL</span>
            </div>
          )}
          
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', borderRadius: '10px' }}>
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid var(--color-border)', marginBottom: '2rem' }}>
        {(['orders', 'favorites'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.75rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '0.95rem', fontWeight: activeTab === tab ? 700 : 400,
              borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
              marginBottom: '-2px', color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-muted)',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              {tab === 'orders' ? <Package size={18} /> : <Heart size={18} fill={activeTab === tab ? 'currentColor' : 'none'} />}
              <span>{tab === 'orders' ? 'Siparişlerim' : 'Favorilerim'} ({tab === 'orders' ? orders.length : favorites.length})</span>
            </div>
          </button>
        ))}
      </div>

      {/* Siparişler */}
      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {loadingOrders ? (
            <p style={{ color: 'var(--color-text-muted)' }}>Siparişler yükleniyor...</p>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Henüz siparişiniz bulunmamaktadır.</p>
              <Link href="/" className="btn btn-primary">Alışverişe Başla</Link>
            </div>
          ) : (
            orders.map((order: any) => {
              const sc = statusLabels[order.status] || statusLabels.pending;
              return (
                <div key={order.id} style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'var(--color-background-alt)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#999' }}>{order.id}</span>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ backgroundColor: sc.bg, color: sc.color, padding: '0.2rem 0.65rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 600 }}>{sc.label}</span>
                        <span style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(order.created_at).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{Number(order.total_amount).toFixed(2)} TL</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {(order.items || []).map((item: any, i: number) => {
                      const selectedColor = item.selectedVariants?.['color'];
                      const colorVariant = item.product?.variants?.find((v: any) => v.id === 'color');
                      const variantImg = selectedColor && colorVariant?.imageGroups?.[selectedColor]?.[0];
                      const img = variantImg || item.product?.images?.[0];
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {img && (
                            <div style={{ width: '48px', height: '64px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#f3f4f6' }}>
                              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          )}
                          <div>
                            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500 }}>{item.product?.name}</p>
                            {selectedColor && (
                              <span style={{ fontSize: '0.75rem', color: '#666', backgroundColor: '#f3f4f6', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{selectedColor}</span>
                            )}
                            <p style={{ margin: '0.1rem 0 0', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                              {item.quantity} adet × {Number(item.product?.price).toFixed(2)} TL
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* İptal Nedeni */}
                  {order.status === 'cancelled' && order.cancel_reason && (
                    <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: '#fff1f2', borderRadius: '8px', border: '1px solid #fecdd3', display: 'flex', gap: '0.75rem' }}>
                      <AlertCircle size={20} color="#e11d48" style={{ flexShrink: 0 }} />
                      <div>
                        <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: '#9f1239' }}>İptal Nedeni</p>
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#be123c' }}>{order.cancel_reason}</p>
                      </div>
                    </div>
                  )}

                  {/* Kargo Bilgisi */}
                  {order.tracking_number && (
                    <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <MapPin size={20} color="#1e40af" />
                      <div>
                        <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: '#1e40af', textTransform: 'uppercase' }}>Kargo Bilgisi</p>
                        <p style={{ margin: '0.1rem 0 0', fontSize: '0.9rem', color: '#1e3a8a', fontWeight: 600 }}>
                          {order.cargo_company}: {order.tracking_number}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Favoriler */}
      {activeTab === 'favorites' && (
        <div>
          {favorites.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Favori listeniz boş.</p>
              <Link href="/" className="btn btn-primary">Ürünleri İncele</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {favorites.map((fav: any) => (
                <Link key={fav.id} href={`/product/${fav.slug}`} style={{ textDecoration: 'none', display: 'block', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '3/4', overflow: 'hidden', backgroundColor: 'transparent' }}>
                    <img src={fav.images?.[0]} alt={fav.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ padding: '0.75rem' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-primary)' }}>{fav.name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                      {fav.oldPrice && (
                        <span style={{ fontSize: '0.75rem', color: '#999', textDecoration: 'line-through' }}>{Number(fav.oldPrice).toFixed(2)} TL</span>
                      )}
                      <p style={{ margin: 0, fontSize: '0.85rem', color: fav.oldPrice ? '#cc3333' : 'var(--color-text-muted)', fontWeight: fav.oldPrice ? 700 : 400 }}>{Number(fav.price).toFixed(2)} TL</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
