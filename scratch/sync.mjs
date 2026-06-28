import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import ws from 'ws';

global.WebSocket = ws;
dotenv.config({ path: '../.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

const OLD_STORAGE_PREFIX = 'https://tlzumghdjzehomaocmsa.supabase.co/storage/v1/object/public/products/';

async function sync() {
  const uploadDir = path.join(process.cwd(), '..', 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    console.log('No uploads folder found at', uploadDir);
    return;
  }

  const files = fs.readdirSync(uploadDir);
  console.log("Found " + files.length + " files. Starting upload...");

  const mapping = {};

  for (const fileName of files) {
    const filePath = path.join(uploadDir, fileName);
    if (fs.statSync(filePath).isDirectory()) continue;

    const buffer = fs.readFileSync(filePath);
    
    const { error } = await supabase.storage
      .from('products')
      .upload(fileName, buffer, { upsert: true, contentType: 'image/png' });

    if (error) {
      console.error("Error uploading " + fileName + ":", error.message);
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(fileName);
        
      mapping["/uploads/" + fileName] = publicUrl;
      mapping[OLD_STORAGE_PREFIX + fileName] = publicUrl;
      
      process.stdout.write('.');
    }
  }

  console.log('\\nUploads finished. Updating database...');

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

  console.log("Done! " + updatedCount + " products updated.");

  console.log('Updating slider_images...');
  const { data: sliders, error: sliderError } = await supabase.from('slider_images').select('*');
  if (!sliderError) {
    for (const s of (sliders || [])) {
      if (mapping[s.image_url]) {
        await supabase.from('slider_images').update({ image_url: mapping[s.image_url] }).eq('id', s.id);
      }
    }
  }

  console.log('Updating promo_blocks...');
  const { data: promos, error: promoError } = await supabase.from('promo_blocks').select('*');
  if (!promoError) {
    for (const p of (promos || [])) {
      if (mapping[p.image]) {
        await supabase.from('promo_blocks').update({ image: mapping[p.image] }).eq('id', p.id);
      }
    }
  }

  console.log('All tables updated with new image URLs successfully!');
}

sync();
