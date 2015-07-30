//version 4.1
//Inheritance

function onReady() {

    var clock = new eu.adambiro.Clock('clock');
    var clock2 = new eu.adambiro.Clock('clock2', -7200000, 'ETC');
    var d = new Date();


    //First parameter is the scope parameter
    // More Info: http://hangar.runway7.net/javascript/difference-call-apply
    //LiveDate.call(clock,1,2,3);
    //LiveDate.apply(clock,[1,2,3]);
}


/**
 * @constructor
 */
function LiveDate(a,b,c){
    console.log(this,a, b, c);
}

//Static properties
Date.__interval = 0;
Date.__aDates = [];
/**
 * Static method
 * @param date
 */
Date.addToInterval = function (date) {
    this.__aDates.push(date);

    if (!Date.__interval) {
        Date.__interval = setInterval(function () {
            Date.updateDates()
        }, 1000)
    }
}

Date.updateDates = function () {
    for (var i = 0; i < this.__aDates.length; i++) {
        this.__aDates[i].updateSeconds();
    }
}
/**
 * Updating seconds
 */
Date.prototype.updateSeconds = function () {
    this.setSeconds(this.getSeconds() + 1);
}


/**
 * Auto update
 * @param isAuto
 */
Date.prototype.autoClock = function (isAuto) {
    clearInterval(this.clockInterval);
    if (isAuto) {
        //var that = this;
        //this.clockInterval = setInterval(function () {
        //    that.updateSeconds();
        //}, 1000);
        Date.addToInterval(this);
    }
}


// namespace usage in js
// basic obj. = name of the actual site adambiro.eu
// eu.adambiro.Projectname

var eu = eu || {}; //do not override the eu folder if it exists
eu.adambiro = eu.adambiro || {};


/**
 * @param id
 * @param offset
 * @param label
 * @constructor
 */
eu.adambiro.Clock = function (id, offset, label) {
    offset = offset || 0;
    label = label || 'UTC';
    var d = new Date();
    var offset = (offset + d.getTimezoneOffset()) * 60 * 1000;
    //turn minutes to sec(*60) and millisecond(*1000)
    this.d = new Date(offset + d.getTime());
    this.d.autoClock(true);
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
eu.adambiro.Clock.prototype.updateClock = function () {
    var clock, date, time;
    date = this.d;
    //date.updateSeconds();
    clock = document.getElementById(this.id);
    time = this.formatDigits(date.getHours()) + ":"
    + this.formatDigits(date.getMinutes()) + ":"
    + this.formatDigits(date.getSeconds()) + " " + this.label;
    clock.innerHTML = time;
};
/**
 * Convert digits to 0X format if they are smaller than 10
 *
 * @param num
 * @returns {Number}
 */
eu.adambiro.Clock.prototype.formatDigits = function (num) {
    num = parseInt(num);
    if (num < 10) {
        num = '0' + num;
    }

    return num;
}

window.onload = onReady;