document.addEventListener('DOMContentLoaded', function () {
    // ----- ELEMENTOS GERAIS -----
    const loginBtn = document.getElementById('loginBtn');
    const loginOverlay = document.getElementById('loginOverlay');
    const closeOverlay = document.getElementById('closeOverlay');

    const pacienteBtn = document.getElementById('pacienteBtn');
    const medicoBtn = document.getElementById('medicoBtn');

    // ----- MODAIS PACIENTE -----
    const loginPacienteModal = document.getElementById('loginPacienteModal');
    const closePacienteModal = document.getElementById('closePacienteModal');
    const loginPacienteForm = document.getElementById('loginPacienteForm');

    // ----- MODAL MÉDICO -----
    const loginMedicoModal = document.getElementById('loginMedicoModal');
    const closeMedicoModal = document.getElementById('closeMedicoModal');
    const loginMedicoForm = document.getElementById('loginMedicoForm');

    // ----- OVERLAY PRINCIPAL -----
    loginBtn.addEventListener('click', () => loginOverlay.style.display = 'flex');
    closeOverlay.addEventListener('click', () => loginOverlay.style.display = 'none');

    // ----- MODAL PACIENTE -----
    pacienteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginPacienteModal.style.display = 'flex';
        loginOverlay.style.display = 'none';
    });
    closePacienteModal.addEventListener('click', () => loginPacienteModal.style.display = 'none');

    loginPacienteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const login = document.getElementById('loginCpfEmail').value.trim();
        const senha = document.getElementById('loginSenha').value.trim();

        if (!login || !senha) return alert('Preencha todos os campos!');

        try {
            const res = await fetch('http://localhost:3000/pacientes/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, senha })
            });

            const data = await res.json();

            if (data.success) {
                // Salva dados do paciente no localStorage
                localStorage.setItem('pacienteLogado', JSON.stringify(data.paciente));
                localStorage.setItem('pacienteId', data.paciente.id); // <-- ID para histórico e agendamento
                window.location.href = 'telapaciente.html';
            } else {
                alert(data.message || 'CPF/Email ou senha inválidos');
            }

        } catch (err) {
            console.error(err);
            alert('Erro na comunicação com o servidor');
        }
    });

    // ----- MODAL MÉDICO -----
    medicoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginMedicoModal.style.display = 'flex';
        loginOverlay.style.display = 'none';
    });
    closeMedicoModal.addEventListener('click', () => loginMedicoModal.style.display = 'none');

    loginMedicoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const login = document.getElementById('crm').value.trim();
        const senha = document.getElementById('senhaMedico').value.trim();

        if (!login || !senha) return alert('Preencha todos os campos!');

        try {
            const res = await fetch('http://localhost:3000/medicos/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, senha })
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem('medicoLogado', JSON.stringify(data.medico));
                localStorage.setItem('medicoId', data.medico.id); // <-- ID para agendamentos e consultas
                window.location.href = 'medico.html';
            } else {
                alert(data.message || 'CRM ou senha inválidos');
            }

        } catch (err) {
            console.error(err);
            alert('Erro na comunicação com o servidor');
        }
    });
});

