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
        let offSet = -100;
        
        this.x = this.canvasContex.canvas.width + offSet;
        this.y = Math.random() * this.canvasContex.canvas.height;
    }

	draw() {
        if (!this.isAlive)
            return;

        this.canvasContex.clearRect(this.x - 1, this.y -1, this.width + 1, (this.height * this.image.height / this.image.width) + 1);
        this.canvasContex.drawImage(this.image, this.x, this.y, this.width, this.height * this.image.height / this.image.width);
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
    isWithinCanvas(x,y){
        let canvasWidth = this.canvasContex.canvas.width;
        let canvasHeight = this.canvasContex.canvas.height;

        if (x < 0 || x + this.width > canvasWidth) return false;
        if (y < 0 || y + this.height > canvasHeight) return false;
        
        return true;
    }
}

class Hazard extends Drawable {
}

class Coin extends Drawable {

}