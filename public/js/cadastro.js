document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formCadastro');

  const btnSexo = document.getElementById('btnSexo');
  const sexoOptions = document.getElementById('sexoOptions');
  let sexoSelecionado = null;

  // Toggle dropdown sexo
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

  // Fecha dropdown clicando fora
  document.addEventListener('click', (e) => {
    if (!btnSexo.contains(e.target) && !sexoOptions.contains(e.target)) {
      sexoOptions.style.display = 'none';
    }
  });

  // Máscara de CPF
  const cpfInput = document.getElementById('cpf');
  cpfInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // remove não números
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
  });

  // Funções de validação
  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
  }

  function validarTelefone(telefone) {
    // Aceita formatos: (00)00000-0000 ou 00000000000
    const regex = /^\(?\d{2}\)?\d{4,5}-?\d{4}$/;
    return regex.test(telefone);
  }

  function validarCEP(cep) {
    const regex = /^\d{5}-?\d{3}$/;
    return regex.test(cep);
  }

  // Submissão do formulário
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const confirmEmail = document.getElementById('confirmEmail').value.trim();
    const cpf = document.getElementById('cpf').value.replace(/\D/g, ''); // remove máscara
    const senha = document.getElementById('senha').value.trim();
    const confirmSenha = document.getElementById('confirmSenha').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const municipio = document.getElementById('municipio').value.trim();
    const numeroCasa = document.getElementById('numeroCasa').value.trim();
    const idade = parseInt(document.getElementById('idade').value.trim(), 10);

    // Validações básicas
    if (email !== confirmEmail) { alert("Emails não conferem!"); return; }
    if (senha !== confirmSenha) { alert("Senhas não conferem!"); return; }
    if (!sexoSelecionado) { alert("Selecione o sexo!"); return; }
    if (!validarCPF(cpf)) { alert("CPF inválido!"); return; }
    if (!validarTelefone(telefone)) { alert("Telefone inválido!"); return; }
    if (!validarCEP(cep)) { alert("CEP inválido!"); return; }

    try {
      const response = await fetch('http://localhost:3000/pacientes/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          cpf,
          senha,
          telefone,
          endereco,
          cep,
          municipio,
          numero_casa: numeroCasa,
          idade,
          sexo: sexoSelecionado
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Cadastro realizado com sucesso! ID: ' + data.id);
        form.reset();
        sexoSelecionado = null;
        btnSexo.textContent = 'Selecione o sexo';
        window.location.href = 'index.html';
      } else {
        alert('Erro ao cadastrar paciente: ' + (data.message || 'Verifique os dados.'));
      }

    } catch (err) {
      console.error(err);
      alert('Erro na comunicação com o servidor');
    }
  });
});
