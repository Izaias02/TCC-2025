const express = require('express');
const path = require('path');
const session = require('express-session');

// Rotas
const pacientesRoutes = require('./routes/pacientes');
const medicosRoutes = require('./routes/medicos');
const adminRoutes = require('./routes/admin');
const agendamentosRoutes = require('./routes/agendamentos'); // nova rota

const app = express();

// Middleware para JSON e URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessão
app.use(session({
    secret: 'tcc-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60, httpOnly: true, sameSite: 'lax', secure: false }
}));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/pacientes', pacientesRoutes);
app.use('/medicos', medicosRoutes);
app.use('/admin', adminRoutes);
app.use('/api', agendamentosRoutes); // nova rota para agendamentos e relatórios

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Página admin protegida
app.get('/pagina-admin', (req, res) => {
    if (!req.session.adminId) return res.send('Acesso negado! Faça login como administrador.');
    res.sendFile(path.join(__dirname, 'public/pagina-admin.html'));
});

// Iniciar servidor
app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
