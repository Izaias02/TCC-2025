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

    const loginMedicoModal = document.getElementById('loginMedicoModal');
    const closeMedicoModal = document.getElementById('closeMedicoModal');

    // ----- OVERLAY -----
    loginBtn.addEventListener('click', () => {
        loginOverlay.style.display = 'flex';
    });

    closeOverlay.addEventListener('click', () => {
        loginOverlay.style.display = 'none';
    });

    // ----- MODAL PACIENTE -----
    pacienteBtn.addEventListener('click', () => {
        loginPacienteModal.style.display = 'flex';
        loginOverlay.style.display = 'none';
    });

    closePacienteModal.addEventListener('click', () => {
        loginPacienteModal.style.display = 'none';
    });

    // ----- MODAL MÉDICO -----
    medicoBtn.addEventListener('click', () => {
        loginMedicoModal.style.display = 'flex';
        loginOverlay.style.display = 'none';
    });

    closeMedicoModal.addEventListener('click', () => {
        loginMedicoModal.style.display = 'none';
    });

    // ----- MODAL ADMIN -----
    adminBtnOverlay.addEventListener('click', () => {
        const adminModal = new bootstrap.Modal(document.getElementById('adminLoginModal'));
        adminModal.show();
        loginOverlay.style.display = 'none';
    });

    // ----- FORMULÁRIO LOGIN ADMIN -----
    const loginForm = document.getElementById('adminLoginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const login = document.getElementById('adminLogin').value;
        const senha = document.getElementById('adminSenha').value;

        try {
            const res = await fetch('/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin', // Envia cookies se houver sessão
                body: JSON.stringify({ login, senha })
            });

            const data = await res.json();
            console.log('Resposta login:', data);

            if (data.success) {
                localStorage.setItem('adminLogado', 'true');
                window.location.href = '/pagina-admin';
            } else {
                document.getElementById('adminLoginErro').style.display = 'block';
            }
        } catch (err) {
            console.error('Erro ao tentar realizar login:', err);
            alert('Erro ao tentar realizar login.');
        }
    });
});
