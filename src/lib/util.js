"use strict";

var util = {
    clampInteger: function (value, min, max) {
        return Math.min(max, Math.max(min, parseInt(value, 10)));
    },
    clampFloat: function (value, min, max) {
        return Math.min(max, Math.max(min, parseFloat(value)));
    },
    clampKey: function (value, min, max) {
        value = (typeof value === 'string' && !isFinite(value) ? null /* Aural.Music.Note.getMidiFromLabel(value) */ : parseInt(value, 10));

        return Math.min(max, Math.max(min, value));
    },
    camelCase: function (string) {
        return string.replace(/_\D/g, function(match){
            return match.charAt(1).toUpperCase();
        });
    },
    underscore: function (string) {
        return string.replace(/[A-Z]/g, function(match){
            return ('_' + match.charAt(0).toLowerCase());
        });
    }
};

module.exports = util;
