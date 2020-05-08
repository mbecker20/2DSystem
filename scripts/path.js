class Path {
    constructor(x0,y0,derivs,dt,xRange,yRange,lineWidth) {
        this.derivs=derivs;
        this.prev=[x0,y0];
        this.dt=dt;
        this.next=VF.rk42D(this.derivs,this.prev,this.dt);
        this.xRange=xRange;
        this.yRange=yRange;
        this.lineWidth=lineWidth;
        this.draw();
        this.stepCount=1;
    }

    step() {
        this.prev=this.next;
        this.next=VF.rk42D(this.derivs,this.prev,this.dt);
    }

    draw() {
        const prev=VF.actToScreen(this.prev,this.xRange,this.yRange,window.XLEN,window.YLEN);
        const next=VF.actToScreen(this.next,this.xRange,this.yRange,window.XLEN,window.YLEN);
        P5F.lineFromVec(prev,next);
    }

    exist() {
        this.step();
        this.draw();
        this.stepCount++;
    }
}