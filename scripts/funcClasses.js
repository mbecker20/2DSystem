const quad1=Math.PI/2
const quad2=Math.PI
const quad3=(3/2)*Math.PI
const quad4=2*Math.PI

class VF {
    static makeVec3(x,y,z) {
        return [x,y,z];
    }
    
    static mag(vec) {
        return math.sqrt(math.dot(vec,vec));
    }
    
    static unit(vec) {
        const magnitude=VF.mag(vec);
        if(magnitude!==0) {
            return math.multiply(vec,1/magnitude);
        } else {
            return VF.makeVec3(0,0,0);
        }
    }

    static unit2D(vec) {
        const magnitude=VF.mag(vec);
        if(magnitude!==0) {
            return math.multiply(vec,1/magnitude);
        } else {
            return [0,0];
        }
    }

    static R(v1,v2) {
        //returns vector from v1 to v2
        return math.add(v2,math.multiply(v1,-1));
    }

    static rHat(v1,v2) {
        return VF.unit(VF.R(v1,v2));
    }

    static getAzim(vec) {
        if(vec[0]>0) {
            if(vec[1]>0) {
                return math.atan2(vec[1],vec[0]);
            } else if(vec[1]<0) {
                return 2*Math.PI+math.atan2(vec[1],vec[0]);
            } else if(vec[1]===0) {
                return 0;
            }
        } else if(vec[0]<0) {
            return Math.PI+math.atan2(-vec[1],-vec[0]);
        } else if(vec[0]===0) {
            if(vec[1]>0) {
                return Math.PI/2;
            } else if(vec[1]<0) {
                return (3/2)*Math.PI;
            } else if(vec[1]===0) {
                return null;
                console.log('cant get azim of zero vector');
            }
        }
    }

    static getAltAzim(vec) {
        const alt=math.asin(vec[2]);
        const azim=VF.getAzim(vec);
        return [alt,azim];
    }

    static shortestAzimRoute(initAzim,finalAzim) {
        if(initAzim<=quad2) {
            if(finalAzim<=(initAzim+Math.PI)){
                return finalAzim-initAzim;
            } else {
                return finalAzim-initAzim-quad4;
            }
        } else {
            if(finalAzim>=initAzim) {
                return finalAzim-initAzim;
            } else if(finalAzim<initAzim-PI) {
                return finalAzim+quad4-initAzim;
            } else {
                return finalAzim-initAzim;
            }
        }
    }

    static getDeltaAltAzim(iVec,fVec) {
        const iVecAltAzim=VF.getAltAzim(iVec);
        const fVecAltAzim=VF.getAltAzim(fVec);
        const deltaAlt=fVecAltAzim[0]-iVecAltAzim[0];
        const deltaAzim=VF.shortestAzimRoute(iVecAltAzim[1],fVecAltAzim[1]);
        return [deltaAlt,deltaAzim];
    }

    static getPointBetweenWithZ(p0,p1,zFinal) {
        const rHat=VF.rHat(p0,p1);
        const d=(zFinal-p0[2])/rHat[2];
        return math.add(p0,math.multiply(rHat,d));
    }

    static addVecToRows(mat,vec) {
        // does not work for math.js matrices. use standard js matrices. does not change input matrix.
        const out=mat.map(function(row) {
            return math.add(row,vec);
        })
        return out;
    }

    static abs(number) {
        if(number<0) {
            return (-1)*number;
        } else {
            return number;
        }
    }

    static getAvgPoint(pointsMat) {
        let avg=[0,0,0];
        pointsMat.forEach(function(point) {
            avg=math.add(avg,point);
        });
        return math.divide(avg,pointsMat.length);
    }

    static getAvgPoint2D(pointsMat) {
        let avg=[0,0];
        pointsMat.forEach(function(point) {
            avg=math.add(avg,point);
        });
        return math.divide(avg,pointsMat.length);
    }

    static arrSum(arrayOfNums) {
        return arrayOfNums.reduce(function(a,b) {
            return a+b;
        }, 0);
    }

    static getAvgNum(arrayOfNums) {
        return VF.arrSum(arrayOfNums)/arrayOfNums.length;
    }

    static getSortedIndices(lov) {
        // [1,4,53,14,20,5] returns [2,4,3,5,1,0]. descending
        let numGreaterInd=[];
        for(var i=0;i<lov.length;i++) {
            let numGreater=0;
            for(var j=0;j<lov.length;j++) {
                if(i!=j) {
                    if(lov[i]<lov[j]) {
                        numGreater+=1;
                    }
                }
            }
            numGreaterInd.push(numGreater);
        }
        let sortedInd=[];
        for(var i=0;i<lov.length;i++) {
            for(var j=0;j<lov.length;j++) {
                if(numGreaterInd[j]==i) {
                    sortedInd.push(j);
                }
            }
        }
        return sortedInd;
    }

    static toPolar(x,y) {
        const r=VF.mag([x,y]);
        const theta=VF.getAzim([x,y]);
        return [r,theta];
    }

