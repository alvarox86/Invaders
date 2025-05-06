class Enemigo{
    constructor(type, positionX){
        this.node = document.createElement("img")
        if(type === 0){
            this.node.src = "../images/asteroid.png"
        } else if(type === 1){
            this.node.src = "../images/space-invader.png"
        } else if(type === 2){
            this.node.src = "../images/galaga.png"
        }else if(type === 3){
            this.node.src = "../images/metroide.png"
        }
        
        gameBoxNode.append(this.node)

        this.x = positionX;
        this.y = -50;

        this.w = 50;
        this.h = 50;

        //Dimensiones actuales
        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
        
        //Posicion inical
        this.node.style.position = "absolute";
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;

        this.speed = 2 
    }

    automaticMovement(){
        this.y += this.speed
        this.node.style.top = `${this.y}px`
    }
}