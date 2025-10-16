document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginOptions = document.getElementById("loginOptions");
  const pacienteBtn = document.getElementById("pacienteBtn");
  const medicoBtn = document.getElementById("medicoBtn");
  const adminBtn = document.getElementById("adminBtn");

  const pacienteForm = document.getElementById("pacienteForm");
  const medicoForm = document.getElementById("medicoForm");
  const adminOptions = document.getElementById("adminOptions");

  const adminModal = new bootstrap.Modal(document.getElementById('adminLoginModal'));
  const adminLoginForm = document.getElementById('adminLoginForm');
  const erroMsg = document.getElementById('adminLoginErro');

  // Esconde todos os elementos ao carregar a página
  loginOptions.style.display = 'none';
  adminOptions.style.display = 'none';
  pacienteForm.style.display = 'none';
  medicoForm.style.display = 'none';
  erroMsg.style.display = 'none';

  // Mostrar/esconder menu de login ao clicar no botão "Login"
  loginBtn.addEventListener("click", () => {
    toggleDisplay(loginOptions);
    pacienteForm.style.display = "none";
    medicoForm.style.display = "none";
    adminOptions.style.display = "none";
  });

  // Mostrar formulário de paciente
  pacienteBtn.addEventListener("click", () => {
    pacienteForm.style.display = "block";
    medicoForm.style.display = "none";
    adminOptions.style.display = "none";
  });

  // Mostrar formulário de médico
  medicoBtn.addEventListener("click", () => {
    medicoForm.style.display = "block";
    pacienteForm.style.display = "none";
    adminOptions.style.display = "none";
  });

  // Mostrar modal de login do administrador
  adminBtn.addEventListener('click', () => {
    adminModal.show();
  });

  // Lógica de login do administrador
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const login = document.getElementById('adminLogin').value.trim().toLowerCase();
    const senha = document.getElementById('adminSenha').value.trim().toLowerCase();

    // Usuários válidos (para testes locais)
    const validUsers = [
      { login: 'izaias salgado dos santos', senha: 'chutaobalde' },
      { login: 'vinicius pires rodrigues', senha: 'vamostropa' },
      { login: 'joao pedro mendes fernandes', senha: 'vaibrasil' }
    ];

    const valido = validUsers.some(user => user.login === login && user.senha === senha);

    if (valido) {
      // Salva sessão no localStorage
      localStorage.setItem('adminLogado', 'true');

      // Redireciona para a página do admin
      window.location.href = 'pagina-admin.html';
    } else {
      // Mostra mensagem de erro
      erroMsg.style.display = 'block';
    }
  });

  function toggleDisplay(element) {
    element.style.display = (element.style.display === "block") ? "none" : "block";
  }
});
document.getElementById('formPesquisa').addEventListener('submit', function(e) {
  e.preventDefault();

  const cpfCrm = document.getElementById('cpfCrm').value.trim();
  const data = document.getElementById('dataConsulta').value;
  const resultadoDiv = document.getElementById('resultadoPesquisa');
  resultadoDiv.innerHTML = '';

  if (!cpfCrm) {
    alert('Por favor, digite o CPF ou CRM');
    return;
  }

  if (cpfCrm.toUpperCase().startsWith('CRM') && !data) {
    alert('Para médico, informe a data');
    return;
  }

  // Aqui só um feedback simples para o front
  resultadoDiv.innerHTML = `
    <p><strong>Pesquisando para:</strong> ${cpfCrm}</p>
    ${data ? `<p><strong>Na data:</strong> ${data}</p>` : ''}
    <p>Aqui aparecerão os dados retornados do backend.</p>
  `;
});



/* CPF paciente: 12345678900 → mostra 2 consultas (uma realizada, uma agendada)

CRM médico: CRM1234 + data: 2025-10-16 → mostra 2 consultas agendadas

*/





































/*document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginOptions = document.getElementById("loginOptions");
  const pacienteBtn = document.getElementById("pacienteBtn");
  const medicoBtn = document.getElementById("medicoBtn");
  const adminBtn = document.getElementById("adminBtn");

  const pacienteForm = document.getElementById("pacienteForm");
  const medicoForm = document.getElementById("medicoForm");
  const adminOptions = document.getElementById("adminOptions");

  const adminModal = new bootstrap.Modal(document.getElementById('adminLoginModal'));
  const adminLoginForm = document.getElementById('adminLoginForm');
  const erroMsg = document.getElementById('adminLoginErro');

  // Inicialmente esconder tudo
  loginOptions.style.display = 'none';
  adminOptions.style.display = 'none';
  pacienteForm.style.display = 'none';
  medicoForm.style.display = 'none';
  erroMsg.style.display = 'none';

  loginBtn.addEventListener("click", () => {
    toggleDisplay(loginOptions);
    pacienteForm.style.display = "none";
    medicoForm.style.display = "none";
    adminOptions.style.display = "none";
  });

  pacienteBtn.addEventListener("click", () => {
    pacienteForm.style.display = "block";
    medicoForm.style.display = "none";
    adminOptions.style.display = "none";
  });

  medicoBtn.addEventListener("click", () => {
    medicoForm.style.display = "block";
    pacienteForm.style.display = "none";
    adminOptions.style.display = "none";
  });

  adminBtn.addEventListener('click', () => {
    adminModal.show(); // Só abre o modal, sem mostrar opções ainda
  });

  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const login = document.getElementById('adminLogin').value.trim().toLowerCase();
    const senha = document.getElementById('adminSenha').value.trim().toLowerCase();
   

    // aqui esta os login's e as senhas !!! depois temos que fazer atraves de uma criptografia do jeito que o marcio fez no segundo semestre 
    const validUsers = [
      { login: 'izaias salgado dos santos', senha: 'chutaobalde' },
      { login: 'vinicius pires rodrigues', senha: 'vamostropa' },
      { login: 'joao pedro mendes fernandes', senha: 'vaibrasil' }
    ];

    const valido = validUsers.some(user => user.login === login && user.senha === senha);

    if (valido) {
      adminOptions.style.display = 'block';
      pacienteForm.style.display = 'none';
      medicoForm.style.display = 'none';
      erroMsg.style.display = 'none';

      adminModal.hide();
      adminLoginForm.reset();
    } else {
      erroMsg.style.display = 'block';
    }
  });

  function toggleDisplay(element) {
    element.style.display = (element.style.display === "block") ? "none" : "block";
  }
});*/

