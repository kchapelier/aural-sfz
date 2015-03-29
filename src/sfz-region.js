"use strict";

var SfzElement = require('./sfz-element');

var SfzRegion = function () {
    SfzElement.call(this, 'region');
    this.innerSequence = 0;
};

SfzRegion.prototype = Object.create(SfzElement.prototype);
SfzRegion.prototype.innerSequence = 0;

/**
 * Check if the region must be triggered by an incoming event
 * @param {Number} channel - Channel number
 * @param {Number} key - Midi value
 * @param {Number} cents - Cents
 * @param {Number} velocity - Velocity
 * @param {Number} bpm - Tempo in beats per minutes
 * @param {Number} rand - Random value for round robin
 * @return {boolean} Return whether the region must be triggered
 */
SfzRegion.prototype.matchInput = function (channel, key, cents, velocity, bpm, rand) {
    var prop = this.properties;

    //TODO retrieve those values as arguments
    var bend = 0,
        chanaft = 0,
        polyaft = 0;

    this.innerSequence++;

    if (this.innerSequence > prop.seq_length) {
        this.innerSequence = 1;
    }

    return (
        channel >= prop.lochan && channel <= prop.hichan && // channel check
        key >= prop.lokey && key <= prop.hikey && // midi value check
        velocity >= prop.lovel && velocity <= prop.hivel && // velocity layer
        rand >= prop.lorand && rand <= prop.hirand && // randomizing
        bpm >= prop.lobpm && bpm <= prop.hibpm && // bpm check
        bend >= prop.lobend && bend <= prop.hibend && // pitch bend check
        chanaft >= prop.lochanaft && bend <= prop.hichanaft && // channel aftertouch check
        polyaft >= prop.lopolyaft && bend <= prop.hipolyaft && // polyphonic aftertouch check
        this.innerSequence === prop.seq_position // round robin
    );
};

module.exports = SfzRegion;
