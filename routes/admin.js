const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../db');

// Middleware para checar se o admin está logado
function verificarAdmin(req, res, next) {
    if (!req.session.adminId) {
        return res.status(401).json({ success: false, message: 'Acesso negado! Faça login como administrador.' });
    }
    next();
}

// LOGIN ADMIN
router.post('/login', async (req, res) => {
    const { login, senha } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM administradores WHERE login = ?', [login]);

        if (rows.length === 0) {
            return res.json({ success: false, message: 'Login ou senha inválidos' });
        }

        const admin = rows[0];
        const senhaCorreta = await bcrypt.compare(senha, admin.senha);

        if (!senhaCorreta) {
            return res.json({ success: false, message: 'Login ou senha inválidos' });
        }

        // Cria sessão
        req.session.adminId = admin.id;
        req.session.adminLogin = admin.login;

        res.json({ success: true });
    } catch (err) {
        console.error('Erro no login admin:', err);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
});

// LOGOUT ADMIN
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ success: false, message: 'Erro ao fazer logout' });
        res.clearCookie('connect.sid', { path: '/' });
        res.json({ success: true });
    });
});

// PESQUISAR CONSULTAS POR CRM E DATA
router.get('/consultas', verificarAdmin, async (req, res) => {
    const { crm, data } = req.query;

    if (!crm) {
        return res.status(400).json({ success: false, message: 'CRM do médico é obrigatório.' });
    }

    let query = `
        SELECT c.id, c.data_horario, c.status,
               p.nome AS paciente_nome, p.cpf AS paciente_cpf,
               m.nome AS medico_nome, m.crm AS medico_crm, m.especialidade
        FROM consultas c
        JOIN pacientes p ON p.id = c.paciente_id
        JOIN medicos m ON m.id = c.medico_id
        WHERE m.crm = ?
    `;
    const params = [crm];

    if (data) {
        query += ' AND DATE(c.data_horario) = ?';
        params.push(data);
    }

    query += ' ORDER BY c.data_horario ASC';

    try {
        const [rows] = await pool.query(query, params);
        res.json({ success: true, consultas: rows });
    } catch (err) {
        console.error('Erro ao buscar consultas:', err);
        res.status(500).json({ success: false, message: 'Erro ao buscar consultas no servidor.' });
    }
});

module.exports = router;
