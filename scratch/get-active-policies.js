const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.tlzumghdjzehomaocmsa:Tefal767675.@aws-1-eu-central-1.pooler.supabase.com:6543/postgres',
});

async function getPolicies() {
  await client.connect();
  
  const tablesRes = await client.query("SELECT relname FROM pg_class WHERE relrowsecurity = true AND relnamespace = 'public'::regnamespace");
  const rlsEnabledTables = tablesRes.rows.map(r => r.relname);
  
  const res = await client.query("SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check FROM pg_policies WHERE schemaname = 'public'");
  
  for (const row of res.rows) {
    if (!rlsEnabledTables.includes(row.tablename)) continue; // Only export policies for tables that actually had RLS enabled
    
    console.log("-- Table: " + row.tablename + ", Policy: " + row.policyname);
    console.log("CREATE POLICY " + JSON.stringify(row.policyname) + " ON public." + JSON.stringify(row.tablename));
    console.log("  AS " + row.permissive + " FOR " + row.cmd);
    
    let rolesStr = 'public';
    if (row.roles) {
      if (Array.isArray(row.roles)) rolesStr = row.roles.join(', ');
      else rolesStr = String(row.roles).replace(/[{}]/g, '');
    }
    
    console.log("  TO " + rolesStr);
    if (row.qual) console.log("  USING (" + row.qual + ")");
    if (row.with_check) console.log("  WITH CHECK (" + row.with_check + ")");
    console.log(";");
    console.log("ALTER TABLE public." + JSON.stringify(row.tablename) + " ENABLE ROW LEVEL SECURITY;");
    console.log();
  }
  
  console.log("-- Tables with RLS ENABLED: " + rlsEnabledTables.join(", "));
  
  await client.end();
}

getPolicies().catch(console.error);
