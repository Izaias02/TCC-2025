document.addEventListener('DOMContentLoaded', function() {
  const loginBtn = document.getElementById('loginBtn');
  const loginOptions = document.getElementById('loginOptions');
  const adminBtn = document.getElementById('adminBtn');
  const adminOptions = document.getElementById('adminOptions');
  const pacienteForm = document.getElementById('pacienteForm');
  const medicoForm = document.getElementById('medicoForm');

  // Toggle login dropdown
  loginBtn.addEventListener('click', function(event) {
    loginOptions.style.display = loginOptions.style.display === 'block' ? 'none' : 'block';
    adminOptions.style.display = 'none';
    pacienteForm.style.display = 'none';
    medicoForm.style.display = 'none';
    event.stopPropagation();
  });

  // Exibir painel admin
  adminBtn.addEventListener('click', function(event) {
    adminOptions.style.display = adminOptions.style.display === 'block' ? 'none' : 'block';
    loginOptions.style.display = 'none';
    pacienteForm.style.display = 'none';
    medicoForm.style.display = 'none';
    event.stopPropagation();
  });

  // Exibir formulário paciente
  document.getElementById('pacienteBtn').addEventListener('click', function() {
    loginOptions.style.display = 'none';
    pacienteForm.style.display = 'block';
    adminOptions.style.display = 'none';
    medicoForm.style.display = 'none';
  });

  // Exibir formulário médico
  document.getElementById('medicoBtn').addEventListener('click', function() {
    loginOptions.style.display = 'none';
    medicoForm.style.display = 'block';
    adminOptions.style.display = 'none';
    pacienteForm.style.display = 'none';
  });

  // Fecha dropdowns ao clicar fora
  document.addEventListener('click', function(event) {
    if (!loginBtn.contains(event.target) && !loginOptions.contains(event.target)) {
      loginOptions.style.display = 'none';
    }
    if (!adminBtn.contains(event.target) && !adminOptions.contains(event.target)) {
      adminOptions.style.display = 'none';
    }
  });

  // Login paciente
  pacienteForm.querySelector('form').addEventListener('submit', async function(e){
    e.preventDefault();
    const email = document.getElementById('emailCpf').value;
    const senha = document.getElementById('senha').value;

    try {
      const res = await fetch('http://localhost:3000/pacientes/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('paciente', JSON.stringify(data.paciente));
        window.location.href = 'telapaciente.html';
      } else {
        alert('Email/CPF ou senha inválidos');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    }
  });

  // Login médico
  medicoForm.querySelector('form').addEventListener('submit', async function(e){
    e.preventDefault();
    const crm = document.getElementById('crm').value;
    const senha = document.getElementById('senhaMedico').value;

    try {
      const res = await fetch('http://localhost:3000/medicos/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crm, senha })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('medico', JSON.stringify(data.medico));
        window.location.href = 'medico.html';
      } else {
        alert('CRM ou senha inválidos');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    }
  });
});
