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

    // 2. E-posta Gönderimi (Admin'e Bildirim)
    try {
      const { emailService } = await import('@/lib/email-service');
      await emailService.sendContactFormNotification({ name, email, phone, message });
      console.log('✅ Email bildirimi tetiklendi.');
    } catch (emailErr: any) {
      console.error('❌ Email Notification Error:', emailErr.message);
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error('Contact API Error:', err);
    return NextResponse.json({ error: 'Mesaj iletilemedi.' }, { status: 500 });
  }
}
