
// js/medico.js

// Simulação de pacientes agendados (banco fictício)
const agendamentosFicticios = {
  "2025-10-28": [
    { id: 1, nome: "João da Silva", horario: "09:00" },
    { id: 2, nome: "Maria Oliveira", horario: "10:20" },
    { id: 3, nome: "Pedro Santos", horario: "14:40" }
  ],
  "2025-10-29": [
    { id: 4, nome: "Ana Costa", horario: "08:40" },
    { id: 5, nome: "Rafael Souza", horario: "11:00" }
  ]
};

// Função para listar pacientes agendados
function listarPacientes(dataSelecionada) {
  const listaContainer = document.getElementById("listaPacientes");
  listaContainer.innerHTML = "<p>Carregando...</p>";

  setTimeout(() => {
    const pacientes = agendamentosFicticios[dataSelecionada] || [];

    if (pacientes.length === 0) {
      listaContainer.innerHTML = "<p class='text-muted'>Nenhum paciente agendado para esta data.</p>";
      return;
    }

    const lista = pacientes.map(p => `
      <div class="border-bottom py-2 d-flex justify-content-between align-items-center">
        <div>
          <strong>${p.nome}</strong><br>
          <small>Horário: ${p.horario}</small>
        </div>
        <button class="btn btn-primary btn-sm rounded-pill" onclick="abrirRelatorio(${p.id}, '${p.nome}')">
          Atender
        </button>
      </div>
    `).join("");

    listaContainer.innerHTML = lista;
  }, 500);
}

// Abre o modal de relatório médico
function abrirRelatorio(idPaciente, nomePaciente) {
  const inputNome = document.getElementById("nomePaciente");
  inputNome.value = nomePaciente;

  const modalRelatorio = new bootstrap.Modal(document.getElementById("modalRelatorio"));
  modalRelatorio.show();
}

// Simula o salvamento do relatório no banco
function salvarRelatorio() {
  const nome = document.getElementById("nomePaciente").value;
  const exames = document.getElementById("pedidosExames").value;
  const relatorio = document.getElementById("textoRelatorio").value;

  if (!nome || !relatorio) {
    alert("Por favor, preencha o relatório antes de salvar.");
    return;
  }

  const dados = { nome, exames, relatorio };
  console.log("Relatório salvo (simulado):", dados);

  alert(`Relatório salvo com sucesso para ${nome}!`);

  // Fecha o modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalRelatorio"));
  modal.hide();

  // Limpa o formulário
  document.getElementById("formRelatorio").reset();
}

// Eventos principais
document.addEventListener("DOMContentLoaded", () => {
  const btnVerAgendamentos = document.getElementById("btnVerAgendamentos");
  const btnSalvarRelatorio = document.getElementById("btnSalvarRelatorio");

  // Ver agendamentos
  if (btnVerAgendamentos) {
    btnVerAgendamentos.addEventListener("click", () => {
      const dataSelecionada = document.getElementById("dataConsulta").value;

      if (!dataSelecionada) {
        alert("Por favor, selecione uma data.");
        return;
      }

      listarPacientes(dataSelecionada);
      const modalPacientes = new bootstrap.Modal(document.getElementById("modalPacientes"));
      modalPacientes.show();
    });
  }

  // Salvar relatório
  if (btnSalvarRelatorio) {
    btnSalvarRelatorio.addEventListener("click", salvarRelatorio);
  }
});
