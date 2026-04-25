import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // 1. Veritabanına Kaydet (Müşteri paneli için)
    const { error: dbError } = await supabaseAdmin
      .from('contact_messages')
      .insert([
        { name, email, phone, message }
      ]);

    if (dbError) throw dbError;

    // 2. E-posta Gönderimi (Simülasyon / Bilgi)
    // NOT: Gerçek e-posta gönderimi için burada Resend, SendGrid veya Nodemailer gibi bir yapı kullanılmalıdır.
    // Şimdilik destek@maximorashop.com adresine gidecek mesajın hazır olduğunu logluyoruz.
    console.log(`Yeni İletişim Formu Mesajı! Alıcı: destek@maximorashop.com`);
    console.log(`Gönderen: ${name} (${email}) - Tel: ${phone}`);
    console.log(`Mesaj: ${message}`);

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error('Contact API Error:', err);
    return NextResponse.json({ error: 'Mesaj iletilemedi.' }, { status: 500 });
  }
}
