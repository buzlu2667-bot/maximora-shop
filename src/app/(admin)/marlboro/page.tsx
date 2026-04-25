"use client";

import React, { useEffect, useState } from 'react';
import { Product } from '@/types';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminDashboardOverview() {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProductCount(data.length);
        }
        
        // Gerçek kayıtlı kullanıcı sayısı
        const { count, error } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
          
        if (!error && count !== null) {
          setUserCount(count);
        }
      } catch (e) {}
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', color: '#111', marginBottom: '1rem' }}>Sistem İzleme Paneli</h1>
      <p style={{ color: '#555', marginBottom: '2rem' }}>E-ticaret mağazanızın anlık durumu aşağıda özetlenmiştir.</p>

      {/* İstatistik Kartları */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ backgroundColor: '#111', color: 'white', padding: '2rem', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '10px', right: '10px', width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }}></div>
          <h3 style={{ fontSize: '1rem', color: '#aaa', fontWeight: 500 }}>Kayıtlı Müşteri Sayısı</h3>
          <p style={{ fontSize: '3.5rem', fontWeight: 700, margin: '0.5rem 0' }}>{userCount}</p>
          <span style={{ fontSize: '0.85rem', color: '#888' }}>Gerçek veritabanı verisi</span>
        </div>

        <div style={{ backgroundColor: 'white', border: '1px solid #ddd', padding: '2rem', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1rem', color: '#666', fontWeight: 500 }}>Yayındaki Ürün Sayısı</h3>
          <p style={{ fontSize: '3.5rem', fontWeight: 700, margin: '0.5rem 0', color: '#111' }}>{productCount}</p>
          <span style={{ fontSize: '0.85rem', color: '#888' }}>Koleksiyonunuz büyüyor</span>
        </div>

        <div style={{ backgroundColor: 'white', border: '1px solid #ddd', padding: '2rem', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1rem', color: '#666', fontWeight: 500 }}>Mağaza Durumu</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0', color: '#10b981' }}>Aktif</p>
          <span style={{ fontSize: '0.85rem', color: '#888' }}>Sistem tam kapasite çalışıyor</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #ddd' }}>
           <h3 style={{ fontSize: '1.2rem', color: '#333', marginBottom: '1rem' }}>Ürünlerinizi Yönetin</h3>
           <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Mağazanızdaki ürünleri inceleyin, güncel stok durumlarını takip edin veya silin.</p>
           <Link href="/marlboro/products" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>Ürünler Listesi</Link>
        </div>

        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #d4af37' }}>
           <h3 style={{ fontSize: '1.2rem', color: '#d4af37', marginBottom: '1rem' }}>Koleksiyonu Büyütün</h3>
           <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Yeni tasarımlar, lüks görseller ve stok bilgisiyle veritabanına yeni ürünler ekleyin.</p>
           <Link href="/marlboro/products/new" className="btn" style={{ display: 'block', textAlign: 'center', backgroundColor: '#d4af37', color: '#111', fontWeight: 600 }}>Yepyeni Ürün Ekle</Link>
        </div>
      </div>
    </div>
  );
}
