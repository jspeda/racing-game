const roadPic = document.createElement('img');
const wallPic = document.createElement('img');

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

const trackRoad = 0;
const trackWall = 1;
const trackPlayerStart = 2;

const trackLoadImages = () => {
  roadPic.src = 'road.png';
  wallPic.src = 'wall.png'
}

const carTrackHandling = () => {
  let carTrackCol = Math.floor(carX / trackW);
  let carTrackRow = Math.floor(carY / trackH);
  let trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

  if (carTrackCol >= 0 && carTrackCol < trackCols &&
      carTrackRow >= 0 && carTrackRow < trackRows) {

    if (isWallAtColRow(carTrackCol, carTrackRow)) {
      carX -= Math.cos(carAng) * carSpeed;
      carY -= Math.sin(carAng) * carSpeed;
      carSpeed *= -0.5;
    }
  }
}

const rowColToArrayIndex = (col, row) => {
  return col + trackCols * row;
}

const drawTracks = () => {
  for (let eachRow = 0; eachRow < trackRows; eachRow++) {
    trackGrid.map((track, index) => {
      let arrayIndex = rowColToArrayIndex(index, eachRow);
      if (trackGrid[arrayIndex] == 1) {
        // canvasContext.drawImage(wallPic,trackW*index, trackH*eachRow)
        colorRect(trackW*index, trackH*eachRow,
          trackW-trackGap, trackH-trackGap, 'pink')
      }
      else if (trackGrid[arrayIndex] == 0) {
        canvasContext.drawImage(roadPic, trackW*index, trackH*eachRow);
      }
    })
  }
}
