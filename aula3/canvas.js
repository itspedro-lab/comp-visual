class CanvasRenderer {
  constructor(canvas, grid) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.grid = grid;

    this.cellWidth = canvas.width / grid.columns;

    this.cellHeight = canvas.height / grid.rows;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.clear();

    for (let row = 0; row < this.grid.rows; row++) {
      for (let column = 0; column < this.grid.columns; column++) {
        const cell = this.grid.getCell(row, column);

        const x = column * this.cellWidth;
        const y = row * this.cellHeight;

        if (cell === 1) {
          this.context.fillStyle = "black";

          this.context.fillRect(x, y, this.cellWidth, this.cellHeight);
        }

        this.context.strokeStyle = "#ddd";

        this.context.strokeRect(x, y, this.cellWidth, this.cellHeight);
      }
    }
  }

  getCellFromMouse(event) {
    const rect = this.canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;

    const mouseY = event.clientY - rect.top;

    return {
      column: Math.floor(mouseX / this.cellWidth),

      row: Math.floor(mouseY / this.cellHeight),
    };
  }
}
