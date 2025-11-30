// server.js
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
const PORT = 3000;

// ----- MIDDLEWARE -----

// Aceitar requisições do frontend em outra porta (ex: localhost:5500) e enviar cookies
app.use(cors({
    origin: 'http://localhost:5500', // altere para a porta do seu frontend
    credentials: true
}));

// Parse JSON e URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração de sessão
app.use(session({
    secret: 'tcc-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 horas
        httpOnly: true,
        sameSite: 'lax', // importante para frontend em outra porta
        secure: false
    }
}));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// ----- ROTAS -----
app.use('/pacientes', pacientesRoutes);
app.use('/medicos', medicosRoutes);
app.use('/admin', adminRoutes);
app.use('/api', agendamentosRoutes); // rota para agendamentos e relatórios

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Página admin protegida
app.get('/pagina-admin', (req, res) => {
    if (!req.session.adminId) return res.send('Acesso negado! Faça login como administrador.');
    res.sendFile(path.join(__dirname, 'public/pagina-admin.html'));
});

// Página médico protegida
app.get('/pagina-medico', (req, res) => {
    if (!req.session.medicoId) return res.send('Acesso negado! Faça login como médico.');
    res.sendFile(path.join(__dirname, 'public/medico.html'));
});

// Página paciente protegida
app.get('/pagina-paciente', (req, res) => {
    if (!req.session.pacienteId) return res.send('Acesso negado! Faça login como paciente.');
    res.sendFile(path.join(__dirname, 'public/telapaciente.html'));
});

// ----- INICIAR SERVIDOR -----
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
