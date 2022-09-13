const gravity = 0.25;
let gapSize = 200;

let gameRunning = false;
let elementPosition = 300;
let pressedKey = false;
let birdSize = 46;


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
    setInterval(changePipePosition, 1);
    setInterval(checkForCollision, 1);
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

function changePipePosition() {
    const higherPipe = document.getElementById('higher-pipe');
    const lowerPipe = document.getElementById('lower-pipe');
    if (window.getComputedStyle(higherPipe).display === "none") {
        higherPipe.style.display = "block";
        lowerPipe.style.display = "block";
    }
    let computedStyle = window.getComputedStyle(higherPipe);
    let leftValue = parseInt(computedStyle.getPropertyValue('left'))
    if (leftValue > 580) {
        let randomPosition = getRandomInt(-400, -160);
        higherPipe.style.top = randomPosition + "px";
        lowerPipe.style.top = randomPosition + gapSize + "px";
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


function checkForCollision () {
    const lowerPipe = document.getElementById('lower-pipe');

    const upperPipeLeftCorner = document.getElementById('upper-pipe-left-corner');
    upperPipeLeftCorner.style.left = parseInt(window.getComputedStyle(lowerPipe).left) + "px";
    upperPipeLeftCorner.style.top = parseInt(window.getComputedStyle(lowerPipe).top) + 240 + "px";
 
    const lowerPipeLeftCorner = document.getElementById('lower-pipe-left-corner');
    lowerPipeLeftCorner.style.left = parseInt(window.getComputedStyle(lowerPipe).left) + "px";
    lowerPipeLeftCorner.style.top = parseInt(window.getComputedStyle(lowerPipe).top) + 240 + gapSize - birdSize + "px";

    const upperPipeRightCorner = document.getElementById('upper-pipe-right-corner');
    upperPipeRightCorner.style.left = parseInt(window.getComputedStyle(lowerPipe).left) + 115 + "px";
    upperPipeRightCorner.style.top = parseInt(window.getComputedStyle(lowerPipe).top) + 240 + "px";

    const bird = document.getElementById('flying-element');
    let leftUpperLimit = parseInt(window.getComputedStyle(upperPipeLeftCorner).left)
    let rightUpperLimit = parseInt(window.getComputedStyle(upperPipeRightCorner).left)

    if (leftUpperLimit < 100 && rightUpperLimit > 100) {
        console.log('Auf Bird Hohe');
        if (parseInt(window.getComputedStyle(bird).top) < parseInt(window.getComputedStyle(upperPipeLeftCorner).top)) {
            alert('Upper collision');
        }
        if ((parseInt(window.getComputedStyle(bird).top)) > parseInt(window.getComputedStyle(lowerPipeLeftCorner).top)) {
            alert('Lower collision');
        }
    }

}