const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.tlzumghdjzehomaocmsa:Tefal767675.@aws-1-eu-central-1.pooler.supabase.com:6543/postgres',
});

async function getAuthTriggers() {
  await client.connect();
  const trigs = await client.query("SELECT t.tgname, pg_get_triggerdef(t.oid) as def FROM pg_trigger t JOIN pg_class c ON t.tgrelid = c.oid JOIN pg_namespace n ON c.relnamespace = n.oid WHERE n.nspname = 'auth' AND t.tgisinternal = false");
  console.log('--- TRIGGERS ---');
  for (const t of trigs.rows) {
    console.log(t.def + ';\\n');
  }
  await client.end();
}

getAuthTriggers().catch(console.error);
