// medico.js (frontend)
document.addEventListener("DOMContentLoaded", () => {
  const btnVerAgendamentos = document.getElementById("btnVerAgendamentos");
  const btnSalvarRelatorio = document.getElementById("btnSalvarRelatorio");
  const formLogin = document.getElementById("formLogin");
  const btnLogout = document.getElementById("btnLogout");
  const listaContainer = document.getElementById("listaPacientes");

  // ----------------------------
  // Listar pacientes agendados para uma data
  // ----------------------------
  async function listarPacientes(dataSelecionada) {
    listaContainer.innerHTML = "<p>Carregando...</p>";

    try {
      const medicoId = localStorage.getItem("medicoId");
      if (!medicoId) throw new Error("Médico não logado");

      const response = await fetch(`/api/agendamentos?data=${encodeURIComponent(dataSelecionada)}`, {
        credentials: "include"
      });

      if (!response.ok) throw new Error("Erro ao buscar agendamentos");

      const data = await response.json();

      if (!data.success || !data.consultas || data.consultas.length === 0) {
        listaContainer.innerHTML = "<p class='text-muted'>Nenhum paciente agendado para esta data.</p>";
        return;
      }

      listaContainer.innerHTML = data.consultas.map(c => {
        const dataHora = new Date(c.data_horario).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
        return `
          <div class="border-bottom py-2 d-flex justify-content-between align-items-center">
            <div>
              <strong>${c.paciente_nome}</strong><br>
              <small>Horário: ${dataHora}</small>
            </div>
            <button class="btn btn-primary btn-sm rounded-pill" onclick="abrirRelatorio(${c.id}, '${c.paciente_nome.replace(/'/g, "\\'")}')">
              Atender
            </button>
          </div>
        `;
      }).join("");

    } catch (error) {
      console.error(error);
      listaContainer.innerHTML = "<p class='text-danger'>Não foi possível carregar os agendamentos.</p>";
    }
  }

  // ----------------------------
  // Abrir modal do relatório
  // ----------------------------
  window.abrirRelatorio = function(idPaciente, nomePaciente) {
    document.getElementById("nomePaciente").value = nomePaciente;
    document.getElementById("formRelatorio").dataset.pacienteId = idPaciente;

    const modalRelatorio = new bootstrap.Modal(document.getElementById("modalRelatorio"));
    modalRelatorio.show();
  };

  // ----------------------------
  // Salvar relatório médico
  // ----------------------------
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
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pacienteId, nome, exames, relatorio })
      });

      const result = await response.json();

      if (!result.success) throw new Error(result.message || "Erro ao salvar relatório");

      alert(`Relatório salvo com sucesso para ${nome}!`);
      const modal = bootstrap.Modal.getInstance(document.getElementById("modalRelatorio"));
      modal.hide();
      document.getElementById("formRelatorio").reset();

    } catch (error) {
      console.error(error);
      alert("Não foi possível salvar o relatório.");
    }
  }

  // ----------------------------
  // Login médico
  // ----------------------------
  async function loginMedico(event) {
    event.preventDefault();
    const login = document.getElementById("loginEmailCRM").value;
    const senha = document.getElementById("loginSenha").value;

    try {
      const response = await fetch("/medicos/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, senha })
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message || "Erro no login");
        return;
      }

      localStorage.setItem("medicoId", result.medico.id);
      alert(`Bem-vindo, ${result.medico.nome}!`);
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Erro no login do médico.");
    }
  }

  // ----------------------------
  // Logout médico
  // ----------------------------
  async function logoutMedico() {
    try {
      const response = await fetch("/medicos/logout", { credentials: "include" });
      const result = await response.json();
      if (result.success) {
        localStorage.removeItem("medicoId");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao fazer logout.");
    }
  }

  // ----------------------------
  // Eventos DOM
  // ----------------------------
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
