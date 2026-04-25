import React from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types';
import Link from 'next/link';
import { getProducts } from '@/lib/data';

// Component receives the dynamic route segment [slug]
export default async function BrandPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const brandSlug = params.slug; 

  let products: Product[] = [];
  try {
    const allProducts = await getProducts();
    products = allProducts.filter(p => p.brand?.toLowerCase() === brandSlug.toLowerCase());
  } catch (e) {
    console.error("Error fetching items for brand", e);
  }

  // Define brand titles
  const brandNameMapping: Record<string, string> = {
    'beymen': 'Beymen Koleksiyonu',
    'vakko': 'Vakko Koleksiyonu',
    'maximora': 'Maximora Özel Tasarımlar'
  };

  const pageTitle = brandNameMapping[brandSlug.toLowerCase()] || `${brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1)} Ürünleri`;

  return (
    <div className="container section" style={{ minHeight: '60vh' }}>
      <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)', marginBottom: '2rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <h1 className="mobile-page-title" style={{ margin: 0, textTransform: 'capitalize' }}>{pageTitle}</h1>
        <span style={{ color: 'var(--color-text-muted)' }}>{products.length} ürün bulundu</span>
      </div>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
