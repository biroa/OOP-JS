function onReady() {

    var clock = createClock('clock');
    var clock2 = createClock('clock2');

}

function createClock(id){//function
    var c = {};//or new Object();
        c.updateClock = function(){//method
            var clock, date, time;
            date = new Date();
            clock = document.getElementById(id);
            time= formatDigits(date.getHours()) + ":"
            + formatDigits(date.getMinutes()) + ":"
            + formatDigits(date.getSeconds());
            clock.innerHTML = time;
        };

    setInterval(c.updateClock,1000);
    c.updateClock();

    return c;
}

function formatDigits(num){
    num = parseInt(num);
    if(num < 10){
        num = '0' + num;
    }

    return num;
}

window.onload = onReady;