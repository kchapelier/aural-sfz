"use strict";

var SfzRegion = require('./sfz-region'),
    SfzGroup = require('./sfz-group');

var SfzSoundfont = function () {
    this.groups = [];
    this.regions = [];
};

SfzSoundfont.prototype.groups = null;
SfzSoundfont.prototype.regions = null;

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

    for (i = 0; i < this.regions.length; i++) {
        definition += '\r\n' + this.regions[i].toString();
    }

    for (i = 0; i < this.groups.length; i++) {
        definition += '\r\n' + this.groups[i].toString();
    }

    return definition;
};

var regexOption = /([a-zA-Z-_]*)=([^=]*)(?![a-zA-Z-_]*=)/g;

var parseDefinition = function parseDefinition (definition) {
    var lines = definition.split(/[\r\n]/),
        options = {},
        i,
        line,
        option;

    for (i = 0; i < lines.length; i++) {
        option = null;
        line = lines[i].split('//')[0];

        while ((option = regexOption.exec(line)) !== null) {
            options[option[1]] = option[2].trim();
        }
    }

    return options;
};

/**
 * Load a SfzSoundfont instance from a string
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
        } else if (definition === '<region>') {
            inGroup = false;
            inRegion = true;
            continue;
        }

        if (inGroup || inRegion) {
            var options = parseDefinition(definition);

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
