import React from 'react';
import { Product } from '@/types';
import { notFound } from 'next/navigation';
import ClientProductDetails from '@/components/ProductDetails/ClientProductDetails';
import ProductCard from '@/components/ProductCard/ProductCard';
import sharedStyles from '@/app/(shop)/page.module.css';

import { getProducts, getProductBySlug } from '@/lib/data';

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  
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
