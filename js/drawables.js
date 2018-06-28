class Drawable
{
    constructor(image, x, y,  width, height, canvasContex) {
        this.image = image;
		this.canvasContex = canvasContex;
		this.x = x;
		this.y = y;
        this.velocity = 0;
        this.width = width;
        this.height = height;
        this.isAlive = false;
	}

    init(){
        let offSet = 20;
        
        this.x = this.canvasContex.width + offSet;
        this.y = Math.random() * this.canvasContex.height;
    }

	draw() {

	}

    spawn(){

    }

    clear(){

    }
}

class Hazard extends Drawable {
}

class Coin extends Drawable {

}