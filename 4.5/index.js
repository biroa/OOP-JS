//version 4.5
//Inheritance

function onReady() {

    var clock = new eu.adambiro.Clock('clock');
    var clock2 = new eu.adambiro.TextClock('clock2', -7200000, 'ETC');
    var clock3 = new eu.adambiro.AlarmClock('clock3', -7200000, 'ETC', 10, 10);
    var d = new Date();


    //First parameter is the scope parameter
    // More Info: http://hangar.runway7.net/javascript/difference-call-apply
    //LiveDate.call(clock,1,2,3);
    //LiveDate.apply(clock, [1, 2, 3]);
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
eu.adambiro.Clock.prototype.version = '1.0';
/**
 * Update clock to
 */
eu.adambiro.Clock.prototype.updateClock = function () {
    var clock, date, time;
    date = this.d;
    //date.updateSeconds();
    clock = document.getElementById(this.id);
    clock.innerHTML = this.formatOutput(
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        this.label
    );
};

/**
 * format Clock output
 *
 * @param h
 * @param m
 * @param s
 * @param label
 * @returns {string}
 */
eu.adambiro.Clock.prototype.formatOutput = function (h, m, s, label) {
    return this.formatDigits(h) + ":"
        + this.formatDigits(m) + ":"
        + this.formatDigits(s) + " " + label;
}

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
    eu.adambiro.Clock.apply(this, arguments);
    console.log(this.version);
}

eu.adambiro.TextClock.prototype = createObject(eu.adambiro.Clock.prototype, eu.adambiro.TextClock);
eu.adambiro.TextClock.prototype.version = '1.01'; //overwrite the clock version 1.0
/**
 * Overwrite the default Functionality of the Clock constructor obj
 *
 * @param h
 * @param m
 * @param s
 * @param label
 * @returns {string}
 */
eu.adambiro.TextClock.prototype.formatOutput = function (h, m, s, label) {
    return this.formatDigits(h) + " Hour "
        + this.formatDigits(m) + " Minutes "
        + this.formatDigits(s) + " Seconds " + label;
}


/**
 *
 * @param id
 * @param offset
 * @param label
 * @param almHour
 * @param almMinutes
 * @constructor
 */
eu.adambiro.AlarmClock = function (id, offset, label, almHour, almMinutes) {
    eu.adambiro.TextClock.apply(this, arguments);
    this.almHour = almHour;
    this.almMinutes = almMinutes;
}

eu.adambiro.AlarmClock.prototype = createObject(eu.adambiro.TextClock.prototype, eu.adambiro.AlarmClock);

eu.adambiro.AlarmClock.prototype.formatOutput = function (h, m, s, label) {
    var output;
    console.log(h, m, s, '*');
    console.log(this.almHour, this.almMinutes, '=');
    if (h == this.almHour && m == this.almMinutes) {
        output = 'ALARM WAKE UP!';
        var sound = new Audio('../ringtone/wake_up.mp3');
        sound.play();
    } else {
        output = this.formatDigits(h) + " Hour "
        + this.formatDigits(m) + " Minutes "
        + this.formatDigits(s) + " Seconds " + label;
    }

    return output;
}


/**
 *
 * @param proto
 * @param construct
 * @returns {createObject.c}
 */
function createObject(proto, construct) {
    function c() {
    }

    c.prototype = proto;
    c.prototype.constructor = construct;
    return new c();
}

window.onload = onReady;