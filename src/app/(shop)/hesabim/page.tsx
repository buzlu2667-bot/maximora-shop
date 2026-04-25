"use client";

import styles from './Account.module.css';

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
      if (user) {
        setCheckingAuth(false);
        fetchMyOrders();
        fetchProfile();
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
      } else {
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
    <div className={`container section ${styles.container}`}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Hesabım</h1>
          <p className={styles.headerEmail}>{user.email}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Mağaza Kredisi */}
          {profile?.credit_balance > 0 && (
            <div className={styles.creditBadge}>
              <span className={styles.creditLabel}>Mağaza Kredisi</span>
              <span className={styles.creditAmount}>{Number(profile.credit_balance).toFixed(2)} TL</span>
            </div>
          )}
          
          <button onClick={handleLogout} className={`${styles.logoutBtn} btn btn-secondary`}>
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {(['orders', 'favorites'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
          >
            <div className={styles.tabIcon}>
              {tab === 'orders' ? <Package size={20} /> : <Heart size={20} fill={activeTab === tab ? 'currentColor' : 'none'} />}
            </div>
            <span>{tab === 'orders' ? 'Siparişlerim' : 'Favorilerim'}</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>({tab === 'orders' ? orders.length : favorites.length})</span>
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
                <div key={order.id} style={{ border: '1px solid var(--color-border)', borderRadius: '20px', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#999', fontWeight: 600 }}>#{order.id.slice(0,10)}...</span>
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
                            <div style={{ width: '50px', height: '65px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid #eee' }}>
                              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

                  {/* İptal Nedeni */}
                  {order.status === 'cancelled' && order.cancel_reason && (
                    <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: '#fff1f2', borderRadius: '12px', border: '1px solid #fecdd3', display: 'flex', gap: '0.75rem' }}>
                      <AlertCircle size={20} color="#e11d48" style={{ flexShrink: 0 }} />
                      <div>
                        <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: '#9f1239' }}>İptal Nedeni</p>
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#be123c' }}>{order.cancel_reason}</p>
                      </div>
                    </div>
                  )}

                  {/* Kargo Bilgisi */}
                  {order.tracking_number && (
                    <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
            <div className={styles.favoritesGrid}>
              {favorites.map((fav: any) => (
                <Link key={fav.id} href={`/product/${fav.slug}`} className={styles.favCard}>
                  <div className={styles.favImgWrapper}>
                    <img src={fav.images?.[0]} alt={fav.name} />
                  </div>
                  <div className={styles.favInfo}>
                    <p className={styles.favName}>{fav.name}</p>
                    <div className={styles.favPriceRow}>
                      {fav.oldPrice && (
                        <span className={styles.oldPrice}>{Number(fav.oldPrice).toFixed(2)} TL</span>
                      )}
                      <p className={styles.currentPrice}>{Number(fav.price).toFixed(2)} TL</p>
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

