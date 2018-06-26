'use strict';

(() => {
    
    class Intro {
        constructor(args){
            this.el = $(args.el);  
      
            this.start = this.el.find('.start');
            this.animation = this.el.find('.animation');
        }

        reset(){
            this.start.show();
            this.cloned = this.animation.clone(true);
            this.animation.remove();
            this.animation = this.cloned;
        }

        startAnimation(){
            this.start.hide();
            this.el.append(this.animation);
        }
    }

    document.onkeydown = (e) => {
        if (e.keyCode == 32){
                       
        }
    }

    window.intro = new Intro({el: '#intro-container'});
    intro.startAnimation(); 
})();