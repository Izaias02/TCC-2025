const express = require('express');
const path = require('path');
const session = require('express-session');
const pacientesRoutes = require('./routes/pacientes');
const adminRoutes = require('./routes/admin');
const medicosRoutes = require('./routes/medicos');

const app = express();

// Middleware para JSON e URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessão configurada para localhost
app.use(session({
    secret: 'tcc-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hora
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    }
}));

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/pacientes', pacientesRoutes);
app.use('/medicos', medicosRoutes);
app.use('/admin', adminRoutes);

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Página admin protegida
app.get('/pagina-admin', (req, res) => {
    if (!req.session.adminId) {
        return res.send('Acesso negado! Faça login como administrador.');
    }
    res.sendFile(path.join(__dirname, 'public/pagina-admin.html'));
});

// Iniciar servidor
app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
