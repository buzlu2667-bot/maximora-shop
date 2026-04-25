import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!fs.existsSync(uploadDir)) {
      return NextResponse.json({ error: 'Local uploads folder not found' }, { status: 404 });
    }

    const files = fs.readdirSync(uploadDir);
    const results = {
      total: files.length,
      uploaded: 0,
      failed: 0,
      dbUpdated: 0
    };

    const mapping: Record<string, string> = {};

    for (const fileName of files) {
      const filePath = path.join(uploadDir, fileName);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) continue;

      const buffer = fs.readFileSync(filePath);
      
      // Supabase'e yükle
      const { data, error } = await supabaseAdmin.storage
        .from('products')
        .upload(fileName, buffer, {
          upsert: true
        });

      if (error) {
        console.error(`Failed to upload ${fileName}:`, error);
        results.failed++;
        continue;
      }

      // Public URL'i al
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('products')
        .getPublicUrl(fileName);

      mapping[`/uploads/${fileName}`] = publicUrl;
      results.uploaded++;
    }

    // Şimdi veritabanını güncelle
    const { data: products, error: dbError } = await supabaseAdmin
      .from('products')
      .select('id, images');

    if (dbError) throw dbError;

    for (const product of (products || [])) {
      let hasChange = false;
      const updatedImages = (product.images || []).map((imgUrl: string) => {
        if (mapping[imgUrl]) {
          hasChange = true;
          return mapping[imgUrl];
        }
        return imgUrl;
      });

      if (hasChange) {
        await supabaseAdmin
          .from('products')
          .update({ images: updatedImages })
          .eq('id', product.id);
        results.dbUpdated++;
      }
    }

    return NextResponse.json({ success: true, results });

  } catch (error: any) {
    console.error('Sync Hatası:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
