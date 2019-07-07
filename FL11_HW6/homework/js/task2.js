let allSides = ['a', 'b', 'c'];
let correctSides = true;
let side;
let a;
let b;
let c;


for(let i = 0; i < allSides.length; i++){
    side = prompt(`Write ${allSides[i]} length`,'');
    if( !isNaN(parseInt(side)) && isFinite(side) && side > 0){
        allSides[i] = side;
    } else {
        console.log('Triangle doesn’t exist');
        correctSides = false;
        break;
    }
}

if(correctSides){
    a = allSides[0];
    b = allSides[1];
    c = allSides[1+1];

    if( a === b && b === c ){
        console.log('Eequivalent triangle');
    } else {
        if(a === b || a === c || b === c){
            console.log('Isosceles triangle');
        } else {
            console.log('Normal triangle');
        }
    }
}


