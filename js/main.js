//pantallas
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

//botones
const startBtnNode = document.querySelector("#start-btn");

//game box
const gameBoxNode = document.querySelector("#game-box");

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

//Funciones

function startGame(){
    splashScreenNode.style.display = "none";
    gameScreenNode.style.display = "flex";

    naveObj = new Nave();

    gameIntervalId = setInterval(()=>{
        gameLoop()
    }, Math.round(1000/60))

    enemyAppearInterval = setInterval(()=>{
        enemyAppear()
    }, 500)
}

function gameLoop(){
    enemyArr.forEach((eachEnemy)=>{
        eachEnemy.automaticMovement();
    })
    enemyDestroy()
}

function enemyAppear(){
    let randomPositionXEnemy = Math.floor(Math.random() * 450)
    let randomEnemy = Math.floor(Math.random() * 4)
    
    let enemy = new Enemigo (randomEnemy, randomPositionXEnemy)
    enemyArr.push(enemy)
}

function enemyDestroy(){
    if (enemyArr.length > 0 && enemyArr[0].y + enemyArr[0].h >= 660) {
        enemyArr[0].node.remove(); // 1. destuir el nodo
        enemyArr.shift();
    }
}