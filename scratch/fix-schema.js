const fs = require('fs');
let sql = fs.readFileSync('../schema.sql', 'utf8');

// replace "id" type DEFAULT ... NOT NULL with PRIMARY KEY
sql = sql.replace(/"id" (.*?) NOT NULL/g, '"id" $1 PRIMARY KEY NOT NULL');

// replace uuid_generate_v4() with gen_random_uuid()
sql = sql.replace(/uuid_generate_v4\(\)/g, 'gen_random_uuid()');

fs.writeFileSync('../schema.sql', sql);
