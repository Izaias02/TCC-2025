const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const path = require('path');
const bcrypt = require('bcryptjs'); // Para hash e comparação de senhas
const cors = require('cors'); // Para permitir CORS

const app = express();
const PORT = 3000;

// Configuração do CORS para permitir requisições do front-end
app.use(cors({
  origin: 'http://localhost:5000',  // URL do seu front-end (ajuste conforme necessário)
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Configura a sessão
app.use(session({
  secret: 'secret_key',  // Use uma chave secreta única
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Para desenvolvimento local (em produção, use secure: true)
}));

// Configura o Express para usar o JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Função para conectar ao banco de dados
async function connectDB() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'piramidal15',  // Sua senha do banco
    database: 'tcc2025',      // Nome do banco de dados
  });
  return connection;
}

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de login de administrador
app.post('/admin/login', async (req, res) => {
  const { login, senha } = req.body;
  console.log(`Requisição recebida: login = ${login}, senha = ${senha}`);  // Log para depuração

  // Validação de dados
  if (!login || !senha) {
    return res.status(400).json({ success: false, message: 'Login e senha são obrigatórios' });
  }

  try {
    const conn = await connectDB();
    
    // Procura o administrador pelo login
    const [rows] = await conn.execute('SELECT * FROM administradores WHERE login = ?', [login]);

    if (rows.length > 0) {
      const admin = rows[0];
      
      // Compara a senha fornecida com a senha criptografada no banco usando bcrypt
      const passwordMatch = await bcrypt.compare(senha, admin.senha);
      console.log('Senha comparada:', passwordMatch);  // Log para ver se a comparação de senha deu certo

      if (passwordMatch) {
        // Senha válida, cria a sessão
        req.session.admin = admin; // Armazena o admin na sessão
        res.json({ success: true, message: 'Login bem-sucedido!' });
      } else {
        res.status(400).json({ success: false, message: 'Login ou senha inválidos' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Login ou senha inválidos' });
    }

    await conn.end();
  } catch (err) {
    console.error('Erro ao tentar realizar login:', err);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

// Rota protegida para acessar a página do administrador
app.get('/pagina-admin', (req, res) => {
  if (req.session.admin) {
    // Se o admin estiver logado, serve a página administrativa
    res.sendFile(path.join(__dirname, 'public', 'pagina-admin.html'));
  } else {
    // Se não estiver logado, redireciona para a página de login
    res.status(403).json({ success: false, message: 'Acesso negado. Faça login primeiro.' });
  }
});

// Rota de logout do administrador
app.get('/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro ao encerrar a sessão' });
    }
    res.redirect('/');  // Redireciona para a página de login
  });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
