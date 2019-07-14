function getMin(...arg){
    let numberMin = arg[0];
    for(let i = 1; i < arg.length; i++){
        if(arg[i] < numberMin){
            numberMin = arg[i];
        }
    }

    return numberMin;
}

getMin(3, 0, -3);

