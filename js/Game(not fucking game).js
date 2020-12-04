var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


class Game {
    static channel = [new Array(), new Array(),new Array()]; //phisics, particle, button
    static time = 0;
    static p;

    static PHYSICS_CHENNEL=0;
    static PARTICLE_CHENNEL=1;
    static BUTTON_CHENNEL=2;

    //static clearEntitys() { entitys = []; }

    static restartGame(){
        Game.channel=[new Array(), new Array(),new Array()];
        Game.time=0;
        Magic.clearCoolTime();
        Level.stageLevel=-1;
        Level.stageMonsterCount=-1;
    }

    static startGame() {
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
        canvas.addEventListener("mousedown", this.clickHandler, false);

        

        //{어두운 배경: #2B2B2B, 붉은빛하늘: #A89A9A, 붉은빛밤하늘: #3F3939}

        Level.loadLevel();
        Screen.menuScreen();
        Game.p = new Player(100, -1000);
        Game.p.ga = 0;
    }

    static updateWorld() {
        if (Game.p != null && Game.p.moveFlag) {
            Game.p.go();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var e of Game.channel[0]) { e.update(); }
        for (var e of Game.channel[1]) { e.update(); }
        for (var e of Game.channel[2]) { e.update(); }
        Game.removeEntity(0);
        Game.removeEntity(1);
        Game.removeEntity(2);
        Game.time++;
    }

    static removeEntity(channelLevel) {
        for(let e of Game.channel[channelLevel]){
            if(e.life<1&&e.canRemoved){
                e.removeHandler();
                let ei = Game.channel[channelLevel].indexOf(e);
                if (ei >= 0) Game.channel[channelLevel].splice(ei, 1);
            }
        }
    }

    static click(x,y){
        for(let e of Game.channel[Game.BUTTON_CHENNEL]){
            if(e.x<x&&x<e.x+e.w&&e.y<y&&y<e.y+e.h){
                e.collisionHandler(null);
                break;
            }
        }
    }

    static keyDownHandler(e) {
        switch (e.keyCode) {
            case 39:
                Game.p.moveFlag = true;
                Game.p.isRight = true;
                break;
            case 37:
                Game.p.moveFlag = true;
                Game.p.isRight = false;
                break;
            case 38:
                Game.p.jump();
                break;
            case 81: //q
                Magic.doSkill(0);
                break;
            case 87: //w
                Magic.doSkill(1);
                break;
            case 69: //e
                Magic.doSkill(2);
                break;
            case 82: //r
                Magic.doSkill(3);
                break;
        }
    }

    static keyUpHandler(e) {
        if (e.keyCode == 39) {
            Game.p.moveFlag = false;
            //p.setVectorX(0);
        }
        else if (e.keyCode == 37) {
            Game.p.moveFlag = false;
            //p.setVectorX(0);
        }
    }

    static clickHandler(e) {
        //let clickE = new Block(e.layerX, e.layerY, 0, 0);
        Game.click(e.layerX, e.layerY);
    }

    
}

Game.startGame();
setInterval(Game.updateWorld, 10);