require('dotenv').config();
const db = require('./db'); // seu db.js

(async () => {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    console.log('Conexão bem-sucedida! Hora do servidor:', rows[0].now);
  } catch (err) {
    console.error('Erro ao conectar ao PlanetScale:', err.message);
  }
})();
