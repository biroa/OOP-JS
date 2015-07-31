//version 4.3
//Inheritance

function onReady() {

    var clock = new eu.adambiro.Clock('clock');
    var clock2 = new eu.adambiro.Clock('clock2', -7200000, 'ETC');
    var clock3 = new eu.adambiro.TextClock('clock3', 300, 'X');
    var d = new Date();


    //First parameter is the scope parameter
    // More Info: http://hangar.runway7.net/javascript/difference-call-apply
    //LiveDate.call(clock,1,2,3);
    LiveDate.apply(clock, [1, 2, 3]);
}


/**
 * @constructor
 */
function LiveDate(a, b, c) {
    console.log(this, a, b, c);
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
/**
 * New TextClock constructor
 *
 * @param id
 * @param offset
 * @param label
 * @constructor
 */
eu.adambiro.TextClock = function (id, offset, label) {
    eu.adambiro.Clock.apply(this,arguments);
}
//Info:: Object create works only modern browsers

//TextClock prototype is a prototype 'instance' of the 'digital' clock
eu.adambiro.TextClock.prototype = createObject(eu.adambiro.Clock.prototype,eu.adambiro.TextClock);
// Info:: Every object prototype has a constructor property

//My TextClock constructor is not the 'digital' clock constructor, it is it's own
// constructor. We reassign TextClock constructor to itself!! Due to this we can
// call normally the TextClock constructor in the line 138 instead of the Clock constructor!!

//-- eu.adambiro.TextClock.prototype.constructor = eu.adambiro.TextClock;
//this is the backward compatible format. With this style we do not need the
// line above which we used
function createObject(proto,construct){
    function c(){}
    c.prototype = proto;
    c.prototype.constructor = construct;
    return new c();
}

window.onload = onReady;