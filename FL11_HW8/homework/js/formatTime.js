function formatTime(minutes){
    let day = 0;
    let hours = 0;
    
    if(minutes >= 1440) {
        day = Math.floor(minutes/1440);
        minutes = minutes % 1440;
    }

    if(minutes >= 60) {
        hours = Math.floor(minutes/60);
        minutes = minutes % 60;
    }

    return `${day} day(s) ${hours} hour(s) ${minutes} minute(s).`;

}
formatTime(120);
formatTime(59);
formatTime(3601); 
