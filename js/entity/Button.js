class Button extends Entity {
    code = function () { };
    drawCode = function () { };
    temp = new Array();

    constructor(x, y, w, h, channelLevel=Game.BUTTON_CHANNEL) {
        super(x, y, channelLevel);
        this.w = w;
        this.h = h;
        this.ga = 0;
        this.overlap=false;
        this.canAct = false;
        this.canInteract=false;
        this.canMove=false;
        this.canRemoved=false;
    }

    draw() {
        this.drawCode();
    }

    drawOption(boxFill = null, boxLine = null, text = null, px = 10, textFill = null, textLine = null) {
        let thisBtn = this;
        let textW = this.w / 2;
        let textH = this.h / 2 + this.h / 20;
        this.drawCode = function () {
            if (boxFill != null) {
                ctx.fillStyle = boxFill;
                ctx.fillRect(thisBtn.x, thisBtn.y, thisBtn.w, thisBtn.h);
            }
            if (boxLine != null) {
                ctx.strokeStyle = boxLine;
                ctx.strokeRect(thisBtn.x, thisBtn.y, thisBtn.w, thisBtn.h);
            }
            if (text != null) {
                ctx.font = "bold " + px + "px Arial";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                if (textFill != null) {
                    ctx.fillStyle = textFill;
                    ctx.fillText(text, thisBtn.x + textW, thisBtn.y + textH);
                }
                if (textLine != null) {
                    ctx.strokeStyle = textLine;
                    ctx.strokeText(text, thisBtn.x + textW, thisBtn.y + textH);
                }
            }
        }
    }

    collisionHandler(e,ct) {
        if (!(e instanceof Button)) this.code(e,ct);
    }
}