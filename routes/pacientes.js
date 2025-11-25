const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

// Login paciente
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Buscar paciente pelo email ou CPF
        const query = 'SELECT * FROM pacientes WHERE email = ? OR cpf = ? LIMIT 1';
        const [results] = await db.query(query, [email, email]);

        if (results.length === 0) {
            return res.json({ success: false, message: 'Paciente não encontrado' });
        }

        const paciente = results[0];

        // Comparar a senha usando bcrypt
        const senhaCorreta = await bcrypt.compare(senha, paciente.senha);
        if (!senhaCorreta) {
            return res.json({ success: false, message: 'Senha incorreta' });
        }

        // Retornar sucesso e dados do paciente (sem a senha!)
        const { senha: _, ...pacienteSemSenha } = paciente;
        res.json({ success: true, paciente: pacienteSemSenha });
        
    } catch (err) {
        console.error('Erro login paciente:', err);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
});

module.exports = router;
