const canvas = document.getElementById("canva");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

function getRandomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

class Desenho {
  rect(x, y, largura, altura, cor) {
    context.fillStyle = cor;
    context.fillRect(x, y, largura, altura);
  }

  triangulo(x1, y1, x2, y2, x3, y3, cor) {
    context.fillStyle = cor;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.closePath();
    context.fill();
  }

  pentagono(x, y, tamanho, cor) {
    context.fillStyle = cor;
    context.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const xPos = x + tamanho * Math.cos(angle);
      const yPos = y + tamanho * Math.sin(angle);
      if (i === 0) {
        context.moveTo(xPos, yPos);
      } else {
        context.lineTo(xPos, yPos);
      }
    }
    context.closePath();
    context.fill();
  }
}

const desenho = new Desenho();

desenho.rect(50, 50, 100, 100, "orange");
desenho.triangulo(200, 50, 250, 150, 170, 150, "yellow");
desenho.pentagono(300, 100, 50, "green");

desenho.rect(500, 50, 190, 50, "green");
desenho.rect(500, 100, 190, 50, "yellow");
desenho.rect(500, 150, 190, 50, "royalblue");

for (let i = 0; i < 10; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const tamanho = Math.random() * 50 + 10;
  const cor = getRandomColor();
  desenho.pentagono(x, y, tamanho, cor);
}
