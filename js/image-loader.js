class ImageLoader{
	constructor(){
		this.isLoaded = false;
	}
    loadAssets(){
		let numberOfHazards = 6;
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
				this.isLoaded = true;
				this.isLoadedEvent();
			}
		}
		
		this.coins.forEach((h,i) => {
			h.onload = () => this.imageLoaded();
			h.src = `assets/coin (${i+1}).png`;
		});

		this.hazards.forEach((h,i) => {
			h.onload = () => this.imageLoaded();
			h.src = `assets/hazard (${i+1}).png`;
		});
	}

	isLoadedEvent(){
		if (!!this.onLoadedEventCallback)
			this.onLoadedEventCallback();
	}
	
	onLoadedEvent(callback){
		this.onLoadedEventCallback = callback;
	}
}