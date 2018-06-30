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

class Game {
    constructor(){
        this.coinSize = 8;
        this.hazardSize = 26;
        this.numberOfCoins = 12;
        this.numberOfHazards = 6;
        this.gameInitPause = 200;
    }    
    init() {
        this.imageLoader = new ImageLoader();
        this.imageLoader.loadAssets();
        this.phoenixCanvas = document.getElementById('phoenix-canvas');
        this.drawablesCanvas = document.getElementById('drawables-canvas');
        
		if (this.phoenixCanvas.getContext) {
			this.phoenixCtx = this.phoenixCanvas.getContext('2d');
            this.drawablesCtx = this.drawablesCanvas.getContext('2d');

            this.phoenixCtx.imageSmoothingEnabled = false;
            this.drawablesCtx.imageSmoothingEnabled = false;

            this.hazardPool = this.imageLoader.hazards.map((h,i) => 
                new DrawableObjectPool(this.numberOfHazards, (i) => new Hazard(this.imageLoader.hazards[i], 0, 0, this.hazardSize, this.drawablesCtx))
            );

            this.coinPool = this.imageLoader.coins.map((h,i) => 
                new DrawableObjectPool(this.numberOfCoins, (i) => new Coin(this.imageLoader.coins[i], 0, 0, this.coinSize, this.drawablesCtx))
            );
            
            this.drawablesCollection = this.hazardPool.concat(this.coinPool);

            this.drawablesCollection.forEach((p,i) => p.init());

            this.getNewHazards();
            this.getNewCoins();

            if(this.shouldStart()){
                    setTimeout(this.start.bind(this), this.gameInitPause);
            }

			return true;
		} 
        else {
			return false;
		}
    }

    getNewDrawables(numberOfDrawables, drawablePools){
        let numberPerDrawable = numberOfDrawables / drawablePools.length;
        let numberOfDifferentDrawables = drawablePools.length;
        
        // more assets than loaded
        if (numberPerDrawable < 1){
            for (let i =0; i < numberOfDrawables ; i++){
                drawablePools[i].getNew();
            }
        }
        else
        {
            for (let i = 0; i < numberOfDifferentDrawables; i++){
                let drawablePool = drawablePools[i];

                for (let j =0; j < numberPerDrawable ; j++){
                    drawablePool.getNew();
                }
            }
        }
    }

    getNewHazards(numberOfHazards){
        this.getNewDrawables(numberOfHazards || this.numberOfHazards, this.hazardPool);
    }


    getNewCoins(numberOfCoins){
        this.getNewDrawables(numberOfCoins || this.numberOfCoins, this.coinPool);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.drawablesCtx.clearRect(0, 0, this.drawablesCanvas.width, this.drawablesCanvas.height);
        this.updateState();
        this.draw();    
    }

    updateState(){
        //todo phoenix update state and game visible state - object pool handles it's self
        //todo drawableObjectPool > getNew when !IsAlive fluctuates below x? * log(this.gameLevel) ?
    }

    draw(){
        //todo phoenix draw..
        this.drawablesCollection.forEach(d => d.draw());
    }
    shouldStart(){
        return true; // todo maybe?
    }

	start(){
        if (!this.imageLoader.isLoaded)
            this.imageLoader.onLoadedEvent(this.animate.bind(this));
        else
            this.animate();
	};
}