let allPoints = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
const halfPoint = 2;
let correctPoints = true;
let halfX;
let halfY;

for(let i = 0; i < allPoints.length; i++){
    let point;
    point = prompt(`Please write ${allPoints[i]}:`,'');
    if( !isNaN(parseInt(point)) && isFinite(point) ) {
        allPoints[i] = +point;
    } else {
        console.log('You wrote incorrect point, try again. Reload page.');
        correctPoints = false;
        break;
    }
}

if(correctPoints){
    halfX = (allPoints[0] + allPoints[2]) / halfPoint === allPoints[4];
    halfY = (allPoints[1] + allPoints[3]) / halfPoint === allPoints[5];

    if(halfX && halfY){
        console.log(true);
    } else {
        console.log(false)
    }
}