const express = require('express');
const router = express.Router();
const db = require('../db');

// Login administrador
router.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  try {
    const [results] = await db.query(
      'SELECT * FROM administradores WHERE login = ? AND senha = ? LIMIT 1',
      [login, senha]
    );

    if (results.length > 0) {
      res.json({ success: true, admin: results[0] });
    } else {
      res.json({ success: false, message: 'Login ou senha inválidos' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

module.exports = router;
