const pool = require('./db'); // seu arquivo db.js

async function testConnection() {
  try {
    const [rows, fields] = await pool.query('SELECT NOW() AS currentTime;');
    console.log('Conexão bem-sucedida! Hora do servidor:', rows[0].currentTime);
    process.exit(0);
  } catch (err) {
    console.error('Erro ao conectar ao banco:', err);
    process.exit(1);
  }
}

testConnection();
