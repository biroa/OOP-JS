//version 3.2
//We moved constructor functions to prototype functions


function onReady() {

    var clock = new Clock('clock');
    var clock2 = new Clock('clock2', -7200000, 'ETC');
    var d = new Date();
    //console.log(d.getTimezoneOffset() * 60 * 1000);// Faking UTC because JS
    // runs always the local users time
}

Date.prototype.updateSeconds = function () {
    this.setSeconds(this.getSeconds() + 1);
}

function Clock(id, offset, label) {
    offset = offset || 0; // instead 0 against null,0,undefined
    label = label || 'UTC';
    var d = new Date();
    var offset = (offset + d.getTimezoneOffset()) * 60 * 1000;
    //turn minutes to sec(*60) and millisecond(*1000)
    this.d = new Date(offset + d.getTime());
    this.id = id;
    this.label = label;

    var that = this;
    setInterval(function () {
        that.updateClock()
    }, 1000);
    this.updateClock();
}
/**
 * We deleted the multiple Date object instantiation
 */
Clock.prototype.updateClock = function () {
    var clock, date, time;
    date = this.d;
    date.updateSeconds();
    clock = document.getElementById(this.id);
    time = this.formatDigits(date.getHours()) + ":"
    + this.formatDigits(date.getMinutes()) + ":"
    + this.formatDigits(date.getSeconds()) + " " + this.label;
    clock.innerHTML = time;
};

Clock.prototype.formatDigits = function (num) {
    num = parseInt(num);
    if (num < 10) {
        num = '0' + num;
    }

    return num;
}

window.onload = onReady;