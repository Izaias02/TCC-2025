// js/HistoricoPaciente.js

// ==============================
// HISTÓRICO MÉDICO (fictício)
// ==============================
const historicoFicticio = [
  {
    data: "10/03/2024",
    descricao: "Consulta de rotina",
    observacoes: "Paciente com boa saúde geral. Pressão normal.",
    medico: "Dr. João Silva"
  },
  {
    data: "25/06/2024",
    descricao: "Exame de sangue",
    observacoes: "Resultados dentro da normalidade.",
    medico: "Dra. Maria Souza"
  },
  {
    data: "15/09/2024",
    descricao: "Consulta de retorno",
    observacoes: "Acompanhamento de colesterol — valores reduzidos.",
    medico: "Dr. João Silva"
  }
];

// Função para exibir o histórico médico
function exibirHistorico() {
  const container = document.getElementById("conteudoHistorico");
  container.innerHTML = "<p>Carregando histórico...</p>";

  setTimeout(() => {
    if (historicoFicticio.length > 0) {
      container.innerHTML = historicoFicticio.map(item => `
        <div class="border-bottom pb-2 mb-3">
          <h6 class="text-info fw-bold">${item.data} - ${item.descricao}</h6>
          <p class="mb-1"><strong>Observações:</strong> ${item.observacoes}</p>
          <p class="text-muted mb-0"><em>Médico responsável: ${item.medico}</em></p>
        </div>
      `).join('');
    } else {
      container.innerHTML = "<p class='text-muted'>Nenhum histórico disponível.</p>";
    }
  }, 800);
}

// ==============================
// AGENDAMENTO DE RETORNO
// ==============================

// Função que gera horários de 20 min (08h–12h e 13h–17h)
function gerarHorarios() {
  const horarios = [];
  const periodos = [
    { inicio: 8, fim: 12 },
    { inicio: 13, fim: 17 }
  ];

  periodos.forEach(periodo => {
    for (let hora = periodo.inicio; hora < periodo.fim; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 20) {
        const h = hora.toString().padStart(2, "0");
        const m = minuto.toString().padStart(2, "0");
        horarios.push(`${h}:${m}`);
      }
    }
  });

  return horarios;
}

// Preenche os horários válidos no select
function preencherHorarios() {
  const select = document.getElementById("horarioRetorno");
  select.innerHTML = '<option value="">Selecione o horário...</option>';
  gerarHorarios().forEach(h => {
    const option = document.createElement("option");
    option.value = h;
    option.textContent = h;
    select.appendChild(option);
  });
}

// Impede datas de fim de semana
function validarData() {
  const inputData = document.getElementById("dataRetorno");
  const data = new Date(inputData.value + "T00:00:00");
  const diaSemana = data.getDay(); // 0 = domingo, 6 = sábado

  if (diaSemana === 0 || diaSemana === 6) {
    alert("Selecione um dia de semana (segunda a sexta).");
    inputData.value = "";
  }
}

// Simula o salvamento do retorno no banco de dados
function salvarRetorno() {
  const especialidade = document.getElementById("especialidade").value;
  const data = document.getElementById("dataRetorno").value;
  const horario = document.getElementById("horarioRetorno").value;

  if (!especialidade || !data || !horario) {
    alert("Por favor, preencha todos os campos antes de salvar.");
    return;
  }

  // Aqui futuramente fará uma requisição ao backend
  const dados = { especialidade, data, horario };
  console.log("Dados salvos (simulação):", dados);

  alert(`Retorno agendado com sucesso!\n\nEspecialidade: ${especialidade}\nData: ${data}\nHorário: ${horario}`);

  // Fecha o modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalRetorno"));
  modal.hide();
}

// ==============================
// EVENTOS DE INICIALIZAÇÃO
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const btnHistorico = document.getElementById("btn-historico");
  const btnRetorno = document.getElementById("btn-retorno");
  const btnSalvar = document.getElementById("btnSalvarRetorno");
  const inputData = document.getElementById("dataRetorno");

  // Modal Histórico
  if (btnHistorico) {
    const modalHistorico = new bootstrap.Modal(document.getElementById("modalHistorico"));
    btnHistorico.addEventListener("click", () => {
      exibirHistorico();
      modalHistorico.show();
    });
  }

  // Modal Retorno
  if (btnRetorno) {
    const modalRetorno = new bootstrap.Modal(document.getElementById("modalRetorno"));
    btnRetorno.addEventListener("click", () => {
      preencherHorarios();
      modalRetorno.show();
    });
  }

  // Eventos do formulário de retorno
  if (inputData) inputData.addEventListener("change", validarData);
  if (btnSalvar) btnSalvar.addEventListener("click", salvarRetorno);
});
