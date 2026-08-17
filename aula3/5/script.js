const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const tamanhoGrade = 10;
const tamanhoCelula = canvas.width / tamanhoGrade;

let posicoes = [];

function criarPosicoes() {
  posicoes = [];

  for (let linha = 0; linha < tamanhoGrade; linha++) {
    for (let coluna = 0; coluna < tamanhoGrade; coluna++) {
      posicoes.push({
        linha: linha,
        coluna: coluna,
      });
    }
  }
}

function gerarPixel() {
  if (posicoes.length === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    criarPosicoes();
  }

  const indice = Math.floor(Math.random() * posicoes.length);

  const posicao = posicoes.splice(indice, 1)[0];

  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

  ctx.fillRect(
    posicao.coluna * tamanhoCelula,
    posicao.linha * tamanhoCelula,
    tamanhoCelula,
    tamanhoCelula,
  );
}

criarPosicoes();

setInterval(gerarPixel, 50);
