const gravity = 0.25;

let gameRunning = false
let elementPosition = 300

let pressedKey = false;

document.addEventListener("keydown", (event) => {
    if (pressedKey == false) {
        birdJump();
    }
    if (gameRunning == false) {
        initGame();
    }
  });


function initGame() {
    gameRunning = true;
    const bird = document.getElementById('flying-element');
    bird.style.display = "block";
    bird.style.top = elementPosition + "px";
    setInterval(initGravity, gravity);
}


function initGravity() {
    let bird = document.getElementById('flying-element');
    elementPosition += 2;
    bird.style.top = elementPosition + "px";
    let birdEdges = bird.getBoundingClientRect();
    let gameWindow = document.querySelector('#game-window').getBoundingClientRect();
     if (birdEdges.top <= 0 ||
        birdEdges.bottom-50 > gameWindow.bottom) {
            bird.style.display = "none";
     }
}


function birdJump() {
    pressedKey = true;
    const bird = document.getElementById('flying-element');
    bird.style.transform = 'rotate(-20deg)';
    counter = 0
    let jumpInterval = setInterval(jumper, 10);
    function jumper() {
        elementPosition -= 9;
        counter ++;
        const bird = document.getElementById('flying-element');
        bird.style.top = elementPosition + "px";
        if (counter > 25) {
            clearInterval(jumpInterval);
            bird.style.transform = 'rotate(0deg)';
            pressedKey = false;
        } 
    }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}