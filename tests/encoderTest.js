var SfzSoundfont = require('./../'),
    should = require('chai').should(),
    fs = require('fs');

describe('Encoding a SFZ soundfont string', function () {
    it('should always return a string', function () {
        var data = fs.readFileSync('./tests/resources/with-groups.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.toString().should.be.a('string');

        soundfont = new SfzSoundfont();

        soundfont.toString().should.be.a('string');
    });

    it('should return a string matching its input', function () {
        var data = fs.readFileSync('./tests/resources/with-groups.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data),
            reencodedSoundfont = SfzSoundfont.parse(soundfont.toString());

        reencodedSoundfont.should.deep.equal(soundfont);
    })
});
