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

async function check() {
  const { data, error } = await supabase.from('settings').select('popup_settings').single();
  if (error) {
    console.error(error);
    return;
  }
  console.log(JSON.stringify(data.popup_settings, null, 2));
}

check();
