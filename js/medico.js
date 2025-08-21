
 
  document.getElementById('formMedico').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Aqui pode validar o CRM/senha se quiser mas acho que podemos fazer esta validação em uma nova pasta

    // Redireciona para a nova página
    window.location.href = 'medico.html';
  });
