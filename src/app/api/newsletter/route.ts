import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Geçerli bir e-posta adresi girin.' }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Önce bu mail zaten kayıtlı mı kontrol et
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json({ message: 'Zaten kayıtlısınız! ✨' }, { status: 200 });
    }

    // Kaydet
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);

    if (error) throw error;

    return NextResponse.json({ message: 'Aboneliğiniz başarıyla tamamlandı! ✨' }, { status: 201 });
  } catch (error: any) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Bir hata oluştu, lütfen tekrar deneyin.' }, { status: 500 });
  }
}
