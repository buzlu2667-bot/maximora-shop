const fs = require('fs');

const swagger = JSON.parse(fs.readFileSync('scratch/swagger.json', 'utf8'));

let sql = '';

if (swagger.definitions) {
  for (const [tableName, tableDef] of Object.entries(swagger.definitions)) {
    let tableSql = 'CREATE TABLE IF NOT EXISTS public."' + tableName + '" (\\n';
    const props = [];
    
    if (tableDef.properties) {
      for (const [colName, colDef] of Object.entries(tableDef.properties)) {
        let type = 'TEXT';
        if (colDef.type === 'integer') type = 'INTEGER';
        else if (colDef.type === 'number') type = 'NUMERIC';
        else if (colDef.type === 'boolean') type = 'BOOLEAN';
        else if (colDef.type === 'string') {
          if (colDef.format === 'uuid') type = 'UUID';
          else if (colDef.format === 'timestamp with time zone') type = 'TIMESTAMPTZ';
          else if (colDef.format === 'timestamp without time zone') type = 'TIMESTAMP';
          else if (colDef.format === 'jsonb') type = 'JSONB';
          else type = 'TEXT';
        }
        
        let colStr = '  "' + colName + '" ' + type;
        
        if (colName === 'id') {
          if (type === 'UUID') {
             colStr += ' PRIMARY KEY DEFAULT gen_random_uuid()';
          } else {
             colStr += ' PRIMARY KEY';
          }
        }
        
        props.push(colStr);
      }
    }
    
    tableSql += props.join(',\\n');
    tableSql += '\\n);\\n\\n';
    sql += tableSql;
  }
}

fs.writeFileSync('schema.sql', sql);
console.log('schema.sql generated successfully.');
