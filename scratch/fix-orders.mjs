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

async function fixOrders() {
  const { data: orders, error } = await supabase.from('orders').select('*');
  if (error) {
    console.error(error);
    return;
  }
  
  let totalUpdated = 0;
  
  for (const order of orders) {
    let orderStr = JSON.stringify(order.items);
    if (orderStr && orderStr.includes('tlzumghdjzehomaocmsa.supabase.co')) {
      orderStr = orderStr.replace(/tlzumghdjzehomaocmsa\.supabase\.co/g, 'kcrmqenlfltuwymqfayb.supabase.co');
      const updatedItems = JSON.parse(orderStr);
      await supabase.from('orders').update({ items: updatedItems }).eq('id', order.id);
      totalUpdated++;
    }
  }
  console.log("Orders updated: " + totalUpdated);
}

async function fixUserCarts() {
  const { data: carts, error } = await supabase.from('user_carts').select('*');
  if (error) {
    console.error(error);
    return;
  }
  
  let totalUpdated = 0;
  
  for (const cart of carts) {
    let cartStr = JSON.stringify(cart.items);
    if (cartStr && cartStr.includes('tlzumghdjzehomaocmsa.supabase.co')) {
      cartStr = cartStr.replace(/tlzumghdjzehomaocmsa\.supabase\.co/g, 'kcrmqenlfltuwymqfayb.supabase.co');
      const updatedItems = JSON.parse(cartStr);
      await supabase.from('user_carts').update({ items: updatedItems }).eq('id', cart.id);
      totalUpdated++;
    }
  }
  console.log("Carts updated: " + totalUpdated);
}

async function run() {
  await fixOrders();
  await fixUserCarts();
}

run();
