const mysql = require('mysql2');
require('dotenv').config(); // Carregar variáveis do .env

const pool = mysql.createPool({
    host: process.env.DB_HOST,        // Host do PlanetScale
    user: process.env.DB_USER,        // Usuário do PlanetScale
    password: process.env.DB_PASSWORD,  // Senha gerada do PlanetScale
    database: process.env.DB_NAME,    // Nome do banco de dados
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : false // Usar SSL se definido como true
});

const promisePool = pool.promise();
module.exports = promisePool;
