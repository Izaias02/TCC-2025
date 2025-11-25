document.addEventListener('DOMContentLoaded', function () {
    // ----- ELEMENTOS ----- 
    const adminBtnOverlay = document.getElementById('adminBtnOverlay');
    const loginOverlay = document.getElementById('loginOverlay');

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
                credentials: 'same-origin',
                body: JSON.stringify({ login, senha })
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem('adminLogado', 'true');
                window.location.href = '/pagina-admin';
            } else {
                document.getElementById('adminLoginErro').style.display = 'block';
            }
        } catch (err) {
            console.error(err);
            alert('Erro ao tentar realizar login.');
        }
    });

    // ----- PESQUISA CONSULTAS ----- 
    const formPesquisa = document.getElementById('formPesquisa');
    const resultadoModal = new bootstrap.Modal(document.getElementById('resultadoModal'));
    const modalBodyContent = document.getElementById('modalBodyContent');

    formPesquisa.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cpf = document.getElementById('cpfCrm').value.trim();
        const data = document.getElementById('dataConsulta').value;

        if (!cpf) {
            modalBodyContent.innerHTML = '<p class="text-danger">Digite CPF ou CRM para pesquisar.</p>';
            resultadoModal.show();
            return;
        }

        try {
            const res = await fetch(`/admin/consultas?cpf=${cpf}&data=${data}`, {
                credentials: 'same-origin'
            });
            const dataRes = await res.json();

            if (!dataRes.success) {
                modalBodyContent.innerHTML = `<p class="text-danger">${dataRes.message}</p>`;
            } else if (dataRes.consultas.length === 0) {
                modalBodyContent.innerHTML = '<p>Nenhuma consulta encontrada.</p>';
            } else {
                modalBodyContent.innerHTML = dataRes.consultas.map(c => `
                    <div class="mb-2 p-2 border rounded">
                        <p><strong>Paciente:</strong> ${c.paciente_nome} (CPF: ${c.paciente_cpf})</p>
                        <p><strong>Médico:</strong> ${c.medico_nome} (CRM: ${c.medico_crm}, ${c.especialidade})</p>
                        <p><strong>Data/Horário:</strong> ${new Date(c.data_horario).toLocaleString()}</p>
                        <p><strong>Status:</strong> ${c.status}</p>
                    </div>
                `).join('');
            }

            resultadoModal.show();
        } catch (err) {
            console.error(err);
            modalBodyContent.innerHTML = '<p class="text-danger">Erro ao buscar consultas.</p>';
            resultadoModal.show();
        }
    });
});
