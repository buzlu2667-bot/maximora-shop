const { Client } = require('pg');
const fs = require('fs');

const connectionString = 'postgresql://postgres.tlzumghdjzehomaocmsa:Tefal767675.@aws-1-eu-central-1.pooler.supabase.com:6543/postgres';

async function dumpSchema() {
  const client = new Client({ connectionString });
  await client.connect();

  const tablesRes = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'");

  const tables = tablesRes.rows.map(r => r.table_name);
  let schemaSql = '';

  for (const table of tables) {
    const colRes = await client.query("SELECT column_name, data_type, character_maximum_length, column_default, is_nullable FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1 ORDER BY ordinal_position", [table]);

    let createSql = 'CREATE TABLE IF NOT EXISTS public."' + table + '" (\\n';
    const colLines = [];
    
    for (const col of colRes.rows) {
      let line = '  "' + col.column_name + '" ' + col.data_type;
      if (col.character_maximum_length) {
         line += '(' + col.character_maximum_length + ')';
      }
      if (col.column_default) {
         line += ' DEFAULT ' + col.column_default;
      }
      if (col.is_nullable === 'NO') {
         line += ' NOT NULL';
      }
      colLines.push(line);
    }
    
    createSql += colLines.join(',\\n');
    createSql += '\\n);\\n\\n';
    schemaSql += createSql;
  }

  fs.writeFileSync('../schema.sql', schemaSql);
  console.log('Schema saved to ../schema.sql');
  
  await client.end();
}

dumpSchema().catch(console.error);
