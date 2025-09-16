
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById('loginBtn');
  const loginOptions = document.getElementById('loginOptions');
  const pacienteBtn = document.getElementById('pacienteBtn');
  const medicoBtn = document.getElementById('medicoBtn');
  const adminBtn = document.getElementById('adminBtn');
  const pacienteForm = document.getElementById('pacienteForm');
  const medicoForm = document.getElementById('medicoForm');
  const adminOptions = document.getElementById('adminOptions');

  loginBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (loginOptions.style.display === 'block') {
      loginOptions.style.display = 'none';
      pacienteForm.style.display = 'none';
      medicoForm.style.display = 'none';
      adminOptions.style.display = 'none';
    } else {
      loginOptions.style.display = 'block';
      pacienteForm.style.display = 'none';
      medicoForm.style.display = 'none';
      adminOptions.style.display = 'none';
    }
  });

  pacienteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    pacienteForm.style.display = 'block';
    medicoForm.style.display = 'none';
    loginOptions.style.display = 'none';
    adminOptions.style.display = 'none';
  });

  medicoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    medicoForm.style.display = 'block';
    pacienteForm.style.display = 'none';
    loginOptions.style.display = 'none';
    adminOptions.style.display = 'none';
  });

  adminBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (adminOptions.style.display === 'block') {
      adminOptions.style.display = 'none';
    } else {
      adminOptions.style.display = 'block';
    }
    pacienteForm.style.display = 'none';
    medicoForm.style.display = 'none';
    loginOptions.style.display = 'none';
  });

  // Fecha dropdowns ao clicar fora
  document.addEventListener('click', (e) => {
    if (!loginOptions.contains(e.target) &&
      !loginBtn.contains(e.target) &&
      !pacienteForm.contains(e.target) &&
      !medicoForm.contains(e.target) &&
      !adminOptions.contains(e.target)) {
      loginOptions.style.display = 'none';
      pacienteForm.style.display = 'none';
      medicoForm.style.display = 'none';
      adminOptions.style.display = 'none';
    }
  });
});



if (medicoBtn) {
  medicoBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    medicoForm.style.display = 'block';
    pacienteForm.style.display = 'none';
    adminOptions.style.display = 'none';
    loginOptions.style.display = 'none';
  });
}

if (adminBtn) {
  adminBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleDisplay(adminOptions);
    pacienteForm.style.display = 'none';
    medicoForm.style.display = 'none';
    loginOptions.style.display = 'none';
  });
}




