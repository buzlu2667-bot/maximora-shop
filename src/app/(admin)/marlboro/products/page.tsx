"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Product } from '@/types';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

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

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`"${name}" adlı ürünü silmek istediğinize emin misiniz?`)) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Ürün başarıyla silindi.');
        setProducts(products.filter(p => p.id !== id));
      } else {
        toast.error('Silme işleminde bir hata oluştu.');
      }
    } catch {
      toast.error('Girdiğiniz ürün silinemedi.');
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .prod-table-wrap { display: block; }
        .prod-cards-wrap { display: none; }
        .pagination-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #ddd;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }
        .pagination-btn:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #111;
        }
        .pagination-btn.active {
          background: #111;
          color: white;
          border-color: #111;
        }
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .prod-table-wrap { display: none; }
          .prod-cards-wrap { display: flex; flex-direction: column; gap: 0.875rem; }
          .prod-page-title { font-size: 1.4rem !important; }
        }
      `}</style>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="prod-page-title" style={{ fontSize: '2rem', color: '#111', margin: 0, fontWeight: 800 }}>Ürünler Listesi</h1>
            <p style={{ color: '#666', marginTop: '0.25rem', fontSize: '0.9rem' }}>Toplam {products.length} ürün listeleniyor.</p>
          </div>
          <Link href="/marlboro/products/new" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '12px' }}>+ Yeni Ekle</Link>
        </div>

        {loading ? <p>Ürünler yükleniyor...</p> : (
          <>
            {/* MASAÜSTÜ: Tablo */}
            <div className="prod-table-wrap" style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '1rem', fontWeight: 600 }}>Görsel</th>
                    <th style={{ padding: '1rem', fontWeight: 600 }}>Ürün Adı</th>
                    <th style={{ padding: '1rem', fontWeight: 600 }}>Marka</th>
                    <th style={{ padding: '1rem', fontWeight: 600 }}>Fiyat</th>
                    <th style={{ padding: '1rem', fontWeight: 600 }}>Stok</th>
                    <th style={{ padding: '1rem', fontWeight: 600 }}>İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.length === 0 ? (
                    <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#777' }}>Kayıtlı ürün bulunamadı.</td></tr>
                  ) : paginatedProducts.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                      <td style={{ padding: '1rem' }}><img src={p.images[0]} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'contain' }} /></td>
                      <td style={{ padding: '1rem', fontWeight: 500, color: '#111' }}>{p.name}</td>
                      <td style={{ padding: '1rem', color: '#666' }}>{p.brand || p.category}</td>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>{Number(p.price).toLocaleString('tr-TR')} TL</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, backgroundColor: p.stockCount > 5 ? '#dcfce7' : (p.stockCount > 0 ? '#fef08a' : '#fee2e2'), color: p.stockCount > 5 ? '#166534' : (p.stockCount > 0 ? '#854d0e' : '#991b1b') }}>{p.stockCount}</span>
                      </td>
                      <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Link href={`/marlboro/products/edit/${p.id}`} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px' }}>DÜZENLE</Link>
                        <button onClick={() => handleDelete(p.id, p.name)} style={{ background: 'none', border: 'none', color: '#ef4444', textDecoration: 'underline', cursor: 'pointer', padding: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>SİL</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBİL: Kartlar */}
            <div className="prod-cards-wrap">
              {paginatedProducts.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#777', padding: '3rem' }}>Kayıtlı ürün bulunamadı.</p>
              ) : paginatedProducts.map(p => (
                <div key={p.id} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1rem', border: '1px solid #eee', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <img src={p.images[0]} alt={p.name} style={{ width: '70px', height: '80px', objectFit: 'contain', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: '0.95rem', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</p>
                    <p style={{ margin: '0.2rem 0', fontSize: '0.8rem', color: '#888' }}>{p.brand || p.category}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.4rem' }}>
                      <span style={{ fontWeight: 800, color: '#111', fontSize: '0.95rem' }}>{Number(p.price).toLocaleString('tr-TR')} TL</span>
                      <span style={{ padding: '0.15rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: p.stockCount > 5 ? '#dcfce7' : (p.stockCount > 0 ? '#fef08a' : '#fee2e2'), color: p.stockCount > 5 ? '#166534' : (p.stockCount > 0 ? '#854d0e' : '#991b1b') }}>{p.stockCount} Stok</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                      <Link href={`/marlboro/products/edit/${p.id}`} className="btn btn-primary" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', flex: 1, textAlign: 'center', borderRadius: '10px' }}>DÜZENLE</Link>
                      <button onClick={() => handleDelete(p.id, p.name)} style={{ padding: '0.45rem 0.75rem', background: '#fff1f2', border: '1px solid #fecdd3', color: '#ef4444', borderRadius: '10px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}>SİL</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '2rem', paddingBottom: '2rem' }}>
                <button 
                  className="pagination-btn" 
                  disabled={currentPage === 1} 
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Önceki
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page} 
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}

                <button 
                  className="pagination-btn" 
                  disabled={currentPage === totalPages} 
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Sonraki
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
