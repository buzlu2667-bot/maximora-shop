import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
const supabaseUrl = 'https://tlzumghdjzehomaocmsa.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsenVtZ2hkanplaG9tYW9jbXNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjcyMjU5OSwiZXhwIjoyMDkyMjk4NTk5fQ.8B31TNCXD5r2ni4gIArV-fvYcjD6t9TusOXxGJR2EkI';



const supabase = createClient(supabaseUrl, serviceRoleKey);

async function sync() {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    console.log('No uploads folder found');
    return;
  }

  const files = fs.readdirSync(uploadDir);
  console.log(`Found ${files.length} files. Starting upload...`);

  const mapping = {};

  for (const fileName of files) {
    const filePath = path.join(uploadDir, fileName);
    if (fs.statSync(filePath).isDirectory()) continue;

    const buffer = fs.readFileSync(filePath);
    const { error } = await supabase.storage
      .from('products')
      .upload(fileName, buffer, { upsert: true });

    if (error) {
      console.error(`Error uploading ${fileName}:`, error.message);
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(fileName);
      mapping[`/uploads/${fileName}`] = publicUrl;
      process.stdout.write('.');
    }
  }

  console.log('\nUploads finished. Updating database...');

  const { data: products, error: dbError } = await supabase
    .from('products')
    .select('id, name, images, variants');


  if (dbError) {
    console.error('DB error:', dbError.message);
    return;
  }

  let updatedCount = 0;
  for (const product of products) {
    let hasChange = false;
    const updatedImages = (product.images || []).map(imgUrl => {
      if (mapping[imgUrl]) {
        hasChange = true;
        return mapping[imgUrl];
      }
      return imgUrl;
    });

    // Varyantların içindeki imageGroups'u da güncelle
    const updatedVariants = (product.variants || []).map((v) => {
      if (v.imageGroups) {
        const newImageGroups = {};
        for (const [color, imgs] of Object.entries(v.imageGroups)) {
          newImageGroups[color] = imgs.map(imgUrl => {
             if (mapping[imgUrl]) {
               hasChange = true;
               return mapping[imgUrl];
             }
             return imgUrl;
          });
        }
        return { ...v, imageGroups: newImageGroups };
      }
      return v;
    });


    if (hasChange) {
      await supabase
        .from('products')
        .update({ 
          images: updatedImages,
          variants: updatedVariants 
        })
        .eq('id', product.id);
      updatedCount++;
    }
  }



  console.log(`Done! ${updatedCount} products updated.`);


  // SLIDER GÜNCELLEME
  console.log('Updating slider_images...');
  const { data: sliders, error: sliderError } = await supabase.from('slider_images').select('*');
  if (!sliderError) {
    for (const s of (sliders || [])) {
      if (mapping[s.image_url]) {
        await supabase.from('slider_images').update({ image_url: mapping[s.image_url] }).eq('id', s.id);
      }
    }
  }

  // PROMO BLOCKS GÜNCELLEME
  console.log('Updating promo_blocks...');
  const { data: promos, error: promoError } = await supabase.from('promo_blocks').select('*');
  if (!promoError) {
    for (const p of (promos || [])) {
      if (mapping[p.image]) {
        await supabase.from('promo_blocks').update({ image: mapping[p.image] }).eq('id', p.id);
      }
    }
  }

  console.log('All tables updated successfully!');
}

sync();

