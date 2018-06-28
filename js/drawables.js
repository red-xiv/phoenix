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
	}

    init(){
        
    }

	draw() {

	}

    spawn(){

    }

    clear(){

    }

    isAlive(){

    }
}

class Hazard extends Drawable {
}

class Coin extends Drawable {

}