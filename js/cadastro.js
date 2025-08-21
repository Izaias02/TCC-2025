document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formCadastro');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede envio padrão
    // Aqui você pode validar os campos, se quiser
    window.location.href = 'index.html'; // Redireciona para a página inicial
  });

  // Lógica do dropdown de sexo
  const btnSexo = document.getElementById('btnSexo');
  const sexoOptions = document.getElementById('sexoOptions');
  let sexoSelecionado = null;

  btnSexo.addEventListener('click', () => {
    if (sexoOptions.style.display === 'block') {
      sexoOptions.style.display = 'none';
    } else {
      sexoOptions.style.display = 'block';
    }
  });

  sexoOptions.querySelectorAll('.sexo-option').forEach(option => {
    option.addEventListener('click', () => {
      sexoSelecionado = option.getAttribute('data-value');
      btnSexo.textContent = sexoSelecionado;
      sexoOptions.style.display = 'none';
    });
  });

  // Fechar opções se clicar fora
  document.addEventListener('click', (e) => {
    if (!btnSexo.contains(e.target) && !sexoOptions.contains(e.target)) {
      sexoOptions.style.display = 'none';
    }
  });
});