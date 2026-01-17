const url =
  "https://restcountries.com/v3.1/all?fields=name,population,translations";

fetch(url)
  .then((res) => res.json())
  .then((paises) => {
    paises.sort((a, b) => b.population - a.population);
    const top10 = paises.slice(0, 10);

    const nomes = top10.map((pais) => pais.translations.por.common);
    const populacoes = top10.map((pais) => pais.population);

    const mediaValor = calcularMedia(top10);
    const medias = new Array(10).fill(mediaValor);

    criarGrafico(nomes, populacoes, medias);
  });

function calcularMedia(lista) {
  const soma = lista.reduce((acc, pais) => acc + pais.population, 0);
  return soma / lista.length;
}

function gerarCores() {
  const cores = [];
  for (let i = 0; i < 10; i++) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    cores.push(`rgb(${r}, ${g}, ${b})`);
  }
  return cores;
}

function criarGrafico(nomes, populacoes, medias) {
  const ctx = document.getElementById("meuGrafico");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: nomes,
      datasets: [
        {
          type: "line",
          label: "Média de População",
          data: medias,
          borderColor: "red",
          borderWidth: 3,
          fill: false,
          pointRadius: 0, 
          order: 0,
        },
        {
          type: "bar", 
          label: "População",
          data: populacoes,
          backgroundColor: gerarCores(),
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderWidth: 1,
          barPercentage: 0.9,
          categoryPercentage: 0.8,
          order: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            maxTicksLimit: 12,
            color: "#666",
            callback: function (value) {
              if (value >= 1e9) return (value / 1e9).toFixed(1) + " B";
              if (value >= 1e6) return (value / 1e6).toFixed(0) + " Mi";
              return value;
            },
          },
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
}
