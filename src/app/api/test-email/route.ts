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
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      message: 'Test maili denendi! (Versiyon 2) Aşağıdaki bilgilere bak kanka.',
      config: {
        using_from: from,
        using_to: to,
        is_sandbox: from.includes('resend.dev')
      },
      data 
    });

  } catch (error: any) {
    console.error('Test Email Error:', error);
    const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const to = process.env.ADMIN_EMAIL || 'test@example.com';
    
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      current_config: {
        from: from,
        to: to
      },
      hint: 'Eğer "from" kısmında "onboarding@resend.dev" yazıyorsa Vercel ayarların eksiktir kanka.'
    }, { status: 500 });
  }
}

