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
    console.log(initGravity)
}


function initGravity() {
    let bird = document.getElementById('flying-element');
    elementPosition += 2;
    bird.style.top = elementPosition + "px";
    let bird_props = bird.getBoundingClientRect();
    let game_window = document.querySelector('#game-window').getBoundingClientRect();
     if (bird_props.top <= 0 ||
        bird_props.bottom >= game_window.bottom) {
            clearInterval(1);
     }
}


function birdJump() {
    counter = 0
    let jumpInterval = setInterval(jumper, 10);
    function jumper() {
        elementPosition -= 9;
        counter ++;
        const bird = document.getElementById('flying-element');
        bird.style.top = elementPosition + "px";
        if (counter > 30) {
            clearInterval(jumpInterval);
        } 
    }
}