import React from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types';
import Link from 'next/link';
import { getProducts } from '@/lib/data';

export const revalidate = 60; // 60 saniyede bir sayfayı arka planda tazele (ISR)

// Component receives the dynamic route segment [slug]
export default async function BrandPage(props: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ page?: string }>
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const brandSlug = params.slug;
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 12;

  let products: Product[] = [];
  try {
    const allProducts = await getProducts();
    products = allProducts.filter(p => p.brand?.toLowerCase() === brandSlug.toLowerCase());
  } catch (e) {
    console.error("Error fetching items for brand", e);
  }

  // Pagination logic
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const brandNameMapping: Record<string, string> = {
    'beymen': 'Beymen Koleksiyonu',
    'vakko': 'Vakko Koleksiyonu',
    'maximora': 'Maximora Özel Tasarımlar',
    'canta': 'Çanta Ürünleri'
  };

  const pageTitle = brandNameMapping[brandSlug.toLowerCase()] || `${brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1)} Ürünleri`;

  return (
    <div className="container section" style={{ minHeight: '60vh' }}>
      <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)', marginBottom: '2rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <h1 className="mobile-page-title" style={{ margin: 0, textTransform: 'capitalize' }}>{pageTitle}</h1>
        <span style={{ color: 'var(--color-text-muted)' }}>{totalProducts} ürün bulundu</span>
      </div>

      {paginatedProducts.length > 0 ? (
        <>
          <div className="product-grid">
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '4rem', marginBottom: '2rem' }}>
              {currentPage > 1 && (
                <Link 
                  href={`/brand/${brandSlug}?page=${currentPage - 1}`}
                  style={{ padding: '0.6rem 1.2rem', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: '#111', fontWeight: 600, backgroundColor: '#fff' }}
                >
                  Geri
                </Link>
              )}
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Link 
                    key={page}
                    href={`/brand/${brandSlug}?page=${page}`}
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      border: '1px solid #eee', 
                      borderRadius: '8px', 
                      textDecoration: 'none', 
                      fontWeight: 700,
                      backgroundColor: currentPage === page ? '#111' : '#fff',
                      color: currentPage === page ? '#fff' : '#111',
                      transition: 'all 0.2s'
                    }}
                  >
                    {page}
                  </Link>
                ))}
              </div>

              {currentPage < totalPages && (
                <Link 
                  href={`/brand/${brandSlug}?page=${currentPage + 1}`}
                  style={{ padding: '0.6rem 1.2rem', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: '#111', fontWeight: 600, backgroundColor: '#fff' }}
                >
                  İleri
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-background-alt)', borderRadius: '8px' }}>
           <h3>Henüz bu markaya ait ürün bulunmamaktadır.</h3>
           <br/>
           <Link href="/" className="btn btn-primary">Ana Sayfaya Dön</Link>
        </div>
      )}
    </div>
  );
}