document.addEventListener("DOMContentLoaded", function () {
  console.log("Script carregado e DOM pronto");

  // ----------- LOGIN DROPDOWN -----------
  const loginBtn = document.getElementById('loginBtn');
  const loginOptions = document.getElementById('loginOptions');
  const pacienteBtn = document.getElementById('pacienteBtn');
  const medicoBtn = document.getElementById('medicoBtn');
  const adminBtn = document.getElementById('adminBtn');
  const pacienteForm = document.getElementById('pacienteForm');
  const medicoForm = document.getElementById('medicoForm');
  const adminOptions = document.getElementById('adminOptions');

  loginBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = loginOptions.style.display === 'block';
    loginOptions.style.display = isVisible ? 'none' : 'block';
    pacienteForm.style.display = 'none';
    medicoForm.style.display = 'none';
    adminOptions.style.display = 'none';
  });

  pacienteBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    pacienteForm.style.display = 'block';
    medicoForm.style.display = 'none';
    adminOptions.style.display = 'none';
    loginOptions.style.display = 'none';
  });

  medicoBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    medicoForm.style.display = 'block';
    pacienteForm.style.display = 'none';
    adminOptions.style.display = 'none';
    loginOptions.style.display = 'none';
  });

  adminBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = adminOptions.style.display === 'block';
    adminOptions.style.display = isVisible ? 'none' : 'block';
    pacienteForm.style.display = 'none';
    medicoForm.style.display = 'none';
    loginOptions.style.display = 'none';
  });

  // Fecha dropdowns ao clicar fora
  document.addEventListener('click', (e) => {
    if (
      !loginOptions.contains(e.target) &&
      !loginBtn.contains(e.target) &&
      !pacienteForm.contains(e.target) &&
      !medicoForm.contains(e.target) &&
      !adminOptions.contains(e.target)
    ) {
      loginOptions.style.display = 'none';
      pacienteForm.style.display = 'none';
      medicoForm.style.display = 'none';
      adminOptions.style.display = 'none';
    }
  });

  // ----------- CARROSSEL DE MESES -----------
  const meses = [
    { nome: "janeiro", cor: "#ffffff", campanha: "Janeiro Branco – Saúde Mental" },
    { nome: "fevereiro", cor: "#800080", campanha: "Fevereiro Roxo/Laranja – Alzheimer, Lúpus, Fibromialgia e Leucemia" },
    { nome: "marco", cor: "#ff6347", campanha: "Março Lilás – Câncer do Colo do Útero" },
    { nome: "abril", cor: "#ffa500", campanha: "Abril Azul – Autismo" },
    { nome: "maio", cor: "#ffff00", campanha: "Maio Amarelo – Segurança no Trânsito" },
    { nome: "junho", cor: "#add8e6", campanha: "Junho Vermelho – Doação de Sangue" },
    { nome: "julho", cor: "#87cefa", campanha: "Julho Amarelo – Hepatites Virais" },
    { nome: "agosto", cor: "#ffb6c1", campanha: "Agosto Dourado – Amamentação" },
    { nome: "setembro", cor: "#32cd32", campanha: "Setembro Amarelo – Prevenção ao Suicídio" },
    { nome: "outubro", cor: "#ff69b4", campanha: "Outubro Rosa – Câncer de Mama" },
    { nome: "novembro", cor: "#0000cd", campanha: "Novembro Azul – Saúde do Homem" },
    { nome: "dezembro", cor: "#dc143c", campanha: "Dezembro Vermelho – Combate ao HIV/AIDS" }
  ];

  const carouselInner = document.getElementById("carouselInner");
  carouselInner.innerHTML = ""; // Limpa conteúdo anterior

  meses.forEach((mes, index) => {
    const div = document.createElement("div");
    div.className = `carousel-item${index === 0 ? " active" : ""}`;
    div.style.backgroundColor = mes.cor;

    const img = document.createElement("img");
    img.src = `imgmeses/${mes.nome}.jpg`;
    img.alt = mes.nome;
    img.className = "d-block w-100";

    const legenda = document.createElement("div");
    legenda.className = "carousel-caption d-none d-md-block";
    legenda.innerHTML = `
      <h5 class="fw-bold text-dark bg-white bg-opacity-75 rounded px-2">
        ${mes.nome.charAt(0).toUpperCase() + mes.nome.slice(1)} – ${mes.campanha}
      </h5>
    `;

    div.appendChild(img);
    div.appendChild(legenda);
    carouselInner.appendChild(div);
  });

  const carouselElement = document.getElementById('carouselMeses');

  const carousel = bootstrap.Carousel.getInstance(carouselElement) || new bootstrap.Carousel(carouselElement, {
    interval: 3000,
    ride: 'carousel'
  });

const body = document.getElementById("bodyBackground");

// Define a cor inicial ao carregar a página
body.style.backgroundColor = meses[0].cor;

// Atualiza a cor de fundo ao trocar o slide
carouselElement.addEventListener('slide.bs.carousel', function (event) {
  const nextIndex = event.to;
  const nextMes = meses[nextIndex];
  body.style.backgroundColor = nextMes.cor;
});



  const activeIndex = Array.from(carouselInner.children).findIndex(child => child.classList.contains('active'));
  if (activeIndex !== -1) {
    carouselInner.children[activeIndex].style.backgroundColor = meses[activeIndex].cor;
  }
});
const body = document.getElementById("bodyBackground");

// Atualiza a cor do fundo quando o slide mudar
carouselElement.addEventListener('slide.bs.carousel', function (event) {
  const nextIndex = event.to;
  const nextMes = meses[nextIndex];
  body.style.backgroundColor = nextMes.cor;
});

// Define a cor inicial ao carregar a página
body.style.backgroundColor = meses[0].cor;
