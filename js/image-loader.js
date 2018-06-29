class ImageLoader{
    loadAssets(){
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
		
		this.hazards.forEach((h,i) => {
			h.onload = () => imageLoaded();
			h.src = `assets/coin (${i+1}).png`;
		});
		
		this.hazards.forEach((h,i) => {
			h.onload = () => imageLoaded();
			h.src = `assets/hazard (${i+1}).png`;
		});
	}
}