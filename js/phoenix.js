'use strict';
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;

let keys = [];

class Animatable {
    constructor(svg, radius, primaryColour, secondaryColour){
        this.svg = svg;
        this.isAlive = false;
        this.radius = radius;
        this.xVelocity = 20;
        this.yVelocity = 15;
        this.x = 0;
        this.y = 0;
        this.pulse = null;
        this.primaryColour = primaryColour;
        this.secondaryColour = secondaryColour;
        this.activationLevel = 0;

        this.attachColourToSVG(this.primaryColour);
        this.attachSizeToSVG(this.radius)
    }

    updateColour(colour) {
        this.primaryColour = colour;
    }

    attachColourToSVG(colour){
        this.svg.setAttribute("fill", colour);
    }
    attachSizeToSVG(radius){
        this.svg.setAttribute("width", radius);
    }
    attachPositionToSVG(){
        this.svg.setAttribute("x", this.x);
        this.svg.setAttribute("y", this.y);
        // this.svg.setAttribute("transform",);
    }
}

class Phoenix extends Animatable {
    constructor(svg, radius, primaryColour, secondaryColour){
        super(svg, radius, primaryColour, secondaryColour);
    }

    updatePlayerMovement() {
        var oldx = this.x;
        var oldy = this.y;

        if (keys[UP_KEY]) 
            this.moveUp();        

        if (keys[DOWN_KEY])
            this.moveDown();

        if (keys[LEFT_KEY]) 
            this.moveLeft();        

        if (keys[RIGHT_KEY])
            this.moveRight();

        if (this.y != oldy || this.x != oldx); 
            this.attachPositionToSVG();
    }

    moveUp(){
        this.y -= this.yVelocity
    }
    moveDown(){
        this.y += this.yVelocity
    }
    moveLeft(){
        this.x -= this.xVelocity;
    }
    moveRight(){
        this.x += this.xVelocity;
    }
}

window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
