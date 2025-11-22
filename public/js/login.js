// frontend/js/login.js
document.addEventListener("DOMContentLoaded", () => {
  const formPaciente = document.querySelector("#pacienteForm form");
  const formMedico = document.querySelector("#medicoForm form");

  if (formPaciente) {
    formPaciente.addEventListener("submit", async (e) => {
      e.preventDefault();
      const paciente = {
        email: document.getElementById("emailCpf").value,
        senha: document.getElementById("senha").value
      };

      const res = await fetch("http://localhost:3000/login-paciente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paciente)
      });

      const data = await res.json();
      if (data.success) {
        window.location.href = "telapaciente.html";
      } else {
        alert("Login ou senha inválidos");
      }
    });
  }

  if (formMedico) {
    formMedico.addEventListener("submit", async (e) => {
      e.preventDefault();
      const medico = {
        crm: document.getElementById("crm").value,
        senha: document.getElementById("senhaMedico").value
      };

      const res = await fetch("http://localhost:3000/login-medico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medico)
      });

      const data = await res.json();
      if (data.success) {
        window.location.href = "medico.html";
      } else {
        alert("CRM ou senha inválidos");
      }
    });
  }
});

