"use client";

import React from 'react';
import styles from '../Legal.module.css';

export default function GizlilikPolitikasiPage() {
  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Gizlilik <span className={styles.goldText}>Politikası</span></h1>
        <div className={styles.lastUpdated}>Son Güncelleme: 18 Ağustos 2026</div>
        
        <div className={styles.textContent}>
          <p>
            Maximora Studio ("Şirket", "Biz" veya "Bizi") olarak, web sitemizi ziyaret eden tüm kullanıcıların, müşterilerimizin 
            ve iş ortaklarımızın kişisel verilerinin korunmasına, gizlilik haklarına ve bilgi güvenliğine en üst düzeyde hassasiyet 
            göstermekteyiz. İşbu Gizlilik Politikası, tarafımızla paylaştığınız bilgilerin hangi amaçlarla toplandığını, nasıl korunduğunu 
            ve kimlerle paylaşılabileceğini şeffaf bir biçimde açıklamaktadır.
          </p>

          <h2>1. Toplanan Veri Kategorileri ve Toplama Yöntemleri</h2>
          <p>Hizmet kalitemizi artırmak ve size kesintisiz bir dijital deneyim sunmak amacıyla, sitemizi kullanımınız sırasında veya 
            bizimle kurduğunuz doğrudan iletişimlerde çeşitli veriler toplamaktayız:</p>
          <ul>
            <li><strong>Kimlik ve İletişim Verileri:</strong> Teklif formları, iletişim formları veya canlı destek modülü (Zoho SalesIQ) üzerinden 
            gönüllü olarak bizimle paylaştığınız ad, soyad, e-posta adresi, telefon numarası ve kurum/şirket ünvanı bilgileri.</li>
            <li><strong>Teknik ve Analitik Veriler:</strong> Web sitemizi ziyaretiniz sırasında log kayıtları (sunucu günlükleri) ve analitik 
            araçlar vasıtasıyla otomatik olarak alınan IP adresiniz, işletim sisteminiz, tarayıcı türünüz, cihaz çözünürlüğünüz, sitede 
            geçirdiğiniz süre ve sayfa gezinme hareketleriniz.</li>
            <li><strong>Müşteri İşlem ve Finansal Veriler:</strong> Bizimle bir sözleşme imzalayıp hizmet (web tasarım, yazılım, e-ticaret) satın 
            aldığınızda, yasal faturalandırma zorunlulukları gereği toplanan vergi numarası, vergi dairesi ve ödeme bilgileri (kredi kartı 
            verileriniz kendi sistemlerimizde kesinlikle saklanmaz, lisanslı ödeme kuruluşlarının altyapısı kullanılır).</li>
          </ul>

          <h2>2. Verilerin İşlenme Amaçları</h2>
          <p>Topladığımız tüm kişisel veriler, tamamen size daha iyi hizmet verebilmek ve yasal mevzuatlara uymak amacıyla aşağıdaki 
            nedenlerle işlenmektedir:</p>
          <ul>
            <li>Tarafınızca gönderilen teklif taleplerini incelemek ve doğru fiyatlandırma sunmak,</li>
            <li>Satın alınan yazılım ürünlerinin kurulumunu yapmak ve satış sonrası 7/24 teknik desteği sürdürebilmek,</li>
            <li>Olası siber saldırıları, dolandırıcılık veya hukuka aykırı erişim denemelerini tespit edip engellemek,</li>
            <li>Şirket içi operasyonel denetimleri yapmak, web sitesi arayüzünü (UX/UI) optimize etmek,</li>
            <li>Sadece sizin onay vermeniz durumunda (Açık Rıza kapsamında), yeni hizmetlerimiz, indirim kampanyalarımız veya 
            yazılım güncellemelerimiz hakkında bülten (newsletter) gönderimi yapmak.</li>
          </ul>

          <h2>3. Bilgilerin Korunması, Veri Güvenliği ve Saklanma Süresi</h2>
          <p>
            Maximora Studio, topladığı kişisel verileri endüstri standartlarında SSL şifreleme algoritmaları, güvenlik duvarları (firewall) 
            ve güvenli bulut mimarileri (secure cloud environments) kullanarak yetkisiz erişime, kaybolmaya, değiştirilmeye veya ifşa 
            edilmeye karşı sıkı bir şekilde korur. Sadece işin ifası için verilere ulaşması zorunlu olan yetkili personelimiz (yazılım 
            mühendislerimiz veya destek ekibimiz) sistemlere erişebilir. Verileriniz, yasal mevzuatta öngörülen saklama süreleri boyunca 
            veya işlenme amacının gerektirdiği süre kadar sistemlerimizde tutulur, sonrasında güvenli yöntemlerle imha edilir veya anonimleştirilir.
          </p>

          <h2>4. Bilgilerin Üçüncü Kişilerle Paylaşılması (Veri Aktarımı)</h2>
          <p>
            Müşterilerimize ait hiçbir kişisel veya kurumsal veri kesinlikle ticari bir menfaat karşılığında (reklam ajansları, pazarlama şirketleri vb.) 
            satılamaz, kiralanamaz veya devredilemez. Ancak aşağıdaki sınırlı durumlarda bilgi paylaşımı söz konusu olabilir:
          </p>
          <ul>
            <li>Resmi yasal makamlardan (mahkemeler, savcılık vb.) usulüne uygun ve geçerli bir hukuki talep gelmesi durumunda,</li>
            <li>Size sağladığımız hizmetin teknik bir gerekliliği olarak altyapı tedarikçilerimizle (örneğin sunucu barındırma hizmeti alınan veri merkezleri, 
            e-fatura entegratörleri, kargo/SMS altyapı sağlayıcıları) gizlilik sözleşmeleri (NDA) kapsamında,</li>
            <li>Hukuki haklarımızı savunmak veya yasal bir uyuşmazlığı çözmek amacıyla sözleşmeli hukuk büromuzla.</li>
          </ul>

          <h2>5. Çerezler (Cookies) ve İzleme Teknolojileri</h2>
          <p>
            Sitemizde deneyiminizi iyileştirmek, sayfalar arası geçişlerinizi hızlandırmak ve ziyaretçi istatistiklerini ölçmek amacıyla "çerezler" (küçük metin 
            dosyaları) kullanılmaktadır. Zorunlu çerezler sitenin çalışması için şarttır. Analitik çerezler ise anonim olarak kullanıcı davranışlarını ölçer. 
            Tarayıcı ayarlarınız üzerinden tüm çerezleri engelleyebilir veya silebilirsiniz. Ancak çerezleri reddetmeniz durumunda, sitenin bazı 
            fonksiyonları (örneğin canlı destek penceresi veya formlar) tam performansla çalışmayabilir.
          </p>

          <h2>6. Üçüncü Taraf Bağlantıları ve Sorumluluk Reddi</h2>
          <p>
            Web sitemiz içerisinde referanslarımızı veya projelerimizi göstermek amacıyla farklı web sitelerine ait harici linkler yer alabilir. Maximora Studio, 
            bu harici sitelerin güvenlik prosedürlerinden, gizlilik politikalarından veya sundukları içeriklerden hiçbir koşulda sorumlu tutulamaz. Ziyaret ettiğiniz 
            diğer sitelerin kendi gizlilik sözleşmelerini incelemenizi tavsiye ederiz.
          </p>

          <h2>7. Politika Güncellemeleri ve İletişim</h2>
          <p>
            Dijital dünyadaki yenilikler ve veri koruma mevzuatındaki (KVKK/GDPR vb.) olası güncellemeler doğrultusunda, Maximora Studio işbu Gizlilik 
            Politikası'nı dilediği zaman değiştirme veya yenileme hakkına sahiptir. Değişiklikler sitede yayımlandığı andan itibaren yürürlüğe girer.
          </p>
          <p>
            Gizlilik Politikamızla ilgili her türlü soru, görüş ve Veri İmhacısı talepleriniz için 
            <strong> destek@maximorashop.com</strong> e-posta adresi üzerinden veri güvenlik sorumlumuzla 7/24 iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
