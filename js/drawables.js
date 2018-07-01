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

    init(x,y){
        let offSet = -100;
        
        this.x = x || (this.canvasContex.canvas.width + offSet);
        this.y = y || (Math.random() * this.canvasContex.canvas.height);
    }

	draw() {
        if (!this.isAlive || !this.image || !this.isWithinCanvas(this.x, this.y))
            return;
        
        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        this.canvasContex.drawImage(this.image, 0, 0, this.image.width, this.image.height,
                                    this.x, this.y, this.width, (this.height * this.image.height / this.image.width));
    }
    
    updateState(){
        this.x -= this.velocity;
        // todo: some random y?
    }

    isOutOfBounds(){
        return !this.isWithinAliveArea(this.x, this.y);
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

        if (!this.isWithinAliveArea(x,y) || x + this.width > canvasWidth)
            return false;

        return true;
    }

    isWithinAliveArea(x,y){
        let canvasWidth = this.canvasContex.canvas.width;
        let canvasHeight = this.canvasContex.canvas.height;

        if (x < 0) return false;
        if (y < 0 || y + this.height > canvasHeight) return false;
        
        return true;
    }

    isCollision(otherDrawable){
        return this.x < otherDrawable.x + otherDrawable.width  
         && this.x + this.width  > otherDrawable.x 
         && this.y < otherDrawable.y + otherDrawable.height 
         && this.y + this.height > otherDrawable.y ;
    }
}

class Hazard extends Drawable {
}

class Coin extends Drawable {
    draw(){
        super.draw();
    }
    init(x,y){
        let offSet = 100;
        
        this.x = x || (Math.random() * this.canvasContex.canvas.width + offSet);
        this.y = y || (Math.random() * this.canvasContex.canvas.height);
    }
}