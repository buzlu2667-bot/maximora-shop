"use client";

import React from 'react';
import styles from '../Legal.module.css';

export default function KvkkPage() {
  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>KVKK <span className={styles.goldText}>Aydınlatma Metni</span></h1>
        <div className={styles.lastUpdated}>Son Güncelleme: 18 Ağustos 2026</div>
        
        <div className={styles.textContent}>
          <p>
            Veri Sorumlusu sıfatıyla Maximora Studio olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") 
            kapsamında kişisel verilerinizin işlenmesi, korunması ve haklarınız konusunda sizi bilgilendirmek isteriz.
          </p>

          <h2>1. Kişisel Verilerin İşlenme Amacı</h2>
          <p>Topladığımız kişisel verileriniz, aşağıda belirtilen amaçlar doğrultusunda işlenmektedir:</p>
          <ul>
            <li>Dijital ajans hizmetlerimizin (web tasarım, yazılım, SEO) sunulabilmesi ve sözleşme süreçlerinin yürütülmesi,</li>
            <li>Müşteri kayıtlarının oluşturulması ve faturalandırma işlemlerinin yapılması,</li>
            <li>Canlı destek veya iletişim formları üzerinden gelen taleplerinizin yanıtlanması,</li>
            <li>Hizmetlerimizle ilgili yeniliklerin ve size özel tekliflerin (açık rızanız halinde) iletilmesi.</li>
          </ul>

          <h2>2. İşlenen Kişisel Verileriniz</h2>
          <p>
            Tarafımızca ağırlıklı olarak; kimlik bilgileriniz (ad, soyad), iletişim bilgileriniz (telefon numarası, e-posta adresi), 
            işlem güvenliği bilgileriniz (IP adresi) ve finansal bilgileriniz (fatura bilgileri) işlenmektedir.
          </p>

          <h2>3. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
          <p>
            Kişisel verileriniz, web sitemizdeki iletişim formları, canlı destek modülü (Zoho SalesIQ) ve WhatsApp hattımız 
            üzerinden elektronik ortamda toplanmaktadır. İşlenme hukuki sebepleri ise; KVKK Madde 5/2-c (sözleşmenin kurulması 
            veya ifasıyla doğrudan doğruya ilgili olması) ve Madde 5/2-f (veri sorumlusunun meşru menfaatleri için veri işlenmesinin 
            zorunlu olması) şartlarına dayanmaktadır.
          </p>

          <h2>4. Kişisel Verilerin Aktarılması</h2>
          <p>
            Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda, yasal düzenlemelerin izin verdiği 
            kapsamda iş ortaklarımıza, tedarikçilerimize (hosting ve bulut bilişim hizmetleri), mali müşavirlerimize ve yetkili kamu 
            kurumlarına aktarılabilir.
          </p>

          <h2>5. KVKK Madde 11 Kapsamındaki Haklarınız</h2>
          <p>Kanunun 11. maddesi uyarınca veri sahipleri;</p>
          <ul>
            <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
            <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
            <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
            <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
            <li>Eksik veya yanlış işlenmiş olması hâlinde düzeltilmesini isteme haklarına sahiptir.</li>
          </ul>

          <p>
            Haklarınızı kullanmak için taleplerinizi <strong>destek@maximorashop.com</strong> e-posta adresi üzerinden 
            veri sorumlusuna iletebilirsiniz. Talepleriniz en geç 30 gün içerisinde ücretsiz olarak sonuçlandırılacaktır.
          </p>
        </div>
      </div>
    </div>
  );
}
