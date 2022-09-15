const gravity = 0.25;
const gapSize = 200;


let gameRunning = false;
let elementPosition = 300;
let pressedKey = false;
let birdSize = 46;
let pipeCounter = 0;
let alreadyCounted = false;
let alreadySent = false;
let highScoreAlreadySet = false;


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
    const startScreen = document.getElementById('start-screen');
    startScreen.style.display = "none";
    bird.style.display = "block";
    bird.style.top = elementPosition + "px";
    setInterval(initGravity, gravity);
    setInterval(changePipePosition, 1);
    setInterval(checkForCollision, 1);
    setInterval(countPipes, 1);
}


function initGravity() {
    let bird = document.getElementById('flying-element');
    elementPosition += 2;
    bird.style.top = elementPosition + "px";
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
        alreadyCounted = false;
        if (parseInt(window.getComputedStyle(bird).top) < parseInt(window.getComputedStyle(upperPipeLeftCorner).top)) {
            endGame();
        }
        if ((parseInt(window.getComputedStyle(bird).top)) > parseInt(window.getComputedStyle(lowerPipeLeftCorner).top)) {
            endGame();
        }
    }
    let birdEdges = bird.getBoundingClientRect();
    let gameWindow = document.querySelector('#game-window').getBoundingClientRect();
        if (birdEdges.top <= 0 ||
            birdEdges.bottom-50 > gameWindow.bottom) {
                endGame();
            }
}


function endGame() {
    gameRunning = false;
    const rightUpperCounter = document.getElementById('high-score');
    rightUpperCounter.style.display = 'None';
    const bird = document.getElementById('flying-element');
    bird.classList.add('loosing-animation');
    const gameOverScore = document.getElementById('game-over-score');
    if (highScoreAlreadySet == false) {
        gameOverScore.innerText = pipeCounter;
        highScoreAlreadySet = true;
    }
    sendHighScoreToServer(pipeCounter);
    const gameOverWindow = document.getElementById('game-over-window');
    gameOverWindow.classList.add("start-game-over-window")
}


function sendHighScoreToServer (pipeCounter) {
    if (alreadySent == false) {
        let data = {'score': pipeCounter};
        fetch('/save_score', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
          body: JSON.stringify(data),
        })
          .then((response) => response)
          .then((data) => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        alreadySent = true;
    }
}


function countPipes() {
    const highScoreText = document.getElementById('high-score');
    const upperPipeRightCorner = document.getElementById('upper-pipe-right-corner');
    let rightUpperLimit = parseInt(window.getComputedStyle(upperPipeRightCorner).left)
    if (rightUpperLimit < 100) {
        if (alreadyCounted == false && gameRunning == true) {
            alreadyCounted = true;
            pipeCounter ++
            highScoreText.innerText = pipeCounter;
        }
    }
}