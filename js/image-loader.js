class ImageLoader{
    loadAssets(){
		if (!window.game)
			throw new Error("you must load game class first..");
	
		let numberOfHazards = 9;
		let numberOfCoins = 6;
		this.coins = [];
		this.hazards = [];

		for (let i = 0; i < numberOfCoins; i++){
			this.coins.push(new Image());
		}

		for (let i = 0; i < numberOfHazards; i++){
			this.hazards.push(new Image());
		}
		let numImages = numberOfCoins + numberOfHazards;
		let numLoaded = 0;

		this.imageLoaded = () => {
			numLoaded++;
			
			if (numLoaded === numImages) {
				window.game.init();
			}
		}
		
		this.coin.onload = function() {
			this.imageLoaded();
		}
		this.coin.src = "assets/coin.png";

		this.hazards.forEach((h,i) => {
			h.onload = () => imageLoaded();
			h.src = `assets/coin (${i+1}).png`;
		});
		
		this.hazards.forEach((h,i) => {
			h.onload = () => imageLoaded();
			h.src = `assets/hazzard (${i+1}).png`;
		});
	}
}