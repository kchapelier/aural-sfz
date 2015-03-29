var SfzSoundfont = require('./../'),
    should = require('chai').should(),
    fs = require('fs');

describe('Matching an input to a region', function() {
    it('should return null when there are no match', function() {
        var soundfond = new SfzSoundfont();

        should.equal(soundfond.matchInput(), null);
    });

    it('should match an input with a key in the lokey and hikey bound', function () {
        var data = fs.readFileSync('./tests/resources/simple.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.matchInput(0, 72, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 74, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 76, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
    });

    it('should not match an input with a key out of the lokey and hikey bound', function () {
        var data = fs.readFileSync('./tests/resources/simple.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        should.equal(soundfont.matchInput(0, 71, 0, 127, 130, 0), null);
        should.equal(soundfont.matchInput(0, 77, 0, 127, 130, 0), null);
    })
});
