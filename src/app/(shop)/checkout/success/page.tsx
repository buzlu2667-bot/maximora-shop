"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get('p');

  const isShopier = paymentMethod === 'shopier';

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (

    <div className="container section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#10b981', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
         </svg>
      </div>
      
      <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1rem', fontWeight: 800 }}>
        {isShopier ? 'Ödeme Sayfasına Yönlendirildiniz!' : 'Siparişiniz Alındı!'}
      </h1>

      <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '500px', marginBottom: '2.5rem', lineHeight: '1.6' }}>
        {isShopier ? (
          <>
            Shopier üzerinden ödemenizi tamamladığınızda siparişiniz işleme alınacaktır. 
            <br/><br/>
            <strong>Not:</strong> Ödeme onaylandığında tarafınıza bilgilendirme yapılacaktır.
          </>
        ) : (
          <>
            Teşekkür ederiz. Siparişiniz başarıyla sisteme kaydedildi. 
            Sipariş detaylarınız e-posta adresinize gönderilmiştir.
          </>
        )}
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn btn-primary" style={{ padding: '1rem 2.5rem', borderRadius: '12px' }}>Anasayfaya Dön</Link>
        <Link href="/orders/track" className="btn btn-outline" style={{ padding: '1rem 2.5rem', borderRadius: '12px', border: '1px solid #ddd' }}>Sipariş Takibi</Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

