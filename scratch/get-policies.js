const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.tlzumghdjzehomaocmsa:Tefal767675.@aws-1-eu-central-1.pooler.supabase.com:6543/postgres',
});

async function getPolicies() {
  await client.connect();
  const res = await client.query("SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check FROM pg_policies WHERE schemaname = 'public'");
  
  let total = 0;
  for (const row of res.rows) {
    total++;
    console.log("-- Table: " + row.tablename + ", Policy: " + row.policyname);
    console.log("CREATE POLICY " + JSON.stringify(row.policyname) + " ON public." + JSON.stringify(row.tablename));
    console.log("  AS " + row.permissive + " FOR " + row.cmd);
    console.log("  TO " + (row.roles ? row.roles.join(', ') : 'public'));
    if (row.qual) console.log("  USING (" + row.qual + ")");
    if (row.with_check) console.log("  WITH CHECK (" + row.with_check + ")");
    console.log(";");
    console.log("ALTER TABLE public." + JSON.stringify(row.tablename) + " ENABLE ROW LEVEL SECURITY;");
    console.log();
  }
  
  if (total === 0) {
    console.log("NO POLICIES FOUND IN OLD DB!");
  }
  
  await client.end();
}

getPolicies().catch(console.error);
