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
   

    // aqui esta os login's e as senhas !!!
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
});

