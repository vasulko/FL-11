function isSmaller(a, b){
    return !isBigger(a, b);
}

isSmaller( 5, -1 );

function isBigger(a, b){
    return a > b;
}