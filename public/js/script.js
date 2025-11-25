document.addEventListener('DOMContentLoaded', function () {
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

    // Abrir overlay de login
    loginBtn.addEventListener('click', () => loginOverlay.style.display = 'flex');
    closeOverlay.addEventListener('click', () => loginOverlay.style.display = 'none');

    // Abrir modal paciente
    pacienteBtn.addEventListener('click', () => {
        loginPacienteModal.style.display = 'flex';
        loginOverlay.style.display = 'none';
    });
    closePacienteModal.addEventListener('click', () => loginPacienteModal.style.display = 'none');

    // Abrir modal médico
    medicoBtn.addEventListener('click', () => {
        loginMedicoModal.style.display = 'flex';
        loginOverlay.style.display = 'none';
    });
    closeMedicoModal.addEventListener('click', () => loginMedicoModal.style.display = 'none');

    // Abrir modal admin
    adminBtnOverlay.addEventListener('click', () => {
        const adminModal = new bootstrap.Modal(document.getElementById('adminLoginModal'));
        adminModal.show();
        loginOverlay.style.display = 'none';
    });
});
