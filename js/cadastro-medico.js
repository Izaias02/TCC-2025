document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formCadastro');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Aqui você pode validar os campos
    window.location.href = 'index.html'; // redireciona após cadastro
  });

  const btnSexo = document.getElementById('btnSexo');
  const sexoOptions = document.getElementById('sexoOptions');
  let sexoSelecionado = null;

  btnSexo.addEventListener('click', () => {
    sexoOptions.style.display = sexoOptions.style.display === 'block' ? 'none' : 'block';
  });

  sexoOptions.querySelectorAll('.sexo-option').forEach(option => {
    option.addEventListener('click', () => {
      sexoSelecionado = option.getAttribute('data-value');
      btnSexo.textContent = sexoSelecionado;
      sexoOptions.style.display = 'none';
    });
  });

  document.addEventListener('click', (e) => {
    if (!btnSexo.contains(e.target) && !sexoOptions.contains(e.target)) {
      sexoOptions.style.display = 'none';
    }
  });
});
