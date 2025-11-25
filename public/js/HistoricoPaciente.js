document.addEventListener("DOMContentLoaded", () => {

    // FUNÇÃO PARA EXIBIR HISTÓRICO
    async function exibirHistorico() {
        const container = document.getElementById("conteudoHistorico");
        container.innerHTML = "<p>Carregando histórico...</p>";

        const pacienteId = localStorage.getItem("pacienteId");
        if (!pacienteId) {
            container.innerHTML = "<p class='text-danger'>Erro: paciente não identificado.</p>";
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/pacientes/${pacienteId}/consultas`);
            if (!res.ok) throw new Error("Erro na requisição");

            const data = await res.json();

            if (!data.success || data.consultas.length === 0) {
                container.innerHTML = "<p class='text-muted'>Nenhum histórico disponível.</p>";
                return;
            }

            container.innerHTML = data.consultas.map(item => `
                <div class="border-bottom pb-2 mb-3">
                    <h6 class="text-info fw-bold">
                        ${new Date(item.data_horario).toLocaleDateString('pt-BR')} - ${item.status}
                    </h6>
                    <p class="mb-1"><strong>Especialidade:</strong> ${item.especialidade}</p>
                    <p class="text-muted mb-0"><em>Médico responsável: ${item.medico}</em></p>
                </div>
            `).join('');

        } catch (err) {
            console.error(err);
            container.innerHTML = "<p class='text-danger'>Erro ao carregar histórico.</p>";
        }
    }

    // EVENTO DO BOTÃO HISTÓRICO
    const btnHistorico = document.getElementById("btn-historico");
    if (btnHistorico) {
        const modalHistorico = new bootstrap.Modal(document.getElementById("modalHistorico"));
        btnHistorico.addEventListener("click", () => {
            exibirHistorico();
            modalHistorico.show();
        });
    }

});
