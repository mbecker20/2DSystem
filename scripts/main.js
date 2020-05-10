class IntegratePath2D {
    constructor(derivs,xRange,yRange,dt,totSteps,params=[],lineWidth=3) {
        // derivs is func of x and y. returns [xDot,yDot]
        // xRange, rRange lists [xmin,xmax], [ymin,ymax]
        this.derivs=derivs
        this.xRange=xRange;
        this.yRange=yRange;
        this.dt=dt;
        this.totSteps=totSteps;
        this.paths=[];
        this.lineWidth=lineWidth;
        this.justClicked=false;
        this.coolOff=0;
        this.coolOffMax=3;
        this.params
        strokeWeight(this.lineWidth);
        stroke(window.LIGHTBLUE);
        background(0);
    }

    stepAnim() {
        this.cleanPaths();
        for(var i=0;i<window.SPF;i++) {
            this.stepAndDraw();
        }
        if(!this.justClicked) {
            if(mouseIsPressed) {
                const xy=VF.screenToAct([mouseX,mouseY],this.xRange,this.yRange,window.XLEN,window.YLEN);
                this.paths.push(new Path(xy[0],xy[1],this.derivs,this.dt,this.xRange,this.yRange));
                this.justClicked=true;
            }
        } else {
            this.coolOff++;
            if (this.coolOff>this.coolOffMax) {
                this.coolOff=0;
                this.justClicked=false;
            }
        }
    }

    stepAndDraw() {
        for (var i=0;i<this.paths.length;i++) {
            this.paths[i].exist();
        }
    }

    cleanPaths() {
        //removes first path when it reaches step limit
        if(this.paths.length>0) {
            if(this.paths[0].stepCount>this.totSteps) {
                this.paths.shift();
            }
        }
    }

    setupUI() {

    }

    drawUI() {
        //updates and draws UI. facilitates interaction

    }
}
