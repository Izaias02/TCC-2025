// server.js
require('dotenv').config(); // carregar variáveis de ambiente
const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

// Rotas
const pacientesRoutes = require('./routes/pacientes');
const medicosRoutes = require('./routes/medicos');
const adminRoutes = require('./routes/admin');
const agendamentosRoutes = require('./routes/agendamentos'); // nova rota para agendamentos e relatórios

const app = express();
const PORT = process.env.PORT || 3000;

// ----- MIDDLEWARE -----

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5500', // frontend
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'tcc-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 horas
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    }
}));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// ----- ROTAS -----
app.use('/pacientes', pacientesRoutes);
app.use('/medicos', medicosRoutes);
app.use('/admin', adminRoutes);
app.use('/api', agendamentosRoutes);

// Páginas protegidas
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/pagina-admin', (req, res) => {
    if (!req.session.adminId) return res.send('Acesso negado! Faça login como administrador.');
    res.sendFile(path.join(__dirname, 'public/pagina-admin.html'));
});
app.get('/pagina-medico', (req, res) => {
    if (!req.session.medicoId) return res.send('Acesso negado! Faça login como médico.');
    res.sendFile(path.join(__dirname, 'public/medico.html'));
});
app.get('/pagina-paciente', (req, res) => {
    if (!req.session.pacienteId) return res.send('Acesso negado! Faça login como paciente.');
    res.sendFile(path.join(__dirname, 'public/telapaciente.html'));
});

// ----- INICIAR SERVIDOR -----
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


const express = require('express');
const db = require('./db'); // seu db.js

const app = express();

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    res.json({ success: true, serverTime: rows[0].now });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
