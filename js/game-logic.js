(() => {
    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })();

    window.cancelRequestAnimFrame = (function () {
        return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
    })();
})();

window.game = new Game();
window.game.init();

class Game {
    constructor(){
        this.coinSize = 12;
        this.hazardSize = 30;
    }    
    init() {
        this.imageLoader = new ImageLoader();
        this.imageLoader.loadAssets();

	    if(this.shouldStart())
		    this.start();

        this.phoenixCanvas = document.getElementById('phoenix-canvas');
		if (this.phoenixCanvas.getContext) {
			this.phoenixCtx = this.phoenixCanvas.getContext('2d');
			this.drawablesCtx = this.drawablesCanvas.getContext('2d');
			
            this.hazardPool = this.imageLoader.hazards.forEach((h,i) => {
                new DrawableObjectPool(2, (i) => new Hazard(this.imageLoader.hazards[i], 0, 0, this.hazardSize));
            });

            this.coinPool = new DrawableObjectPool(20, () => new Coin(imageLoader.coin, 0, 0, this.coinSize));

			return true;
		} 
        else {
			return false;
		}
    }

    animate() {
        window.requestAnimationFrame( this.animate );
        this.draw();
    }

    draw(){
        //todo
    }
    shouldStart(){
    }
	start = function() {
		animate();
	};
}