"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

type ColorImageGroup = {
  colorName: string;
  files: { file: File; preview: string }[];
};

export default function AddProductPage() {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: 'Kadın Aksesuar',
    brand: 'Maximora',
    shopierUrl: '',
    stockCount: '10',
    colors: '',
    features: '',
    description: '',
    oldPrice: '',
    isFeatured: false,
    cart_discount_percent: '0'
  });

  const [badges, setBadges] = useState<{text: string, color: string}[]>([]);

  // Per-color image groups (when colors are set)
  const [colorGroups, setColorGroups] = useState<ColorImageGroup[]>([]);
  // Per-color Shopier links
  const [colorShopierLinks, setColorShopierLinks] = useState<Record<string, string>>({});
  // Per-color Stock counts
  const [colorStocks, setColorStocks] = useState<Record<string, string>>({});
  // Per-color Discounts
  const [colorDiscounts, setColorDiscounts] = useState<Record<string, string>>({});
  // Per-color Prices
  const [colorPrices, setColorPrices] = useState<Record<string, string>>({});
  const [colorOldPrices, setColorOldPrices] = useState<Record<string, string>>({});
  // Global images (when no colors set)
  const [globalImages, setGlobalImages] = useState<{ file: File; preview: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Renk alanı değişince per-color gruplarını güncelle (mevcut seçimleri koru)
  useEffect(() => {
    const parsedColors = productData.colors.split(',').map(c => c.trim()).filter(Boolean);
    setColorGroups(prev => {
      return parsedColors.map(colorName => {
        const existing = prev.find(g => g.colorName === colorName);
        return existing || { colorName, files: [] };
      });
    });
    // Shopier links için de aynı şekilde koru
    setColorShopierLinks(prev => {
      const next: Record<string, string> = {};
      parsedColors.forEach(c => { next[c] = prev[c] || ''; });
      return next;
    });
    // Stock counts
    setColorStocks(prev => {
      const next: Record<string, string> = {};
      parsedColors.forEach(c => { next[c] = prev[c] || '10'; });
      return next;
    });
    // Discounts
    setColorDiscounts(prev => {
      const next: Record<string, string> = {};
      parsedColors.forEach(c => { next[c] = prev[c] || '0'; });
      return next;
    });
    // Prices
    setColorPrices(prev => {
      const next: Record<string, string> = {};
      parsedColors.forEach(c => { next[c] = prev[c] || ''; });
      return next;
    });
    // Old Prices
    setColorOldPrices(prev => {
      const next: Record<string, string> = {};
      parsedColors.forEach(c => { next[c] = prev[c] || ''; });
      return next;
    });
  }, [productData.colors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setProductData({ ...productData, [name]: checked });
    } else if (name === 'category') {
      let newBrand = productData.brand;
      if (value === 'Kadın Aksesuar') newBrand = 'Maximora';
      if (value === 'Erkek Aksesuar') newBrand = 'canta';
      if (value === 'Akıllı Saatler') newBrand = 'haino-teko';
      setProductData({ ...productData, category: value, brand: newBrand });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleAddBadge = () => {
    setBadges([...badges, { text: '', color: '#111111' }]);
  };

  const handleRemoveBadge = (index: number) => {
    setBadges(badges.filter((_, i) => i !== index));
  };

  const handleBadgeChange = (index: number, field: 'text' | 'color', value: string) => {
    const newBadges = [...badges];
    newBadges[index][field] = value;
    setBadges(newBadges);
  };

  const addFilesToColorGroup = (colorName: string, files: FileList) => {
    const newImages = Array.from(files).map(file => ({ file, preview: URL.createObjectURL(file) }));
    setColorGroups(prev => prev.map(g =>
      g.colorName === colorName ? { ...g, files: [...g.files, ...newImages] } : g
    ));
  };

  const removeFromColorGroup = (colorName: string, idx: number) => {
    setColorGroups(prev => prev.map(g =>
      g.colorName === colorName ? { ...g, files: g.files.filter((_, i) => i !== idx) } : g
    ));
  };

  const moveInColorGroup = (colorName: string, idx: number, dir: 'left' | 'right') => {
    setColorGroups(prev => prev.map(g => {
      if (g.colorName !== colorName) return g;
      const arr = [...g.files];
      const target = dir === 'left' ? idx - 1 : idx + 1;
      if (target < 0 || target >= arr.length) return g;
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return { ...g, files: arr };
    }));
  };

  const uploadFiles = async (files: { file: File }[]): Promise<string[]> => {
    if (files.length === 0) return [];
    const formData = new FormData();
    files.forEach(f => formData.append('files', f.file));
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Resimler yüklenemedi.');
    const data = await res.json();
    return data.urls as string[];
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const parsedColors = productData.colors.split(',').map(c => c.trim()).filter(Boolean);
      const parsedFeatures = productData.features.split(',').map(f => f.trim()).filter(Boolean);
      const stockNum = parseInt(productData.stockCount, 10);

      let finalImages: string[] = [];
      let imageGroups: Record<string, string[]> = {};

      if (parsedColors.length > 0) {
        // Her renk için ayrı upload
        for (const group of colorGroups) {
          const urls = await uploadFiles(group.files);
          if (urls.length > 0) {
            imageGroups[group.colorName] = urls;
            finalImages.push(...urls);
          }
        }
      } else {
        // Renk yok, global upload
        finalImages = await uploadFiles(globalImages);
      }

      const hasImageGroups = Object.keys(imageGroups).length > 0;
      const hasShopierLinks = Object.values(colorShopierLinks).some(v => !!v);
      // Temiz shopierLinks (sadece dolu olanlar)
      const cleanShopierLinks = Object.fromEntries(
        Object.entries(colorShopierLinks).filter(([, v]) => !!v)
      );

      // Stock counts (sayıya çevir)
      let calculatedTotalStock = 0;
      const parsedStockCounts: Record<string, number> = {};
      Object.entries(colorStocks).forEach(([color, stock]) => {
        const s = parseInt(stock, 10) || 0;
        parsedStockCounts[color] = s;
        calculatedTotalStock += s;
      });

      const finalStockCount = parsedColors.length > 0 ? calculatedTotalStock : stockNum;

      // Discount rates (sayıya çevir)
      const parsedDiscountRates: Record<string, number> = {};
      Object.entries(colorDiscounts).forEach(([color, discount]) => {
        parsedDiscountRates[color] = parseInt(discount, 10) || 0;
      });

      // Variant Prices
      const parsedVariantPrices: Record<string, number> = {};
      Object.entries(colorPrices).forEach(([color, price]) => {
        if (price) parsedVariantPrices[color] = parseFloat(price);
      });

      const parsedVariantOldPrices: Record<string, number> = {};
      Object.entries(colorOldPrices).forEach(([color, oldPrice]) => {
        if (oldPrice) parsedVariantOldPrices[color] = parseFloat(oldPrice);
      });

      const dbPayload = {
        name: productData.name,
        price: parseFloat(productData.price),
        category: productData.category,
        brand: productData.brand,
        description: productData.description || 'Admin panelinden yeni eklenen lüks ürün.',
        images: finalImages.length > 0 ? finalImages : [
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80'
        ],
        inStock: finalStockCount > 0,
        stockCount: finalStockCount,
        // Eğer renk linki yoksa global shopierUrl kullan
        shopierUrl: parsedColors.length === 0 ? (productData.shopierUrl || undefined) : undefined,
        features: parsedFeatures.length > 0 ? parsedFeatures : undefined,
        variants: parsedColors.length > 0 ? [{
          id: 'color',
          name: 'Renk',
          options: parsedColors,
          ...(hasImageGroups && { imageGroups }),
          ...(hasShopierLinks && { shopierLinks: cleanShopierLinks }),
          stockCounts: parsedStockCounts,
          discountRates: parsedDiscountRates,
          variantPrices: Object.keys(parsedVariantPrices).length > 0 ? parsedVariantPrices : undefined,
          variantOldPrices: Object.keys(parsedVariantOldPrices).length > 0 ? parsedVariantOldPrices : undefined
        }] : undefined,
        badges: badges.filter(b => b.text.trim() !== ''),
        oldPrice: productData.oldPrice ? parseFloat(productData.oldPrice) : undefined,
        isFeatured: productData.isFeatured,
        cart_discount_percent: parseInt(productData.cart_discount_percent, 10) || 0
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbPayload)
      });

      if (!res.ok) throw new Error('API hatası');

      toast.success('Ürün başarıyla eklendi!');
      setProductData({ name: '', price: '', category: 'Kadın Aksesuar', brand: 'Maximora', shopierUrl: '', stockCount: '10', colors: '', features: '', description: '', oldPrice: '', isFeatured: false, cart_discount_percent: '0' });
      setBadges([]);
      setColorGroups([]);
      setGlobalImages([]);

    } catch (error: any) {
      toast.error(error.message || 'Ürün eklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const parsedColors = productData.colors.split(',').map(c => c.trim()).filter(Boolean);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '1rem' }}>Yeni Ürün Ekle</h1>
      <p style={{ color: '#555', marginBottom: '2rem' }}>Her renk için ayrı fotoğraf yükleyin — müşteri renk seçince sadece o rengin görselleri gözükür.</p>

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Ad + Fiyat */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Ürün Adı</label>
              <input type="text" name="name" value={productData.name} onChange={handleChange} required placeholder="Örn: Siyah Bez Çanta" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Fiyat (TL)</label>
              <input type="number" name="price" value={productData.price} onChange={handleChange} required placeholder="250" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
          </div>

          {/* Kategori + Marka */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Kategori</label>
              <select name="category" value={productData.category} onChange={(e: any) => handleChange(e)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white' }}>
                <option value="Kadın Aksesuar">Kadın Aksesuar</option>
                <option value="Erkek Aksesuar">Erkek Aksesuar</option>
                <option value="Akıllı Saatler">Akıllı Saatler</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Marka / Tür</label>
              <select name="brand" value={productData.brand} onChange={(e: any) => handleChange(e)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white' }}>
                {productData.category === 'Kadın Aksesuar' && (<><option value="Maximora">Maximora</option><option value="Beymen">Beymen</option><option value="Vakko">Vakko</option></>)}
                {productData.category === 'Erkek Aksesuar' && <option value="canta">Çanta</option>}
                {productData.category === 'Akıllı Saatler' && <option value="haino-teko">Haino Teko Serisi</option>}
              </select>
            </div>
          </div>

          {/* Renkler */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Renk Seçenekleri (Virgülle ayırın)</label>
              <input type="text" name="colors" value={productData.colors} onChange={handleChange} placeholder="Örn: Siyah, Mavi, Kırmızı" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
              <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>Her renk için aşağıda ayrı fotoğraf ve stok alanı açılacaktır.</p>
            </div>
          </div>

          {/* Açıklama */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Açıklama</label>
            <textarea name="description" value={productData.description} onChange={(e: any) => handleChange(e)} rows={3} placeholder="Ürün hikayesi..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }} />
          </div>

          {/* Özellikler */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Özellikler (Virgülle Ayırın)</label>
            <input type="text" name="features" value={productData.features} onChange={handleChange} placeholder="Hakiki Deri, %100 El Emeği, Gizli fermuar" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>

          {/* Eski Fiyat ve Sepet İndirimi */}
          <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Eski Fiyat (Üstü Çizili)</label>
              <input type="number" name="oldPrice" value={productData.oldPrice} onChange={handleChange} placeholder="Örn: 500" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#10b981', fontWeight: 600 }}>Özel Sepet İndirimi (%)</label>
              <input type="number" name="cart_discount_percent" value={productData.cart_discount_percent} onChange={handleChange} min="0" max="100" placeholder="0" style={{ width: '100%', padding: '0.75rem', border: '1px solid #10b981', borderRadius: '4px', fontWeight: 'bold' }} />
            </div>
          </div>

          {/* Rozetler */}
          <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.875rem', color: '#666', fontWeight: 600 }}>Özel Rozetler</label>
              <button type="button" onClick={handleAddBadge} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', backgroundColor: '#eef2ff', color: '#4f46e5', border: '1px solid #c7d2fe', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                + Yeni Rozet Ekle
              </button>
            </div>
            {badges.length === 0 ? (
              <p style={{ fontSize: '0.8rem', color: '#888' }}>Henüz rozet eklenmedi.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {badges.map((badge, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <input type="text" value={badge.text} onChange={e => handleBadgeChange(idx, 'text', e.target.value)} placeholder="Örn: YENİ, TÜKENDİ" style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.875rem' }} />
                    </div>
                    <div style={{ width: '60px' }}>
                      <input type="color" value={badge.color} onChange={e => handleBadgeChange(idx, 'color', e.target.value)} style={{ width: '100%', height: '38px', padding: '0.2rem', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }} />
                    </div>
                    <button type="button" onClick={() => handleRemoveBadge(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '1.2rem', cursor: 'pointer', padding: '0 0.5rem' }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Öne Çıkan */}
          <div style={{ border: '2px solid #d4af37', borderRadius: '8px', padding: '1rem', backgroundColor: '#fffdf5', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input type="checkbox" id="isFeatured" name="isFeatured" checked={productData.isFeatured} onChange={handleChange} style={{ width: '20px', height: '20px' }} />
            <div>
              <label htmlFor="isFeatured" style={{ display: 'block', fontWeight: 600, color: '#333', cursor: 'pointer' }}>Öne Çıkan Koleksiyon Ürünü</label>
              <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>Ana sayfadaki vitrin bölümünde sergilenir.</p>
            </div>
          </div>

          {/* ========== GÖRSELLER ========== */}
          <div style={{ borderTop: '2px solid #eee', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem', color: '#111' }}>Görseller</h3>

            {parsedColors.length > 0 ? (
              // Her renk için ayrı bölüm
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                {colorGroups.map(group => (
                  <div key={group.colorName} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#111', display: 'inline-block' }} />
                      <label style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111' }}>{group.colorName}</label>
                    </div>

                    {/* Shopier linki */}
                    <div style={{ marginBottom: '0.75rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#047857', fontWeight: 600, marginBottom: '0.3rem' }}>
                        {group.colorName} — Shopier Linki
                      </label>
                      <input
                        type="url"
                        placeholder={`https://shopier.com/${group.colorName.toLowerCase()}-canta`}
                        value={colorShopierLinks[group.colorName] || ''}
                        onChange={e => setColorShopierLinks(prev => ({ ...prev, [group.colorName]: e.target.value }))}
                        style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem' }}
                      />
                    </div>

                    {/* Stok adedi ve İndirim */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#111', fontWeight: 600, marginBottom: '0.3rem' }}>Stok Adedi</label>
                        <input
                          type="number"
                          placeholder="10"
                          value={colorStocks[group.colorName] || ''}
                          onChange={e => setColorStocks(prev => ({ ...prev, [group.colorName]: e.target.value }))}
                          style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem' }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#10b981', fontWeight: 600, marginBottom: '0.3rem' }}>Sepet İndirimi (%)</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={colorDiscounts[group.colorName] || ''}
                          onChange={e => setColorDiscounts(prev => ({ ...prev, [group.colorName]: e.target.value }))}
                          style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #10b981', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 'bold' }}
                        />
                      </div>
                    </div>

                    {/* Fiyat ve Eski Fiyat */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#3b82f6', fontWeight: 600, marginBottom: '0.3rem' }}>Özel Fiyat (TL)</label>
                        <input
                          type="number"
                          placeholder="Örn: 1500"
                          value={colorPrices[group.colorName] || ''}
                          onChange={e => setColorPrices(prev => ({ ...prev, [group.colorName]: e.target.value }))}
                          style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #3b82f6', borderRadius: '4px', fontSize: '0.875rem' }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', fontWeight: 600, marginBottom: '0.3rem' }}>Özel Eski Fiyat (TL)</label>
                        <input
                          type="number"
                          placeholder="Örn: 1800"
                          value={colorOldPrices[group.colorName] || ''}
                          onChange={e => setColorOldPrices(prev => ({ ...prev, [group.colorName]: e.target.value }))}
                          style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem' }}
                        />
                      </div>
                    </div>

                    {/* Fotoğlar başlık */}
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', fontWeight: 500, marginBottom: '0.3rem' }}>
                      {group.colorName} — Fotoğraflar
                    </label>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={e => { if (e.target.files) addFilesToColorGroup(group.colorName, e.target.files); }}
                      style={{ width: '100%', padding: '0.75rem', border: '2px dashed #d1d5db', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fafafa', marginBottom: '0.75rem' }}
                    />

                    {group.files.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {group.files.map((img, idx) => (
                          <div key={idx} style={{ position: 'relative', width: '90px', height: '90px', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
                            <img src={img.preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button type="button" onClick={() => removeFromColorGroup(group.colorName, idx)} style={{ position: 'absolute', top: 2, right: 2, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: 18, height: 18, fontSize: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.5)', padding: '2px 4px' }}>
                              <button type="button" onClick={() => moveInColorGroup(group.colorName, idx, 'left')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '11px' }}>◀</button>
                              <span style={{ color: 'white', fontSize: '10px' }}>{idx + 1}</span>
                              <button type="button" onClick={() => moveInColorGroup(group.colorName, idx, 'right')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '11px' }}>▶</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // Renk yok → global upload
              <div style={{ marginTop: '0.75rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>İstediğiniz kadar görsel seçebilirsiniz.</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={e => {
                    if (e.target.files) {
                      const newImgs = Array.from(e.target.files).map(file => ({ file, preview: URL.createObjectURL(file) }));
                      setGlobalImages(prev => [...prev, ...newImgs]);
                    }
                  }}
                  style={{ width: '100%', padding: '1rem', border: '2px dashed #bbb', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fafafa' }}
                />
                {globalImages.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                    {globalImages.map((img, idx) => (
                      <div key={idx} style={{ position: 'relative', width: '90px', height: '90px', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
                        <img src={img.preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button type="button" onClick={() => setGlobalImages(prev => prev.filter((_, i) => i !== idx))} style={{ position: 'absolute', top: 2, right: 2, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: 18, height: 18, fontSize: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Shopier */}
          <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#047857', fontWeight: 600 }}>Shopier Ödeme Linki</label>
            <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>Eklerseniz müşteri Checkout'ta Shopier butonunu da görebilir.</p>
            <input type="url" name="shopierUrl" value={productData.shopierUrl} onChange={handleChange} placeholder="https://shopier.com/..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}>
            {isLoading ? 'Ekleniyor...' : 'Koleksiyona Ekle'}
          </button>
        </form>
      </div>
    </div>
  );
}
