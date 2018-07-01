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
        this.coinSize = 22;
        this.hazardSize = 96;
        this.numberOfCoins = 24;
        this.numberOfHazards = 9;
        this.gameInitPause = 1000;
        this.hazardMap = [];
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
            this.drawablesCtx.mozImageSmoothingEnabled = false;
            this.drawablesCtx.webkitImageSmoothingEnabled = false;
            this.drawablesCtx.msImageSmoothingEnabled = false;
            this.hazardPool = [];
            this.coinPool = [];
            let hazards = this.imageLoader.hazards;
            let coins = this.imageLoader.coins;

            for (let i = 0; i < this.numberOfHazards; i++){
                let hazard = this.imageLoader.hazards[(i % hazards.length)];

                this.hazardPool.push(    
                        new DrawableObjectPool(1, () => new Hazard(hazard, 0, 0, this.hazardSize, this.drawablesCtx)));
            }

            for (let i = 0; i < this.numberOfCoins; i++){
                let coin = this.imageLoader.coins[(i % coins.length)];

                this.coinPool.push(    
                        new DrawableObjectPool(1, () => new Coin(coin, 0, 0, this.coinSize, this.drawablesCtx)));
            }
            
            this.drawablesCollection = this.hazardPool.concat(this.coinPool);

            this.drawablesMap = this.createDrawableMap(this.drawablesCollection.length, this.drawablesCanvas.width, this.drawablesCanvas.height);

            this.drawablesCollection.forEach((p,i) => {
                let mapSectionIndex = Math.floor(Math.random() * this.drawablesMap.length);
                let mapSection = this.drawablesMap[mapSectionIndex];

                p.init(mapSection[0], mapSection[1]);
                
                this.drawablesMap.splice(mapSectionIndex,1);
            });

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

    createDrawableMap(numberOfDrawables, drawableWidth, drawableHeight){
        let mapRadius = Math.floor(Math.sqrt(numberOfDrawables)) +1;
        let numberOfEmptySections =  Math.pow(mapRadius,2) - numberOfDrawables;

        let ySectionHeight = drawableHeight / mapRadius;
        let xSectionWidth = drawableWidth / mapRadius;

        let idealEmptyRatio = 0.2;
        let map = [];

        for (let i = 0; i < mapRadius; i++){
            
            for (let j = 0; j < mapRadius; j++){
                let x = drawableWidth + (i * xSectionWidth);
                let y = j * ySectionHeight;
                map.push([x, y]);            
            }
        }
        return map;
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