const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs'); // Importando bcrypt para comparar as senhas

// Login administrador
router.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  try {
    // Primeiro, procuramos o administrador pelo login
    const [results] = await db.query(
      'SELECT * FROM administradores WHERE login = ? LIMIT 1',
      [login]
    );

    // Verificamos se encontramos o administrador
    if (results.length > 0) {
      const admin = results[0];

      // Agora, comparamos a senha fornecida com o hash armazenado no banco
      const isPasswordValid = await bcrypt.compare(senha, admin.senha);
      
      if (isPasswordValid) {
        // Se a senha for válida, retornamos a resposta com o admin
        res.json({ success: true, admin: admin });
      } else {
        // Senha inválida
        res.json({ success: false, message: 'Login ou senha inválidos' });
      }
    } else {
      // Login não encontrado
      res.json({ success: false, message: 'Login ou senha inválidos' });
    }
  } catch (err) {
    console.error('Erro ao tentar realizar login:', err);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

module.exports = router;
