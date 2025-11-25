const express = require('express');
const router = express.Router();
const db = require('../db'); // seu módulo de conexão MySQL
const bcrypt = require('bcryptjs');

// Cadastro de médico
router.post('/cadastro', async (req, res) => {
  const {
    nome,
    email,
    senha,
    crm,
    especialidade,
    telefone,
    idade,
    sexo,
    nome_unidade,
    localidade_unidade
  } = req.body;

  try {
    // Verifica se o médico já existe pelo email ou CRM
    const [existente] = await db.query(
      'SELECT * FROM medicos WHERE email = ? OR crm = ? LIMIT 1',
      [email, crm]
    );

    if (existente.length > 0) {
      return res.json({ success: false, message: 'Médico já cadastrado' });
    }

    // Criptografa a senha
    const hashSenha = await bcrypt.hash(senha, 10);

    // Insere no banco
    const [result] = await db.query(
      `INSERT INTO medicos 
      (nome, email, senha, crm, especialidade, telefone, idade, sexo, nome_unidade, localidade_unidade) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, hashSenha, crm, especialidade, telefone, idade, sexo, nome_unidade, localidade_unidade]
    );

    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error('Erro ao cadastrar médico:', err);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

module.exports = router;
