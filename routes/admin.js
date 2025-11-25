const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../db');

// Login admin
router.post('/login', async (req, res) => {
    const { login, senha } = req.body;

    try {
        // Consulta o administrador pelo login
        const [rows] = await pool.query(
            'SELECT * FROM administradores WHERE login = ?',
            [login]
        );

        if (rows.length === 0) {
            return res.json({ success: false, message: 'Login ou senha inválidos' });
        }

        const admin = rows[0];
        const senhaCorreta = await bcrypt.compare(senha, admin.senha);

        if (!senhaCorreta) {
            return res.json({ success: false, message: 'Login ou senha inválidos' });
        }

        // Cria sessão do admin
        req.session.adminId = admin.id;
        req.session.adminLogin = admin.login;
        console.log('Sessão criada:', req.session); // log de depuração

        res.json({ success: true });

    } catch (err) {
        console.error('Erro no login admin:', err);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
});

// Logout admin
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao destruir sessão:', err);
            return res.status(500).json({ success: false, message: 'Erro ao fazer logout' });
        }

        // Limpa cookie
        res.clearCookie('connect.sid', { path: '/' });
        res.json({ success: true });
    });
});

module.exports = router;
