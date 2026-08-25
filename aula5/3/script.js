const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

const ball = {
  x: 150,
  y: 50,
  radius: 20,
  color: "#ff6b6b",
};

const speed = {
  dx: 0,
  dy: 0,
};

const gravity = 0.5;

const bounce = 0.8;

function drawBall() {
  ctx.beginPath();
  ctx.fillStyle = ball.color;
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function drawBorders() {
  ctx.strokeStyle = "#4a4a4a";
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function updatePosition() {
  speed.dy += gravity;
  ball.y += speed.dy;

  if (ball.y + ball.radius >= canvas.height) {
    ball.y = canvas.height - ball.radius;
    speed.dy *= -bounce;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBorders();
  updatePosition();
  drawBall();
  requestAnimationFrame(animate);
}

animate();
