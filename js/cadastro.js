document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formCadastro');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Aqui você pode validar os campos essa validção tem que ser feita atraves do banco de dados atraves do cpf e da senha 
    
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
const cpfInput = document.getElementById('cpf');

cpfInput.addEventListener('input', function (e) {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, '');

    // Limita a 11 dígitos
    if (value.length > 11) value = value.slice(0, 11);

    // Formata o CPF: 000.000.000-00
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    e.target.value = value;
});
