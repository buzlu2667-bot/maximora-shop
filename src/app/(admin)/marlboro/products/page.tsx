"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Product } from '@/types';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error('Ürünler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    const confirmDelete = window.confirm(`"${name}" adlı ürünü silmek istediğinize emin misiniz?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        toast.success('Ürün başarıyla silindi.');
        setProducts(products.filter(p => p.id !== id));
      } else {
        toast.error('Silme işleminde bir hata oluştu.');
      }
    } catch (error) {
      toast.error('Girdiğiniz ürün silinemedi.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
         <h1 style={{ fontSize: '2rem', color: '#111' }}>Ürünler Listesi</h1>
         <Link href="/marlboro/products/new" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>+ Yeni Ekle</Link>
      </div>

      {loading ? (
        <p>Ürünler yükleniyor...</p>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
           <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                 <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '1rem' }}>Görsel</th>
                    <th style={{ padding: '1rem' }}>Ürün Adı</th>
                    <th style={{ padding: '1rem' }}>Marka</th>
                    <th style={{ padding: '1rem' }}>Fiyat</th>
                    <th style={{ padding: '1rem' }}>Stok</th>
                    <th style={{ padding: '1rem' }}>İşlem</th>
                 </tr>
              </thead>
              <tbody>
                 {products.length === 0 ? (
                   <tr>
                     <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#777' }}>Kayıtlı ürün bulunamadı.</td>
                   </tr>
                 ) : products.map(p => (
                   <tr key={p.id} style={{ borderBottom: '1px solid #efefef' }}>
                      <td style={{ padding: '1rem' }}>
                         <img src={p.images[0]} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 500 }}>{p.name}</td>
                      <td style={{ padding: '1rem', color: '#666' }}>{p.brand || p.category}</td>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{p.price} TL</td>
                      <td style={{ padding: '1rem' }}>
                         <span style={{ 
                            padding: '0.2rem 0.5rem', 
                            borderRadius: '4px', 
                            fontSize: '0.85rem',
                            backgroundColor: p.stockCount > 5 ? '#dcfce7' : (p.stockCount > 0 ? '#fef08a' : '#fee2e2'),
                            color: p.stockCount > 5 ? '#166534' : (p.stockCount > 0 ? '#854d0e' : '#991b1b')
                         }}>
                            {p.stockCount}
                         </span>
                      </td>
                      <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                         <Link href={`/marlboro/products/edit/${p.id}`} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>DÜZENLE</Link>
                         <button 
                           onClick={() => handleDelete(p.id, p.name)}
                           style={{ background: 'none', border: 'none', color: '#ef4444', textDecoration: 'underline', cursor: 'pointer', padding: '0.5rem', fontSize: '0.9rem' }}
                         >SİL</button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}
    </div>
  );
}
