const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const scoreHeading = document.querySelector('#score');
const game = document.querySelector('.gamepad-icon');
const scoreText = document.querySelector('.h1-score');
const replayButton = document.querySelector('.replay-button');
const battery = document.querySelector('.battery');
const camera = document.querySelector('.camera-icon');
const mobile = document.querySelector('.mobile');
const screen = document.querySelector('.screen');
const image = document.querySelector('.image');
const cameraButtons = document.querySelector('.camera-buttons');
const photoButton = document.querySelector('.photo-camera');
const callIcon = document.querySelector('.call-icon');
const messageIcon = document.querySelector('.message-icon');
const toggleBtn = document.querySelector('.toggle');
const sidebar = document.querySelector('#sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

callIcon.addEventListener('click', () => {
  document.querySelector('.dial-container').style.display = 'block';
  document.querySelector('.screen').classList.remove('active');
  image.setAttribute('hidden', '');
});

messageIcon.addEventListener('click', () => {
  document.querySelector('.bubbles').style.display = 'block';
  document.querySelector('.screen').classList.remove('active');
  image.setAttribute('hidden', '');
});

photoButton.addEventListener('click', () => {
  screen.classList.add('flash');
  setTimeout(() => {
    screen.classList.remove('flash');
  }, 1000);
});

camera.addEventListener('click', () => {
  mobile.style.background = 'none';
  image.setAttribute('hidden', '');
  document.querySelector('.screen').classList.remove('active');
  cameraButtons.removeAttribute('hidden', '');
});

game.addEventListener('click', () => {
  canvas.removeAttribute('hidden');
  scoreText.removeAttribute('hidden');
});

const speed = 15;
let score = 0;
const trafficSpeed = 20;
const playerCarLanes = [27, 225, 425];
let playerCarCurrentLane = playerCarLanes[1];
let trafficCarsArray = [{
  lane: playerCarLanes[2],
  posY: -260,
}];
let collision = false;

// deviders
let canvasH = canvas.height;
const canvasW = canvas.width;
ctx.lineWidth = 15;
ctx.setLineDash([150, 180]);
ctx.strokeStyle = '#F7F7F9';

// player car
const playerCar = new Image();
playerCar.src = document.querySelector('#blue-car').getAttribute('src');

function drawPlayerCar() {
  ctx.drawImage(playerCar, playerCarCurrentLane, 750);
}

// traffic randomizer
const trafficCar = new Image();
trafficCar.src = document.querySelector('#red-car').getAttribute('src');

function trafficRandomizer() {
  const trafficLane = playerCarLanes[Math.floor(Math.random() * playerCarLanes.length)];
  trafficCarsArray.push({
    lane: trafficLane,
    posY: -260,
  });
}
const max = 1500;
const min = 500;
(function randomInterval() {
  const int = Math.floor(Math.random() * (max - min + 1)) + min;
  window.setTimeout(() => {
    trafficRandomizer();
    randomInterval();
  }, int);
}());

// change lane
document.addEventListener('keydown', (event) => {
  const arrow = event.key;
  const currentCarLane = playerCarLanes.indexOf(playerCarCurrentLane);
  let newLane = currentCarLane;
  if (arrow == 'ArrowLeft' && currentCarLane !== 0) {
    newLane = currentCarLane - 1;
  } else if (arrow == 'ArrowRight' && currentCarLane !== 2) {
    newLane = currentCarLane + 1;
  }
  playerCarCurrentLane = playerCarLanes[newLane];
});

// draw frame
function drawFrame() {
  ctx.clearRect(0, 0, canvasW, canvasH);
  // devider 1
  canvasH += speed;
  ctx.beginPath();
  ctx.moveTo(156, canvasH);
  ctx.lineTo(146, 0);
  // devider 2
  ctx.moveTo(362, canvasH);
  ctx.lineTo(362, 0);
  ctx.stroke();
  // car
  drawPlayerCar();
  // traffic
  for (let i = 0; i < trafficCarsArray.length; i++) {
    const thisCar = trafficCarsArray[i];
    const trafficLane = thisCar.lane;
    const trafficPosY = (thisCar.posY += trafficSpeed);
    ctx.drawImage(trafficCar, trafficLane, trafficPosY);
    // collision
    if (trafficLane === playerCarCurrentLane && trafficPosY > 598) {
      window.cancelAnimationFrame(drawFrame);
      if (!canvas.hasAttribute('hidden')) {
        replayButton.removeAttribute('hidden');
      }

      collision = true;
      return false;
    }
    // remove car when out of frame and add score
    if (trafficPosY > 900) {
      trafficCarsArray.splice(thisCar, 1);
      scoreHeading.textContent = score += 1;
    }
  }
  window.requestAnimationFrame(drawFrame);
}
window.requestAnimationFrame(drawFrame);
//  retry
document.addEventListener('click', () => {
  if (collision) {
    ctx.clearRect(0, 0, canvasW, canvasH);
    trafficCarsArray = [];
    playerCarCurrentLane = playerCarLanes[1];
    score = 0;
    scoreHeading.textContent = 0;
    drawFrame();
    collision = false;
    replayButton.setAttribute('hidden', '');
  }
});

window.focus();

// phone
document.querySelector('.bottom').addEventListener('click', () => {
  document.querySelector('.screen').classList.toggle('active');
  canvas.setAttribute('hidden', '');
  scoreText.setAttribute('hidden', '');
  if (battery.style.display === 'none') {
    battery.style.display = 'block';
  } else {
    battery.style.display = 'none';
  }
  mobile.style.background = '#020c17';

  if (image.hasAttribute('hidden', '')) {
    battery.style.display = 'none';
    image.removeAttribute('hidden');
    document.querySelector('.screen').classList.add('active');
  }
  cameraButtons.setAttribute('hidden', '');
  document.querySelector('.dial-container').style.display = 'none';
  document.querySelector('.bubbles').style.display = 'none';
});
