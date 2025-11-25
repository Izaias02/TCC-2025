const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');

// CADASTRO
router.post('/cadastro', async (req, res) => {
    const { nome, email, cpf, senha, idade, sexo, endereco } = req.body;
    try {
        const [existe] = await db.query("SELECT * FROM pacientes WHERE email=? OR cpf=? LIMIT 1", [email, cpf]);
        if (existe.length>0) return res.json({ success: false, message:"E-mail ou CPF já cadastrado!" });

        const hashSenha = await bcrypt.hash(senha, 10);
        const [result] = await db.query(
            `INSERT INTO pacientes (nome,email,cpf,senha,idade,sexo,endereco) VALUES (?,?,?,?,?,?,?)`,
            [nome,email,cpf,hashSenha,idade,sexo,endereco]
        );
        res.json({ success:true, id: result.insertId });
    } catch(err) {
        console.error(err);
        res.status(500).json({ success:false, message:"Erro no servidor" });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { login, senha } = req.body; // CPF ou email
    try {
        const [results] = await db.query("SELECT * FROM pacientes WHERE email=? OR cpf=? LIMIT 1", [login, login]);
        if (results.length===0) return res.json({ success:false, message:"Paciente não encontrado" });

        const paciente = results[0];
        const senhaCorreta = await bcrypt.compare(senha, paciente.senha);
        if (!senhaCorreta) return res.json({ success:false, message:"Senha incorreta" });

        const { senha: _, ...pacienteSemSenha } = paciente;
        res.json({ success:true, paciente: pacienteSemSenha });
    } catch(err) {
        console.error(err);
        res.status(500).json({ success:false, message:"Erro no servidor" });
    }
});

// BUSCAR PACIENTE
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM pacientes WHERE id=?", [id]);
        if (rows.length===0) return res.status(404).json({ success:false, message:"Paciente não encontrado" });
        const { senha, ...pacienteSemSenha } = rows[0];
        res.json({ success:true, paciente: pacienteSemSenha });
    } catch(err) {
        console.error(err);
        res.status(500).json({ success:false, message:"Erro no servidor" });
    }
});

// HISTÓRICO DE CONSULTAS
router.get('/:id/consultas', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(`
            SELECT c.id, c.data_horario, c.status, m.nome AS medico, m.especialidade
            FROM consultas c
            JOIN medicos m ON m.id = c.medico_id
            WHERE c.paciente_id=?
            ORDER BY c.data_horario DESC
        `, [id]);
        res.json(rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({ success:false, message:"Erro no servidor" });
    }
});

// MÉDICOS POR ESPECIALIDADE
router.get('/medicos/especialidade/:especialidade', async (req,res)=>{
    const { especialidade } = req.params;
    try {
        const [rows] = await db.query("SELECT id,nome,crm FROM medicos WHERE especialidade=?", [especialidade]);
        res.json(rows);
    } catch(err){
        res.status(500).json({ success:false, message:"Erro no servidor" });
    }
});

// HORÁRIOS DISPONÍVEIS
router.get('/medico/:id/horarios/:data', async (req,res)=>{
    const { id, data } = req.params;
    try{
        const horarios = [];
        let min = 7*60;
        while(min<=17*60){
            const h=Math.floor(min/60), m=min%60;
            horarios.push(`${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`);
            min+=20;
        }
        const [marcadas] = await db.query(
            "SELECT TIME(data_horario) AS horario FROM consultas WHERE medico_id=? AND DATE(data_horario)=?",
            [id,data]
        );
        const ocupados = marcadas.map(c=>c.horario.slice(0,5));
        res.json(horarios.filter(h=>!ocupados.includes(h)));
    } catch(err){
        res.status(500).json({ success:false, message:"Erro no servidor" });
    }
});

// MARCAR CONSULTA
router.post('/marcar-consulta', async (req,res)=>{
    const { paciente_id, medico_id, data, horario } = req.body;
    try{
        const data_horario = `${data} ${horario}:00`;
        const [result] = await db.query(
            "INSERT INTO consultas (paciente_id, medico_id, data_horario, status) VALUES (?,?,?,?)",
            [paciente_id, medico_id, data_horario, 'Agendada']
        );
        res.json({ success:true, id: result.insertId });
    } catch(err){
        res.status(500).json({ success:false, message:"Erro ao marcar consulta" });
    }
});

module.exports = router;
