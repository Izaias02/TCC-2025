const bcrypt = require('bcryptjs');
const db = require('./db');

async function criarAdmin() {
    const hash = await bcrypt.hash('chutaobalde', 10);
    await db.query(
        'INSERT INTO administradores (login, senha) VALUES (?, ?)',
        ['admin', hash]
    );
    console.log('Administrador criado com sucesso!');
    process.exit(0);
}

criarAdmin().catch(err => {
    console.error('Erro ao criar admin:', err);
    process.exit(1);
});
