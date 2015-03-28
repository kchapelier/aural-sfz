"use strict";

var util = {
    clampInteger: function (value, min, max) {
        return Math.min(max, Math.max(min, parseInt(value, 10)));
    },
    clampFloat: function (value, min, max) {
        return Math.min(max, Math.max(min, parseFloat(value)));
    },
    clampKey: function (value, min, max) {
        value = (typeof value === 'string' && !isFinite(value) ? 0 /* Aural.Music.Note.getMidiFromLabel(value) */ : parseInt(value, 10));

        return Math.min(max, Math.max(min, value));
    }
};

module.exports = util;
