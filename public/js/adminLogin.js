document.addEventListener('DOMContentLoaded', function () {
    // ----- ELEMENTOS -----
    const adminBtnOverlay = document.getElementById('adminBtnOverlay');
    const loginOverlay = document.getElementById('loginOverlay');

    // Abrir modal de login do admin
    adminBtnOverlay.addEventListener('click', () => {
        const adminModal = new bootstrap.Modal(document.getElementById('adminLoginModal'));
        adminModal.show();
        loginOverlay.style.display = 'none';
    });

    // ----- FORMULÁRIO LOGIN ADMIN -----
    const loginForm = document.getElementById('adminLoginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const login = document.getElementById('adminLogin').value.trim();
        const senha = document.getElementById('adminSenha').value.trim();

        if (!login || !senha) {
            document.getElementById('adminLoginErro').innerText = 'Preencha login e senha.';
            document.getElementById('adminLoginErro').style.display = 'block';
            return;
        }

        try {
            const res = await fetch('/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ login, senha })
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem('adminLogado', 'true');
                window.location.href = '/pagina-admin';
            } else {
                document.getElementById('adminLoginErro').innerText = data.message || 'Login inválido';
                document.getElementById('adminLoginErro').style.display = 'block';
            }
        } catch (err) {
            console.error(err);
            document.getElementById('adminLoginErro').innerText = 'Erro ao tentar realizar login.';
            document.getElementById('adminLoginErro').style.display = 'block';
        }
    });

    // ----- PESQUISA CONSULTAS -----
    const formPesquisa = document.getElementById('formPesquisa');
    const resultadoModal = new bootstrap.Modal(document.getElementById('resultadoModal'));
    const modalBodyContent = document.getElementById('modalBodyContent');

    formPesquisa.addEventListener('submit', async (e) => {
        e.preventDefault();

        let cpfCrm = document.getElementById('cpfCrm').value.trim();
        const dataConsulta = document.getElementById('dataConsulta').value;

        if (!cpfCrm) {
            modalBodyContent.innerHTML = '<p class="text-danger">Digite CPF ou CRM para pesquisar.</p>';
            resultadoModal.show();
            return;
        }

        // Detectar se é CPF (11 dígitos) ou CRM (outros)
        const isCPF = cpfCrm.replace(/\D/g, '').length === 11;
        if (isCPF) cpfCrm = cpfCrm.replace(/\D/g, ''); // remove pontos e traços

        try {
            let url = '/admin/consultas';
            if (isCPF) url += `?cpf=${cpfCrm}`;
            else url += `?crm=${cpfCrm}`;

            if (dataConsulta) url += isCPF ? `&data=${dataConsulta}` : `&data=${dataConsulta}`;

            const res = await fetch(url, { credentials: 'same-origin' });
            const dataRes = await res.json();

            if (!dataRes.success) {
                modalBodyContent.innerHTML = `<p class="text-danger">${dataRes.message}</p>`;
            } else if (dataRes.consultas.length === 0) {
                modalBodyContent.innerHTML = '<p class="text-warning">Nenhuma consulta encontrada.</p>';
            } else {
                modalBodyContent.innerHTML = dataRes.consultas.map(c => {
                    const dataHora = new Date(c.data_horario + 'Z').toLocaleString('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'short'
                    });
                    return `
                        <div class="mb-2 p-2 border rounded">
                            <p><strong>Paciente:</strong> ${c.paciente_nome} (CPF: ${c.paciente_cpf})</p>
                            <p><strong>Médico:</strong> ${c.medico_nome} (CRM: ${c.medico_crm}, ${c.especialidade})</p>
                            <p><strong>Data/Horário:</strong> ${dataHora}</p>
                            <p><strong>Status:</strong> ${c.status}</p>
                        </div>
                    `;
                }).join('');
            }

            resultadoModal.show();
        } catch (err) {
            console.error(err);
            modalBodyContent.innerHTML = '<p class="text-danger">Erro ao buscar consultas.</p>';
            resultadoModal.show();
        }
    });
});
