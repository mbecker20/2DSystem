class SF {
    //just a collection of cool deriv funcs
    static d1(x,y) {
        const xDot=y;
        const yDot=3*x*(x-1)*(x-3)*Math.sin(2*x)+2*(x+1)*(x-2);
        return [xDot,yDot];
    }

    static d2(x,y) {
        const xDot=y;
        const yDot=3*x*(x-1)*(x-3);
        return [xDot,yDot];
    }

    static d3(x,y) {
        const xDot=1*math.sin(x)+2*math.cos(y);
        const yDot=x*(x-1)*(x-3)*math.sin(x*y);
        return [xDot,yDot];
    }

    static d4(x,y) {
        const xDot=1*math.sin(x)+2*math.cos(y);
        const yDot=x*(x-1)*(x-3)*math.sin(x);
        return [xDot,yDot];
    }

    static gradSys1(x,y) {
        const xDot=math.sin(y);
        const yDot=x*math.cos(y);
        return [xDot,yDot];
    }

    static gradSys2(x,y) {
        const xDot=3*x*x-1-math.exp(2*y);
        const yDot=-2*x*math.exp(2*y);
        return [xDot,yDot];
    }

    static hw5_1(x,y) {
        const xDot=y;
        const yDot=-1*Math.pow(x,3)+Math.pow(x,4)-window.D*y;
        return [xDot,yDot];
    }

    static mtPrac(x,y) {
        const xDot=y;
        const yDot=x-Math.pow(x,3);
        return [xDot,yDot];
    }

    static hw5_2(x,y) {
        const xDot = window.A - x + x*x*y;
        const yDot = window.B - x*x*y;
        return [xDot,yDot];
    }
}