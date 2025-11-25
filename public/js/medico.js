// medico.js

// Função para listar pacientes agendados a partir da API
async function listarPacientes(dataSelecionada) {
  const listaContainer = document.getElementById("listaPacientes");
  listaContainer.innerHTML = "<p>Carregando...</p>";

  try {
    // Busca pacientes do backend
    const response = await fetch(`/api/agendamentos?data=${encodeURIComponent(dataSelecionada)}`, {
      credentials: "include" // importante para enviar cookies da sessão
    });

    if (!response.ok) throw new Error("Erro ao buscar agendamentos");

    const agendamentos = await response.json();

    if (!agendamentos || agendamentos.length === 0) {
      listaContainer.innerHTML = "<p class='text-muted'>Nenhum paciente agendado para esta data.</p>";
      return;
    }

    // Monta a lista de agendamentos
    listaContainer.innerHTML = agendamentos.map(a => `
      <div class="border-bottom py-2 d-flex justify-content-between align-items-center">
        <div>
          <strong>${a.nome}</strong><br>
          <small>Horário: ${a.horario}</small>
        </div>
        <button class="btn btn-primary btn-sm rounded-pill" onclick="abrirRelatorio(${a.id}, '${a.nome.replace(/'/g, "\\'")}')">
          Atender
        </button>
      </div>
    `).join("");

  } catch (error) {
    console.error(error);
    listaContainer.innerHTML = "<p class='text-danger'>Não foi possível carregar os agendamentos.</p>";
  }
}

// Abre o modal de relatório médico
function abrirRelatorio(idPaciente, nomePaciente) {
  document.getElementById("nomePaciente").value = nomePaciente;
  document.getElementById("formRelatorio").dataset.pacienteId = idPaciente;

  const modalRelatorio = new bootstrap.Modal(document.getElementById("modalRelatorio"));
  modalRelatorio.show();
}

// Salvar relatório médico no banco
async function salvarRelatorio() {
  const nome = document.getElementById("nomePaciente").value;
  const exames = document.getElementById("pedidosExames").value;
  const relatorio = document.getElementById("textoRelatorio").value;
  const pacienteId = document.getElementById("formRelatorio").dataset.pacienteId;

  if (!nome || !relatorio) {
    alert("Por favor, preencha o relatório antes de salvar.");
    return;
  }

  try {
    const response = await fetch("/api/relatorios", {
      method: "POST",
      credentials: "include", // envia cookies da sessão
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pacienteId, nome, exames, relatorio })
    });

    const result = await response.json();

    if (!result.success) throw new Error(result.message || "Erro ao salvar relatório");

    alert(`Relatório salvo com sucesso para ${nome}!`);

    // Fecha modal e limpa formulário
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalRelatorio"));
    modal.hide();
    document.getElementById("formRelatorio").reset();

  } catch (error) {
    console.error(error);
    alert("Não foi possível salvar o relatório.");
  }
}

// Função para realizar login do médico
async function loginMedico(event) {
  event.preventDefault();
  const login = document.getElementById("loginEmailCRM").value;
  const senha = document.getElementById("loginSenha").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      credentials: "include", // envia cookies da sessão
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, senha })
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.message || "Erro no login");
      return;
    }

    alert(`Bem-vindo, ${result.medico.nome}!`);
    // Aqui você pode redirecionar ou atualizar a UI
    window.location.reload();

  } catch (err) {
    console.error(err);
    alert("Erro no login do médico.");
  }
}

// Função para logout
async function logoutMedico() {
  try {
    const response = await fetch("/logout", { credentials: "include" });
    const result = await response.json();
    if (result.success) window.location.reload();
  } catch (err) {
    console.error(err);
    alert("Erro ao fazer logout.");
  }
}

// Eventos principais
document.addEventListener("DOMContentLoaded", () => {
  const btnVerAgendamentos = document.getElementById("btnVerAgendamentos");
  const btnSalvarRelatorio = document.getElementById("btnSalvarRelatorio");
  const formLogin = document.getElementById("formLogin");
  const btnLogout = document.getElementById("btnLogout");

  btnVerAgendamentos?.addEventListener("click", () => {
    const dataSelecionada = document.getElementById("dataConsulta").value;
    if (!dataSelecionada) return alert("Por favor, selecione uma data.");
    listarPacientes(dataSelecionada);

    const modalPacientes = new bootstrap.Modal(document.getElementById("modalPacientes"));
    modalPacientes.show();
  });

  btnSalvarRelatorio?.addEventListener("click", salvarRelatorio);

  formLogin?.addEventListener("submit", loginMedico);
  btnLogout?.addEventListener("click", logoutMedico);
});
