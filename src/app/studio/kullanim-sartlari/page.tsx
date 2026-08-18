"use client";

import React from 'react';
import styles from '../Legal.module.css';

export default function KullanimSartlariPage() {
  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Kullanım <span className={styles.goldText}>Şartları</span></h1>
        <div className={styles.lastUpdated}>Son Güncelleme: 18 Ağustos 2026</div>
        
        <div className={styles.textContent}>
          <p>
            Lütfen Maximora Studio ("Şirket", "Biz" veya "Ajans") tarafından sunulan web sitesini ve hizmetleri kullanmadan önce işbu 
            Kullanım Şartları'nı ("Sözleşme") dikkatlice okuyunuz. Web sitemizi ziyaret ederek, hizmetlerimizden faydalanarak veya 
            herhangi bir dijital ürün siparişi vererek bu şartların tamamını kayıtsız şartsız kabul etmiş sayılırsınız. Şartları 
            kabul etmiyorsanız, hizmetlerimizi kullanmayı derhal sonlandırmalısınız.
          </p>

          <h2>1. Taraflar ve Hizmet Kapsamı</h2>
          <p>
            İşbu sözleşme, dijital hizmetler, web tasarımı, e-ticaret sistemleri, mobil uygulama geliştirme ve teknik SEO hizmetleri 
            sunan Maximora Studio ile bu hizmetleri satın alan veya kullanan kişi/kurum ("Müşteri") arasında akdedilmiştir. Sunulan tüm 
            hizmetlerin teknik detayları, teslimat süreleri ve revizyon hakları, taraflar arasında yapılacak ek bir hizmet onay sözleşmesi 
            ile belirlenir. Web sitemizde yer alan paket içerikleri genel bilgilendirme amaçlıdır ve bağlayıcılığı projeye özel 
            sözleşmeyle netlik kazanır.
          </p>

          <h2>2. Fikri Mülkiyet ve Lisans Hakları</h2>
          <p>
            Maximora Studio tarafından sıfırdan geliştirilen yazılımların, temaların, arayüz tasarımlarının ve entegre edilen özel modüllerin 
            kaynak kod mülkiyeti ve telif hakları (5846 sayılı Fikir ve Sanat Eserleri Kanunu uyarınca) Maximora Studio'ya aittir. Müşteriye 
            teslim edilen proje, aksi yazılı olarak belirtilmedikçe yalnızca müşterinin kullanımına tahsis edilmiş "kullanım lisansı" (End-User 
            License) niteliğindedir. Müşteri, projeyi kopyalayamaz, çoğaltamaz, kaynak kodlarını üçüncü şahıslara satamaz veya başka bir alan 
            adına (domain) izinsiz taşıyamaz.
          </p>

          <h2>3. Müşteri Yükümlülükleri ve Sorumluluk Reddi</h2>
          <p>
            Proje geliştirme sürecinde, web sitesinde veya mobil uygulamada kullanılmak üzere Müşteri tarafından sağlanan tüm metin, fotoğraf, 
            logo, video, ürün bilgisi ve diğer görsel/işitsel materyallerin telif hakkı ihlallerinden doğabilecek her türlü hukuki ve cezai 
            sorumluluk tamamen Müşteri'ye aittir. Maximora Studio, Müşteri'nin ilettiği içeriklerin telif haklarını araştırmakla yükümlü değildir.
          </p>
          <p>
            Yasa dışı kumar, bahis, telif hakkı ihlali, müstehcenlik veya Türkiye Cumhuriyeti yasalarına aykırı herhangi bir içeriğin yayınlanması 
            durumunda, Maximora Studio projeyi derhal askıya alma ve sözleşmeyi tek taraflı feshetme hakkını saklı tutar.
          </p>

          <h2>4. Sorumluluk Sınırlandırması ve Üçüncü Taraf Hizmetleri</h2>
          <p>
            Maximora Studio, geliştirdiği yazılımları en yüksek kod standartlarında (clean code) teslim etmeyi taahhüt eder. Ancak, dijital ekosistemin 
            doğası gereği doğabilecek aşağıdaki durumlardan Şirketimiz sorumlu tutulamaz:
          </p>
          <ul>
            <li>Hosting (sunucu) sağlayıcılarından, veri merkezlerinden veya bölgesel ağ kesintilerinden kaynaklanan erişim sorunları,</li>
            <li>Üçüncü taraf API'lerinin (Ödeme sistemleri, kargo entegrasyonları, SMS panelleri) çalışmamasından doğan ticari kayıplar,</li>
            <li>Siber saldırılar, DDoS atakları, sunucu hacklenmeleri veya virüs bulaşması sonucu oluşabilecek veri kayıpları,</li>
            <li>Müşteri'nin kendisine teslim edilen şifreleri üçüncü şahıslarla paylaşması veya yönetim panelinde yaptığı hatalı silme/değiştirme işlemleri.</li>
          </ul>

          <h2>5. İptal ve İade Koşulları</h2>
          <p>
            Yazılım hizmetleri, 6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca "anında ifa edilen hizmetler ve elektronik ortamda anında teslim 
            edilen gayrimaddi mallar" statüsündedir. Bu nedenle, tasarım ve kodlama sürecine başlanmış, kurulumu yapılmış veya kaynak kodları oluşturulmuş 
            projelerde ücret iadesi (cayma hakkı) bulunmamaktadır. Altyapı kurulumu gerçekleşmeden önce yapılan iptal talepleri, ajansın iş gücü kaybı 
            kesilerek değerlendirilir.
          </p>

          <h2>6. Mücbir Sebepler</h2>
          <p>
            Doğal afetler, savaş, seferberlik, yangın, grev, lokavt, internet altyapısındaki genel arızalar, siber terörizm veya hükümet kararları gibi 
            tarafların kontrolü dışında gelişen mücbir sebep durumlarında, Maximora Studio taahhüt ettiği hizmetleri askıya alabilir veya teslim süresini 
            uzatabilir. Bu süreçte doğacak gecikmelerden dolayı Şirket sorumlu tutulamaz ve Müşteri tazminat talep edemez.
          </p>

          <h2>7. Uyuşmazlıkların Çözümü ve Yetkili Mahkeme</h2>
          <p>
            İşbu Kullanım Şartları'nın uygulanmasından, yorumlanmasından veya taraflar arasında doğabilecek her türlü hukuki ticari uyuşmazlığın çözümünde 
            Türkiye Cumhuriyeti kanunları uygulanacaktır. Çözülemeyen ihtilaflarda İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri kesin yetkilidir.
          </p>

          <h2>8. Değişiklik ve Kabul</h2>
          <p>
            Maximora Studio, gelişen teknolojiler, yasal düzenlemeler veya şirket politikaları gereğince önceden haber vermeksizin işbu kullanım şartlarında 
            değişiklik yapma hakkını saklı tutar. Yapılan güncellemeler, web sitesinde yayınlandığı andan itibaren tüm müşteriler için bağlayıcı ve geçerli kabul edilir.
          </p>
        </div>
      </div>
    </div>
  );
}
