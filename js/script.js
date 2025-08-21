const loginBtn = document.getElementById('loginBtn');
const loginOptions = document.getElementById('loginOptions');

const pacienteBtn = document.getElementById('pacienteBtn');
const medicoBtn = document.getElementById('medicoBtn');

const pacienteForm = document.getElementById('pacienteForm');
const medicoForm = document.getElementById('medicoForm');

loginBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  // Toggle opções e esconde os formulários
  if (loginOptions.style.display === 'block') {
    loginOptions.style.display = 'none';
    pacienteForm.style.display = 'none';
    medicoForm.style.display = 'none';
  } else {
    loginOptions.style.display = 'block';
    pacienteForm.style.display = 'none';
    medicoForm.style.display = 'none';
  }
});

pacienteBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  pacienteForm.style.display = 'block';
  medicoForm.style.display = 'none';
  loginOptions.style.display = 'none';
});

medicoBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  medicoForm.style.display = 'block';
  pacienteForm.style.display = 'none';
  loginOptions.style.display = 'none';
});

// Esconder tudo ao clicar fora
document.addEventListener('click', (e) => {
  if (
    !loginOptions.contains(e.target) &&
    !loginBtn.contains(e.target) &&
    !pacienteForm.contains(e.target) &&
    !medicoForm.contains(e.target)
  ) {
    loginOptions.style.display = 'none';
    pacienteForm.style.display = 'none';
    medicoForm.style.display = 'none';
  }
});