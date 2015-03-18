"use strict";

var util = {
    clampInteger: function (value, min, max) {
        return Math.min(max, Math.max(min, parseInt(value, 10)));
    },
    clampFloat: function (value, min, max) {
        return Math.min(max, Math.max(min, parseFloat(value)));
    }
};

module.exports = util;
