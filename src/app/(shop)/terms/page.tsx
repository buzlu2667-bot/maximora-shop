import React from 'react';
import { FileText, ShieldCheck, ShoppingBag, CreditCard, Truck, Scale, ExternalLink, AlertCircle, Mail } from 'lucide-react';

export default function TermsPage() {
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
            <FileText size={32} color="#d4af37" />
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: '800', 
            marginBottom: '15px',
            letterSpacing: '-0.02em'
          }}>Hizmet Şartları</h1>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>Son Güncelleme: 23 Nisan 2026</p>
        </header>

        <div style={{ display: 'grid', gap: '40px' }}>
          
          <section style={{ backgroundColor: '#111', padding: '30px', borderRadius: '24px', border: '1px solid #222' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', marginBottom: '20px', color: '#d4af37' }}>
              <ShieldCheck size={24} /> GENEL BAKIŞ
            </h2>
            <div style={{ lineHeight: '1.8', color: '#ccc', fontSize: '1.05rem' }}>
              <p>Maximora mağazasına hoş geldiniz. İşbu web sitesi ve çevrim içi mağaza www.maximorashop.com alan adı üzerinden işletilmektedir.</p>
              <p style={{ marginTop: '15px' }}>Bu Hizmet Şartları; web sitemizi ziyaret eden, kullanan veya mağazamız üzerinden alışveriş yapan tüm kullanıcılar için geçerlidir. Siteyi kullanarak işbu Hizmet Şartları’nı ve ilgili tüm politikaları kabul etmiş sayılırsınız.</p>
              <p style={{ marginTop: '15px' }}>Bu metin, yasal hak ve yükümlülüklerinize ilişkin önemli bilgiler içermektedir. Siteyi kullanmadan önce dikkatlice okunması tavsiye edilir.</p>
            </div>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#111', padding: '25px', borderRadius: '20px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>BÖLÜM 1 – ERİŞİM VE KULLANIM</h3>
              <p style={{ color: '#999', lineHeight: '1.6' }}>Web sitemizi kullanarak, yürürlükteki mevzuata göre reşit olduğunuzu ve siteyi yasal amaçlarla kullandığınızı beyan etmiş olursunuz. Bilgilerinizin doğruluğu sizin sorumluluğunuzdadır.</p>
            </div>
            <div style={{ backgroundColor: '#111', padding: '25px', borderRadius: '20px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>BÖLÜM 2 – ÜRÜNLER VE HİZMETLER</h3>
              <p style={{ color: '#999', lineHeight: '1.6' }}>Ürün görselleri teknik nedenlerle farklılık gösterebilir. Fiyatlar ve stok bilgileri önceden bildirim yapılmaksızın değiştirilebilir.</p>
            </div>
          </section>

          <section style={{ backgroundColor: '#111', padding: '30px', borderRadius: '24px', border: '1px solid #222' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', marginBottom: '20px', color: '#fff' }}>
              <ShoppingBag size={24} /> BÖLÜM 3 – SİPARİŞLER
            </h2>
            <p style={{ color: '#999', lineHeight: '1.8' }}>Verilen her sipariş bir satın alma teklifidir. Maximora, herhangi bir siparişi kabul etme veya reddetme hakkını saklı tutar. İptal talepleri ödeme onayı sonrası karşılanamayabilir.</p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#111', padding: '25px', borderRadius: '20px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>
                <CreditCard size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> BÖLÜM 4 – FİYATLAR
              </h3>
              <p style={{ color: '#999', lineHeight: '1.6' }}>Fiyatlar sipariş tarihindeki değerlerdir. Ek ücretler aksi belirtilmedikçe dahil değildir.</p>
            </div>
            <div style={{ backgroundColor: '#111', padding: '25px', borderRadius: '20px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>
                <Truck size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> BÖLÜM 5 – TESLİMAT
              </h3>
              <p style={{ color: '#999', lineHeight: '1.6' }}>Kargoya verildikten sonra sorumluluk firmaya geçer. Gecikmelerden Maximora sorumlu tutulamaz.</p>
            </div>
          </section>

          <section style={{ backgroundColor: '#111', padding: '30px', borderRadius: '24px', border: '1px solid #222' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', marginBottom: '20px', color: '#fff' }}>
              <Scale size={24} /> BÖLÜM 6 – FİKRİ MÜLKİYET
            </h2>
            <p style={{ color: '#999', lineHeight: '1.8' }}>Tüm içerikler, logolar ve tasarımlar Maximora markasına aittir. İzinsiz kopyalanması ve ticari kullanımı kesinlikle yasaktır.</p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#111', padding: '25px', borderRadius: '20px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>BÖLÜM 7 – BAĞLANTILAR</h3>
              <p style={{ color: '#999', lineHeight: '1.6' }}>Üçüncü taraf sitelerin içeriklerinden ve güvenliğinden Maximora sorumlu değildir.</p>
            </div>
            <div style={{ backgroundColor: '#111', padding: '25px', borderRadius: '20px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>BÖLÜM 8 – YASAKLI KULLANIM</h3>
              <p style={{ color: '#999', lineHeight: '1.6' }}>Yasa dışı veya başkalarının haklarını ihlal eden her türlü faaliyet yasaktır.</p>
            </div>
          </section>

          <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', padding: '40px', borderRadius: '30px', border: '1px dashed #d4af37', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#d4af37' }}>İLETİŞİM</h2>
            <p style={{ color: '#ccc', marginBottom: '20px' }}>Hizmet Şartları ile ilgili her türlü soru ve talepleriniz için:</p>
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
