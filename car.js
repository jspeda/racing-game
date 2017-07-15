const car1 = document.createElement("img");
let car1Loaded = false;

let carX = 75;
let carY = 75;
let carAng = 0;
let carSpeed = 0;

const groundspeedDecayMult = 0.94;
const drivePower = 0.5;
const reversePower = 0.2;
const turnRate = 0.05;
