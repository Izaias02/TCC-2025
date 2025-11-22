const express = require("express");
const router = express.Router();
const db = require("../db");

// Retornar todos os médicos
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, nome, crm, especialidade FROM medicos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cadastrar novo médico
router.post("/cadastro", async (req, res) => {
  try {
    const { nome, crm, senha, especialidade } = req.body;

    const [result] = await db.query(
      "INSERT INTO medicos (nome, crm, senha, especialidade) VALUES (?, ?, ?, ?)",
      [nome, crm, senha, especialidade]
    );

    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login médico
router.post("/login", async (req, res) => {
  try {
    const { crm, senha } = req.body;

    const [results] = await db.query(
      "SELECT id, nome, crm, especialidade FROM medicos WHERE crm = ? AND senha = ? LIMIT 1",
      [crm, senha]
    );

    if (results.length > 0) {
      res.json({ success: true, medico: results[0] });
    } else {
      res.json({ success: false, message: "CRM ou senha inválidos" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
