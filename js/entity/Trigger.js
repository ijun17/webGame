class Trigger extends Entity{
    code=function(e){};
    constructor(x,y,w,h,time,f){
        super(x,y,Game.PHYSICS_CHANNEL);
        this.w=w;
        this.h=h;
        this.life=time;
        this.code=f;
        this.ga=0;
        this.canCollision=false;
        this.canRemoved = true;
        this.draw=Trigger.getDraw();
    }

    update() {
        if (this.canDraw) this.draw();
        if (this.canInteract) this.interact();
        if (this.canMove)this.move();
        this.life--;
    }
    static getDraw(){
        return function(){
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.fillRect(Camera.getX(this.x), Camera.getY(this.y), Camera.getS(this.w), Camera.getS(this.h));
        }
    }

    giveDamage(){}
    giveForce(){}

    collisionHandler(e){
        if(e instanceof MapBlock||!e.canCollision)return;
        this.code(e);
        this.life=0;
    }
}