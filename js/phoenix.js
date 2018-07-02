'use strict';
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;
const movementKeys = [LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY];
let keys = [];

class Animatable {
    constructor(html, svg, width, height, primaryColour, secondaryColour){
        this.html = html;
        this.svg = svg;
        this.isAlive = false;
        this.width = width;
        this.height = height;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.velocity = 0.4;
        this.pulse = null;
        this.primaryColour = primaryColour;
        this.secondaryColour = secondaryColour;
        this.activationLevel = 0;
    }

    init(canvasContext, x, y){
        this.canvasContext = canvasContext;
        this.x = x;
        this.y = y;
        this.isAlive = true;

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
            });
    }
}

class Phoenix extends Animatable {

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
