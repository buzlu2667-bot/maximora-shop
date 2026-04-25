import { NextResponse } from 'next/server';
import { emailService } from '@/lib/email-service';

export async function POST(request: Request) {
  try {
    const { to, subject, message } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json({ error: 'E-posta, konu ve mesaj zorunludur' }, { status: 400 });
    }

    await emailService.sendCustomEmail(to, subject, message);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Mail Hatası:', error);
    return NextResponse.json({ error: error.message || 'Mail gönderilemedi' }, { status: 500 });
  }
}
