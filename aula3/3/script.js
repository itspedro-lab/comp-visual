const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const tamanhoGrade = 10;
const tamanhoCelula = canvas.width / tamanhoGrade;

for (let i = 0; i < 50; i++) {
  const coluna = Math.floor(Math.random() * tamanhoGrade);
  const linha = Math.floor(Math.random() * tamanhoGrade);

  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

  ctx.fillRect(
    coluna * tamanhoCelula,
    linha * tamanhoCelula,
    tamanhoCelula,
    tamanhoCelula,
  );
}
