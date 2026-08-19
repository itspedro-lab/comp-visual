class DrawingCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.desenhando = false;

    this.cor = "#000000";
    this.tamanho = 5;

    this.criarEventos();
  }

  criarEventos() {
    this.canvas.addEventListener("mousedown", (event) => {
      this.iniciarDesenho(event);
    });

    this.canvas.addEventListener("mousemove", (event) => {
      this.desenhar(event);
    });

    this.canvas.addEventListener("mouseup", () => {
      this.pararDesenho();
    });

    this.canvas.addEventListener("mouseleave", () => {
      this.pararDesenho();
    });
  }

  obterPosicao(event) {
    const rect = this.canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  iniciarDesenho(event) {
    this.desenhando = true;

    const posicao = this.obterPosicao(event);

    this.ctx.beginPath();

    this.ctx.moveTo(posicao.x, posicao.y);
  }

  desenhar(event) {
    if (!this.desenhando) {
      return;
    }

    const posicao = this.obterPosicao(event);

    this.ctx.lineWidth = this.tamanho;
    this.ctx.strokeStyle = this.cor;

    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    this.ctx.lineTo(posicao.x, posicao.y);

    this.ctx.stroke();
  }

  pararDesenho() {
    this.desenhando = false;
    this.ctx.closePath();
  }

  alterarCor(cor) {
    this.cor = cor;
  }

  alterarTamanho(tamanho) {
    this.tamanho = tamanho;
  }

  limpar() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

const drawing = new DrawingCanvas(document.getElementById("canvas"));

const color = document.getElementById("color");

const size = document.getElementById("size");

const clearButton = document.getElementById("clearButton");

color.addEventListener("input", () => {
  drawing.alterarCor(color.value);
});

size.addEventListener("input", () => {
  drawing.alterarTamanho(Number(size.value));
});

clearButton.addEventListener("click", () => {
  drawing.limpar();
});
