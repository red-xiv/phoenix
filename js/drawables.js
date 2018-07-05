class Drawable
{
    constructor(image, x, y,  width, canvasContex) {
        this.image = image;
		this.canvasContex = canvasContex;
		this.x = x || 0;
		this.y = y || 0;
        this.velocity = 1;
        this.width = width;
        this.height = width;
        this.isAlive = false;
        this.collisionShouldDestroy = false;
        this.collisionPauseFrames = 60; // 60fps?? hopefully :p
        this.pause = 0;
        this.soundFile = '';
    }

    init(x,y){
        let offSet = 100;
        
        this.x = x || (this.canvasContex.canvas.width + offSet);
        this.y = y || (Math.random() * this.canvasContex.canvas.height);
        
        this.startingX = this.x;
        this.startingY = this.y;
    }

	draw() {
        if (!this.isAlive || !this.image || !this.isWithinCanvas(this.x - this.image.width, this.y))
            return;
        
        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        this.canvasContex.drawImage(this.image, 0, 0, this.image.width, this.image.height,
                                    this.x, this.y, this.width, (this.height * this.image.height / this.image.width));
    }
    
    updateState(){
        if (this.pause > 0) 
            this.pause --;

        else
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

    reset(){
        this.x = this.startingX;
        this.y = this.startingY;
        this.spawn();
    }

    isWithinCanvas(x,y){
        let canvasWidth = this.canvasContex.canvas.width;
        let canvasHeight = this.canvasContex.canvas.height;

        if (!this.isWithinAliveArea(x,y) || x > canvasWidth)
            return false;

        return true;
    }

    isWithinAliveArea(x,y){
        let canvasWidth = this.canvasContex.canvas.width;
        let canvasHeight = this.canvasContex.canvas.height;

        if (x + this.image.width < 0) return false;
        if (y < 0 || y + this.height > canvasHeight) return false;
        
        return true;
    }

    isCollision(leftX, rightX, topY, bottomY){
        return this.x < rightX  
         && this.x + this.width  > leftX 
         && this.y < bottomY 
         && this.y  + this.height > topY;
    }
    playSound(){
        if (!!this.soundFile)
            this.soundFile.play();
    }
}

class Hazard extends Drawable {
    constructor(image, x, y,  width, canvasContex){
        super(image, x, y,  width, canvasContex);

        this.soundFile = new Audio('assets/hazard.mp3');
    }
}

class Coin extends Drawable {
    constructor(image, x, y,  width, canvasContex){
        super(image, x, y,  width, canvasContex);

        this.collisionShouldDestroy = true;
        this.soundFile = new Audio('assets/coin.mp3');
    }
    draw(){
        super.draw();
    }
    init(x,y){
        let offSet = 100;
        
        this.x = x || (Math.random() * this.canvasContex.canvas.width + offSet);
        this.y = y || (Math.random() * this.canvasContex.canvas.height);

        this.startingX = this.x;
        this.startingY = this.y;
    }
}