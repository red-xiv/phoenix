class DrawableObjectPool
{
    constructor(maxSize, drawableFunc) {
        this.size = maxSize;
		this.pool = [];
		this.drawableFunc = drawableFunc;
    }

	init (x,y){
		for (let i = 0; i < this.size; i++) {
			let drawable = this.drawableFunc(i);

			drawable.init(x,y);
			this.pool.push(drawable);
		}
	}

    getNew() {
		if((!!this.pool[this.size - 1]) && (this.pool[this.size - 1].isAlive == false)) {
			this.pool[this.size - 1].spawn();
			// this.pool.unshift(this.pool.pop());
		}
	}

    draw() {
		for (let i = 0; i < this.size; i++) {
			this.pool[i].updateState();
			
			if (this.pool[i].isAlive) {
				this.pool[i].draw();

				if (this.pool[i].isOutOfBounds()) {
					this.pool[i].clear();
					this.pool[i].reset();
					// this.pool.push((this.pool.splice(i,1))[0]);
				}
			}
			else
				break;
		}
	};
}