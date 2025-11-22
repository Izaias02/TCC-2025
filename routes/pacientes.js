const express = require('express');
const router = express.Router();
const db = require('../db');

// Retornar todos os pacientes
router.get('/', (req, res) => {
    db.query('SELECT * FROM pacientes', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Cadastrar novo paciente
router.post('/cadastro', (req, res) => {
    const { nome, email, cpf, senha } = req.body;
    const query = 'INSERT INTO pacientes (nome, email, cpf, senha) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, email, cpf, senha], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true, id: result.insertId });
    });
});

// Login paciente
router.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM pacientes WHERE (email = ? OR cpf = ?) AND senha = ? LIMIT 1';
    db.query(query, [email, email, senha], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length > 0) {
            res.json({ success: true, paciente: results[0] });
        } else {
            res.json({ success: false });
        }
    });
});

module.exports = router;
