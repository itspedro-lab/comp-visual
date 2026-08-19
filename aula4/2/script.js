class RGBRectangle {
  constructor(canvas, red, green, blue) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.red = red;
    this.green = green;
    this.blue = blue;

    this.redValue = document.getElementById("redValue");

    this.greenValue = document.getElementById("greenValue");

    this.blueValue = document.getElementById("blueValue");

    this.criarEventos();
    this.desenhar();
  }

  criarEventos() {
    this.red.addEventListener("input", () => {
      this.desenhar();
    });

    this.green.addEventListener("input", () => {
      this.desenhar();
    });

    this.blue.addEventListener("input", () => {
      this.desenhar();
    });
  }

  obterCor() {
    return `rgb(
          ${this.red.value},
          ${this.green.value},
          ${this.blue.value}
        )`;
  }

  desenhar() {
    this.redValue.textContent = this.red.value;
    this.greenValue.textContent = this.green.value;
    this.blueValue.textContent = this.blue.value;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = this.obterCor();

    this.ctx.fillRect(100, 50, 300, 200);
  }
}

new RGBRectangle(
  document.getElementById("canvas"),
  document.getElementById("red"),
  document.getElementById("green"),
  document.getElementById("blue"),
);
