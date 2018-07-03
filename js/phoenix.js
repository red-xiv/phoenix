'use strict';
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;
const movementKeys = [LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY];

class Animatable {
    constructor(html, svg, width, height, primaryColour, secondaryColour){
        this.html = html;
        this.svg = svg;
        this.isAlive = false;
        this.width = width;
        this.height = height;
        this.numericalWidth = parseInt(this.width);
        this.numericalHeight = parseInt(this.height);
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.pulse = null;
        this.primaryColour = primaryColour;
        this.secondaryColour = secondaryColour;
        this.activationLevel = 0;
        this.transitionSpeed = 100;
        this.keys = [];
        this.maxVelocity = 3;
    }

    init(canvasContext, x, y){
        this.canvasContext = canvasContext;
        this.x = x;
        this.y = y;
        this.isAlive = true;
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.canvasXRatio = (this.innerWidth / this.canvasContext.canvas.width);
        this.canvasYRatio = (this.innerHeight / this.canvasContext.canvas.height);
        
        this.numericalWidth = this.numericalWidth / this.canvasXRatio;
        this.numericalHeight = this.numericalHeight / this.canvasYRatio;

        d3.xml(this.svg).mimeType("image/svg+xml").get((error, xml) => {
                if (error) 
                    throw error;
                
                this.html = document.getElementById(this.html);
                this.html.appendChild(xml.documentElement.getElementById('phoenix'));
                
                this.svg = d3.select(this.html);

                this.svg.attr("width", this.height);
                this.svg.attr("height", this.width);
                this.svg.style("fill", this.primaryColour);

                let xmlSVG = d3.select(xml.getElementsByTagName('svg')[0]);
                this.svg.attr('viewBox', xmlSVG.attr('viewBox'));

                this.attachPositionToSVG();

                window.addEventListener("keydown", (e) => {
                    console.log("keyDown " + e.keyCode); 
                    this.keys[e.keyCode] = true;

                    if (e.keyCode == UP_KEY){
                        this.keys[DOWN_KEY] = false;
                        
                        if (this.canIncreaseSpeed(this.yVelocity, true))
                            this.yVelocity--;
                    }
                    if (e.keyCode == DOWN_KEY){
                        this.keys[UP_KEY] = false;

                        if (this.canIncreaseSpeed(this.yVelocity, false))
                            this.yVelocity++;
                    }
                    if (e.keyCode == LEFT_KEY){
                        this.keys[RIGHT_KEY] = false;

                        if (this.canIncreaseSpeed(this.xVelocity, true))
                            this.xVelocity--;
                    }
                    if (e.keyCode == RIGHT_KEY){
                        this.keys[LEFT_KEY] = false;

                        if (this.canIncreaseSpeed(this.xVelocity, false))
                            this.xVelocity++;
                    }
                });
            });
    }

    canIncreaseSpeed(velocity, isNegative){
        return  Math.abs( velocity + (1 * (isNegative ? -1 : 1))) <= this.maxVelocity;
    }
    isWithinCanvas(x,y){
        // not loaded yet?
        if (!this.canvasContext) return true;

        return x > 0 && y > 0 
            && x + this.numericalWidth < this.innerWidth
            && y + this.numericalHeight < this.innerHeight;
    }

    collide(drawable){
        if (drawable.collisionShouldDestroy){
            drawable.clear();
            drawable.reset();
        }
    }

    getRealXCoord(value){
        return value / this.canvasXRatio;
    }
    getRealYCoord(value){
        return value / this.canvasYRatio;
    }
}

class Phoenix extends Animatable {

    draw(){
        this.updatePlayerMovement();
    }

    forceStaticDraw(){

    }

    updatePlayerMovement() {
        let oldx = this.x;
        let oldy = this.y;

        if (movementKeys.some(k => this.keys[k]))
        {
            this.onKeyDown();
            
            let newX = this.x + this.xVelocity;
            let newY = this.y + this.yVelocity;

            if ((newY != oldy || newX != oldx) && this.isWithinCanvas(newX, newY)){
                this.x = newX;
                this.y = newY;
                this.attachPositionToSVG();
            } 
        }
    }

    attachPositionToSVG(){
        this.svg.attr("transform", `translate(${this.x}, ${this.y})`);
    }

    onKeyDown(key)
    {
        if (this.keys[UP_KEY] && this.yVelocity > 0)
            this.yVelocity *= -1;
        
        if (this.keys[DOWN_KEY] && this.yVelocity < 0)
            this.yVelocity *= 1; 

        if (this.keys[LEFT_KEY] && this.xVelocity > 0)
            this.xVelocity *= -1;
        
        if (this.keys[RIGHT_KEY] && this.xVelocity < 0)
            this.xVelocity *= 1
    }
}