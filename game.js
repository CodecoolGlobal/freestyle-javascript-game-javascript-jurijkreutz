const gravity = 0.05;


document.addEventListener("keydown", (event) => {
    initGame();
  });


function initGame() {
    const bird = document.getElementById('flying-element');
    bird.style.display = "block";
}


function initGravity() {
    
}