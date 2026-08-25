import React from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types';
import Link from 'next/link';
import { getProducts } from '@/lib/data';

export default async function AllProductsPage(props: { searchParams: Promise<{ category?: string, brand?: string }> }) {
  const searchParams = await props.searchParams;
  const filterCategory = searchParams.category;
  const filterBrand = searchParams.brand;

  let products: Product[] = [];
  try {
    const allProducts = await getProducts();
    products = allProducts.filter(p => {
      let match = true;
      if (filterCategory) match = match && p.category === filterCategory;
      if (filterBrand) match = match && p.brand === filterBrand;
      return match;
    });
  } catch (e) {
    console.error("Error fetching items", e);
  }

  const pageTitle = filterBrand 
    ? `${filterBrand} Koleksiyonu` 
    : filterCategory 
      ? filterCategory 
      : "Tüm Ürünler";

  return (
    <div className="container section" style={{ minHeight: '60vh' }}>
      <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)', marginBottom: '2rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 className="mobile-page-title" style={{ margin: 0 }}>{pageTitle}</h1>
          {filterCategory && filterBrand && <p style={{ color: '#888', marginTop: '0.5rem' }}>{filterCategory} kategorisindeki ürünler</p>}
        </div>
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
           <h3>Henüz uygun ürün bulunmamaktadır.</h3>
           <p style={{ marginTop: '1rem' }}>Filtreleri değiştirerek aramaya devam edebilirsiniz.</p>
           <br/>
           <Link href="/" className="btn btn-primary">Ana Sayfaya Dön</Link>
        </div>
      )}
    </div>
  );
}
