const bcrypt = require('bcryptjs');

const senha = 'chutaobalde';  // A senha para ser criptografada

bcrypt.hash(senha, 10, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log(hash);  // Isso vai imprimir o hash da senha
  }
});


const bcrypt = require('bcryptjs');

// Quando você for criar um novo administrador, faça assim:
const senha = 'senha_secreta'; // Senha fornecida pelo administrador

// Gera o hash da senha
bcrypt.hash(senha, 10, async (err, hash) => {
  if (err) {
    console.error('Erro ao gerar o hash:', err);
    return;
  }

  // Agora você pode salvar o administrador com a senha hash no banco
  const [results] = await db.query(
    'INSERT INTO administradores (login, senha) VALUES (?, ?)',
    ['admin_login', hash]
  );

  console.log('Administrador criado com sucesso');
});
