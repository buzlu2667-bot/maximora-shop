import { resend } from './resend';
// Deployment trigger: ENV variables final sync



const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@maximora.store';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'MAXIMORA <onboarding@resend.dev>';

const EMAIL_FOOTER = `
  <div style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #f0f0f0;">
    <p style="font-size: 14px; color: #111; font-weight: bold; margin: 0; letter-spacing: 1px;">MAXIMORA STUDIO</p>
    <p style="font-size: 12px; color: #aaa; margin-top: 0.6rem;">
      Herhangi bir sorunuz varsa bize ulaşın: 
      <a href="mailto:destek@maximorashop.com" style="color: #d4af37; text-decoration: none;">destek@maximorashop.com</a>
    </p>
    <p style="font-size: 10px; color: #ccc; margin-top: 1rem; text-transform: uppercase;">© 2026 MAXIMORA. Tüm hakları saklıdır.</p>
  </div>
`;

export const emailService = {
  // Admin Bildirimi
  async sendAdminOrderNotification(order: any) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `🔥 Yeni Sipariş Geldi! - #${order.id}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #111; padding: 2rem; text-align: center;">
              <h1 style="color: #d4af37; margin: 0;">YENİ SİPARİŞ!</h1>
            </div>
            <div style="padding: 2rem;">
              <p><strong>Sipariş No:</strong> ${order.id}</p>
              <p><strong>Müşteri:</strong> ${order.customer_email}</p>
              <p><strong>Tutar:</strong> ${Number(order.total_amount).toFixed(2)} TL</p>
              ${EMAIL_FOOTER}
            </div>
          </div>
        `
      });
    } catch (e: any) {
      console.error('RESEND ERROR (Admin):', e.message);
    }

  },

  // Müşteriye Sipariş Onayı (Ödeme Yöntemine Göre Özelleştirilmiş)
  async sendCustomerOrderConfirmation(order: any) {
    if (!order.customer_email) return;

    const isShopier = order.payment_method === 'shopier';
    const subject = isShopier 
      ? `Ödeme İşlemin Başlatıldı 💳 - #${order.id}` 
      : `Siparişin Alındı! ✨ - #${order.id}`;

    const message = isShopier
      ? `Şu anda <strong>Shopier</strong> üzerinden güvenli ödeme sayfasındasın. Ödeme işlemin başarıyla tamamlandığı an hazırlıklara başlayacağız ve seni kargo aşamasında tekrar bilgilendireceğiz.`
      : `Harika bir seçim yaptın! <strong>#${order.id}</strong> nolu siparişin başarıyla bize ulaştı. IBAN ödemeni tamamladıktan sonra hazırlıklara başlayacağız.`;

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: order.customer_email,
        subject: subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 16px; overflow: hidden; background-color: #fcfcfc;">
            <div style="background-color: #111; padding: 3rem 2rem; text-align: center;">
              <h1 style="color: #d4af37; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 2px;">
                ${isShopier ? 'ÖDEME BEKLENİYOR' : 'TEŞEKKÜRLER'}
              </h1>
              <p style="color: #888; font-size: 14px; margin-top: 0.5rem;">
                ${isShopier ? 'İşlemin devam ediyor...' : 'Siparişin başarıyla bize ulaştı.'}
              </p>
            </div>
            <div style="padding: 2.5rem 2rem;">
              <p style="font-size: 15px; color: #333; line-height: 1.6;">${message}</p>
              
              ${!isShopier ? `
                <div style="margin: 2rem 0; padding: 1.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
                  <p style="margin: 0 0 0.5rem 0; font-size: 13px; color: #64748b; text-transform: uppercase;">Ödeme Yapılacak IBAN Bilgileri</p>
                  <p style="margin: 0; font-size: 15px; color: #1e293b;"><strong>Hesap Sahibi:</strong> burak agarak</p>
                  <p style="margin: 5px 0 0 0; font-size: 16px; color: #1e293b; font-weight: 700;">TR66 0015 7000 0000 0095 7755 66</p>
                  <p style="margin: 10px 0 0 0; font-size: 12px; color: #ef4444;">* Lütfen açıklama kısmına sipariş numaranızı (#${order.id}) yazmayı unutmayın.</p>
                </div>
              ` : ''}

              ${EMAIL_FOOTER}
            </div>
          </div>
        `
      });
    } catch (error: any) {
      console.error('RESEND ERROR (Customer):', error.message);
    }

  },

  // Müşteriye Ödeme Onayı
  async sendOrderApprovedNotification(order: any) {
    if (!order.customer_email) return;
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: order.customer_email,
        subject: `Ödemen Onaylandı! ✅ - #${order.id}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 16px; overflow: hidden;">
            <div style="background-color: #111; padding: 2.5rem; text-align: center;">
              <h1 style="color: #d4af37; margin: 0; font-size: 22px;">ÖDEME ONAYLANDI</h1>
            </div>
            <div style="padding: 2rem;">
              <p>Harika haber! <strong>#${order.id}</strong> nolu siparişinin ödemesi başarıyla onaylandı.</p>
              <p style="font-size: 15px; color: #333; line-height: 1.6;">
                Ekibimiz şu anda ürünlerini hazırlamaya başladı. Kargoya verildiğinde seni tekrar takip numarasıyla bilgilendireceğiz.
              </p>
              ${EMAIL_FOOTER}
            </div>
          </div>
        `
      });
    } catch (error: any) {
      console.error('RESEND ERROR (Approved):', error.message);
    }

  },

  // Müşteriye Kargo Bildirimi
  async sendShippingNotification(order: any) {
    if (!order.customer_email) return;
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: order.customer_email,
        subject: `Siparişin Kargoya Verildi! 🚚 - #${order.id}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 16px; overflow: hidden;">
            <div style="background-color: #111; padding: 2.5rem; text-align: center;">
              <h1 style="color: #d4af37; margin: 0; font-size: 22px;">YOLA ÇIKTI!</h1>
            </div>
            <div style="padding: 2rem;">
              <p>Harika haber! <strong>#${order.id}</strong> nolu siparişin kargoya verildi.</p>
              <div style="margin: 2rem 0; padding: 1.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
                <p style="margin: 0 0 0.5rem 0; font-size: 13px; color: #64748b; text-transform: uppercase;">Kargo Bilgileri</p>
                <p style="margin: 0; font-size: 16px; color: #1e293b; font-weight: 700;">${order.cargo_company}</p>
                <p style="margin: 5px 0 0 0; font-size: 15px; color: #1e293b;">Takip No: <strong>${order.tracking_number}</strong></p>
              </div>
              <p style="font-size: 14px; color: #666;">Siparişin yakında kapında olacak. Şimdiden güzel günlerde kullan!</p>
              ${EMAIL_FOOTER}
            </div>
          </div>
        `
      });
    } catch (error: any) {
      console.error('RESEND ERROR (Shipping):', error.message);
    }

  },

  // Müşteriye İptal Bildirimi
  async sendCancellationNotification(order: any) {
    if (!order.customer_email) return;
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: order.customer_email,
        subject: `Sipariş İptali Hakkında - #${order.id}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 16px; overflow: hidden;">
            <div style="background-color: #111; padding: 2.5rem; text-align: center;">
              <h1 style="color: #e11d48; margin: 0; font-size: 22px;">BİLGİLENDİRME</h1>
            </div>
            <div style="padding: 2rem;">
              <p>Merhaba, <strong>#${order.id}</strong> nolu siparişin maalesef iptal edilmiştir.</p>
              <div style="margin: 2rem 0; padding: 1.5rem; background-color: #fff1f2; border: 1px solid #ffe4e6; border-radius: 12px;">
                <p style="margin: 0 0 0.5rem 0; font-size: 13px; color: #e11d48; text-transform: uppercase;">İptal Nedeni</p>
                <p style="margin: 0; font-size: 15px; color: #9f1239;">${order.cancel_reason || 'Diğer nedenler'}</p>
              </div>
              ${EMAIL_FOOTER}
            </div>
          </div>
        `
      });
    } catch (error: any) {
      console.error('RESEND ERROR (Cancellation):', error.message);
    }

  },

  // Admin'den Müşteriye Manuel Mail
  async sendCustomEmail(to: string, subject: string, message: string) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: to,
        subject: subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #111; padding: 2rem; text-align: center;">
               <h2 style="color: #d4af37; margin: 0;">MAXIMORA</h2>
            </div>
            <div style="padding: 2rem; line-height: 1.6; color: #333;">
              ${message.replace(/\n/g, '<br>')}
              ${EMAIL_FOOTER}
            </div>
          </div>
        `
      });
    } catch (error) {
      throw error;
    }
  }
};
