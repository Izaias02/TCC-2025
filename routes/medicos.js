const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db");

// ----------------------------
// CADASTRO MÉDICO
// ----------------------------
router.post("/cadastro-medico", async (req, res) => {
  const { nome, email, senha, crm, especialidade, telefone, idade, sexo, nome_unidade, localidade_unidade } = req.body;

  try {
    // Verifica se já existe email ou CRM
    const [existe] = await db.query(
      "SELECT * FROM medicos WHERE email = ? OR crm = ? LIMIT 1",
      [email, crm]
    );
    if (existe.length > 0) return res.json({ success: false, message: "E-mail ou CRM já cadastrado!" });

    // Criptografa senha
    const hashSenha = await bcrypt.hash(senha, 10);

    // Insere médico
    const [result] = await db.query(
      `INSERT INTO medicos 
       (nome, email, senha, crm, especialidade, telefone, idade, sexo, nome_unidade, localidade_unidade)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, hashSenha, crm, especialidade, telefone, idade, sexo, nome_unidade, localidade_unidade]
    );

    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
});

// ----------------------------
// LOGIN MÉDICO
// ----------------------------
router.post("/login", async (req, res) => {
  const { login, senha } = req.body;

  try {
    // Busca médico pelo email ou CRM
    const [results] = await db.query(
      "SELECT * FROM medicos WHERE email = ? OR crm = ? LIMIT 1",
      [login, login]
    );
    if (results.length === 0) return res.json({ success: false, message: "Médico não encontrado" });

    const medico = results[0];

    // Verifica senha
    const senhaCorreta = await bcrypt.compare(senha, medico.senha);
    if (!senhaCorreta) return res.json({ success: false, message: "Senha incorreta" });

    // Salva dados na sessão
    req.session.medicoId = medico.id;
    req.session.medicoNome = medico.nome;

    // Retira senha do retorno
    const { senha: _, ...medicoSemSenha } = medico;
    res.json({ success: true, medico: medicoSemSenha });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

// ----------------------------
// LOGOUT MÉDICO
// ----------------------------
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: "Logout realizado" });
});

// ----------------------------
// LISTAR PACIENTES AGENDADOS
// ----------------------------
router.get("/api/agendamentos", async (req, res) => {
  const medicoId = req.session.medicoId; // pega da sessão
  const { data } = req.query;

  if (!medicoId) return res.status(401).json({ success: false, message: "Médico não logado" });
  if (!data) return res.status(400).json({ success: false, message: "Data é obrigatória" });

  try {
    const [rows] = await db.query(
      `SELECT a.id, p.nome, a.horario
       FROM agendamentos a
       JOIN pacientes p ON a.paciente_id = p.id
       WHERE a.data = ? AND a.medico_id = ?
       ORDER BY a.horario`,
      [data, medicoId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro ao buscar agendamentos" });
  }
});

// ----------------------------
// SALVAR RELATÓRIO MÉDICO
// ----------------------------
router.post("/api/relatorios", async (req, res) => {
  const { pacienteId, nome, exames, relatorio } = req.body;
  const medicoId = req.session.medicoId;

  if (!medicoId) return res.status(401).json({ success: false, message: "Médico não logado" });
  if (!pacienteId || !nome || !relatorio)
    return res.status(400).json({ success: false, message: "Dados incompletos" });

  try {
    const [result] = await db.query(
      `INSERT INTO relatorios_medicos 
       (paciente_id, nome_paciente, pedidos_exames, relatorio, medico_id, data_criacao)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [pacienteId, nome, exames || "", relatorio, medicoId]
    );

    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro ao salvar relatório" });
  }
});

module.exports = router;
