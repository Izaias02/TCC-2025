const express = require("express");
const router = express.Router();
const db = require("../db");

// Middleware para checar se o médico está logado
function verificarMedico(req, res, next) {
  if (!req.session.medicoId) {
    return res.status(401).json({ success: false, message: "Médico não logado" });
  }
  next();
}

// ----------------------------
// LISTAR PACIENTES AGENDADOS
// ----------------------------
router.get("/agendamentos", verificarMedico, async (req, res) => {
  const medicoId = req.session.medicoId;
  const { data } = req.query;

  if (!data) return res.status(400).json({ success: false, message: "Data é obrigatória" });

  try {
    const [rows] = await db.query(
      `SELECT c.id, c.data_horario, c.status,
              p.nome AS paciente_nome, p.cpf AS paciente_cpf,
              m.nome AS medico_nome, m.crm AS medico_crm, m.especialidade
       FROM consultas c
       JOIN pacientes p ON c.paciente_id = p.id
       JOIN medicos m ON m.id = c.medico_id
       WHERE c.medico_id = ? AND DATE(c.data_horario) = ?
       ORDER BY c.data_horario`,
      [medicoId, data]
    );

    res.json({ success: true, consultas: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro ao buscar agendamentos" });
  }
});

// ----------------------------
// SALVAR RELATÓRIO MÉDICO
// ----------------------------
router.post("/relatorios", verificarMedico, async (req, res) => {
  const { pacienteId, nome, exames, relatorio } = req.body;
  const medicoId = req.session.medicoId;

  if (!pacienteId || !nome || !relatorio) {
    return res.status(400).json({ success: false, message: "Dados incompletos" });
  }

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
