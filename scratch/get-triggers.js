const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.tlzumghdjzehomaocmsa:Tefal767675.@aws-1-eu-central-1.pooler.supabase.com:6543/postgres',
});

async function getTriggers() {
  await client.connect();
  
  // Get functions
  const funcs = await client.query("SELECT p.proname, pg_get_functiondef(p.oid) as def FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public'");
  
  console.log('--- FUNCTIONS ---');
  for (const f of funcs.rows) {
    if (f.def) console.log(f.def + ';\\n');
  }
  
  // Get triggers
  const trigs = await client.query("SELECT t.tgname, pg_get_triggerdef(t.oid) as def FROM pg_trigger t JOIN pg_class c ON t.tgrelid = c.oid JOIN pg_namespace n ON c.relnamespace = n.oid WHERE n.nspname = 'public' AND t.tgisinternal = false");
  
  console.log('--- TRIGGERS ---');
  for (const t of trigs.rows) {
    console.log(t.def + ';\\n');
  }
  
  await client.end();
}

getTriggers().catch(console.error);
