document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formCadastro');
  const btnSexo = document.getElementById('btnSexo');
  const sexoOptions = document.getElementById('sexoOptions');
  let sexoSelecionado = null;

  // Dropdown de sexo
  btnSexo.addEventListener('click', () => {
    sexoOptions.style.display = sexoOptions.style.display === 'block' ? 'none' : 'block';
  });

  sexoOptions.querySelectorAll('.sexo-option').forEach(option => {
    option.addEventListener('click', () => {
      sexoSelecionado = option.dataset.value;
      btnSexo.textContent = sexoSelecionado;
      sexoOptions.style.display = 'none';
    });
  });

  // Fecha dropdown se clicar fora
  document.addEventListener('click', e => {
    if (!btnSexo.contains(e.target) && !sexoOptions.contains(e.target)) {
      sexoOptions.style.display = 'none';
    }
  });

  // Máscaras simples para telefone e CPF
  const telefoneInput = document.getElementById('telefone');
  const cpfInput = document.getElementById('cpf');

  telefoneInput.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    e.target.value = v;
  });

  cpfInput.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_, a, b, c, d) => {
      return d ? `${a}.${b}.${c}-${d}` : `${a}.${b}.${c}`;
    });
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
    const cpf = cpfInput.value.trim();
    const telefone = telefoneInput.value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const municipio = document.getElementById('municipio').value.trim();
    const numeroCasa = document.getElementById('numeroCasa').value.trim();
    const idade = parseInt(document.getElementById('idade').value.trim(), 10);

    // Validações
    if (senha !== confirmSenha) return alert('As senhas não conferem!');
    if (email !== confirmEmail) return alert('Emails não conferem!');
    if (!sexoSelecionado) return alert('Selecione o sexo!');
    if (!nome || !email || !cpf || !telefone || !endereco || !cep || !municipio || !numeroCasa || !idade) {
      return alert('Preencha todos os campos!');
    }

    try {
      const response = await fetch('http://localhost:3000/pacientes/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome, email, senha, cpf, telefone,
          endereco, cep, municipio, numero_casa: numeroCasa,
          idade, sexo: sexoSelecionado
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
