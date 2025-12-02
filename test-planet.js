// test-planet.js
require('dotenv').config();
const db = require('./db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    console.log('Conexão bem-sucedida! Hora do servidor:', rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('Erro ao conectar ao PlanetScale:', err.message);
    process.exit(1);
  }
}

testConnection();
