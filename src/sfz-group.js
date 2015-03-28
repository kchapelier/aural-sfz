"use strict";

var SfzElement = require('./sfz-element');

var SfzGroup = function () {
    SfzElement.call(this, 'group');
};

SfzGroup.prototype = Object.create(SfzElement.prototype);

/**
 * Add a region to the group
 * @param {SfzRegion} region
 * @returns {SfzGroup}
 */
SfzGroup.prototype.addRegion = function (region) {
    this.children.push(region);
    return this;
};

module.exports = SfzGroup;
