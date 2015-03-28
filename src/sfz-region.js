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
    this.innerSequence++;

    if (this.innerSequence > this.sequenceLength) {
        this.innerSequence = 1;
    }

    return (
        channel >= this.loChannel && channel <= this.hiChannel && //channel check
        key >= this.loKey && key <= this.hiKey && //midi value check
        velocity >= this.loVelocity && velocity <= this.hiVelocity && //velocity layer
        this.innerSequence === this.sequencePosition && rand >= this.loRand && rand <= this.hiRand && //round robin
        bpm >= this.loBpm && bpm <= this.hiBpm
    );
};

module.exports = SfzRegion;
