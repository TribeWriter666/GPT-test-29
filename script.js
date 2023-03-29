const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const maxRadius = Math.hypot(centerX, centerY);

const gradientsCount = 6;
const gradients = [];

function createGradients() {
  for (let i = 0; i < gradientsCount; i++) {
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, maxRadius
    );
    const hue = (i / gradientsCount) * 360;
    gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 1)`);
    gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
    gradients.push(gradient);
  }
}

createGradients();

function draw(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const step = 0.01;
  const scale = 0.5;

  for (let i = 0; i < gradientsCount; i++) {
    const angle = (time * 0.0001 + step * i) % (Math.PI * 2);
    const x = centerX + Math.cos(angle) * maxRadius * scale;
    const y = centerY + Math.sin(angle) * maxRadius * scale;

    ctx.beginPath();
    ctx.arc(x, y, maxRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradients[i];
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw(0);
