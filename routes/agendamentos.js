const express = require('express');
const router = express.Router();
const db = require('../db'); // conexão com o MySQL

// ==============================
// GET: Pacientes agendados por data
// ==============================
router.get('/agendamentos', async (req, res) => {
  const { data } = req.query;

  if (!data) {
    return res.status(400).json({ success: false, message: "Data é obrigatória" });
  }

  try {
    // Pega o médico logado da sessão
    const medicoId = req.session.medicoId;
    if (!medicoId) {
      return res.status(401).json({ success: false, message: "Médico não logado" });
    }

    const [agendamentos] = await db.query(
      `SELECT a.id, p.nome, a.horario
       FROM agendamentos a
       JOIN pacientes p ON a.paciente_id = p.id
       WHERE a.data = ? AND a.medico_id = ?
       ORDER BY a.horario`,
      [data, medicoId]
    );

    res.json(agendamentos);

  } catch (err) {
    console.error("Erro ao buscar agendamentos:", err);
    res.status(500).json({ success: false, message: "Erro ao buscar agendamentos" });
  }
});

// ==============================
// POST: Salvar relatório médico
// ==============================
router.post('/relatorios', async (req, res) => {
  const { pacienteId, nome, exames, relatorio } = req.body;

  if (!pacienteId || !nome || !relatorio) {
    return res.status(400).json({ success: false, message: "Dados incompletos" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO relatorios_medicos 
       (paciente_id, nome_paciente, pedidos_exames, relatorio, data_criacao)
       VALUES (?, ?, ?, ?, NOW())`,
      [pacienteId, nome, exames || "", relatorio]
    );

    res.json({ success: true, id: result.insertId });

  } catch (err) {
    console.error("Erro ao salvar relatório:", err);
    res.status(500).json({ success: false, message: "Erro ao salvar relatório" });
  }
});

module.exports = router;
