import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Herhangi bir dosya yüklenmedi.' }, { status: 400 });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Benzersiz isim üret
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
      const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeName}`;

      // Supabase Storage'a yükle
      const { data, error } = await supabaseAdmin.storage
        .from('products')
        .upload(uniqueFilename, buffer, {
          contentType: file.type,
          upsert: true
        });

      if (error) {
        console.error('Supabase Yükleme Hatası:', error);
        continue;
      }

      // Public URL'i al
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('products')
        .getPublicUrl(uniqueFilename);

      uploadedUrls.push(publicUrl);
    }

    return NextResponse.json({ urls: uploadedUrls });

  } catch (error) {
    console.error('Upload Hatası:', error);
    return NextResponse.json({ error: 'Dosyalar buluta kaydedilirken hata oluştu.' }, { status: 500 });
  }
}

