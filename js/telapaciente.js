/*
document.addEventListener('DOMContentLoaded', function () {
   // Manipulação do botão "Importar Dados" não esta funcionando nada aqui ainda mas deixei a ideia q eu tava tendo na hora bagulho dificil kkkk

  document.getElementById('btn-importar').addEventListener('click', function () {
    // Aqui você fará a importação dos dados via uma requisição AJAX  ou pensei na API  QUE O MARCIO PASSOU para o backend
    fetch('/importar-dados', {
      method: 'GET', // ou 'POST' dependendo da implementação do backend
    })
    .then(response => response.json())
    .then(data => {
      console.log('Dados importados:', data);
      // Aqui você pode manipular a interface conforme a resposta
    })
    .catch(error => console.error('Erro ao importar dados:', error));
  });

  // Manipulação do botão "Retorno" que exibe o modal com as especialidades
  document.getElementById('btn-retorno').addEventListener('click', function () {
    // Abre o modal
    new bootstrap.Modal(document.getElementById('modalEspecialidades')).show();
  });

  // Manipulação dos botões de especialidades
  document.querySelectorAll('[id^="btn-"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const especialidade = btn.innerText.trim();
      mostrarCalendario(especialidade);
    });
  });

  // Função para mostrar o calendário de horários
  function mostrarCalendario(especialidade) {
    const calendario = document.getElementById('calendario');
    calendario.style.display = 'block';

    // Exibir a data de seleção
    const dataInput = document.getElementById('data');
    dataInput.value = '';

    // Gerar os horários disponíveis
    const horariosDiv = document.getElementById('horarios');
    horariosDiv.innerHTML = '';

    let horario = 7 * 60; // Início às 7h
    while (horario <= 17 * 60) {
      const hora = Math.floor(horario / 60);
      const minutos = horario % 60;
      const horarioStr = `${hora}:${minutos < 10 ? '0' + minutos : minutos}`;

      const button = document.createElement('button');
      button.classList.add('btn', 'btn-success', 'm-2', 'rounded-pill');
      button.textContent = horarioStr;

      button.addEventListener('click', function () {
        marcarConsulta(especialidade, horarioStr);
      });

      horariosDiv.appendChild(button);
      horario += 20; // Incremento de 20 minutos
    }
  }

  // Função para marcar consulta
  function marcarConsulta(especialidade, horario) {
    const data = document.getElementById('data').value;

    if (!data) {
      alert('Por favor, selecione uma data.');
      return;
    }

    // Enviar os dados para o backend (exemplo usando fetch)
    fetch('/marcar-consulta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        especialidade: especialidade,
        horario: horario,
        data: data,
      }),
    })
    .then(response => response.json())
    .then(data => {
      alert('Consulta marcada com sucesso!');
      console.log('Consulta marcada:', data);
    })
    .catch(error => console.error('Erro ao marcar consulta:', error));
  }
});*/
