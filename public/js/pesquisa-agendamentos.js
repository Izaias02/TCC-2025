document.addEventListener('DOMContentLoaded', () => {
  const formPesquisa = document.getElementById('formPesquisa');
  const modalBodyContent = document.getElementById('modalBodyContent');
  const resultadoModalEl = document.getElementById('resultadoModal');

  if (!formPesquisa || !modalBodyContent || !resultadoModalEl) {
    console.error('Erro: Elementos do DOM não encontrados!');
    return;
  }

  const resultadoModal = new bootstrap.Modal(resultadoModalEl);

  formPesquisa.addEventListener('submit', async (event) => {
    event.preventDefault();

    const crm = document.getElementById('cpfCrm').value.trim(); // CRM do médico
    const dataConsulta = document.getElementById('dataConsulta').value; // Data opcional

    if (!crm) {
      modalBodyContent.innerHTML = '<p class="text-danger">Por favor, insira o CRM do médico.</p>';
      resultadoModal.show();
      return;
    }

    try {
      // Chamada ao back-end
      const url = new URL('/admin/consultas', window.location.origin);
      url.searchParams.append('crm', crm);
      if (dataConsulta) url.searchParams.append('data', dataConsulta);

      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include' // importante para enviar cookies de sessão
      });

      const data = await res.json();

      if (!data.success) {
        modalBodyContent.innerHTML = `<p class="text-danger">${data.message}</p>`;
        resultadoModal.show();
        return;
      }

      const consultas = data.consultas;
      if (consultas.length === 0) {
        modalBodyContent.innerHTML = '<p class="text-warning">Nenhuma consulta encontrada.</p>';
        resultadoModal.show();
        return;
      }

      // Montar HTML das consultas
      let resultadoHtml = `<p><strong>CRM pesquisado:</strong> ${crm}</p>`;
      if (dataConsulta) resultadoHtml += `<p><strong>Data selecionada:</strong> ${dataConsulta}</p>`;

      resultadoHtml += '<div class="list-group mt-3">';
      consultas.forEach(c => {
        const dataHora = new Date(c.data_horario).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
        resultadoHtml += `
          <div class="list-group-item">
            <p><strong>Paciente:</strong> ${c.paciente_nome} (CPF: ${c.paciente_cpf})</p>
            <p><strong>Médico:</strong> ${c.medico_nome} (CRM: ${c.medico_crm}) - ${c.especialidade}</p>
            <p><strong>Data/Horário:</strong> ${dataHora}</p>
            <p><strong>Status:</strong> ${c.status}</p>
          </div>
        `;
      });
      resultadoHtml += '</div>';

      modalBodyContent.innerHTML = resultadoHtml;
      resultadoModal.show();

    } catch (err) {
      console.error('Erro ao buscar consultas:', err);
      modalBodyContent.innerHTML = '<p class="text-danger">Erro ao buscar consultas. Verifique o servidor.</p>';
      resultadoModal.show();
    }
  });
});
