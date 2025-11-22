document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('adminLoginForm'); // corresponde ao seu HTML
  
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário
    
    // Obtém os dados de login e senha dos campos do modal
    const login = document.getElementById('adminLogin').value;
    const senha = document.getElementById('adminSenha').value;

    if (!login || !senha) {
      alert('Login e senha são obrigatórios');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/admin/login', { // URL completa do backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, senha })
      });

      const data = await response.json();

      if (data.success) {
        // Redireciona para a página do admin
        window.location.href = '/pagina-admin';
      } else {
        // Mostra a mensagem de erro no modal
        const erroDiv = document.getElementById('adminLoginErro');
        erroDiv.style.display = 'block';
        erroDiv.textContent = data.message || 'Login ou senha inválidos';
      }

    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      alert('Erro ao tentar realizar o login. Tente novamente mais tarde.');
    }
  });
});
