"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './RecentlyViewed.module.css';
import { Product } from '@/types';

interface RecentlyViewedProps {
  currentProduct?: Product;
}

export default function RecentlyViewed({ currentProduct }: RecentlyViewedProps) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // 1. LocalStorage'dan mevcut listeyi çek
    const saved = localStorage.getItem('maximora_recently_viewed');
    let list = saved ? JSON.parse(saved) : [];

    // Eski Supabase URL'lerini yenisiyle güncelle (Migration sonrası kırık görselleri önlemek için)
    const currentSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (currentSupabaseUrl) {
      list = list.map((item: any) => {
        if (item.image && typeof item.image === 'string' && item.image.includes('.supabase.co')) {
          item.image = item.image.replace(/https:\/\/[a-zA-Z0-9]+\.supabase\.co/, currentSupabaseUrl);
        }
        return item;
      });
    }

    // 2. Eğer şu an bir ürün sayfasındaysak, bu ürünü listeye ekle
    if (currentProduct) {
      const simplifiedProduct = {
        id: currentProduct.id,
        name: currentProduct.name,
        slug: currentProduct.slug,
        price: currentProduct.price,
        oldPrice: currentProduct.oldPrice,
        image: currentProduct.images[0]
      };

      // Listede zaten varsa çıkar (başa alacağız)
      list = list.filter((p: any) => p.id !== currentProduct.id);
      
      // En başa ekle
      list.unshift(simplifiedProduct);

      // Maksimum 10 tane tutalım ama sadece 2-3 tanesini göstereceğiz
      list = list.slice(0, 10);
      
      localStorage.setItem('maximora_recently_viewed', JSON.stringify(list));
    }

    // 3. Gösterim için şu anki ürünü listeden hariç tut ve ilk 2-3 taneyi al
    const displayList = currentProduct 
      ? list.filter((p: any) => p.id !== currentProduct.id).slice(0, 3)
      : list.slice(0, 3);

    setItems(displayList);
  }, [currentProduct]);

  if (items.length === 0) return null;

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Son Baktığınız Ürünler</h3>
      <div className={styles.grid}>
        {items.map((item) => (
          <Link href={`/product/${item.slug}`} key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.name} />
            </div>
            <div className={styles.info}>
              <h4 className={styles.itemName}>{item.name}</h4>
              <div className={styles.prices}>
                 <span className={styles.price}>{item.price.toFixed(2)} TL</span>
                 {item.oldPrice && <span className={styles.oldPrice}>{item.oldPrice.toFixed(2)} TL</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
