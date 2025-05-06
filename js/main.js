//pantallas
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

//botones
const startBtnNode = document.querySelector("#start-btn");
const restartBtn = document.querySelector(".restartBtn")
const livesNode = document.querySelector("#lives h1")
//game box
const gameBoxNode = document.querySelector("#game-box");
const minutesNode = document.querySelector("#minutes")
const secondsNode = document.querySelector("#seconds")

//Variables globales
let naveObj = null
let enemyArr = []

let enemyAppearInterval = null


//EventListener
startBtnNode.addEventListener("click", ()=>{
    startGame()
})

document.addEventListener("keydown", (event)=>{ // Evento para registrar el movimiento del usario
    naveObj.moveNave(event)
})

restartBtn.addEventListener("click", () => {
    location.reload()    
})

//Funciones

function startGame(){
    splashScreenNode.style.display = "none";
    gameScreenNode.style.display = "flex";

    naveObj = new Nave();

    gameIntervalId = setInterval(()=>{
        gameLoop()
        livesCounter()
    }, Math.round(1000/60))

    enemyAppearInterval = setInterval(()=>{
        enemyAppear()
    }, 1000)

    timerInterval = setInterval(()=>{
        secondsNode.innerHTML ++
        if(secondsNode.innerHTML < 10){
            secondsNode.innerHTML = secondsNode.innerHTML.padStart(2, "0")
            
        }
        if(secondsNode.innerHTML >= 60){
            minutesNode.innerHTML ++
            minutesNode.innerHTML = minutesNode.innerHTML.padStart(2, "0")
            secondsNode.innerHTML = "00"
        }
    }, 1000)
}

function gameLoop(){
    enemyArr.forEach((eachEnemy)=>{
        eachEnemy.automaticMovement();
    })
    enemyDestroy()
    checkCollisionNaveEnemigo()
}

function enemyAppear(){
    let randomPositionXEnemy = Math.floor(Math.random() * 450)
    let randomEnemy = Math.floor(Math.random() * 4)
    
    let enemy = new Enemigo (randomEnemy, randomPositionXEnemy)
    enemyArr.push(enemy)
}

function enemyDestroy(){
    if (enemyArr.length > 0 && enemyArr[0].y + enemyArr[0].h >= 760) {
        enemyArr[0].node.remove(); // 1. destuir el nodo
        enemyArr.shift();
    }
}

function checkCollisionNaveEnemigo(){
    enemyArr.forEach((eachEnemyObj, index) => {
        if (
          naveObj.x < eachEnemyObj.x + eachEnemyObj.w &&
          naveObj.x + naveObj.w > eachEnemyObj.x &&
          naveObj.y < eachEnemyObj.y + eachEnemyObj.h &&
          naveObj.y + naveObj.h > eachEnemyObj.y
        ) {
            livesNode.innerHTML --
            eachEnemyObj.node.remove()
            enemyArr.splice(index, 1)
        }
      });
}

function gameOver(){
    clearInterval(gameIntervalId)
    clearInterval(enemyAppearInterval)

    gameScreenNode.style.display = "none"
    gameOverScreenNode.style.display ="flex"
}

function livesCounter(){
    if (livesNode.innerHTML <= 0){
        gameOver()
    }
}

function timer(){

}