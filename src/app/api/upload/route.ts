import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Herhangi bir dosya yüklenmedi.' }, { status: 400 });
    }

    // public klasörü altına uploads dosyasını hedef al:
    // Bu sayede dosyalar domain.com/uploads/resim.jpg olarak anında erişilebilir olur.
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Özel karakterleri silip benzersiz bir isim uret:
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
      const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeName}`;
      const filePath = path.join(uploadDir, uniqueFilename);

      // Veriyi diske (Kendi bilgisayarına/sunucuya) kaydet (Kalite kaybı olmadan gerçek raw veri)
      fs.writeFileSync(filePath, buffer);
      
      // Frontend için public adresini kaydet
      uploadedUrls.push(`/uploads/${uniqueFilename}`);
    }

    return NextResponse.json({ urls: uploadedUrls });

  } catch (error) {
    console.error('Upload Hatası:', error);
    return NextResponse.json({ error: 'Dosyalar sunucuya kaydedilirken hata oluştu.' }, { status: 500 });
  }
}
