const canvas = document.getElementById("gameCanvas");
const startButton = document.getElementById("startButton");
const stepButton = document.getElementById("stepButton");
const randomButton = document.getElementById("randomButton");
const clearButton = document.getElementById("clearButton");
const generationText = document.getElementById("generation");

const grid = new Grid(25, 25);
const game = new GameOfLife(grid);
const renderer = new CanvasRenderer(canvas, grid);

function updateScreen() {
  renderer.draw();

  generationText.textContent = game.generation;
}

canvas.addEventListener("click", (event) => {
  if (game.running) {
    return;
  }

  const position = renderer.getCellFromMouse(event);

  grid.toggleCell(position.row, position.column);

  updateScreen();
});

startButton.addEventListener("click", () => {
  if (game.running) {
    game.stop();

    startButton.textContent = "Iniciar";
  } else {
    game.start(updateScreen);

    startButton.textContent = "Pausar";
  }
});

stepButton.addEventListener("click", () => {
  if (game.running) {
    return;
  }

  game.nextGeneration();

  updateScreen();
});

randomButton.addEventListener("click", () => {
  game.stop();

  startButton.textContent = "Iniciar";

  game.generation = 0;

  grid.randomize();

  updateScreen();
});

clearButton.addEventListener("click", () => {
  game.reset();

  startButton.textContent = "Iniciar";

  updateScreen();
});

updateScreen();
