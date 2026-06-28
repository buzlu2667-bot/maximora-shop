import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import ws from 'ws';

global.WebSocket = ws;
dotenv.config({ path: '../.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

async function testUpdate() {
  const { data: users } = await supabaseAdmin.from('profiles').select('id, email');
  const user = users.find(u => u.email === 'burakayrilik@gmail.com');
  
  if (!user) {
    console.log("User not found in profiles!");
    return;
  }
  
  console.log("Found user:", user.id);
  
  const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ credit_balance: 50 })
      .eq('id', user.id)
      .select()
      .single();
      
  if (error) {
    console.error("UPDATE ERROR:", error);
  } else {
    console.log("UPDATE SUCCESS:", data);
  }
}

testUpdate();
