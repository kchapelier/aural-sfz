"use strict";

/* jshint camelcase:false */
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

var fourGiga = 4294967296;

//TODO enum type for off_mode, trigger, sw_vel and the likes ?
//TODO end of the Amplifier parameters
//TODO Pitch EG, Pitch LFO, Filter, Filter EG, Filter LFO, Amplifier EG, Amplifier LFO, Equalizer

/*
 * Scheme of the parameter descriptor : type, defaultValue, min, max
 */

module.exports = {
    /* Sample Definition */

    sample: ['string', null],

    /* Input Controls */

    lochan: ['integer', 0, 0, 16],
    hichan: ['integer', 16, 0, 16],
    lokey: ['key', 0, 0, 127],
    hikey: ['key', 127, 0, 127],
    lovel: ['integer', 0, 0, 127],
    hivel: ['integer', 127, 0, 127],
    lobend: ['integer', -8192, -8192, 8192],
    hibend: ['integer', 8192, -8192, 8192],
    lochanaft: ['integer', 0, 0, 127],
    hichanaft: ['integer', 127, 0, 127],
    lopolyaft: ['integer', 0, 0, 127],
    hipolyaft: ['integer', 127, 0, 127],
    lorand: ['float', 0, 0, 1],
    hirand: ['float', 1, 0, 1],
    lobpm: ['float', 0, 0, 500],
    hibpm: ['float', 500, 0, 500],
    seq_length: ['integer', 0, 0, 100],
    seq_position: ['integer', 0, 0, 100],
    sw_lokey: ['key', 0, 0, 127],
    sw_hikey: ['key', 127, 0, 127],
    sw_last: ['key', 0, 0, 127],
    sw_down: ['key', 0, 0, 127],
    sw_up: ['key', 0, 0, 127],
    sw_previous: ['key', null, 0, 127],
    sw_vel: ['string', 'current'],
    trigger: ['string', 'attack'],
    group: ['integer', 0, 0, fourGiga],
    off_by: ['integer', 0, 0, fourGiga],
    off_mode: ['string', 'fast'],

    /* Performance Parameters */

    delay: ['float', 0, 0, 100],
    delay_random: ['float', 0, 0, 100],
    //delay_ccN: ['float', 0, 0, 100],
    offset: ['integer', 0, 0, fourGiga],
    offset_random: ['integer', 0, 0, fourGiga],
    //offset_ccN: ['integer', 0, 0, fourGiga],
    end: ['integer', 0, -1, fourGiga],
    count: ['integer', 0, 0, fourGiga],
    loop_mode: ['string', 'no_loop'],
    loop_start: ['integer', 0, 0, fourGiga],
    loop_end: ['integer', 0, 0, fourGiga],
    sync_beats: ['float', 0, 0, 32],
    sync_offset: ['float', 0, 0, 32],

    /* Pitch */

    transpose: ['integer', 0, -127, 127],
    tune: ['integer', 0, -100, 100],
    pitch_keycenter: ['key', 60, -127, 127],
    pitch_keytrack: ['integer', 100, -1200, 1200],
    pitch_veltrack: ['integer', 0, -9600, 9600],
    pitch_random: ['integer', 0, 0, 9600],
    bend_up: ['integer', 200, -9600, 9600],
    bend_down: ['integer', -200, -9600, 9600],
    bend_step: ['integer', 1, 1, 1200],

    /* Amplifier */

    volume: ['float', 0, -144, 6],
    pan: ['float', 0, -100, 100],
    width: ['float', 0, -100, 100],
    position: ['float', 0, -100, 100],
    amp_keytrack: ['float', 0, -96, 12],
    amp_keycenter: ['key', 60, 0, 127],
    amp_veltrack: ['float', 100, -100, 100],
    //amp_velcurve_N: ['float', interpolated, 0, 1],
    amp_random: ['float', 0, 0, 24],

    /* Effects */

    effect1: ['float', 0, 0, 100],
    effect2: ['float', 0, 0, 100]
};
