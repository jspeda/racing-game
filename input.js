const keyLeftArrow = 37;
const keyUpArrow = 38;
const keyRightArrow = 39;
const keyDownArrow = 40;

let keyHeldGas = false;
let keyHeldReverse = false;
let keyHeldTurnLeft = false;
let keyHeldTurnRight = false;

let mouseX, mouseY;

const setupInput = () => {
  canvas.addEventListener('mousemove', updateMousePos);
  
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
}

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
