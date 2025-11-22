const mysql = require('mysql2/promise');

async function testarConexao() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'piramidal15',  // Substitua se necessário
      database: 'tcc2025'
    });

    console.log("Conectado ao banco MySQL com sucesso!");
    await connection.end();
  } catch (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  }
}

testarConexao();
