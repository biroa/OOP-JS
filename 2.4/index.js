//version 2.4

function onReady() {

    var clock = new Clock('clock');
    var clock2 = new Clock('clock2', -7200000, 'ETC');
    var d = new Date();
    console.log(d.getTimezoneOffset() * 60 * 1000);// Faking UTC because JS
    // runs always the local users time
}

function Clock(id, offset, label) {//function
    offset = offset || 0; // instead 0 against null,0,undefined
    label = label || 'UTC';
    var d = new Date();
    //turn minutes to sec(*60) and millisecond(*1000)
    this.offset = (offset + d.getTimezoneOffset()) * 60 * 1000;

    this.updateClock = function () {
        var clock, date, time;
        //problem:: We create 2 new objects every single second ...
        //multiply by the 2 method call we create the same date object 4 times
        date = new Date();
        date = new Date(this.offset + date.getTime());
        clock = document.getElementById(id);
        time = this.formatDigits(date.getHours()) + ":"
        + this.formatDigits(date.getMinutes()) + ":"
        + this.formatDigits(date.getSeconds()) + " " + label;
        clock.innerHTML = time;
    };

    this.formatDigits = function (num) {
        num = parseInt(num);
        if (num < 10) {
            num = '0' + num;
        }

        return num;
    }

    //We loose scope 'this' in setInterval so we store object this in 'that' var as a work
    // around
    var that = this;
    setInterval(function () {
        that.updateClock()
    }, 1000);
    this.updateClock();

    //In general when we work with a constructor we do not need to return anything
    // bt default it is going to return itself
}

window.onload = onReady;