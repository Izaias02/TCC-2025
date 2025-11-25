document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formCadastroMedico');
  const btnSexo = document.getElementById('btnSexo');
  const sexoOptions = document.getElementById('sexoOptions');
  let sexoSelecionado = null;

  // Dropdown de sexo com animação
  btnSexo.addEventListener('click', () => {
    sexoOptions.classList.toggle('show');
  });

  sexoOptions.querySelectorAll('.sexo-option').forEach(option => {
    option.addEventListener('click', () => {
      sexoSelecionado = option.dataset.value;
      btnSexo.textContent = sexoSelecionado;
      sexoOptions.classList.remove('show');
    });
  });

  // Fecha dropdown se clicar fora
  document.addEventListener('click', e => {
    if (!btnSexo.contains(e.target) && !sexoOptions.contains(e.target)) {
      sexoOptions.classList.remove('show');
    }
  });

  // Máscara simples para telefone
  const telefoneInput = document.getElementById('telefone');
  telefoneInput.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    e.target.value = v;
  });

  // Submissão do formulário
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const confirmEmail = document.getElementById('confirmEmail').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmSenha = document.getElementById('confirmSenha').value.trim();
    const crm = document.getElementById('crm').value.trim();
    const telefone = telefoneInput.value.trim();
    const idade = parseInt(document.getElementById('idade').value.trim(), 10);
    const especialidade = document.getElementById('especialidade').value.trim();
    const nomeUnidade = document.getElementById('nomeUnidade').value.trim();
    const localidadeUnidade = document.getElementById('localidadeUnidade').value.trim();

    // Validações
    if (senha !== confirmSenha) return alert('As senhas não conferem!');
    if (email !== confirmEmail) return alert('Emails não conferem!');
    if (!sexoSelecionado) return alert('Selecione o sexo!');
    if (!nome || !email || !crm || !telefone || !idade || !especialidade || !nomeUnidade || !localidadeUnidade) {
      return alert('Preencha todos os campos!');
    }

    try {
      const response = await fetch('http://localhost:3000/medicos/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          senha,
          crm,
          telefone,
          idade,
          especialidade,
          sexo: sexoSelecionado,
          nome_unidade: nomeUnidade,
          localidade_unidade: localidadeUnidade
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Cadastro do médico realizado com sucesso! ID: ' + data.id);
        form.reset();
        sexoSelecionado = null;
        btnSexo.textContent = 'Selecione o sexo';
        window.location.href = 'pagina-admin.html';
      } else {
        alert('Erro ao cadastrar médico: ' + (data.message || 'Verifique os dados.'));
      }
    } catch (err) {
      console.error(err);
      alert('Erro na comunicação com o servidor');
    }
  });
});
