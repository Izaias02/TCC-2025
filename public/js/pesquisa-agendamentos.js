document.addEventListener('DOMContentLoaded', () => {
  const formPesquisa = document.getElementById('formPesquisa');
  const modalBodyContent = document.getElementById('modalBodyContent');
  const resultadoModal = new bootstrap.Modal(document.getElementById('resultadoModal'));

  formPesquisa.addEventListener('submit', async (event) => {
    event.preventDefault();

    let cpfCrm = document.getElementById('cpfCrm').value.trim();
    const dataConsulta = document.getElementById('dataConsulta').value;

    if (!cpfCrm) {
      modalBodyContent.innerHTML = '<p class="text-danger">Por favor, insira CPF ou CRM.</p>';
      resultadoModal.show();
      return;
    }

    // Remove formatação do CPF (apenas números)
    cpfCrm = cpfCrm.replace(/\D/g, '');

    try {
      const url = new URL('/admin/consultas', window.location.origin);

      // Detectar se é CPF ou CRM pelo tamanho (CPF tem 11 dígitos)
      if (cpfCrm.length === 11) {
        url.searchParams.append('cpf', cpfCrm);
      } else {
        url.searchParams.append('crm', cpfCrm);
      }

      if (dataConsulta) url.searchParams.append('data', dataConsulta);

      const res = await fetch(url, { method: 'GET', credentials: 'include' });
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

      // Monta o HTML dos resultados
      let resultadoHtml = `<p><strong>Pesquisa:</strong> ${cpfCrm}</p>`;
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
