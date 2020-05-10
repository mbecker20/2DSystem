function setup() {
    //colors
    window.TEAL=color('hsl(160, 100%, 50%)')
    window.LIGHTBLUE=color(50,150,255)
    window.XLEN=1200;
    window.YLEN=800

    window.SPF=10; //steps per frame

    // set constants used in saveFuncs
    window.D=0.2;
    window.A=0.1;
    window.B=0.779;

    xRange=[-4,4];
    yRange=[-6,6];
    dt=.01
    totSteps=8000;

    createCanvas(windowWidth,windowHeight);

    window.anim=new IntegratePath2D(SF.hw5_2,xRange,yRange,dt,totSteps);

    window.welcomeText = {text: 'click anywhere to set initial condition'};
    window.welcomeText.exist = function() {
        if (mouseIsPressed) {
            strokeWeight(window.anim.lineWidth);
            stroke(window.LIGHTBLUE);
            background(0);
            window.welcomeText.exist = function() {}
        } else {
            textAlign(CENTER,CENTER);
            textSize(30);
            noStroke();
            fill(255);
            text(window.welcomeText.text, windowWidth/2, windowHeight/2);
        }
    }
}

function draw() {
    window.welcomeText.exist();
    window.anim.stepAnim();
}
