document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formCadastroMedico");
  const opcoesSexo = document.querySelectorAll(".sexo-option");
  const telefoneInput = document.getElementById("telefone");
  let sexoSelecionado = null;

  // Seleção do sexo
  opcoesSexo.forEach(opt => {
    opt.addEventListener("click", () => {
      opcoesSexo.forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      sexoSelecionado = opt.dataset.value;
    });
  });

  // Máscara telefone
  telefoneInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    else v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    e.target.value = v;
  });

  // ENVIO DO FORMULÁRIO
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // PEGAR INPUTS CORRETAMENTE
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const confirmEmail = document.getElementById("confirmEmail").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmSenha = document.getElementById("confirmSenha").value.trim();
    const crm = document.getElementById("crm").value.trim();
    const especialidade = document.getElementById("especialidade").value.trim();
    const idade = document.getElementById("idade").value.trim();
    const nomeUnidade = document.getElementById("nomeUnidade").value.trim();
    const localidadeUnidade = document.getElementById("localidadeUnidade").value.trim();

    // VALIDAÇÕES
    if (senha !== confirmSenha) return alert("Senhas não conferem!");
    if (email !== confirmEmail) return alert("Emails não conferem!");
    if (!sexoSelecionado) return alert("Selecione o sexo!");

    const dados = {
      nome,
      email,
      senha,
      crm,
      especialidade,
      telefone: telefoneInput.value.trim(),
      idade,
      sexo: sexoSelecionado,
      nome_unidade: nomeUnidade,
      localidade_unidade: localidadeUnidade
    };

    try {
      const response = await fetch("/medicos/cadastro-medico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      if (!response.ok) {
        const erro = await response.text();
        console.error("ERRO HTTP:", response.status, erro);
        alert("Erro ao conectar com o servidor.");
        return;
      }

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert("Cadastro realizado com sucesso!");
      window.location.href = "pagina-admin.html";

    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  });

});
