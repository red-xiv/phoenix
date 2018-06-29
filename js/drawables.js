class Drawable
{
    constructor(image, x, y,  width, canvasContex) {
        this.image = image;
		this.canvasContex = canvasContex;
		this.x = x || 0;
		this.y = y || 0;
        this.velocity = 0;
        this.width = width;
        this.height = width;
        this.isAlive = false;
	}

    init(){
        let offSet = 200;
        
        this.x = this.canvasContex.canvas.width + offSet;
        this.y = Math.random() * this.canvasContex.canvas.height;
    }

	draw() {
        if (!this.isAlive)
            return;

        this.canvasContex.clearRect(this.x - 1, this.y -1, this.width + 1, this.height + 1);
        this.canvasContex.drawImage(this.image, this.x, this.y);
    }
    
    updateState(){
        this.x -= this.velocity;
        // todo: some random y?
    }

    isOutOfBounds(){
        return false;
    }

    spawn(){
        this.isAlive = true;
    }

    clear(){
        this.isAlive = false;
        this.x = 0;
        this.y = 0;
    }
}

class Hazard extends Drawable {
}

class Coin extends Drawable {

}