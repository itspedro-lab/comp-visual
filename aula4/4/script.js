class PixelGenerator {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.size = 20;

    this.speed = 100;

    this.color = "#000000";

    this.colorMode = "random";

    this.mode = "random";

    this.interval = null;

    this.positions = [];
  }

  randomColor() {
    const r = Math.floor(Math.random() * 256);

    const g = Math.floor(Math.random() * 256);

    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
  }

  getColor() {
    if (this.colorMode === "random") {
      return this.randomColor();
    }

    return this.color;
  }

  getColumns() {
    return Math.floor(this.canvas.width / this.size);
  }

  getRows() {
    return Math.floor(this.canvas.height / this.size);
  }

  createPositions() {
    this.positions = [];

    const columns = this.getColumns();
    const rows = this.getRows();

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        this.positions.push({
          row,
          column,
        });
      }
    }
  }

  drawPixel(column, row) {
    this.ctx.fillStyle = this.getColor();

    this.ctx.fillRect(
      column * this.size,
      row * this.size,
      this.size,
      this.size,
    );
  }

  drawRandom() {
    const columns = this.getColumns();
    const rows = this.getRows();

    const column = Math.floor(Math.random() * columns);

    const row = Math.floor(Math.random() * rows);

    this.drawPixel(column, row);
  }

  drawFill() {
    if (this.positions.length === 0) {
      this.clear();
      this.createPositions();
    }

    const index = Math.floor(Math.random() * this.positions.length);

    const position = this.positions.splice(index, 1)[0];

    this.drawPixel(position.column, position.row);
  }

  update() {
    if (this.mode === "random") {
      this.drawRandom();
    }

    if (this.mode === "fill") {
      this.drawFill();
    }
  }

  start() {
    this.stop();

    if (this.mode === "fill") {
      this.createPositions();
    }

    this.interval = setInterval(() => {
      this.update();
    }, this.speed);
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setSpeed(speed) {
    this.speed = speed;

    if (this.interval !== null) {
      this.start();
    }
  }

  setSize(size) {
    this.size = size;

    this.clear();
    this.createPositions();
  }

  setColor(color) {
    this.color = color;
  }

  setColorMode(mode) {
    this.colorMode = mode;
  }

  setMode(mode) {
    this.mode = mode;

    this.clear();
    this.createPositions();
  }
}

const generator = new PixelGenerator(document.getElementById("canvas"));

const speed = document.getElementById("speed");

const size = document.getElementById("size");

const color = document.getElementById("color");

const colorMode = document.getElementById("colorMode");

const mode = document.getElementById("mode");

const speedValue = document.getElementById("speedValue");

const sizeValue = document.getElementById("sizeValue");

speed.addEventListener("input", () => {
  const value = Number(speed.value);

  speedValue.textContent = `${value} ms`;

  generator.setSpeed(value);
});

size.addEventListener("input", () => {
  const value = Number(size.value);

  sizeValue.textContent = `${value} px`;

  generator.setSize(value);
});

color.addEventListener("input", () => {
  generator.setColor(color.value);
});

colorMode.addEventListener("change", () => {
  generator.setColorMode(colorMode.value);
});

mode.addEventListener("change", () => {
  generator.setMode(mode.value);
});

document.getElementById("startButton").addEventListener("click", () => {
  generator.start();
});

document.getElementById("stopButton").addEventListener("click", () => {
  generator.stop();
});

document.getElementById("clearButton").addEventListener("click", () => {
  generator.clear();
});
