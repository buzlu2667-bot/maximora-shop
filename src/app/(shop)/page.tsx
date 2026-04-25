export const dynamic = 'force-dynamic';

import React from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import FeaturedImageSlider from '@/components/FeaturedImageSlider/FeaturedImageSlider';
import HeroSlider from '@/components/HeroSlider/HeroSlider';
import AnnouncementBar from '@/components/AnnouncementBar/AnnouncementBar';
import { Product } from '@/types';
import styles from './page.module.css';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ClientFeaturedProduct from '@/components/FeaturedProduct/ClientFeaturedProduct';

import { getProducts, getShowcases, getPromoBlocks, getNewestSettings } from '@/lib/data';

export default async function Home() {
  const products = await getProducts();
  const showcases = await getShowcases();
  const promoBlock = await getPromoBlocks();
  const newestSettings = await getNewestSettings();
  
  const featuredProducts = products.filter(p => p.isFeatured);
  const featuredCollection = products.filter(p => !p.isFeatured); // Diğer ürünler (limit aşağıda ayarlanıyor)

  return (
    <>
      <HeroSlider />
      <AnnouncementBar />

      {newestSettings.enabled && (
        <section className="section">
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>{newestSettings.title}</h2>
              <Link href="/categories/all" className={styles.viewAll}>Tümünü Gör</Link>
            </div>
            
            {newestSettings.layout === 'slider' ? (
              <ProductSlider products={featuredCollection.length > 0 ? featuredCollection.slice(0, newestSettings.limit) : products.slice(0, newestSettings.limit)} />
            ) : (
              <div className={styles.productGrid}>
                {products.length > 0 ? (
                  (featuredCollection.length > 0 ? featuredCollection : products).slice(0, newestSettings.limit).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <p>Henüz ürün eklenmemiş.</p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {showcases && showcases.length > 0 && showcases.map(showcase => {
        const filteredProducts = products.filter(p => {
          let match = true;
          if (showcase.category) match = match && p.category === showcase.category;
          if (showcase.brand) match = match && p.brand === showcase.brand;
          return match;
        }).slice(0, showcase.limit || 4);

        if (filteredProducts.length === 0) return null;

        return (
          <section key={showcase.id} className="section" style={{ borderTop: '1px solid #eaeaea' }}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2>{showcase.title}</h2>
                <Link href={`/categories/all?category=${encodeURIComponent(showcase.category || '')}&brand=${encodeURIComponent(showcase.brand || '')}`} className={styles.viewAll}>Tümünü Gör</Link>
              </div>
              
              {showcase.layout === 'slider' ? (
                <ProductSlider products={filteredProducts} />
              ) : (
                <div className={styles.productGrid}>
                  {filteredProducts.map(product => (
                     <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Öne Çıkan Ürünler (Varsa gösterilir, yoksa komple gizlenir) */}
      {featuredProducts && featuredProducts.length > 0 && (
        featuredProducts.map((featuredProduct, index) => (
          <ClientFeaturedProduct key={featuredProduct.id} product={featuredProduct} index={index} />
        ))
      )}

      {/* Yönetilebilir Promo Banner / Açıklamalı Görsel Bloğu */}
      {promoBlock && Array.isArray(promoBlock) && promoBlock.map((block: any, idx: number) => {
        if (!block.enabled) return null;
        return (
          <section key={block.id || idx} className={styles.bannerSection} style={{ borderTop: idx > 0 ? '1px solid #eaeaea' : 'none' }}>
            <div className="container">
              <div className={styles.banner} style={{ 
                gridTemplateColumns: block.imagePosition === 'left' ? '1.5fr 1fr' : undefined 
              }}>
                {block.imagePosition === 'left' && (
                  <div className={styles.bannerImage}>
                    <img src={block.image || "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} alt={block.title} className="img-cover" />
                  </div>
                )}
                
                <div className={styles.bannerText}>
                  {block.title && <h2>{block.title}</h2>}
                  {block.description && <p>{block.description}</p>}
                  {block.buttonText && block.buttonLink && (
                    <Link href={block.buttonLink} className="btn btn-accent">{block.buttonText}</Link>
                  )}
                </div>

                {(!block.imagePosition || block.imagePosition === 'right') && (
                  <div className={styles.bannerImage}>
                    <img src={block.image || "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} alt={block.title} className="img-cover" />
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
