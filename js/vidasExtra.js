class vidaExtra{
    constructor(positionX){
        this.node = document.createElement("img")
        this.node.src = "./images/vida.png"
        gameBoxNode.append(this.node)

        this.x = 0
        this.x = positionX
        this.y = 630

        this.w = 40
        this.h = 40

        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
        
        //Posicion inical
        this.node.style.position = "absolute";
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    }
}