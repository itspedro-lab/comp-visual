class ClickCounter {
  constructor(canvas, contador) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.contador = contador;

    this.cliques = 0;

    this.canvas.addEventListener("click", (event) => {
      this.clicar(event);
    });
  }

  clicar(event) {
    this.cliques++;

    const rect = this.canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.desenharTexto(x, y);
    this.atualizarContador();
  }

  desenharTexto(x, y) {
    this.ctx.fillStyle = "black";
    this.ctx.font = "16px Arial";

    this.ctx.fillText(`Clique ${this.cliques}`, x, y);
  }

  atualizarContador() {
    this.contador.textContent = `Você clicou ${this.cliques} vezes.`;
  }

  resetar() {
    this.cliques = 0;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.atualizarContador();
  }
}

const canvas = document.getElementById("canvas");
const contador = document.getElementById("contador");
const resetButton = document.getElementById("resetButton");

const clickCounter = new ClickCounter(canvas, contador);

resetButton.addEventListener("click", () => {
  clickCounter.resetar();
});
