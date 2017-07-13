const car1 = document.createElement("img");
let car1Loaded = false;

let carX = 75;
let carY = 75;
let carAng = 0;
let carSpeed = 0;

const trackW = 40;
const trackH = 40;
const trackGap = 2;
const trackCols = 20;
const trackRows = 15;

let trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
                 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
                 1, 0, 2, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1,
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

let canvas, canvasContext;

const keyLeftArrow = 37;
const keyUpArrow = 38;
const keyRightArrow = 39;
const keyDownArrow = 40;

let keyHeldGas = false;
let keyHeldReverse = false;
let keyHeldTurnLeft = false;
let keyHeldTurnRight = false;

let mouseX, mouseY;


const updateMousePos = (e) => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  mouseX = e.clientX - rect.left - root.scrollLeft;
  mouseY = e.clientY - rect.top - root.scrollTop;

}

const keyPressed = (e) => {
  if (e.keyCode === keyLeftArrow) {
    keyHeldTurnLeft = true;
  }
  if (e.keyCode === keyRightArrow) {
    keyHeldTurnRight = true;
  }
  if (e.keyCode === keyUpArrow) {
    keyHeldGas = true;
  }
  if (e.keyCode === keyDownArrow) {
    keyHeldReverse = true;
  }
}

const keyReleased = (e) => {
  if (e.keyCode === keyLeftArrow) {
    keyHeldTurnLeft = false;
  }
  if (e.keyCode === keyRightArrow) {
    keyHeldTurnRight = false;
  }
  if (e.keyCode === keyUpArrow) {
    keyHeldGas = false;
  }
  if (e.keyCode === keyDownArrow) {
    keyHeldReverse = false;
  }
}

window.onload = function() {

  canvas = document.getElementById('canvas');
  canvasContext = canvas.getContext('2d');

  const framesPerSecond = 30;
  canvas.addEventListener('mousemove', updateMousePos);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  const start = document.querySelector('.start');

  const handler = (e) => {
    start.parentNode.removeChild(start);
    carReset();
    car1.onload = () => {
      car1Loaded = true;
      console.log('hi')
    };
    car1.src = "car.png";
    setInterval(updateAll, 1000/framesPerSecond);
    e.target.removeEventListener(e.tyle, arguments.callee);
  }

  start.addEventListener('click', handler)
}

const updateAll = () => {
  moveAll();
  drawAll();
}

const carReset = () => {
  for (let eachRow = 0; eachRow < trackRows; eachRow++) {
    for (let eachCol = 0; eachCol < trackCols; eachCol++) {
      let arrayIndex = rowColToArrayIndex(eachCol, eachRow);
      if (trackGrid[arrayIndex] === 2) {
        trackGrid[arrayIndex] = 0;
        carX = eachCol * trackW + (trackW / 2);
        carY = eachRow * trackH + (trackH / 2);
      }
    }
  }
}

const carMove = () => {
  carSpeed *= 0.98;
  if (keyHeldGas) carSpeed += 0.3;
  if (keyHeldReverse) carSpeed += 0.3;
  if (keyHeldTurnLeft) carAng -= 0.04;
  if (keyHeldTurnRight) carAng += 0.04;

  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;
}

const isTrackAtColRow = (col, row) => {
  if (col >= 0 && col < trackCols &&
      row >= 0 && row < trackRows) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return trackGrid[trackIndexUnderCoord] == 1;
      }
  else {
    return false;
  }
}

const carTrackHandling = () => {
  let carTrackCol = Math.floor(carX / trackW);
  let carTrackRow = Math.floor(carY / trackH);
  let trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
  // colorText(`${mouseTrackCol}, ${mouseTrackRow} : ${trackIndexUnderMouse}`, mouseX,mouseY, 'yellow');

  if (carTrackCol >= 0 && carTrackCol < trackCols &&
      carTrackRow >= 0 && carTrackRow < trackRows) {

    if (isTrackAtColRow(carTrackCol, carTrackRow)) {
      carX -= Math.cos(carAng) * carSpeed;
      carY -= Math.sin(carAng) * carSpeed;
      carSpeed *= -0.5;
    }
  }
}

const moveAll = () => {
  carMove();
  carTrackHandling();
}

const rowColToArrayIndex = (col, row) => {
  return col + trackCols * row;
}

const drawTracks = () => {
  for (let eachRow = 0; eachRow < trackRows; eachRow++) {
    trackGrid.map((track, index) => {
      let arrayIndex = rowColToArrayIndex(index, eachRow);
      if (trackGrid[arrayIndex] == 1) {
        colorRect(trackW*index, trackH*eachRow,
          trackW-trackGap, trackH-trackGap, 'pink')
      }
    })
  }
}

const drawAll = () => {
  colorRect(0,0, canvas.width, canvas.height, 'black');
  // colorCircle(carX,carY, 10, '#24aadb');

  if (car1Loaded) {
    drawBitmapCenteredWithRotation(car1, carX, carY, carAng);
  }

  drawTracks();
}

const colorRect = (topLeftX, topLeftY, boxWidth, boxHeight, fillColor) => {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

const drawBitmapCenteredWithRotation = (useBitmap, atX, atY, withAng) => {
  canvasContext.save();
  canvasContext.translate(atX, atY);
  canvasContext.rotate(withAng);
  canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
  canvasContext.restore();
}

const colorCircle = (centerX,centerY, radius, fillColor) => {
  console.log(`x: ${carX}, y: ${carY}`);
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
  canvasContext.fill();
}

const colorText = (showWords, textX,textY, fillColor) => {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX,textY);
}
