const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const square = {
  x: 50,
  y: 150,
  size: 40,
  color: "#ff6b6b",
};

const speed = {
  dx: 4,
  dy: 0,
};

let direction = 1;

function drawSquare() {
  ctx.fillStyle = square.color;
  ctx.fillRect(square.x, square.y, square.size, square.size);
}

function drawBorders() {
  ctx.strokeStyle = "#4a4a4a";
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function updatePosition() {
  square.x += speed.dx * direction;

  if (square.x + square.size >= canvas.width) {
    direction = -1;
  } else if (square.x <= 0) {
    direction = 1;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBorders();
  updatePosition();
  drawSquare();
  requestAnimationFrame(animate);
}

animate();
