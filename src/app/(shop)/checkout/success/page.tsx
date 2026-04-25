import React from 'react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="container section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#10b981', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
         </svg>
      </div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Siparişiniz Alındı!</h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', maxWidth: '500px', marginBottom: '2rem' }}>
        Teşekkür ederiz. Siparişiniz başarıyla sisteme kaydedildi. 
        Sipariş detaylarınız e-posta adresinize gönderilmiştir.
      </p>

      <Link href="/" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>Alışverişe Dön</Link>
    </div>
  );
}
