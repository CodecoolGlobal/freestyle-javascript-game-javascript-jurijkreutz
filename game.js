const gravity = 0.35;

let gameRunning = false
let elementPosition = 300


document.addEventListener("keydown", (event) => {
    birdJump();
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
    const bird = document.getElementById('flying-element');
    bird.style.transform = 'rotate(-20deg)';
    counter = 0
    let jumpInterval = setInterval(jumper, 10);
    function jumper() {
        elementPosition -= 9;
        counter ++;
        const bird = document.getElementById('flying-element');
        bird.style.top = elementPosition + "px";
        if (counter > 30) {
            clearInterval(jumpInterval);
            bird.style.transform = 'rotate(0deg)';
        } 
    }
}