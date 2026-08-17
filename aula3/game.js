class GameOfLife {
  constructor(grid) {
    this.grid = grid;

    this.generation = 0;

    this.running = false;
    this.interval = null;
  }

  countNeighbors(row, column) {
    let neighbors = 0;

    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
        if (rowOffset === 0 && columnOffset === 0) {
          continue;
        }

        const neighborRow = row + rowOffset;
        const neighborColumn = column + columnOffset;

        const validRow = neighborRow >= 0 && neighborRow < this.grid.rows;

        const validColumn =
          neighborColumn >= 0 && neighborColumn < this.grid.columns;

        if (validRow && validColumn) {
          neighbors += this.grid.getCell(neighborRow, neighborColumn);
        }
      }
    }

    return neighbors;
  }

  nextGeneration() {
    const nextGrid = this.grid.createEmptyGrid();

    for (let row = 0; row < this.grid.rows; row++) {
      for (let column = 0; column < this.grid.columns; column++) {
        const cell = this.grid.getCell(row, column);

        const neighbors = this.countNeighbors(row, column);

        if (cell === 1) {
          if (neighbors === 2 || neighbors === 3) {
            nextGrid[row][column] = 1;
          }
        } else {
          if (neighbors === 3) {
            nextGrid[row][column] = 1;
          }
        }
      }
    }

    this.grid.cells = nextGrid;

    this.generation++;
  }

  start(callback) {
    if (this.running) {
      return;
    }

    this.running = true;

    this.interval = setInterval(() => {
      this.nextGeneration();

      callback();
    }, 200);
  }

  stop() {
    this.running = false;

    clearInterval(this.interval);
  }

  reset() {
    this.stop();

    this.generation = 0;

    this.grid.clear();
  }
}
