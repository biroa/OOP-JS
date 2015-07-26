function onReady() {

    setInterval(updateClock,1000);
    updateClock();
}

function updateClock(){
    var clock, date, time;
    //property variable in a function
    //method is function in a function
    date = new Date();
    //this is the element of the DOM (Document Object Model)
    clock = document.getElementById('clock');
    time= formatDigits(date.getHours()) + ":"
    + formatDigits(date.getMinutes()) + ":"
    + formatDigits(date.getSeconds());
    console.log(time);
    clock.innerHTML = time;
}

function formatDigits(num){
    num = parseInt(num);
    if(num < 10){
        num = '0' + num;
    }

    return num;
}

window.onload = onReady;