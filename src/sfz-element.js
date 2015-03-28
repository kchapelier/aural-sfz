"use strict";

var parameters = require('./sfz-parameters'),
    util = require('./lib/util');

// define the default properties, according to their definitions
var defaultProperties = {};

for (var key in parameters) {
    if (parameters.hasOwnProperty(key)) {
        defaultProperties[key] = parameters[key][1];
    }
}

var SfzElement = function (elementLabel) {
    this.elementLabel = elementLabel;
    this.children = [];

    this.properties = Object.create(defaultProperties);
};

SfzElement.prototype.elementLabel = null;
SfzElement.prototype.children = null;
SfzElement.prototype.properties = null;

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
        var parameter = parameters[property];

        if (parameter[0] === 'integer') {
            this.properties[property] = util.clampInteger(value, parameter[2], parameter[3]);
        } else if (parameter[0] === 'float') {
            this.properties[property] = util.clampFloat(value, parameter[2], parameter[3]);
        } else if (parameter[0] === 'key') {
            this.properties[property] = util.clampKey(value, parameter[2], parameter[3]);
        } else {
            this.properties[property] = value;
        }
    } else if (property === 'key') {
        this.setProperty('lokey', value);
        this.setProperty('hikey', value);
        this.setProperty('picth_keycenter', value);
    }
};

SfzElement.prototype.toString = function () {
    var definition = '\r\n\r\n<' + this.elementLabel + '>',
        key, i;

    for (key in this.properties) {
        if (this.properties.hasOwnProperty(key)) {
            definition += '\r\n' + key + '=' + this.properties[key].toString();
        }
    }

    for (i = 0; i < this.children.length; i++) {
        definition += this.children[i].toString();
    }

    return definition;
};

module.exports = SfzElement;
