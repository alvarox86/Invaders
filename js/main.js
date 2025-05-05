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


//EventListener
startBtnNode.addEventListener("click", ()=>{
    startGame()
})

document.addEventListener("keydown", ()=>{ // Evento para registrar el movimiento del usario
    naveObj.moveNave()
})

//Funciones

function startGame(){
    splashScreenNode.style.display = "none";
    gameScreenNode.style.display = "flex";

    naveObj = new Nave();

    gameIntervalId = setInterval(()=>{

    }, Math.round(1000/60))
}

