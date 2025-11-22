document.addEventListener('DOMContentLoaded', () => {
  const formPesquisa = document.getElementById('formPesquisa');
  const modalBodyContent = document.getElementById('modalBodyContent');
  const resultadoModalEl = document.getElementById('resultadoModal');

  if (!formPesquisa || !modalBodyContent || !resultadoModalEl) {
    console.error('Erro: Elementos do DOM não encontrados!');
    return;
  }

  const resultadoModal = new bootstrap.Modal(resultadoModalEl);

  formPesquisa.addEventListener('submit', (event) => {
    event.preventDefault();

    const cpfCrm = document.getElementById('cpfCrm').value.trim();
    const dataConsulta = document.getElementById('dataConsulta').value;

    let resultadoHtml = '';

    if (!cpfCrm) {
      resultadoHtml = '<p class="text-danger">Por favor, insira o CPF ou CRM.</p>';
    } else {
      resultadoHtml += `
        <p><strong>CPF/CRM pesquisado:</strong> ${cpfCrm}</p>
      `;

      if (dataConsulta) {
        resultadoHtml += `
          <p><strong>Data selecionada:</strong> ${dataConsulta}</p>
        `;
      }

      resultadoHtml += `
        <div class="alert alert-info mt-3">
          <p><strong>Consultas encontradas:</strong></p>
          <ul>
            <li>Consulta 1: 10/10/2025 - Médico: Dr. Fulano</li>
            <li>Consulta 2: 15/10/2025 - Médico: Dra. Sicrana</li>
          </ul>
        </div>
      `;
    }

    modalBodyContent.innerHTML = resultadoHtml;
    resultadoModal.show();
  });
});

