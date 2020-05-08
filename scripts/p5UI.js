class CheckBox {
    constructor(onLabel,offLabel,center,size,checked) {
        //onLabel is label when checked, offLabel when unchecked
        //checked is boolean. initial state (true==checked,false==unchecked)
        this.center=center;
        this.size=size
        this.corners=[[-size/2,size/2],[size/2,size/2],[size/2,-size/2],[-size/2,-size/2]].map(x => math.add(x,center));
        this.checked=checked;
        this.onLabel=onLabel
        this.offLabel=offLabel
        this.setLabel();
        this.boundColor=255;
        this.justClicked=false;
        this.coolOff=0;
        this.coolOffMax=20;
    }

    exist() {
        //function to be run every step
        this.updateState();
        this.draw();
    }

    draw() {
        stroke(this.boundColor)
        strokeWeight(2)
        for(var i=0;i<3;i++) {
            line(this.corners[i][0],this.corners[i][1],this.corners[i+1][0],this.corners[i+1][1]);
        }
        line(this.corners[3][0],this.corners[3][1],this.corners[0][0],this.corners[0][1]);
        if(this.checked) {
            fill('red');
            noStroke();
            circle(this.center[0],this.center[1],(2/5)*this.size);
        }
        textAlign(LEFT,CENTER);
        textSize(18);
        noStroke();
        fill(this.boundColor);
        text(this.label,this.center[0]+this.size,this.center[1]);
    }

    mouseIn() {
        //returns true if mouse is in bounds, false otherwise
        return (mouseX>=this.corners[0][0] && 
            mouseX<=this.corners[1][0] && 
            mouseY>=this.corners[2][1] && 
            mouseY<=this.corners[0][1]);
    }

    updateState() {
        if(this.mouseIn()) {
            this.boundColor=window.LIGHTBLUE;
            if(!this.justClicked) {
                if(mouseIsPressed) {
                    this.checked=!this.checked;
                    this.justClicked=true;
                    this.setLabel();
                }
            } else {
                this.coolOff++;
                if(this.coolOff>this.coolOffMax) {
                    this.coolOff=0;
                    this.justClicked=false;
                }
            }
        } else {
            this.boundColor=255
            if(this.justClicked) {
                this.coolOff++;
                if(this.coolOff>this.coolOffMax) {
                    this.coolOff=0;
                    this.justClicked=false;
                }
            }
        } 
    }

    setLabel() {
        if(this.checked) {
            this.label=this.onLabel;
        } else {
            this.label=this.offLabel;
        }
    }
}

class Button {
    constructor(onLabel,offLabel,center,width,height,fontSize,pressed) {
        // pressed is boolean. true if button starts out pressed
        this.corners=[[-width/2,height/2],[width/2,height/2],[width/2,-height/2],[-width/2,-height/2]].map(x => math.add(x,center));
        this.center=center;
        this.width=width;
        this.height=height;
        this.onLabel=onLabel;
        this.offLabel=offLabel;
        this.setLabel();
        this.fontSize=fontSize;
        this.pressed=pressed;
        this.color=255;
        this.justClicked=false;
        this.coolOff=0;
        this.coolOffMax=20;
    }

    mouseIn() {
        //returns true if mouse is in bounds, false otherwise
        return (mouseX>=this.corners[0][0] && 
            mouseX<=this.corners[1][0] && 
            mouseY>=this.corners[2][1] && 
            mouseY<=this.corners[0][1]);
    }

    exist() {
        this.updateState();
        this.draw();
    }

    draw() {
        noFill();
        strokeWeight(2);
        stroke(this.color);
        rectMode(CENTER);
        rect(this.center[0],this.center[1],this.width,this.height);
        textAlign(CENTER,CENTER);
        textSize(this.fontSize);
        noStroke();
        fill(this.color);
        text(this.label,this.center[0],this.center[1]);
    }

    updateState() {
        if(this.mouseIn()) {
            this.color=window.LIGHTBLUE;
            if(!this.justClicked) {
                if(mouseIsPressed) {
                    this.pressed=!this.pressed;
                    this.justClicked=true;
                    this.setLabel();
                }
            } else {
                this.coolOff++;
                if(this.coolOff>this.coolOffMax) {
                    this.coolOff=0;
                    this.justClicked=false;
                }
            }
        } else {
            this.color=255
            if(this.justClicked) {
                this.coolOff++;
                if(this.coolOff>this.coolOffMax) {
                    this.coolOff=0;
                    this.justClicked=false;
                }
            }
        } 
    }

    setLabel() {
        if(this.pressed) {
            this.label=this.onLabel;
        } else {
            this.label=this.offLabel;
        }
    }
}

class Slider {
    constructor(label,center,width,size,valRange,initVal,fontSize,fontPos='below') {
        //fontPos is either 'right' or 'below'
        this.label=label;
        this.center=center;
        this.width=width;
        this.size=size;
        this.valRange=valRange
        this.valRangeDif=valRange[1]-valRange[0];
        this.val=initVal;
        this.sliding=false;
        this.sliderP=(initVal-valRange[0])*width/this.valRangeDif; //sliders x position on the screen relative to left endpoint
        this.lineEnds=[[-width/2,0],[width/2,0]].map(x => math.add(x,center))
        this.fontSize=fontSize
        if(fontPos==='right') {
            this.draw=this.drawTxtRight;
        } else {
            this.draw=this.drawTxtBelow;
        }
    }

    exist() {
        this.updateState();
        this.draw();
    }

    updateState() {
        this.slidingCheck()
        if(this.sliding) {
            this.sliderP=mouseX-this.lineEnds[0][0];
            if(this.sliderP<0){
                this.sliderP=0;
            } else if(this.sliderP>this.width) {
                this.sliderP=this.width
            }
            this.setSliderVal();
        }
    }

    drawTxtRight() {
        stroke(255);
        strokeWeight(2);
        line(this.lineEnds[0][0],this.lineEnds[0][1],this.lineEnds[1][0],this.lineEnds[1][1]);
        fill(this.color);
        circle(this.center[0]-this.width/2+this.sliderP,this.center[1],this.size);
        textAlign(LEFT,CENTER);
        textSize(this.fontSize);
        noStroke();
        fill(255);
        text(this.label.concat(' = ',this.val.toString()),this.center[0]+this.width/2+this.size,this.center[1]);
    }

    drawTxtBelow() {
        stroke(255);
        strokeWeight(2);
        line(this.lineEnds[0][0],this.lineEnds[0][1],this.lineEnds[1][0],this.lineEnds[1][1]);
        fill(this.color);
        circle(this.center[0]-this.width/2+this.sliderP,this.center[1],this.size);
        textAlign(CENTER,CENTER);
        textSize(this.fontSize);
        noStroke();
        fill(255);
        text(this.label.concat(' = ',Math.round(this.val).toString()),this.center[0],this.center[1]+this.size+5);
    }

    setSliderVal() { //must set sliderP first
        this.val=this.sliderP*this.valRangeDif/this.width+this.valRange[0];
    }

    slidingCheck() {
        if(this.sliding) {
            this.sliding=mouseIsPressed;
        } else if(this.mouseIn()) {
            this.color=window.LIGHTBLUE
            if(mouseIsPressed) {
                this.sliding=true
            }
        } else {
            this.color=0
        }
    }

    mouseIn() {
        return (Math.pow(this.center[0]+this.sliderP-this.width/2-mouseX,2)+Math.pow(this.center[1]-mouseY,2) <= Math.pow(this.size,2));
    }
}