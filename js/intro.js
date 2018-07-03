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

        remove(){
            document.getElementsByTagName('article')[0].remove();
        }

        skipIntro(){
            this.remove();

            if (!!window.game && !! window.phoenix && !window.game.isInitialised)
                window.game.isInitialised = window.game.init(window.phoenix);
        }
    }
    
    window.intro = new Intro({el: '#intro-container'});
    document.onkeydown = (e) => {
        if (e.keyCode == 32){
            window.intro.skipIntro();
        }
    }
    intro.startAnimation(); 
})();