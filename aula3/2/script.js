const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const centroX = 150;
const centroY = 150;
const raio = 100;

const segmentos = 3;

ctx.beginPath();

for (let i = 0; i <= segmentos; i++) {
  const angulo = (i / segmentos) * Math.PI * 2;

  const x = centroX + Math.cos(angulo) * raio;
  const y = centroY + Math.sin(angulo) * raio;

  if (i === 0) {
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
  }
}

ctx.closePath();
ctx.stroke();
