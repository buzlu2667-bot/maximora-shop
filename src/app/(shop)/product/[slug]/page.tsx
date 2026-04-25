import React from 'react';
import { Product } from '@/types';
import { notFound } from 'next/navigation';
import ClientProductDetails from '@/components/ProductDetails/ClientProductDetails';
import ProductCard from '@/components/ProductCard/ProductCard';
import sharedStyles from '@/app/(shop)/page.module.css';

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products/${slug}`, {
      cache: 'no-store' 
    });
    
    if (!res.ok) {
       return null;
    }
    return res.json();
  } catch (error) {
    console.error("Hata", error);
    return null;
  }
}

async function getAllProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getAllProducts();
  
  // Önce aynı kategorideki diğer ürünleri bul
  let relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id);
  
  // Eğer 6'dan azsa aynı markadan olanları da ekle (veya rastgele ekle) tamamla
  if (relatedProducts.length < 6) {
    const otherProducts = allProducts.filter(p => p.id !== product.id && !relatedProducts.find(r => r.id === p.id));
    relatedProducts = [...relatedProducts, ...otherProducts];
  }
  
  relatedProducts = relatedProducts.slice(0, 6);

  return (
    <div className="container section">
      <ClientProductDetails product={product} />

      {relatedProducts.length > 0 && (
        <div style={{ marginTop: '5rem', borderTop: '1px solid #eaeaea', paddingTop: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111', marginBottom: '2rem' }} className="mobile-section-title">
            Şunları da beğenebilirsin
          </h2>
          
          <div className={sharedStyles.productGrid}>
            {relatedProducts.map(related => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