    static fromPolar(r,theta) {
        return [r*math.cos(theta),r*math.sin(theta)]
    }

    static rot2D(point,alpha) { //rotates clockwise with y pointing down
        let rotMat=[[math.cos(alpha),math.sin(alpha)],[-math.sin(alpha),math.cos(alpha)]];
        return math.multiply(point,rotMat);
    }

    static linspace(start,stop,N) {
        const step=(stop-start)/(N-1);
        let space=[];
        for(var i=0;i<N;i++) {
            space.push(start);
            start=start+step
        }
        return space
    }

    static zeroes(length) {
        let space=[]
        for(var i=0;i<length;i++) {
            space.push(0)
        }
        return space
    }

    static rk42D(derivs,xy0,dt) {
        //derivs is funcs of x, y, returns [xDot,yDot]
        const x0=xy0[0];
        const y0=xy0[1];
        const k1=derivs(x0,y0);
        const k2=derivs(x0+k1[0]*dt/2,y0+k1[1]*dt/2);
        const k3=derivs(x0+k2[0]*dt/2,y0+k2[1]*dt/2);
        const k4=derivs(x0+k3[0]*dt,y0+k3[1]*dt);
        const k=(1/6)*(k1[0]+2*k2[0]+2*k3[0]+k4[0]);
        const l=(1/6)*(k1[1]+2*k2[1]+2*k3[1]+k4[1]);
        return [x0+k*dt,y0+l*dt];
    }

    static screenToAct(sxy,xRange,yRange,screenX,screenY) {
        const sx=sxy[0];
        const sy=sxy[1];
        const x=xRange[0]+sx*(xRange[1]-xRange[0])/screenX;
        const y=yRange[1]-sy*(yRange[1]-yRange[0])/screenY;
        return [x,y];
    }

    static actToScreen(xy,xRange,yRange,screenX,screenY) {
        const x=xy[0];
        const y=xy[1];
        const sx=(x-xRange[0])*screenX/(xRange[1]-xRange[0]);
        const sy=(yRange[1]-y)*screenY/(yRange[1]-yRange[0]);
        return [sx,sy];
    }
}

class Rot {
    static quatMultReal(q1Real,q1Vect,q2Real,q2Vect) {
        return q1Real*q2Real-q1Vect[0]*q2Vect[0]-q1Vect[1]*q2Vect[1]-q1Vect[2]*q2Vect[2];
    }

    static quatMultVect(q1Real,q1Vect,q2Real,q2Vect) {
        const vect0=q1Real*q2Vect[0]+q2Real*q1Vect[0]+q1Vect[1]*q2Vect[2]-q1Vect[2]*q2Vect[1];
        const vect2=q1Real*q2Vect[1]+q2Real*q1Vect[1]+q1Vect[2]*q2Vect[0]-q1Vect[0]*q2Vect[2];
        const vect3=q1Real*q2Vect[2]+q2Real*q1Vect[2]+q1Vect[0]*q2Vect[1]-q1Vect[1]*q2Vect[0];
        return [vect0,vect2,vect3]
    }

    static quatRot(pVect,qReal,qVect) {
        const real0=Rot.quatMultReal(qReal,qVect,0,pVect);
        const vect0=Rot.quatMultVect(qReal,qVect,0,pVect);
        return Rot.quatMultVect(real0,vect0,qReal,math.multiply(qVect,-1));
    }

    static point(point,wHat,rad) {
        const qReal=math.cos(rad/2);
        const qVect=math.multiply(wHat,math.sin(rad/2));
        return Rot.quatRot(point,qReal,qVect);
    }

    static points(points,wHat,rad) {
        const qReal=math.cos(rad/2);
        const qVect=math.multiply(wHat,math.sin(rad/2));
        const rotPoints=points.map(function(point) {
            return Rot.quatRot(point,qReal,qVect);
        });
        return rotPoints;
    }

    static oTens(oTens,wHat,rad) {
        const qReal=math.cos(rad/2);
        const qVect=math.multiply(wHat,math.sin(rad/2));
        return [VF.unit(Rot.quatRot(oTens[0],qReal,qVect)),VF.unit(Rot.quatRot(oTens[1],qReal,qVect)),VF.unit(Rot.quatRot(oTens[2],qReal,qVect))];
    }

    static oTens2(oTens,w,dt) {
        let rad=VF.mag(w);
        const wHat=math.divide(w,rad);
        rad=rad*dt;
        const qReal=math.cos(rad/2);
        const qVect=math.multiply(wHat,math.sin(rad/2));
        return [VF.unit(Rot.quatRot(oTens[0],qReal,qVect)),VF.unit(Rot.quatRot(oTens[1],qReal,qVect)),VF.unit(Rot.quatRot(oTens[2],qReal,qVect))];
    }
}

class PF {
    //phys funcs
    static getComNode(lon,v,g) {
        let com=[0,0,0];
        let totMass=0;
        lon.forEach(function(n) {
            com=math.add(com,n.p);
            totMass+=n.m;
        });
        return new ComNode(math.divide(com,totMass),totMass,v,g);
    }

