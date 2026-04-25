"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { AlertTriangle, MessageCircle, ArrowRight, X } from 'lucide-react';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, user, appliedCoupon, setAppliedCoupon } = useStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({ email: '', firstName: '', lastName: '', phone: '', address: '', city: '', district: '' });

  const [profile, setProfile] = useState<any>(null);
  const [useCredit, setUseCredit] = useState(false);
  
  // Modal States
  const [shopierModalState, setShopierModalState] = useState({ isOpen: false, quantity: 1, link: "" });
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [ibanModalOpen, setIbanModalOpen] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [globalDiscount, setGlobalDiscount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0); // Sayfa açıldığında en üste at
    setMounted(true);
    if (user) {
      fetchProfile();
    }
    fetchSettings();
  }, [user]);


  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setGlobalDiscount(data.global_discount_percent || 0);
      }
    } catch (err) {}
  };

  const fetchProfile = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
    if (data) setProfile(data);
  };

  if (!mounted) return null;

  const subTotal = cart.reduce((sum, item) => {
    const selectedColor = item.selectedVariants?.['color'];
    const colorVariant = item.product.variants?.find((v: any) => v.id === 'color');
    const variantDiscount = selectedColor && colorVariant?.discountRates?.[selectedColor];
    
    const itemDiscount = (variantDiscount !== undefined && Number(variantDiscount) > 0) 
      ? Number(variantDiscount) 
      : (Number(item.product.cart_discount_percent) || Number(globalDiscount));

    const basePrice = item.overridePrice || item.product.price;

    const price = Number(itemDiscount) > 0 
      ? basePrice * (1 - Number(itemDiscount) / 100) 
      : basePrice;
    return sum + price * item.quantity;
  }, 0);

  const grossSubTotal = cart.reduce((sum, item) => {
    return sum + (item.overridePrice || item.product.price) * item.quantity;
  }, 0);

  const totalCartDiscount = grossSubTotal - subTotal;
  const originalSubTotal = cart.reduce((sum, item) => {
    const baseOriginalPrice = item.overrideOldPrice || item.overridePrice || item.product.oldPrice || item.product.price;
    return sum + baseOriginalPrice * item.quantity;
  }, 0);
  const couponDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const afterCoupon = Math.max(0, subTotal - couponDiscount);
  const creditBalance = profile?.credit_balance || 0;
  const appliedCredit = useCredit ? Math.min(afterCoupon, creditBalance) : 0;
  const total = Math.max(0, afterCoupon - appliedCredit);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getItemShopierLink = (item: any): string | null => {
    const selectedColor = item.selectedVariants?.['color'];
    const colorVariant = item.product.variants?.find((v: any) => v.id === 'color');
    if (colorVariant?.shopierLinks && selectedColor && colorVariant.shopierLinks[selectedColor]) {
      return colorVariant.shopierLinks[selectedColor];
    }
    return item.product.shopierUrl || null;
  };

  const uniqueShopierLinks = [...new Set(cart.map(item => getItemShopierLink(item)).filter(Boolean))];
  const hasMultipleShopierLinks = uniqueShopierLinks.length > 1;
  const hasShopierInCart = cart.some(item => !!getItemShopierLink(item));
  const shopierLink = cart.length > 0 ? (getItemShopierLink(cart[0]) || '#') : '#';

  const openLiveChat = () => {
    if ((window as any).LiveChatWidget) {
      (window as any).LiveChatWidget.call('maximize');
    } else {
      toast("Canlı destek yükleniyor, lütfen biraz bekleyin...");
    }
    setWarningModalOpen(false);
  };

  const submitOrder = async (pMethod: string, pStatus: string) => {
    setIsSubmitting(true);
    try {
      const shippingAddress = `${formValues.firstName} ${formValues.lastName}\n${formValues.address}\n${formValues.district} / ${formValues.city}`;
      
      const res = await fetch('/api/orders', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            userId: user?.id || "guest",
            items: cart,
            totalAmount: total,
            usedCredit: appliedCredit,
            couponCode: appliedCoupon?.code || null,
            couponDiscount: couponDiscount,
            shippingAddress,
            customerEmail: formValues.email,
            customerPhone: formValues.phone,
            paymentMethod: pMethod,
            status: pStatus
         })
      });

      if (!res.ok) throw new Error();
      
      clearCart();
      setAppliedCoupon(null);
      toast.success('Sipariş başarıyla alındı!');
      router.push('/checkout/success');
    } catch (e) {
      toast.error('Sipariş gönderilemedi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const completeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    if (!formValues.email || !formValues.firstName || !formValues.lastName || !formValues.phone || !formValues.address || !formValues.city || !formValues.district) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }
    
    // Eğer sepet tutarı 0 ise (Kredi/Kupon ile ödenmişse) direk siparişi oluştur
    if (total === 0) {
      submitOrder("credit", "approved");
    } else {
      // IBAN ödemesi için sadece modalı aç, kayıt henüz atılmadı
      setIbanModalOpen(true);
    }
  };

  const handleShopierPaymentTrigger = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasMultipleShopierLinks) {
       toast.error("Farklı Shopier linkli ürünler bir arada alınamaz.");
       return; 
    }
    proceedToShopier(shopierLink, total);
  };

  const proceedToShopier = async (link: string, amount: number) => {
    try {
      await fetch('/api/orders', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            userId: user?.id || "guest",
            items: cart,
            totalAmount: amount,
            usedCredit: appliedCredit,
            couponCode: appliedCoupon?.code || null,
            couponDiscount: couponDiscount,
            shippingAddress: "Shopier Ödemesi",
            customerEmail: formValues.email || user?.email || null,
            customerPhone: formValues.phone || null,
            paymentMethod: "shopier",
            status: "pending"
         })
      });
    } catch (err) {}
    window.open(link, '_blank');
    setTimeout(() => { clearCart(); setAppliedCoupon(null); router.push('/checkout/success'); }, 1000);
  };

  return (
    <div className="container section">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>Güvenli Ödeme</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Alışverişinizi güvenle tamamlayın.</p>
      </div>

       <div className={styles.checkoutGrid}>
         {/* Mobil Sipariş Özeti Accordion Header */}
         <div className={styles.mobileSummaryHeader} onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
               <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.4rem', borderRadius: '8px', display: 'flex' }}>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
               </div>
               <div>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Sipariş Özeti</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600 }}>{total.toFixed(2)} TL</p>
               </div>
            </div>
            <span style={{ fontSize: '0.8rem', transition: 'transform 0.3s', transform: isSummaryExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
         </div>

         {/* 1. SOL TARAF: FORM BİLGİLERİ (PC'DE SOLDADIR) */}
         <form onSubmit={completeOrder} className={styles.formSection} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section>
             <h3 className={styles.sectionHeader}>1. İletişim Bilgileri</h3>
             <input type="email" placeholder="E-posta Adresiniz *" required value={formValues.email} onChange={e => setFormValues({...formValues, email: e.target.value})} style={{ width: '100%', padding: '1rem', border: `1px solid var(--color-border)`, borderRadius: '12px' }} />
          </section>

          <section>
             <h3 className={styles.sectionHeader}>2. Teslimat Adresi</h3>
             <div className={styles.inputGrid}>
                <input type="text" placeholder="Adınız *" required value={formValues.firstName} onChange={e => setFormValues({...formValues, firstName: e.target.value})} style={{ width: '100%', padding: '1rem', border: `1px solid var(--color-border)`, borderRadius: '12px' }} />
                <input type="text" placeholder="Soyadınız *" required value={formValues.lastName} onChange={e => setFormValues({...formValues, lastName: e.target.value})} style={{ width: '100%', padding: '1rem', border: `1px solid var(--color-border)`, borderRadius: '12px' }} />
                <div className={styles.fullWidth}>
                  <input type="tel" placeholder="Telefon *" required value={formValues.phone} onChange={e => setFormValues({...formValues, phone: e.target.value})} style={{ width: '100%', padding: '1rem', border: `1px solid var(--color-border)`, borderRadius: '12px' }} />
                </div>
                <div className={styles.fullWidth}>
                  <input type="text" placeholder="Açık Adres *" required value={formValues.address} onChange={e => setFormValues({...formValues, address: e.target.value})} style={{ width: '100%', padding: '1rem', border: `1px solid var(--color-border)`, borderRadius: '12px' }} />
                </div>
                <input type="text" placeholder="İl *" required value={formValues.city} onChange={e => setFormValues({...formValues, city: e.target.value})} style={{ width: '100%', padding: '1rem', border: `1px solid var(--color-border)`, borderRadius: '12px' }} />
                <input type="text" placeholder="İlçe *" required value={formValues.district} onChange={e => setFormValues({...formValues, district: e.target.value})} style={{ width: '100%', padding: '1rem', border: `1px solid var(--color-border)`, borderRadius: '12px' }} />
             </div>
          </section>

          <section>
             <h3 className={styles.sectionHeader}>3. Ödeme Yöntemi</h3>
             
             {creditBalance > 0 && (
               <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input type="checkbox" id="use-credit" checked={useCredit} onChange={e => setUseCredit(e.target.checked)} style={{ width: '20px', height: '20px' }} />
                    <div>
                      <label htmlFor="use-credit" style={{ fontWeight: 700, color: '#166534', cursor: 'pointer' }}>Mağaza Kredimi Kullan</label>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#15803d' }}>Bakiye: {creditBalance.toFixed(2)} TL</p>
                    </div>
                 </div>
                 {useCredit && <span style={{ fontWeight: 800, color: '#166534', fontSize: '1.1rem' }}>-{appliedCredit.toFixed(2)} TL</span>}
               </div>
             )}

             {hasShopierInCart && total > 0 && (
               <div className={styles.shopierBox}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                     <input type="radio" id="shopier" name="payment" defaultChecked style={{ width: 'auto' }} />
                     <label htmlFor="shopier" style={{ fontWeight: 800, color: '#1d4ed8', fontSize: '1.1rem' }}>Kredi veya Banka Kartı</label>
                  </div>
                  
                  {/* 1. KRİTİK HATA: FARKLI ÜRÜNLER */}
                  {hasMultipleShopierLinks && (
                    <div className={styles.shopierWarning} style={{ borderLeft: '4px solid #dc2626', backgroundColor: '#fef2f2', color: '#991b1b', marginBottom: '1rem' }}>
                      <AlertTriangle size={20} />
                      <p style={{ margin: 0 }}><strong>Hata:</strong> Sepetinizde farklı modeller var. Shopier ile sadece aynı modelden alım yapabilirsiniz. Lütfen sepeti teke düşürün.</p>
                    </div>
                  )}

                  {/* 2. ADET UYARISI */}
                  {!hasMultipleShopierLinks && totalQuantity > 1 && (
                    <div className={styles.shopierWarning} style={{ borderLeft: '4px solid #3b82f6', backgroundColor: '#eff6ff', color: '#1e40af', marginBottom: '1rem' }}>
                      <ArrowRight size={20} />
                      <p style={{ margin: 0 }}><strong>Adet Notu:</strong> Sepetinizde {totalQuantity} ürün var. Shopier sayfasında <strong>Adet</strong> kısmını <strong>{totalQuantity}</strong> yapmayı unutmayın.</p>
                    </div>
                  )}

                  {/* 3. İNDİRİM/FİYAT UYARISI */}
                  {!hasMultipleShopierLinks && (couponDiscount > 0 || appliedCredit > 0 || totalCartDiscount > 0) && (
                    <div className={styles.shopierWarning} style={{ borderLeft: '4px solid #f59e0b', backgroundColor: '#fffbeb', color: '#92400e', marginBottom: '1rem' }}>
                      <AlertTriangle size={20} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <p style={{ margin: 0 }}><strong>Fiyat Notu:</strong> İndirim kullandınız. Shopier fiyatı güncellenmemiş olabilir. Emin değilseniz desteğe yazın.</p>
                        <button onClick={(e) => { e.preventDefault(); openLiveChat(); }} style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, width: 'fit-content', cursor: 'pointer' }}>Canlı Desteğe Sor</button>
                      </div>
                    </div>
                  )}

                   <button 
                    onClick={handleShopierPaymentTrigger} 
                    disabled={hasMultipleShopierLinks} 
                    className={`btn ${hasMultipleShopierLinks ? styles.shopierDisabled : 'btn-accent'}`} 
                    style={{ width: '100%', padding: '1.25rem', borderRadius: '12px', fontWeight: 800 }}
                   >
                     {hasMultipleShopierLinks ? 'Kart ile Ödeme Devre Dışı' : `Kart ile Güvenli Ödeme (${total.toFixed(2)} TL)`}
                  </button>
               </div>
             )}

             <div className={styles.paymentBox} style={{ opacity: (total === 0) ? 0.5 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                   <input type="radio" id="iban" name="payment" defaultChecked={!hasShopierInCart || total === 0} style={{ width: 'auto' }} />
                   <label htmlFor="iban" style={{ fontWeight: 600 }}>{total === 0 ? 'Tam Ödeme (Kupon/Kredi)' : 'EFT / Havale (IBAN)'}</label>
                </div>
                {total > 0 && (
                  <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                     <p style={{ margin: 0, fontSize: '0.85rem' }}>EFT/Havale ile ödemeyi seçtiniz. <strong>Siparişi tamamla</strong> butonuna bastıktan sonra IBAN bilgilerini göreceksiniz.</p>
                  </div>
                )}
                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', marginTop: '1.5rem', borderRadius: '12px' }}>
                  {isSubmitting ? 'İşleniyor...' : total === 0 ? 'Siparişi Tamamla' : 'Siparişi Tamamla (IBAN)'}
                </button>
             </div>
          </section>
        </form>

         {/* 2. SAĞ TARAF: ANA SİPARİŞ ÖZETİ (Responsive/Sticky) */}
         <div className={`${styles.summaryContainer} ${isSummaryExpanded ? styles.summaryExpanded : ''}`}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', fontWeight: 800 }}>Sipariş Özeti</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', maxHeight: '350px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {cart.map((item) => {
                const selectedColor = item.selectedVariants?.['color'];
                const colorVariant = item.product.variants?.find((v: any) => v.id === 'color');
                const variantImg = selectedColor && colorVariant?.imageGroups?.[selectedColor]?.[0];
                const cartImg = variantImg || item.product.images[0];
                
                return (
                  <div key={item.cartItemId} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '75px', backgroundColor: 'transparent', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid #eee' }}>
                      <img src={cartImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product.name}</p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>{item.quantity} Adet {selectedColor && `• ${selectedColor}`}</p>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{((item.overridePrice || item.product.price) * item.quantity).toFixed(2)} TL</span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', borderTop: '1px solid #ddd', paddingTop: '1.5rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666', fontWeight: 500 }}>Ara Toplam</span>
                  <span style={{ fontWeight: 600, textDecoration: (originalSubTotal > grossSubTotal) ? 'line-through' : 'none', color: (originalSubTotal > grossSubTotal) ? '#999' : 'inherit' }}>
                    {originalSubTotal.toFixed(2)} TL
                  </span>
               </div>

               {(originalSubTotal > grossSubTotal) && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.85rem' }}>
                   <span>Ürün İndirimleri</span>
                   <span>-{(originalSubTotal - grossSubTotal).toFixed(2)} TL</span>
                </div>
               )}

               {totalCartDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 700 }}>
                   <span>Sepet İndirimi</span>
                   <span>-{totalCartDiscount.toFixed(2)} TL</span>
                </div>
              )}
              {appliedCoupon && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 700 }}>
                   <span>Kupon ({appliedCoupon.code})</span>
                   <span>-{couponDiscount.toFixed(2)} TL</span>
                </div>
              )}
              {useCredit && appliedCredit > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 700 }}>
                   <span>Mağaza Kredisi</span>
                   <span>-{appliedCredit.toFixed(2)} TL</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '2px solid #111', marginTop: '0.5rem', fontSize: '1.6rem', fontWeight: 900 }}>
                 <span>Toplam</span>
                 <span style={{ color: 'var(--color-primary)' }}>{total.toFixed(2)} TL</span>
              </div>
            </div>
         </div>
       </div>


      {/* IBAN ÖDEME MODALI */}
      {ibanModalOpen && (
        <div 
          onClick={() => setIbanModalOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500, padding: '1rem' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '32px', width: '100%', maxWidth: '450px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.3)', textAlign: 'center', position: 'relative' }}>
            <button onClick={() => setIbanModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
               <X size={24} />
            </button>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Siparişiniz Alındı!</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.85rem' }}>Ödemenizi tamamlamak için aşağıdaki bilgileri kullanın.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'left' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Ödenecek Tutar</span>
                <p style={{ margin: '0.1rem 0 0 0', fontSize: '1.3rem', fontWeight: 900, color: '#111' }}>{total.toFixed(2)} TL</p>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'left', position: 'relative' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Hesap Sahibi</span>
                <p style={{ margin: '0.1rem 0 0 0', fontSize: '1rem', fontWeight: 700 }}>burak agarak</p>
                <button onClick={() => { navigator.clipboard.writeText('burak agarak'); toast.success('İsim kopyalandı'); }} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '0.4rem', cursor: 'pointer' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'left', position: 'relative' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>IBAN Numarası</span>
                <p style={{ margin: '0.1rem 0 0 0', fontSize: '0.9rem', fontWeight: 700, wordBreak: 'break-all', paddingRight: '2rem' }}>TR66 0015 7000 0000 0095 7755 66</p>
                <button onClick={() => { navigator.clipboard.writeText('TR660015700000000095775566'); toast.success('IBAN kopyalandı'); }} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '0.4rem', cursor: 'pointer' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            </div>

            <button 
              onClick={() => {
                submitOrder("iban", "pending");
                setIbanModalOpen(false);
              }}
              disabled={isSubmitting}
              style={{ width: '100%', padding: '1rem', backgroundColor: '#111', color: 'white', borderRadius: '16px', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? 'İşleniyor...' : 'Ödemeyi Yaptım, Onayla'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
