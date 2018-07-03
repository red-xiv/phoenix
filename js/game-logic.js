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
    constructor(phoenix){
        this.phoenix = phoenix;
        this.coinSize = 22;
        this.hazardSize = 96;
        this.numberOfCoins = 24;
        this.numberOfHazards = 9;
        this.gameInitPause = 1000;
        this.hazardMap = [];
        this.coinCount = 0;
        this.isInitialised = false;
    }    
    init(phoenix) {
        this.phoenix = phoenix;
        this.imageLoader = new ImageLoader();
        this.phoenixCanvas = document.getElementById('phoenix-canvas');
        this.drawablesCanvas = document.getElementById('drawables-canvas');

		if (this.phoenixCanvas.getContext) {
			this.phoenixCtx = this.phoenixCanvas.getContext('2d');
            this.drawablesCtx = this.drawablesCanvas.getContext('2d');
            
            this.imageLoader.loadAssets();
            this.phoenix.init(this.phoenixCtx, 0, this.phoenixCanvas.height /2);

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
        
        this.draw();    
        this.updateState();
    }

    updateState(){
        for (let i = 0; i < this.drawablesCollection.length; i++){
            for (let j = 0; j < this.drawablesCollection[i].pool.length; j++){
                var drawable = this.drawablesCollection[i].pool[j];
                
                if (this.isPhoenixCollision(drawable)){
                    console.log('COLLISION');
                    if (drawable.collisionShouldDestroy){
                        drawable.clear();
                        drawable.reset();
                        this.coinCount++;
                    }
                }
            }
        }            
    }

    draw(){
        this.phoenix.draw();
        this.drawablesCollection.forEach(d => d.draw());
        this.drawScore();
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
    
    isPhoenixCollision(drawable){
        if (drawable.x < 0 || drawable.x > this.drawablesCanvas.width)
            return false;

        let pLeftX = this.phoenix.getRealXCoord(this.phoenix.x);
        let pRightX = pLeftX + this.phoenix.numericalWidth;
        let pTop = this.phoenix.getRealYCoord(this.phoenix.y);
        let pBottom = this.phoenix.y + this.phoenix.numericalHeight;

        return drawable.isCollision(pLeftX, pRightX, pTop, pBottom);
    }

    drawScore() {
        this.phoenixCtx.clearRect(0, 0, 200, 200);
        this.phoenixCtx.font = "16px Arial";
        this.phoenixCtx.fillStyle = "#0095DD";
        this.phoenixCtx.fillText("Score: "+ this.coinCount, 8, 20);
    }
}