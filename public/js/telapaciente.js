document.addEventListener("DOMContentLoaded", async () => {
    const paciente = JSON.parse(localStorage.getItem("pacienteLogado"));
    if(!paciente) return window.location.href="index.html";

    const divInfo = document.getElementById("infoPaciente");
    const tabelaHistorico = document.getElementById("conteudoHistorico");
    const selectEspecialidade = document.getElementById("especialidade");
    const selectMedico = document.getElementById("medico");
    const inputData = document.getElementById("dataRetorno");
    const selectHorario = document.getElementById("horarioRetorno");
    const btnSalvarRetorno = document.getElementById("btnSalvarRetorno");

    // Exibir dados do paciente
    divInfo.innerHTML = `
        <p><strong>Nome:</strong> ${paciente.nome}</p>
        <p><strong>CPF:</strong> ${paciente.cpf}</p>
        <p><strong>Idade:</strong> ${paciente.idade}</p>
        <p><strong>Sexo:</strong> ${paciente.sexo}</p>
        <p><strong>Endereço:</strong> ${paciente.endereco}</p>
    `;

    // Histórico consultas
    const resConsultas = await fetch(`/pacientes/${paciente.id}/consultas`);
    const consultas = await resConsultas.json();
    tabelaHistorico.innerHTML = consultas.length===0 ? "<p>Nenhuma consulta registrada.</p>" :
        consultas.map(c=>`
            <div class="mb-2 p-2 border rounded">
                <p><strong>Médico:</strong> ${c.medico} (${c.especialidade})</p>
                <p><strong>Data/Horário:</strong> ${new Date(c.data_horario).toLocaleString()}</p>
                <p><strong>Status:</strong> ${c.status}</p>
            </div>
        `).join("");

    // Ao mudar especialidade, carregar médicos
    selectEspecialidade.addEventListener("change", () => {
        const esp = selectEspecialidade.value;
        selectMedico.innerHTML="<option>Carregando...</option>";
        fetch(`/pacientes/medicos/especialidade/${esp}`)
            .then(r=>r.json())
            .then(medicos=>{
                selectMedico.innerHTML=`<option value="">Selecione...</option>`;
                medicos.forEach(m=>selectMedico.innerHTML+=`<option value="${m.id}">${m.nome} (CRM: ${m.crm})</option>`);
            });
    });

    function atualizarHorarios(){
        const medicoId = selectMedico.value;
        const data = inputData.value;
        if(!medicoId || !data) return;
        fetch(`/pacientes/medico/${medicoId}/horarios/${data}`)
            .then(r=>r.json())
            .then(horarios=>{
                selectHorario.innerHTML=`<option value="">Selecione...</option>`;
                horarios.forEach(h=>selectHorario.innerHTML+=`<option value="${h}">${h}</option>`);
            });
    }

    selectMedico.addEventListener("change", atualizarHorarios);
    inputData.addEventListener("change", atualizarHorarios);

    btnSalvarRetorno.addEventListener("click", async ()=>{
        const medico_id = selectMedico.value;
        const data = inputData.value;
        const horario = selectHorario.value;
        if(!medico_id || !data || !horario) return alert("Preencha todos os campos!");

        const res = await fetch("/pacientes/marcar-consulta", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ paciente_id: paciente.id, medico_id, data, horario })
        });
        const dataRes = await res.json();
        if(dataRes.success) alert("Consulta marcada com sucesso!");
        else alert("Erro ao marcar consulta.");
    });
});
