const fs = require('fs');

async function getSwagger() {
  try {
    const url = 'https://tlzumghdjzehomaocmsa.supabase.co/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsenVtZ2hkanplaG9tYW9jbXNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjcyMjU5OSwiZXhwIjoyMDkyMjk4NTk5fQ.8B31TNCXD5r2ni4gIArV-fvYcjD6t9TusOXxGJR2EkI';
    const res = await fetch(url);
    const data = await res.json();
    fs.writeFileSync('scratch/swagger.json', JSON.stringify(data, null, 2));
    console.log('Swagger saved to scratch/swagger.json');
  } catch (err) {
    console.error(err);
  }
}

getSwagger();
