"use strict";

var parameters = require('./sfz-parameters'),
    util = require('./lib/util');

var SfzElement = function (elementLabel) {
    this.elementLabel = elementLabel;
    this.children = [];
};

SfzElement.prototype.elementLabel = null;
SfzElement.prototype.children = null;

// define the default properties on the prototype, according to their definitions
for (var key in parameters) {
    if (parameters.hasOwnProperty(key)) {
        SfzElement.prototype[util.camelCase(key)] = parameters[key][1];
    }
}

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
    if (parameters.hasOwnProperty(property)) {
        var parameter = parameters[property],
            camelCasedProperty = util.camelCase(property);

        if (parameter[0] === 'integer') {
            this[camelCasedProperty] = util.clampInteger(value, parameter[2], parameter[3]);
        } else if (parameter[0] === 'float') {
            this[camelCasedProperty] = util.clampFloat(value, parameter[2], parameter[3]);
        } else if (parameter[0] === 'key') {
            this[camelCasedProperty] = util.clampKey(value, parameter[2], parameter[3]);
        } else {
            this[camelCasedProperty] = value;
        }
    } else if (property === 'key') {
        this.setProperty('lokey', value);
        this.setProperty('hikey', value);
        this.setProperty('picth_keycenter', value);
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

    for (var i = 0; i < this.children.length; i++) {
        definition += this.children[i].toString();
    }

    return definition;
};

module.exports = SfzElement;
