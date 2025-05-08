//pantallas
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

//botones
const startBtnNode = document.querySelector("#start-btn");
const restartBtn = document.querySelector(".restartBtn");
const livesNode = document.querySelector("#lives h1");
//game box
const gameBoxNode = document.querySelector("#game-box");
const minutesNode = document.querySelector("#minutes");
const secondsNode = document.querySelector("#seconds");
const winnerBox = document.querySelector("#winnerBox");
const loserBox = document.querySelector("#loserBox");

//Variables globales
let naveObj = null;
let enemyArr = [];
let vidaObj = null;

let enemyAppearInterval = null;
let winCondition = false;

//Sonidos

const bgSound = document.createElement("audio")
bgSound.src = "./audio/bg-sound.mp3"
bgSound.volume = 0.05
bgSound.loop = true

const liveUpSound = document.createElement("audio")
liveUpSound.src = "./audio/live-up-sound.mp3"
liveUpSound.volume = 0.7

const liveDownSound = document.createElement("audio")
liveDownSound.src = "./audio/live-down-sound.mp3"
liveDownSound.volume = 0.2
//EventListener
startBtnNode.addEventListener("click", () => {
  startGame();
});

document.addEventListener("keydown", (event) => {
  // Evento para registrar el movimiento del usario
  naveObj.moveNave(event);
});

restartBtn.addEventListener("click", () => {
  location.reload();
});

//Funciones

function startGame() {
  splashScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  bgSound.play()

  naveObj = new Nave();

  gameIntervalId = setInterval(() => {
    gameLoop();
    livesCounter();
  }, Math.round(1000 / 60));

  enemyAppearInterval = setInterval(() => {
    enemyAppear();
  }, 700);

  timerInterval = setInterval(() => {
    secondsNode.innerHTML++;
    if (secondsNode.innerHTML < 10) {
      secondsNode.innerHTML = secondsNode.innerHTML.padStart(2, "0");
    }

    if (secondsNode.innerHTML >= 60) {
      minutesNode.innerHTML++;
      minutesNode.innerHTML = minutesNode.innerHTML.padStart(2, "0");
      secondsNode.innerHTML = "00";
    }

    if (minutesNode.innerHTML >= 2) {
      winCondition = true;
    }
  }, 1000);

  liveInterval = setInterval(() => {
    liveAppear();
  }, 30000);
}

function gameLoop() {
  enemyArr.forEach((eachEnemy) => {
    eachEnemy.automaticMovement();
  });
  enemyDestroy();
  checkCollisionNaveEnemigo();
  checkCollisionNaveVida();
}

function enemyAppear() {
  let randomPositionXEnemy = Math.floor(Math.random() * 450);
  let randomEnemy = Math.floor(Math.random() * 4);

  let enemy = new Enemigo(randomEnemy, randomPositionXEnemy);
  enemyArr.push(enemy);
}

function enemyDestroy() {
  if (enemyArr.length > 0 && enemyArr[0].y + enemyArr[0].h >= 760) {
    enemyArr[0].node.remove(); // 1. destuir el nodo
    enemyArr.shift();
  }
}

function checkCollisionNaveEnemigo() {
  enemyArr.forEach((eachEnemyObj, index) => {
    if (
      naveObj.x < eachEnemyObj.x + eachEnemyObj.w &&
      naveObj.x + naveObj.w > eachEnemyObj.x &&
      naveObj.y < eachEnemyObj.y + eachEnemyObj.h &&
      naveObj.y + naveObj.h > eachEnemyObj.y
    ) {
      livesNode.innerHTML--;
      eachEnemyObj.node.remove();
      enemyArr.splice(index, 1);
      liveDownSound.play()
    }
  });
}

function liveAppear() {
  let randomPositionXLive = Math.floor(Math.random() * 450);
  vidaObj = new vidaExtra(randomPositionXLive);
}

function checkCollisionNaveVida() { 
  if (
    vidaObj != null &&
    naveObj.x < vidaObj.x + vidaObj.w &&
    naveObj.x + naveObj.w > vidaObj.x &&
    naveObj.y < vidaObj.y + vidaObj.h &&
    naveObj.y + naveObj.h > vidaObj.y
  ) {
    livesNode.innerHTML++;
    liveUpSound.play()
    vidaObj.node.remove();
    vidaObj = null
  }
}

function gameOver() {
  if (winCondition) {
    winnerBox.style.display = "flex";
  } else{
    loserBox.style.display = "flex";
  } 
  clearInterval(gameIntervalId);
  clearInterval(enemyAppearInterval);
  clearInterval(timerInterval);
  clearInterval(liveInterval)

  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";
}

function livesCounter() {
  if (livesNode.innerHTML <= "0") {
    gameOver();
  }
}
