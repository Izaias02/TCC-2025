document.addEventListener('DOMContentLoaded', function () {
    // ----- ELEMENTOS -----
    const loginBtn = document.getElementById('loginBtn');
    const loginOverlay = document.getElementById('loginOverlay');
    const closeOverlay = document.getElementById('closeOverlay');

    const pacienteBtn = document.getElementById('pacienteBtn');
    const medicoBtn = document.getElementById('medicoBtn');
    const adminBtnOverlay = document.getElementById('adminBtnOverlay');

    const loginPacienteModal = document.getElementById('loginPacienteModal');
    const closePacienteModal = document.getElementById('closePacienteModal');
    const loginPacienteForm = document.getElementById('loginPacienteForm');

    const loginMedicoModal = document.getElementById('loginMedicoModal');
    const closeMedicoModal = document.getElementById('closeMedicoModal');
    const loginMedicoForm = document.getElementById('loginMedicoForm');

    // ----- OVERLAY PRINCIPAL -----
    loginBtn.addEventListener('click', () => {
        loginOverlay.style.display = 'flex';
    });

    closeOverlay.addEventListener('click', () => {
        loginOverlay.style.display = 'none';
    });

    // ----- MODAL PACIENTE -----
    pacienteBtn.addEventListener('click', (e) => {
        e.preventDefault(); // evita qualquer comportamento padrão
        loginPacienteModal.style.display = 'flex';
        loginOverlay.style.display = 'none';
    });

    closePacienteModal.addEventListener('click', () => {
        loginPacienteModal.style.display = 'none';
    });

    loginPacienteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const paciente = {
            email: document.getElementById('loginCpfEmail').value.trim(),
            senha: document.getElementById('loginSenha').value.trim()
        };

        try {
            const res = await fetch('http://localhost:3000/pacientes/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paciente)
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem('pacienteLogado', JSON.stringify(data.paciente));
                window.location.href = 'telapaciente.html';
            } else {
                alert('CPF/Email ou senha inválidos');
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

    closeMedicoModal.addEventListener('click', () => {
        loginMedicoModal.style.display = 'none';
    });

    loginMedicoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const medico = {
            crm: document.getElementById('crm').value.trim(),
            senha: document.getElementById('senhaMedico').value.trim()
        };

        try {
            const res = await fetch('http://localhost:3000/medicos/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(medico)
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem('medicoLogado', JSON.stringify(data.medico));
                window.location.href = 'medico.html';
            } else {
                alert('CRM ou senha inválidos');
            }
        } catch (err) {
            console.error(err);
            alert('Erro na comunicação com o servidor');
        }
    });

    // ----- MODAL ADMIN (Bootstrap) -----
    adminBtnOverlay.addEventListener('click', (e) => {
        e.preventDefault();
        const adminModal = new bootstrap.Modal(document.getElementById('adminLoginModal'));
        adminModal.show();
        loginOverlay.style.display = 'none';
    });
});
