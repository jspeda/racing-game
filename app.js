const car1 = document.createElement("img");
let car1Loaded = false;

let ballX = 75;
let ballSpeedX = 5;
let ballY = 75;
let ballSpeedY = 7;

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

let mouseX, mouseY;


const updateMousePos = (e) => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  mouseX = e.clientX - rect.left - root.scrollLeft;
  mouseY = e.clientY - rect.top - root.scrollTop;

}

window.onload = function() {

  canvas = document.getElementById('canvas');
  canvasContext = canvas.getContext('2d');

  const framesPerSecond = 30;
  canvas.addEventListener('mousemove', updateMousePos);

  const start = document.querySelector('.start');

  const handler = (e) => {
    start.parentNode.removeChild(start);
    ballReset();
    car1.onLoad = () => {
      car1Loaded = true;
      console.log('hi')
    }
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

const ballReset = () => {
  for (let eachRow = 0; eachRow < trackRows; eachRow++) {
    for (let eachCol = 0; eachCol < trackCols; eachCol++) {
      let arrayIndex = rowColToArrayIndex(eachCol, eachRow);
      if (trackGrid[arrayIndex] === 2) {
        trackGrid[arrayIndex] = 0;
        ballX = eachCol * trackW + (trackW / 2);
        ballY = eachRow * trackH + (trackH / 2);
      }
    }
  }
}

const ballMove = () => {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX > canvas.width && ballSpeedX > 0) {
    ballSpeedX *= -1;
  }

  if (ballX < 0 && ballSpeedX < 0) {
    ballSpeedX *= -1;
  }

  if (ballY > canvas.height) {
    ballReset();
  }

  if (ballY < 0 && ballSpeedY < 0) {
    ballSpeedY *= -1;
  }
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

const ballTrackHandling = () => {
  let ballTrackCol = Math.floor(ballX / trackW);
  let ballTrackRow = Math.floor(ballY / trackH);
  let trackIndexUnderBall = rowColToArrayIndex(ballTrackCol, ballTrackRow);
  // colorText(`${mouseTrackCol}, ${mouseTrackRow} : ${trackIndexUnderMouse}`, mouseX,mouseY, 'yellow');

  if (ballTrackCol >= 0 && ballTrackCol < trackCols &&
      ballTrackRow >= 0 && ballTrackRow < trackRows) {

        if (isTrackAtColRow(ballTrackCol, ballTrackRow)) {

          let prevBallX = ballX - ballSpeedX;
          let prevBallY = ballY - ballSpeedY;
          let prevTrackCol = Math.floor(prevBallX / trackW);
          let prevTrackRow = Math.floor(prevBallY / trackH);

          let bothTestsFailed = true;

          if (prevTrackCol != ballTrackCol) {
            if (isTrackAtColRow(prevTrackCol, ballTrackRow) == false) {
              ballSpeedX *= -1;
              bothTestsFailed = false;
            }
          }

          if (prevTrackRow != ballTrackRow) {
            if (isTrackAtColRow(ballTrackCol, ballTrackRow) == false) {
              ballSpeedY *= -1;
              bothTestsFailed = false;
            }
          }

          if (bothTestsFailed) {
            ballSpeedX *= -1;
            ballSpeedY *= -1;
          }
        }
  }
}

const moveAll = () => {
  // ballMove();
  ballTrackHandling();
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
  // colorCircle(ballX,ballY, 10, '#24aadb');

  if (car1Loaded) {
    canvasContext.drawImage(car1, ballX-carPic.width/2, ballY-carPick.height/2);
  }

  drawTracks();
}

const colorRect = (topLeftX, topLeftY, boxWidth, boxHeight, fillColor) => {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

const colorCircle = (centerX,centerY, radius, fillColor) => {
  console.log(`x: ${ballX}, y: ${ballY}`);
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
  canvasContext.fill();
}

const colorText = (showWords, textX,textY, fillColor) => {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX,textY);
}
