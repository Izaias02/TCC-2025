const express = require("express");
const router = express.Router();
const db = require("../db");

// Listar todas as consultas (com paciente e médico)
router.get("/", async (req, res) => {
  try {
    let sql = `
      SELECT c.id, c.paciente_id, c.medico_id, c.data_horario, c.status, c.descricao,
             p.nome AS paciente,
             m.nome AS medico
      FROM consultas c
      JOIN pacientes p ON p.id = c.paciente_id
      JOIN medicos m ON m.id = c.medico_id
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agendar nova consulta
router.post("/", async (req, res) => {
  try {
    const { paciente_id, medico_id, data_horario, descricao } = req.body;
    const [result] = await db.query(
      "INSERT INTO consultas (paciente_id, medico_id, data_horario, descricao) VALUES (?, ?, ?, ?)",
      [paciente_id, medico_id, data_horario, descricao]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar status ou horário de uma consulta
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data_horario, status } = req.body;
    await db.query("UPDATE consultas SET data_horario=?, status=? WHERE id=?", [data_horario, status, id]);
    res.json({ success: true, message: "Consulta atualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
