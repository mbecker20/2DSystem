class P5F {
    static lineFromMat(mat) { //draws line from 2 points given in mat
        line(mat[0][0],
            mat[0][1],
            mat[1][0],
            mat[0][1]);
    };

    static lineFromVec(vec0,vec1) {
        line(vec0[0],
            vec0[1],
            vec1[0],
            vec1[1]);
    };

    static boxFromMat(mat) {
        quad(mat[0][0],mat[0][1],
            mat[1][0],mat[1][1],
            mat[2][0],mat[2][1],
            mat[3][0],mat[3][1]);
    }

    static linesFromMat(mat) { 
        //draws lines between points in order from mat of points
        for(let i=0;i<mat.length-1;i++) {
            line(mat[i][0],
                mat[i][1],
                mat[i+1][0],
                mat[i+1][1]);
        }
    }
}