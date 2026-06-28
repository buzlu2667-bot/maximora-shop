import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import ws from 'ws';

global.WebSocket = ws;
dotenv.config({ path: '../.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

async function fix() {
  const { data, error } = await supabase.from('settings').select('*').single();
  if (error) {
    console.error(error);
    return;
  }
  
  let updated = false;
  
  let settingsStr = JSON.stringify(data);
  if (settingsStr.includes('tlzumghdjzehomaocmsa.supabase.co')) {
    settingsStr = settingsStr.replace(/tlzumghdjzehomaocmsa\.supabase\.co/g, 'kcrmqenlfltuwymqfayb.supabase.co');
    updated = true;
  }
  
  if (updated) {
    const updatedData = JSON.parse(settingsStr);
    const { error: updateError } = await supabase.from('settings').update(updatedData).eq('id', data.id);
    if (updateError) {
      console.error(updateError);
    } else {
      console.log('Settings updated successfully!');
    }
  } else {
    console.log('No old URLs found in settings.');
  }
}

fix();
