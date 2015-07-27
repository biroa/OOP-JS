//version 2.3
//First real OOP

function onReady() {

    var clock = new Clock('clock');
    var clock2 = new Clock('clock2');

}

function Clock(id) {//function

    this.updateClock = function () {
        var clock, date, time;
        date = new Date();
        clock = document.getElementById(id);
        time = this.formatDigits(date.getHours()) + ":"
        + this.formatDigits(date.getMinutes()) + ":"
        + this.formatDigits(date.getSeconds());
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