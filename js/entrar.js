document.addEventListener('DOMContentLoaded', function () {
  const entrarPacienteBtn = document.getElementById('entrarPaciente');
  if (entrarPacienteBtn) {
    entrarPacienteBtn.addEventListener('click', function () {
      window.location.href = 'telapaciente.html';
    });
  }

  // Exemplo para futuro, você pode adicionar funções aqui
  console.log("Página entrar.html carregada");
});
