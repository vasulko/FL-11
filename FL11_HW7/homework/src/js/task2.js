const maxRange = 8;
const stepPrize = 2;
const stepRange = 4;
const maxPrize = 100;
let rangePrize = 100;
let totalPrize = 0;
let range = 8;
let prize = 100;
let continueGame = false;


let playGame = confirm('Do you want to play a game?');

if(playGame){
    do{
       let attempts = 3;
       let currentNumber = Math.floor(Math.random()*(maxRange+1));
       alert(currentNumber);
    for(attempts; attempts > 0; attempts--){
       let yourNumber = prompt(`Choose a roulette pocket number from 0 to ${range}
Attempts left: ${attempts}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${prize}$`);

    if (!isNaN(parseFloat(yourNumber)) && isFinite(yourNumber) && currentNumber === +yourNumber){
    totalPrize += prize;
    continueGame = confirm(`Congratulation, you won!Your prize is: ${totalPrize} $. Do you want to continue?`);
    range += stepRange;
    rangePrize *= stepPrize;
    prize = rangePrize
    break;
} else {
    prize /= stepPrize;
    continueGame = false;   
}
}

if(attempts === 0){
    totalPrize = 0;
}

if(!continueGame){
    alert(`Thank you for your participation. Your prize is: ${totalPrize}$`)
    playGame = confirm(`Do you want to play again?`);
    totalPrize = 0;
    rangePrize= maxPrize;
    prize = maxPrize;
    range = maxRange;
}
    }while(playGame);

} else {
    alert('You did not become a billionaire, but can.')
}