function addOne(x) {
    return x + 1;
  }
  
function pipe(number, ...arg){
    for(let i = 0; i < arg.length; i++){
        number = arg[i](number);
    }

    return number;
}

pipe(1, addOne);
pipe(1, addOne, addOne);
