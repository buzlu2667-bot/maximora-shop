export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

import { resend } from '@/lib/resend';

export async function GET() {
  try {
    const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const to = process.env.ADMIN_EMAIL || 'test@example.com';
    
    console.log('Test Email Attempt:', { from, to });

    const data = await resend.emails.send({
      from: from,
      to: to,
      subject: 'MAXIMORA - Teknik Test Maili',
      html: `
        <h1>Bağlantı Başarılı!</h1>
        <p>Eğer bu maili görüyorsan Resend bağlantın tıkır tıkır çalışıyor demektir.</p>
        <hr />
        <p><strong>Gönderen:</strong> ${from}</p>
        <p><strong>Alıcı:</strong> ${to}</p>
      `
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Test maili gönderildi! Lütfen hem gelen kutunu hem de spam klasörünü kontrol et kanka.',
      data 
    });
  } catch (error: any) {
    console.error('Test Email Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      hint: 'Eğer "Unauthorized" diyorsa API Key yanlıştır. Eğer "Domain not verified" diyorsa Resend panelinden alan adını onaylatman gerekir.'
    }, { status: 500 });
  }
}
