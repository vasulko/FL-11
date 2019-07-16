const data = [
    {
      '_id': '5b5e3168c6bf40f2c1235cd6',
      'index': 0,
      'birthday': '2016-03-18T00:00:00',
      'eyeColor': 'green',
      'name': 'Stein',
      'favoriteFruit': 'apple'
    },
    {
      '_id': '5b5e3168e328c0d72e4f27d8',
      'index': 1,
      'birthday': '1991-02-11T00:00:00',
      'eyeColor': 'blue',
      'name': 'Cortez',
      'favoriteFruit': 'strawberry'
    },
    {
      '_id': '5b5e3168cc79132b631c666a',
      'index': 2,
      'birthday': '1984-04-17T00:00:00',
      'eyeColor': 'blue',
      'name': 'Suzette',
      'favoriteFruit': 'apple'
    },
    {
      '_id': '5b5e31682093adcc6cd0dde5',
      'index': 3,
      'birthday': '1994-04-17T00:00:00',
      'eyeColor': 'green',
      'name': 'George',
      'favoriteFruit': 'banana'
    }
  ]
  

function getNumbers(string){
    let arrNumber = [];
    let arrString = string.split('');

    for(let i = 0; i < arrString.length; i++){
        let number = arrString[i];
        if(!isNaN(parseInt(number)) && isFinite(number)){
            arrNumber.push(+number);
        }
    }

    return arrNumber;
}


function findTypes(...args){
    let dataTypes = {};
    let type;

    for(let i = 0; i < args.length; i++){
        type = typeof args[i];
        if( type in dataTypes ){
            dataTypes[type] += 1;
        } else {
            dataTypes[type] = 1;
        }
    }

    return dataTypes;   
}

 function executeforEach(arr, callback){
    for(let i = 0; i < arr.length; i++){
        callback(arr[i]);
    }
}

function mapArray(arr, func){
    let newArr = [];
    executeforEach(arr,function(el){
        newArr.push(func(el));
    });
    return newArr;
}

function filterArray(arr, func){
    let newArr = [];
    executeforEach(arr, function(el){
        if(func(el)){
            newArr.push(el);
        }
    });
    return newArr;
}

function showFormattedDate(date){
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `Date: ${month} ${day} ${year}`;
}

function canConvertToDate(string){
    return !!Date.parse(string);
}

function daysBetween(date1, date2){
    const micSeconds = 1000;
    const seconds = 60;
    const minutes = 60;
    const hours = 24;

    let differentTime = date2.getTime() - date1.getTime();

    return Math.round(differentTime/(micSeconds*seconds*minutes*hours));
}




function getAmountOfAdultPeople(data){
    const daysForAdult = 6570;
    const todayDate = new Date();
    let result = filterArray(data, function(el){
         return daysBetween(new Date(el['birthday']), todayDate) >= daysForAdult;
    });

    return result.length;
}


function keys(object){
    let result = [];
    for(let key in object){
        if(object.hasOwnProperty(key)){
            result.push(key);
        }
    }

    return result;
}

function values(object){
    let result = [];

    for(let key in object){
        if(object.hasOwnProperty(key)){
            result.push(object[key]);
        }
    }

    return result;
}







