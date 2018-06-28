class DrawableObjectPool
{
    constructor(maxSize, drawableFunc) {
        this.size = maxSize;
        this.pool = [];
    }

	init (){
		for (var i = 0; i < size; i++) {
			
			var drawable = drawableFunc(i);

			drawable.init();
			pool[i] = drawable;
		}
	}

    getNew(x, y, speed) {
		if(!pool[size - 1].isAlive) {
			pool[size - 1].spawn(x, y, speed);
			pool.unshift(pool.pop());
		}
	}

    draw() {
		for (var i = 0; i < size; i++) {
			if (pool[i].alive) {
				if (pool[i].draw()) {
					pool[i].clear();
					pool.push((pool.splice(i,1))[0]);
				}
			}
			else
				break;
		}
	};
}