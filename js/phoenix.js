'use strict';
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;
const movementKeys = [LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY];
let keys = [];

class Animatable {
    constructor(svg, radius, primaryColour, secondaryColour){
        this.svg = svg;
        this.isAlive = false;
        this.radius = radius;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.velocity = 0.4;
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
        let oldx = this.x;
        let oldy = this.y;

        if (Keys.some(k => movementKeys[k]))
        {
            this.onKeyDown();                

            if (this.y != oldy || this.x != oldx); 
                this.attachPositionToSVG();
        }
    }

    onKeyDown(key)
    {
        if (keys[UP_KEY])
            this.yVelocity = this.velocity * -1;
        
        if (keys[UP_KEY])
            this.yVelocity = this.velocity * 1; 

        if (keys[UP_KEY])
            this.yVelocity = this.velocity * -1;
        
        if (keys[UP_KEY])
            this.yVelocity = this.velocity * 1
    }
}

window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
