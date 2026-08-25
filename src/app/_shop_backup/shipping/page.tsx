"use client";

import React from 'react';
import { Truck, Info, AlertTriangle, Calendar } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="container" style={{ 
      maxWidth: '800px', 
      marginTop: '3rem', 
      marginBottom: '6rem',
      padding: '0 1rem'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <Truck size={48} strokeWidth={1} style={{ marginBottom: '1.5rem', color: '#000' }} />
        <h1 style={{ 
          fontSize: 'clamp(2rem, 8vw, 3rem)', 
          fontWeight: 400, 
          color: '#000', 
          marginBottom: '1rem',
          letterSpacing: '-0.02em'
        }}>
          Kargo ve Teslimat Politikası
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Siparişlerinizin size ulaşma süreci hakkında bilmeniz gerekenler.
        </p>
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem',
        color: '#333',
        lineHeight: '1.8',
        fontSize: '1.05rem'
      }}>
        
        <section style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Calendar size={24} color="#000" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>Hazırlık ve Gönderim</h2>
          </div>
          <p>
            MaxımoraShop üzerinden verilen siparişler, ödeme onayının alınmasının ardından <strong>3-7 iş günü</strong> içerisinde hazırlanarak kargoya teslim edilir.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Siparişler anlaşmalı kargo firmaları aracılığıyla gönderilmektedir. Kargo firmalarına bağlı olarak teslimat süresi ortalama <strong>7-14 iş günü</strong> arasında değişiklik gösterebilir.
          </p>
        </section>

        <section style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Info size={24} color="#000" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>Takip Bilgisi</h2>
          </div>
          <p>
            Sipariş kargoya verildikten sonra müşterilerimize kargo takip numarası <strong>SMS veya e-posta</strong> yoluyla iletilir. Bu numara ile siparişinizin anlık durumunu kargo firmasının sitesinden takip edebilirsiniz.
          </p>
        </section>

        <section style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '12px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <AlertTriangle size={24} color="#cc3333" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>Önemli Hususlar</h2>
          </div>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li>Teslimat sırasında müşterilerimizin paketi kontrol etmeleri önemlidir. Hasarlı, açılmış veya zarar görmüş paketler teslim alınmadan kargo görevlisine tutanak tutturulmalıdır.</li>
            <li>Aksi halde oluşabilecek zararlardan <strong>MaxımoraShop sorumlu tutulamaz.</strong></li>
            <li>Adres bilgilerinin eksik veya hatalı olması durumunda yaşanabilecek gecikmelerden mağazamız sorumlu değildir.</li>
            <li>Resmi tatiller ve yoğun dönemlerde teslimat sürelerinde gecikmeler yaşanabilir.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
