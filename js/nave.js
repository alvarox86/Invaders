class Nave {

    constructor(){
        this.node = document.createElement("img")
        this.node.src = "../images/nave-user.png"
        gameBoxNode.append(this.node)

        this.x = 220;
        this.y = 520;

        this.w = 120;
        this.h = 70;

        //Dimensiones actuales
        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
        
        //Posicion inical
        this.node.style.position = "absolute";
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;

        this.speed = 20 
    }

    moveNave(event){
        if(event.key === "ArrowLeft"){
            this.x -= this.speed
            this.node.style.left = `${this.x}px`
        } else if(event.key === "ArrowRight"){
            this.x += this.speed
            this.node.style.left = `${this.x}px`
        }
    }
}