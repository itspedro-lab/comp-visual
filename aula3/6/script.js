const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const tamanho = 20;

function corAleatoria() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

function desenhar() {
  for (let y = 0; y < canvas.height; y += tamanho) {
    for (let x = 0; x < canvas.width; x += tamanho) {
      ctx.fillStyle = corAleatoria();

      ctx.fillRect(x, y, tamanho, tamanho);
    }
  }
}

desenhar();

setInterval(desenhar, 500);
