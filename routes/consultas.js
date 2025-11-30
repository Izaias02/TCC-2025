const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../db'); // conexão MySQL/MariaDB

// Middleware para checar se o admin está logado
function verificarAdmin(req, res, next) {
    if (!req.session.adminId) {
        return res.status(401).json({ success: false, message: 'Acesso negado! Faça login como administrador.' });
    }
    next();
}

// PESQUISAR CONSULTAS POR CRM OU CPF (normaliza CPF)
router.get('/consultas', verificarAdmin, async (req, res) => {
    const { crm, cpf, data } = req.query;

    if (!crm && !cpf) {
        return res.status(400).json({ success: false, message: 'CRM ou CPF é obrigatório.' });
    }

    let query = `
        SELECT c.id, c.data_horario, c.status,
               p.id AS paciente_id, p.nome AS paciente_nome, p.cpf AS paciente_cpf,
               m.nome AS medico_nome, m.crm AS medico_crm, m.especialidade
        FROM consultas c
        JOIN pacientes p ON p.id = c.paciente_id
        JOIN medicos m ON m.id = c.medico_id
        WHERE 1=1
    `;
    const params = [];

    if (crm) {
        query += ' AND m.crm = ?';
        params.push(crm);
    }

    if (cpf) {
        // Normaliza CPF no SQL (remove pontos, traços e espaços)
        query += ' AND REPLACE(REPLACE(REPLACE(p.cpf, ".", ""), "-", ""), " ", "") = ?';
        params.push(cpf.replace(/\D/g, '')); // Remove tudo que não for número
    }

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
