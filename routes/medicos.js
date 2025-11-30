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
    const [existe] = await db.query(
      "SELECT * FROM medicos WHERE email = ? OR crm = ? LIMIT 1",
      [email, crm]
    );
    if (existe.length > 0) return res.json({ success: false, message: "E-mail ou CRM já cadastrado!" });

    const hashSenha = await bcrypt.hash(senha, 10);

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
    const [results] = await db.query(
      "SELECT * FROM medicos WHERE email = ? OR crm = ? LIMIT 1",
      [login, login]
    );
    if (results.length === 0) return res.json({ success: false, message: "Médico não encontrado" });

    const medico = results[0];
    const senhaCorreta = await bcrypt.compare(senha, medico.senha);
    if (!senhaCorreta) return res.json({ success: false, message: "Senha incorreta" });

    // SALVA ID DO MÉDICO NA SESSÃO
    req.session.medicoId = medico.id;
    req.session.medicoNome = medico.nome;

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

module.exports = router;
