// frontend/js/carrossel.js
document.addEventListener("DOMContentLoaded", () => {
  const meses = [
    { nome: "janeiro", cor: "#ffffff", campanha: "Janeiro Branco – Saúde Mental" },
    { nome: "fevereiro", cor: "#800080", campanha: "Fevereiro Roxo/Laranja – Alzheimer, Lúpus, Fibromialgia e Leucemia" },
    { nome: "marco", cor: "#ff6347", campanha: "Março Lilás – Câncer do Colo do Útero" },
    { nome: "abril", cor: "#00eeffff", campanha: "Abril Azul – Autismo" },
    { nome: "maio", cor: "#ffff00", campanha: "Maio Amarelo – Segurança no Trânsito" },
    { nome: "junho", cor: "#d44747ff", campanha: "Junho Vermelho – Doação de Sangue" },
    { nome: "julho", cor: "#f0e263ff", campanha: "Julho Amarelo – Hepatites Virais" },
    { nome: "agosto", cor: "#bb9a09ff", campanha: "Agosto Dourado – Amamentação" },
    { nome: "setembro", cor: "#f0ec21fb", campanha: "Setembro Amarelo – Prevenção ao Suicídio" },
    { nome: "outubro", cor: "#e6167eff", campanha: "Outubro Rosa – Câncer de Mama" },
    { nome: "novembro", cor: "#0000cd", campanha: "Novembro Azul – Saúde do Homem" },
    { nome: "dezembro", cor: "#dc143c", campanha: "Dezembro Vermelho – Combate ao HIV/AIDS" }
  ];

  const carouselInner = document.getElementById("carouselInner");
  const carouselElement = document.getElementById('carouselMeses');
  const body = document.getElementById("bodyBackground");

  // Limpa conteúdo anterior
  carouselInner.innerHTML = "";

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

  const carousel = bootstrap.Carousel.getInstance(carouselElement) || new bootstrap.Carousel(carouselElement, {
    interval: 3000,
    ride: 'carousel'
  });

  body.style.backgroundColor = meses[0].cor;

  carouselElement.addEventListener('slide.bs.carousel', (event) => {
    const nextIndex = event.to;
    body.style.backgroundColor = meses[nextIndex].cor;
  });
});
