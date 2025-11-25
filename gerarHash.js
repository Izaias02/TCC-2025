// GERADOR DE HASH DE SENHA
// Este arquivo é isolado e não interfere em nenhuma outra função do sistema.

const bcrypt = require("bcryptjs");

// Troque "sua_senha_aqui" pela senha que deseja hashear
async function gerarHash(senha) {
  try {
    const hash = await bcrypt.hash(senha, 10);
    console.log("HASH GERADO:");
    console.log(hash);
  } catch (err) {
    console.error("Erro ao gerar hash:", err);
  }
}

// ↓↓↓ ALTERE AQUI A SENHA ↓↓↓
gerarHash("chutaobalde");
