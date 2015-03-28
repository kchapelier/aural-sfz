"use strict";

/* jshint camelcase:false */
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

var fourGiga = 4294967296;

/*
 * Scheme of the parameter descriptor : type, defaultValue, min, max
 */

module.exports = {
    sample: ['string', null],

    lochan: ['integer', 0, 0, 16],
    hichan: ['integer', 16, 0, 16],
    lokey: ['key', 0, 0, 127],
    hikey: ['key', 127, 0, 127],
    lovel: ['integer', 0, 0, 127],
    hivel: ['integer', 127, 0, 127],
    lorand: ['float', 0, 0, 1],
    hirand: ['float', 1, 0, 1],
    lobpm: ['float', 0, 0, 500],
    hibpm: ['float', 500, 0, 500],

    seq_length: ['integer', 0, 0, 100],
    seq_position: ['integer', 0, 0, 100],

    volume: ['float', 0, -144, 6],
    pan: ['float', 0, -100, 100],

    transpose: ['integer', 0, -127, 127],
    tune: ['integer', 0, 1, 100],
    pitch_keycenter: ['key', 60, 0, 127],
    pitch_keytrack: ['integer', 100, -1200, 1200],
    pitch_random: ['integer', 0, 0, 9600],

    offset: ['integer', 0, 0, 100],
    offset_random: ['integer', 0, 0, 100],
    end: ['integer', 0, -1, fourGiga],

    sw_last: ['key', 0, 0, 127],
    sw_lokey: ['key', 0, 0, 127],
    sw_hikey: ['key', 127, 0, 127],
    sw_down: ['key', 0, 0, 127],
    sw_up: ['key', 0, 0, 127],
    sw_previous: ['key', null, 0, 127]
};
