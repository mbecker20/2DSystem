class Graph2D {
    constructor(label,width,height,center,xrange,yrange) {
        this.center=center; //location of graph on canvas
        this.corners=[[-width/2,height/2],[width/2,height/2],[width/2,-height/2],[-width/2,-height/2]].map(x => math.add(x,center));
        this.width=width;
        this.height=height;
        this.setRange(xrange,yrange);
        this.label=label;
    }

    graph(lolox,loloy,loc=false) {
        //lolox/loloy = list of list of x/y values
        //xrange/yrange = list of lower, upper bounds on x/y values displayed
        //loc = list of colors corresonding to colors of lines
        this.drawBoundary();
        const transformXs=lolox.map(x => math.add(this.xshift,math.multiply(this.xscale,x)));
        const transformYs=loloy.map(y => math.add(this.yshift,math.multiply(this.yscale,y)));
        if (loc===false) {
            stroke('red');
            strokeWeight(3)
            for(var i=0;i<transformXs.length;i++) {
                for(var j=0;j<transformXs[i].length-1;j++) {
                    line(transformXs[i][j],transformYs[i][j],transformXs[i][j+1],transformYs[i][j+1])
                }
            }
        } else {
            strokeWeight(3)
            for(var i=0;i<transformXs.length;i++) {
                const maxIter=transformXs[i].length-1
                stroke(loc[i]);
                for(var j=0;j<maxIter;j++) {
                    line(transformXs[i][j],transformYs[i][j],transformXs[i][j+1],transformYs[i][j+1]);
                }
            }
        }
        this.drawText();
    }

    setRange(xrange,yrange) {
        this.xscale=this.width/(xrange[1]-xrange[0]);
        this.xshift=this.width/2-(xrange[1]*this.width)/(xrange[1]-xrange[0])+this.center[0];
        this.yscale=-this.height/(yrange[1]-yrange[0]);
        this.yshift=(yrange[1]*this.height)/(yrange[1]-yrange[0])-this.height/2+this.center[1];
    }

    drawBoundary() {
        stroke(255);
        strokeWeight(1);
        for(var i=0;i<3;i++) {
            line(this.corners[i][0],this.corners[i][1],this.corners[i+1][0],this.corners[i+1][1]);
        };
        line(this.corners[3][0],this.corners[3][1],this.corners[0][0],this.corners[0][1]);
    }

    drawText() {
        textAlign(CENTER,BOTTOM);
        textSize(18);
        noStroke();
        fill(255);
        text(this.label,this.center[0],this.center[1]-this.height/2-5);
    }
}