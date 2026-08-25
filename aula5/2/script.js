const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

const ball = {
  x: 50,
  y: 150,
  radius: 20,
  color: "#ff6b6b",
};

const speed = {
  dx: 4,
  dy: 3,
};

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
  ball.x += speed.dx;
  ball.y += speed.dy;

  if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
    speed.dx *= -1;
  }

  if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
    speed.dy *= -1;
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
