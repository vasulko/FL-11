function reverseNumber(number){
    let copyNumber = Math.abs(number);
    let result = '';

    if(!isNaN(parseFloat(copyNumber)) && isFinite(copyNumber) && (copyNumber % 1 === 0)){
        while(copyNumber){
            result += copyNumber % 10;
            copyNumber = Math.floor(copyNumber / 10);
        }
    
        result = Math.sign(number) * result;
    
        return result;
    } else {
        return `It is incorrect data type`;
    }
}

reverseNumber(123);
reverseNumber(-456);
reverseNumber(10000); 
