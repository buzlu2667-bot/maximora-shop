import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: Request) {
  try {
    const { fullName, phone, email, projectDesc } = await req.json();

    if (!fullName || !phone || !email || !projectDesc) {
      return NextResponse.json({ error: 'Tüm alanlar zorunludur.' }, { status: 400 });
    }

    // 1. Save to Supabase
    try {
      const { error } = await supabaseAdmin
        .from('studio_leads')
        .insert([
          {
            full_name: fullName,
            phone: phone,
            email: email,
            project_desc: projectDesc
          }
        ]);
        
      if (error) {
        console.warn('Supabase insert failed (table might not exist yet):', error.message);
      }
    } catch (dbError) {
      console.warn('Database error:', dbError);
    }

    // 2. Send Telegram Notification
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const message = `🚀 *Yeni Maximora Studio Talebi!* 🚀\n\n👤 *İsim:* ${fullName}\n📱 *Telefon:* ${phone}\n📧 *E-posta:* ${email}\n💬 *Proje:* ${projectDesc}`;
      
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });
    } else {
      console.warn('Telegram token or chat_id is missing in .env.local');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Sunucu hatası oluştu.' }, { status: 500 });
  }
}