    static getMomentTensor(lon) {
        let Ixx=0;
        let Iyy=0;
        let Izz=0;
        let Ixy=0;
        let Ixz=0;
        let Iyz=0;
        lon.forEach(function(n) {
            let xx=[n.p[1],n.p[2]];
            let yy=[n.p[0],n.p[2]];
            let zz=[n.p[0],n.p[1]];
            Ixx+=math.dot(xx,xx)*n.m;
            Iyy+=math.dot(yy,yy)*n.m;
            Izz+=math.dot(zz,zz)*n.m;
            Ixy+=n.p[0]*n.p[1]*n.m;
            Ixz+=n.p[0]*n.p[2]*n.m;
            Iyz+=n.p[1]*n.p[2]*n.m;
        });
        return [[Ixx,-Ixy,-Ixz],[-Ixy,Iyy,-Iyz],[-Ixz,-Iyz,Izz]];
    }

    static getMomentTensor2(lop) {
        // assumes each point has mass of 1
        let Ixx=0;
        let Iyy=0;
        let Izz=0;
        let Ixy=0;
        let Ixz=0;
        let Iyz=0;
        lop.forEach(function(p) {
            let xx=[p[1],p[2]];
            let yy=[p[0],p[2]];
            let zz=[p[0],p[1]];
            Ixx+=math.dot(xx,xx);
            Iyy+=math.dot(yy,yy);
            Izz+=math.dot(zz,zz);
            Ixy+=p[0]*p[1];
            Ixz+=p[0]*p[2];
            Iyz+=p[1]*p[2];
        });
        return [[Ixx,-Ixy,-Ixz],[-Ixy,Iyy,-Iyz],[-Ixz,-Iyz,Izz]];
    }

    static getMT(oTens,princMomTens) {
        return math.multiply(math.multiply(math.transpose(oTens),princMomTens),oTens);
    }

    static getW(oTens,princMomTens,angMom) {
        const momTens=PF.getMT(oTens,princMomTens);
        return math.transpose(math.lusolve(momTens,math.transpose(angMom)))[0];
    }

    static getCorrW(oTens,princMomTens,angMom,dt) {
        const k1=PF.getW(oTens,princMomTens,angMom)
        const k2=PF.getW(Rot.oTens2(oTens,math.divide(k1,2),dt),princMomTens,angMom)
        const k3=PF.getW(Rot.oTens2(oTens,math.divide(k2,2),dt),princMomTens,angMom)
        const k4=PF.getW(Rot.oTens2(oTens,k3,dt),princMomTens,angMom)
        return math.divide(math.add(k1,math.multiply(k2,2),math.multiply(k3,2),k4),6)
    }
}

class FuncBuffer {
    constructor() {
        this.funcBuff={};
    }

    addFunc(key,func,stepsUntil,numTimes,...args) {
        this.funcBuff[key]={'func':func,'args':args,'stepsUntil':stepsUntil,'numTimes':numTimes};
    }

    removeFunc(key) {
        delete this.funcBuff[key];
    }

    stepAndRun() {
        let keysToRemove=[];
        Object.keys(this.funcBuffer).forEach(function(key) {
            if(this.funcBuff[key]['stepsUntil']==0) {
                if(this.funcBuff[key]['numTimes']!=0) {
                    this.funcBuff[key]['func'](...this.funcBuff[key]['args']);
                    this.funcBuff[key]['numTimes']-=1;
                } else {
                    keysToRemove.push(key);
                }
            } else {
                this.funcBuff[key]['stepsUntil']-=1;
            }
        });
        keysToRemove.forEach(function(key) {
            this.removeFunc(key);
        })
    }
}

class MyColors {
    constructor() {
        this.magenta=color(200,0,150,100);
        this.blue=color(0,100,255,102);
        this.lightGreen=color(25,255,100,100);
    }

    static randColor(alpha=120,baseCol=null,spread=null,spreadAlpha=false) {
        if(baseCol==null) {
            if(spreadAlpha) {
                return color(math.random(0,255),math.random(0,255),math.random(0,255),math.random(alpha-spread,alpha+spread));
            } else {
                return color(math.random(0,255),math.random(0,255),math.random(0,255),alpha);
            }
        } else {
            const red=math.random(baseCol[0]-spread,baseCol[0]+spread);
            const green=math.random(baseCol[1]-spread,baseCol[1]+spread);
            const blue=math.random(baseCol[2]-spread,baseCol[2]+spread);
            if(spreadAlpha) {
                return color(red,blue,green,math.random(alpha-spread,alpha+spread));
            } else {
                return color(math.random(0,255),math.random(0,255),math.random(0,255),alpha);
            }
        }
    }

    static randColors(length,alpha=120,baseCol=null,spread=null) {
        let randColors=[];
        for(var i=0;i<length;i++) {
            randColors.push(MyColors.randColor(alpha,baseCol,spread));
        }
        return randColors;
    }
}

