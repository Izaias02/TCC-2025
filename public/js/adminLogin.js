document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');  // Supondo que você tenha um formulário com o id "login-form"
  
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário
    
    // Obtém os dados de login e senha dos campos
    const login = document.getElementById('login').value;  // O id do campo de login
    const senha = document.getElementById('senha').value;  // O id do campo de senha

    // Validação simples dos campos (se estiver vazio)
    if (!login || !senha) {
      alert('Login e senha são obrigatórios');
      return;
    }

    // Envia os dados do formulário para o servidor
    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Certifique-se de enviar JSON
        },
        body: JSON.stringify({ login, senha })  // Converte os dados em JSON
      });

      const data = await response.json();

      if (data.success) {
        // Caso o login seja bem-sucedido, redireciona para a página administrativa
        window.location.href = '/pagina-admin';  // Redireciona para a página do admin
      } else {
        // Caso o login falhe, exibe a mensagem de erro
        alert(data.message || 'Erro desconhecido');  // Exibe a mensagem retornada pelo servidor
      }

    } catch (error) {
      // Caso ocorra um erro na comunicação com o servidor
      console.error('Erro ao tentar fazer login:', error);
      alert('Erro ao tentar realizar o login. Tente novamente mais tarde.');
    }
  });
});
