import React from 'react';
import { Gavel, ShieldCheck, Scale, FileText, ShoppingBag, Truck, CreditCard, RotateCcw, AlertCircle, Mail } from 'lucide-react';

export default function LegalNoticePage() {
  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '100px 20px 60px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '12px', 
            borderRadius: '16px', 
            backgroundColor: 'rgba(212, 175, 55, 0.1)', 
            marginBottom: '20px' 
          }}>
            <Gavel size={32} color="#d4af37" />
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: '800', 
            marginBottom: '15px',
            letterSpacing: '-0.02em'
          }}>Yasal Bildirim</h1>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>Telif Hakları ve Mesafeli Satış Sözleşmesi</p>
        </header>

        <div style={{ display: 'grid', gap: '40px' }}>
          
          {/* Yasal Bildirim Bölümü */}
          <section style={{ backgroundColor: '#111', padding: '40px', borderRadius: '30px', border: '1px solid #222' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.6rem', marginBottom: '25px', color: '#d4af37' }}>
              <ShieldCheck size={26} /> YASAL BİLDİRİM
            </h2>
            <div style={{ lineHeight: '1.8', color: '#ccc', fontSize: '1.05rem' }}>
              <p>Bu web sitesinde yer alan tüm içerikler, tasarımlar, görseller, metinler ve logolar <strong>MaximoraShop</strong>’a aittir.</p>
              <p style={{ marginTop: '15px' }}>5846 sayılı Fikir ve Sanat Eserleri Kanunu kapsamında korunmaktadır. İzinsiz olarak kopyalanması, çoğaltılması, yayınlanması veya kullanılması yasaktır. Tüm hakları saklıdır.</p>
              <p style={{ marginTop: '15px' }}>İşbu site ve içerikleri ile ilgili uyuşmazlıklarda Türkiye Cumhuriyeti mevzuatı uygulanır.</p>
            </div>
          </section>

          {/* Mesafeli Satış Sözleşmesi Başlığı */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Mesafeli Satış Sözleşmesi
            </h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: '#d4af37', margin: '20px auto' }}></div>
          </div>

          {/* Sözleşme Maddeleri */}
          <div style={{ display: 'grid', gap: '20px' }}>
            
            <section style={{ backgroundColor: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Scale size={20} color="#d4af37" /> MADDE 1 – TARAFLAR VE KONU
              </h3>
              <p style={{ color: '#999', lineHeight: '1.7' }}>İşbu sözleşme, www.maximorashop.com internet sitesi üzerinden alışveriş yapan tüketici ile MaximoraShop arasında, mesafeli satışa konu ürünlerin satışı ve teslimine ilişkin olarak düzenlenmiştir. 6502 sayılı Tüketicinin Korunması Hakkında Kanun'a uygundur.</p>
            </section>

            <section style={{ backgroundColor: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={20} color="#d4af37" /> MADDE 2 – ÜRÜN VE SİPARİŞ
              </h3>
              <p style={{ color: '#999', lineHeight: '1.7' }}>Ürünün türü, adedi, satış bedeli ve ödeme şekli sipariş sırasında kullanıcıya sunulan bilgiler doğrultusunda belirlenir.</p>
            </section>

            <section style={{ backgroundColor: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={20} color="#d4af37" /> MADDE 3 – TESLİMAT
              </h3>
              <p style={{ color: '#999', lineHeight: '1.7' }}>Ürünler, ödeme onayından sonra en geç 30 gün içerisinde alıcının belirttiği adrese teslim edilir. Hasarlı ürünler teslim alınmamalıdır.</p>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <section style={{ backgroundColor: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CreditCard size={20} color="#d4af37" /> MADDE 4 – ÖDEME
                </h3>
                <p style={{ color: '#999', lineHeight: '1.7' }}>Ödemeler, web sitesi üzerinden sunulan güvenli ödeme altyapıları aracılığıyla gerçekleştirilir.</p>
              </section>

              <section style={{ backgroundColor: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <RotateCcw size={20} color="#d4af37" /> MADDE 5 – CAYMA HAKKI
                </h3>
                <p style={{ color: '#999', lineHeight: '1.7' }}>Tüketici, teslim aldığı tarihten itibaren 14 gün içerisinde cayma hakkına sahiptir. Kişiye özel ürünlerde bu hak bulunmamaktadır.</p>
              </section>
            </div>

            <section style={{ backgroundColor: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>MADDE 6 – İADE VE BEDEL İADESİ</h3>
              <p style={{ color: '#999', lineHeight: '1.7' }}>İadesi onaylanan ürünlerin bedeli, 14 gün içerisinde müşteriye iade edilir. İşlemler İade Politikası kapsamında yürütülür.</p>
            </section>

            <section style={{ backgroundColor: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>MADDE 7 & 8 – SORUMLULUK VE HUKUK</h3>
              <p style={{ color: '#999', lineHeight: '1.7' }}>MaximoraShop, kargo kaynaklı gecikmelerden sorumlu tutulamaz. Uyuşmazlıklarda Türkiye Cumhuriyeti mevzuatı geçerlidir.</p>
            </section>
          </div>

          {/* Footer Contact */}
          <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', padding: '40px', borderRadius: '30px', border: '1px dashed #d4af37', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#d4af37' }}>YASAL İLETİŞİM</h2>
            <p style={{ color: '#ccc', marginBottom: '20px' }}>Sözleşme ve yasal süreçlerle ilgili sorularınız için:</p>
            <a href="mailto:destek@maximorashop.com" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              backgroundColor: '#d4af37', 
              color: '#000', 
              padding: '12px 30px', 
              borderRadius: '12px', 
              textDecoration: 'none',
              fontWeight: '700'
            }}>
              <Mail size={20} /> destek@maximorashop.com
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
