require('dotenv').config({ path: '../.env.local' });
const { Client } = require('pg');

const oldConnectionString = 'postgresql://postgres.tlzumghdjzehomaocmsa:Tefal767675.@aws-1-eu-central-1.pooler.supabase.com:6543/postgres';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const tables = [
  'profiles',
  'products',
  'coupons',
  'orders',
  'favorites',
  'user_carts',
  'settings',
  'newsletter_subscribers',
  'showcases',
  'contact_messages',
  'promo_blocks',
  'slider_images'
];

async function migrate() {
  const pgClient = new Client({ connectionString: oldConnectionString });
  await pgClient.connect();
  console.log("Connected to OLD database.");

  for (const table of tables) {
    console.log("\\nMigrating table: " + table + "...");
    
    const res = await pgClient.query('SELECT * FROM public."' + table + '"');
    const rows = res.rows;
    
    if (rows.length === 0) {
      console.log("No rows found in " + table + ". Skipping.");
      continue;
    }
    
    console.log("Found " + rows.length + " rows in " + table + ". Inserting into new DB...");
    
    const batchSize = 100;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      
      const response = await fetch(supabaseUrl + '/rest/v1/' + table, {
        method: 'POST',
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': 'Bearer ' + supabaseServiceKey,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(batch)
      });
      
      if (!response.ok) {
        const errText = await response.text();
        console.error("Error inserting batch into " + table + ":", errText);
      } else {
        process.stdout.write("Inserted " + (i + batch.length) + " / " + rows.length + "\\r");
      }
    }
    console.log("\\nFinished " + table + ".");
  }

  await pgClient.end();
  console.log("\\nMigration completed successfully!");
}

migrate().catch(err => {
  console.error("Migration failed:", err);
});
