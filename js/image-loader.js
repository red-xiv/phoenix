class ImageLoader{
    loadAssets(){
        if (!window.game)
        throw new Error("you must load game class first..");

	this.coin = new Image();
	this.hazards = [new Image(), new Image(), new Image()];

    var numberOfHazards = 4;
	var numImages = 1 + numberOfHazards;
	var numLoaded = 0;

	function imageLoaded() {
		numLoaded++;
		
        if (numLoaded === numImages) {
			window.game.init();
		}
	}
    
	this.coin.onload = function() {
		imageLoaded();
	}
	this.coin.src = "assets/coin.png";
    
	this.hazards.forEach((h,i) => {
        h.onload = () => imageLoaded();
        h.src = `assets/hazzard-${i+1}.png`;
    });
    }
}