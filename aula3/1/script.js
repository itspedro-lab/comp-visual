const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

for (let i = 0; i < 50; i++) {
  const tamanho = Math.random() * 80 + 10;

  const x = Math.random() * (canvas.width - tamanho);
  const y = Math.random() * (canvas.height - tamanho);

  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

  ctx.fillRect(x, y, tamanho, tamanho);
}
