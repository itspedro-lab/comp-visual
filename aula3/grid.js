class Grid {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.cells = this.createEmptyGrid();
  }

  createEmptyGrid() {
    const grid = [];

    for (let row = 0; row < this.rows; row++) {
      grid[row] = [];

      for (let column = 0; column < this.columns; column++) {
        grid[row][column] = 0;
      }
    }

    return grid;
  }

  getCell(row, column) {
    return this.cells[row][column];
  }

  setCell(row, column, value) {
    this.cells[row][column] = value;
  }

  toggleCell(row, column) {
    const currentValue = this.getCell(row, column);

    this.setCell(row, column, currentValue === 1 ? 0 : 1);
  }

  clear() {
    this.cells = this.createEmptyGrid();
  }

  randomize() {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        this.cells[row][column] = Math.random() > 0.7 ? 1 : 0;
      }
    }
  }
}
