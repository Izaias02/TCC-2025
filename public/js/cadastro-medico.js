document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formCadastroMedico');
  const opcoesSexo = document.querySelectorAll('.sexo-option-inline');
  const telefoneInput = document.getElementById('telefone');
  let sexoSelecionado = null;

  // ======================
  // Seleção de sexo
  // ======================
  opcoesSexo.forEach(opcao => {
    opcao.addEventListener('click', function() {
      // desmarcar todas
      opcoesSexo.forEach(o => o.classList.remove('selected'));
      // marcar a clicada
      opcao.classList.add('selected');
      sexoSelecionado = opcao.dataset.value;
    });
  });

  // ======================
  // Máscara de telefone
  // ======================
  telefoneInput.addEventListener('input', function(e) {
    let v = e.target.value.replace(/\D/g,'').slice(0,11);
    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    e.target.value = v;
  });

  // ======================
  // Submissão do formulário
  // ======================
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!sexoSelecionado) {
      alert('Selecione o sexo!');
      return;
    }

    alert('Formulário enviado com sucesso!\nSexo selecionado: ' + sexoSelecionado);

    form.reset();
    // desmarcar sexo
    opcoesSexo.forEach(o => o.classList.remove('selected'));
    sexoSelecionado = null;
  });
});
