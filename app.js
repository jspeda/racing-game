let canvas, canvasContext;

window.onload = function() {

  canvas = document.getElementById('canvas');
  canvasContext = canvas.getContext('2d');

  const framesPerSecond = 30;

  setupInput();

  const start = document.querySelector('.start');

  const handler = (e) => {
    start.parentNode.removeChild(start);
    carReset();
    trackLoadImages();
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
      if (trackGrid[arrayIndex] === trackPlayerStart) {
        trackGrid[arrayIndex] = trackRoad;
        carAng = -Math.PI/2;
        carX = eachCol * trackW + (trackW / 2);
        carY = eachRow * trackH + (trackH / 2);
      }
    }
  }
}

const carMove = () => {
  carSpeed *= groundspeedDecayMult;
  if (keyHeldGas) carSpeed += drivePower;
  if (keyHeldReverse) carSpeed -= reversePower;
  if (keyHeldTurnLeft) carAng -= turnRate;
  if (keyHeldTurnRight) carAng += turnRate;

  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;
}

const isWallAtColRow = (col, row) => {
  if (col >= 0 && col < trackCols &&
      row >= 0 && row < trackRows) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return trackGrid[trackIndexUnderCoord] == trackWall;
      }
  else {
    return false;
  }
}

const moveAll = () => {
  carMove();
  carTrackHandling();
}

const drawAll = () => {
  colorRect(0,0, canvas.width, canvas.height, 'black');
  drawTracks();
  if (car1Loaded) {
    drawBitmapCenteredWithRotation(car1, carX, carY, carAng);
  }
}
