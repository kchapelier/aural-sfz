"use strict";

var util = require('./lib/util'),
    fourGiga = 4294967296;

var SfzElement = function (elementLabel) {
    this.elementLabel = elementLabel;
    this.children = [];
};

SfzElement.prototype.elementLabel = null;
SfzElement.prototype.children = null;

SfzElement.prototype.sample = null;
SfzElement.prototype.volume = 0;
SfzElement.prototype.pan = 0;
SfzElement.prototype.transpose = 0;
SfzElement.prototype.tune = 0;
SfzElement.prototype.pitchKeyCenter = 60;
SfzElement.prototype.pitchKeyTrack = 100;
SfzElement.prototype.pitchRandom = 0;
SfzElement.prototype.loChannel = 0;
SfzElement.prototype.hiChannel = 16;
SfzElement.prototype.loKey = 0;
SfzElement.prototype.hiKey = 127;
SfzElement.prototype.loRand = 0;
SfzElement.prototype.hiRand = 1;
SfzElement.prototype.loVelocity = 0;
SfzElement.prototype.hiVelocity = 127;
SfzElement.prototype.loBpm = 0;
SfzElement.prototype.hiBpm = 500;
SfzElement.prototype.sequenceLength = 1;
SfzElement.prototype.sequencePosition = 1;
SfzElement.prototype.offset = 0;
SfzElement.prototype.offsetRandom = 0;
SfzElement.prototype.end = 0;
SfzElement.prototype.switchLast = 0;
SfzElement.prototype.switchLoKey = 0;
SfzElement.prototype.switchHiKey = 127;
SfzElement.prototype.switchDown = 0;
SfzElement.prototype.switchUp = 0;
SfzElement.prototype.switchPrevious = null;

/**
 * Set several properties of the region
 * @param {Object} properties - Object containing the options
 */
SfzElement.prototype.setProperties = function (properties) {
    var key;

    for (key in properties) {
        if (properties.hasOwnProperty(key)) {
            this.setProperty(key, properties[key]);
        }
    }
};


/**
 * Set a specific property of the region
 * @param {string} property - Property name (as per sfz specifications)
 * @param {*} value - Value
 */
SfzElement.prototype.setProperty = function (property, value) {
    switch (property) {
        case 'sample':
            this.sample = value;
            break;
        case 'lochan':
            this.loChannel = util.clampInteger(value, 0, 16);
            break;
        case 'hichan':
            this.hiChannel = util.clampInteger(value, 0, 16);
            break;
        case 'key':
            this.setProperty('lokey', value);
            this.setProperty('hikey', value);
            this.setProperty('picth_keycenter', value);
            break;
        /*
        case 'lokey':
            value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
            this.loKey = Math.min(127, Math.max(0, value)); break;
        case 'hikey':
            value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
            this.hiKey = Math.min(127, Math.max(0, value)); break;
        */
        case 'lovel':
            this.loVelocity = util.clampInteger(value, 0, 127);
            break;
        case 'hivel':
            this.hiVelocity = util.clampInteger(value, 0, 127);
            break;
        case 'lorand':
            this.loRand = util.clampFloat(value, 0, 1);
            break;
        case 'hirand':
            this.hiRand = util.clampFloat(value, 0, 1);
            break;
        case 'lobpm':
            this.loBpm = util.clampFloat(value, 0, 500);
            break;
        case 'hibpm':
            this.hiBpm = util.clampFloat(value, 0, 500);
            break;
        case 'seq_length':
            this.sequenceLength = util.clampInteger(value, 0, 100);
            break;
        case 'seq_position':
            this.sequencePosition = util.clampInteger(value, 0, 100);
            break;
        case 'volume':
            this.volume = util.clampFloat(value, -144, 6);
            break;
        case 'pan':
            this.pan = util.clampFloat(value, -100, 100);
            break;
        case 'offset':
            this.offset = util.clampInteger(value, 0, fourGiga);
            break;
        case 'offset_random':
            this.offsetRandom = util.clampInteger(value, 0, fourGiga);
            break;
        case 'end':
            this.end = util.clampInteger(value, -1, fourGiga);
            break;
        case 'transpose':
            this.transpose = util.clampInteger(value, -127, 127);
            break;
        case 'tune':
            this.tune = util.clampInteger(value, 1, 100);
            break;
        /*
        case 'pitch_keycenter':
            value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
            this.pitchKeyCenter = Math.min(127, Math.max(0, value)); break;
        */
        case 'pitch_keytrack':
            this.pitchKeyTrack = util.clampInteger(value, -1200, 1200);
            break;
        case 'pitch_random':
            this.pitchRandom = util.clampInteger(value, 0, 9600);
            break;
        /*
        case 'sw_last':
            value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
            this.switchLast = Math.min(127, Math.max(0, value)); break;
        case 'sw_lokey':
            value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
            this.switchLoKey = Math.min(127, Math.max(0, value)); break;
        case 'sw_hikey':
            value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
            this.switchHiKey = Math.min(127, Math.max(0, value)); break;
        case 'sw_down':
            value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
            this.switchDown = Math.min(127, Math.max(0, value)); break;
        case 'sw_up':
            value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
            this.switchUp = Math.min(127, Math.max(0, value)); break;
        case 'sw_previous':
            value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
            this.switchPrevious = parseInt(value, 10); break;
        */
        default:
            break;
    }
};

SfzElement.prototype.toString = function () {
    var definition = '\r\n\r\n<' + this.elementLabel + '>';

    if (this.sample) {
        definition += '\r\n' + 'sample=' + this.sample;
    }

    if (this.volume) {
        definition += '\r\n' + 'volume=' + this.volume;
    }

    if (this.pan) {
        definition += '\r\n' + 'pan=' + this.pan;
    }

    for(var i = 0; i < this.children.length; i++) {
        definition += this.children[i].toString();
    }

    return definition;
};

module.exports = SfzElement;
