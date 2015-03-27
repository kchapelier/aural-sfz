"use strict";

var SfzRegion = require('./sfz-region'),
    SfzGroup = require('./sfz-group');

var SfzSoundfont = function () {
    this.groups = [];
    this.regions = [];
};

SfzSoundfont.prototype.groups = null;
SfzSoundfont.prototype.regions = null;

/**
 * Add a region to the file based on its groups options and its own
 * @param {Object} groupOptions - Group options of the region
 * @param {Object} regionOptions - Own options of the region
 * @return {SfzRegion} Region instance
 */
/*
SfzSoundfont.prototype.addRegion = function (groupOptions, regionOptions) {
    var region = null;

    //ignore regions without sample as defined by the specifications
    if (groupOptions.sample || regionOptions.sample) {
        region = new SfzRegion();
        region.setProperties(groupOptions);
        region.setProperties(regionOptions);
        this.regions.push(region);
    }

    return region;
};
*/

SfzSoundfont.prototype.addGroup = function (group) {
    this.groups.push(group);
    return this;
};

SfzSoundfont.prototype.addRegion = function (region) {
    this.regions.push(region);
    return this;
};


SfzSoundfont.prototype.toString = function () {
    var definition = '',
        i;

    for(i = 0; i < this.regions.length; i++) {
        definition += '\r\n' + this.regions[i].toString();
    }

    for(i = 0; i < this.groups.length; i++) {
        definition += '\r\n' + this.groups[i].toString();
    }

    return definition;
};

/**
 * Load a Sfz.File instance from a string
 * @param  {string} string - String to parse
 * @return {SfzSoundfont} File instance
 */
SfzSoundfont.parse = function (string) {
    var soundfont = new SfzSoundfont(),
        definitions = string.split(/(<group>|<region>)/i),
        inGroup = false,
        inRegion = false,
        i;

    var currentGroup = null,
        currentRegion = null;

    for (i = 0; i < definitions.length; i++) {
        var definition = definitions[i];

        if (definition === '<group>') {
            inGroup = true;
            inRegion = false;
            continue;
        }

        if (definition === '<region>') {
            inGroup = false;
            inRegion = true;
            continue;
        }

        if (inGroup || inRegion) {
            var lines = definition.split(/[\r\n]/);
            var options = {};
            for (var i2 = 0; i2 < lines.length; i2++) {
                var line = lines[i2];
                line = line.split('//')[0];

                var option = null;
                var regex = /([a-zA-Z-_]*)=([^=]*)(?![a-zA-Z-_]*=)/g;

                while ((option = regex.exec(line)) !== null) {
                    options[option[1].trim()] = option[2].trim();
                }
            }

            if (inGroup) {
                console.log('group', JSON.stringify(options));

                currentGroup = new SfzGroup();
                currentGroup.setProperties(options);
                soundfont.addGroup(currentGroup);
            } else {
                console.log('region', JSON.stringify(options));

                currentRegion = new SfzRegion();
                currentRegion.setProperties(options);

                if (currentGroup) {
                    currentGroup.addRegion(currentRegion);
                } else {
                    soundfont.addRegion(currentRegion);
                }
            }
        }
    }

    return soundfont;
};

module.exports = SfzSoundfont;
