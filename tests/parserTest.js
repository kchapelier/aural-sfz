var SfzSoundfont = require('./../'),
    should = require('chai').should(),
    fs = require('fs');

/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

describe('Parsing the SFZ soundfont format', function () {
    it('should retrieve the region properties', function () {
        var data = fs.readFileSync('./tests/resources/simple.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.compiledRegions.length.should.equal(2);

        soundfont.compiledRegions[0].properties.sample.should.equal('SOUND_1.wav');
        //soundfont.compiledRegions[0].properties.pitch_keycenter.should.equal(74);
        soundfont.compiledRegions[0].properties.lokey.should.equal(72);
        soundfont.compiledRegions[0].properties.hikey.should.equal(76);
        soundfont.compiledRegions[0].properties.lovel.should.equal(0);
        soundfont.compiledRegions[0].properties.hivel.should.equal(127);
        soundfont.compiledRegions[0].properties.pitch_random.should.equal(20);

        soundfont.compiledRegions[1].properties.sample.should.equal('SOUND_2.wav');
        //soundfont.compiledRegions[1].properties.pitch_keycenter.should.equal(72);
        soundfont.compiledRegions[1].properties.lokey.should.equal(78);
        soundfont.compiledRegions[1].properties.hikey.should.equal(81);
        soundfont.compiledRegions[1].properties.lovel.should.equal(0);
        soundfont.compiledRegions[1].properties.hivel.should.equal(127);
        soundfont.compiledRegions[1].properties.pitch_random.should.equal(0);
    });

    it('should be able to parse regions in groups', function () {
        var data = fs.readFileSync('./tests/resources/with-groups.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.compiledRegions.length.should.equal(5);

        soundfont.compiledRegions[0].properties.pitch_keycenter.should.equal(60);
        soundfont.compiledRegions[1].properties.pitch_keycenter.should.equal(50);
        soundfont.compiledRegions[2].properties.pitch_keycenter.should.equal(50);
        soundfont.compiledRegions[3].properties.pitch_keycenter.should.equal(51);
        soundfont.compiledRegions[4].properties.pitch_keycenter.should.equal(52);
    });


    it('should ignore region without sample', function () {
        var data = fs.readFileSync('./tests/resources/with-a-region-without-sample.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.compiledRegions.length.should.equal(2);

        //soundfont.compiledRegions[0].properties.pitch_keycenter.should.equal(49);
        //soundfont.compiledRegions[1].properties.pitch_keycenter.should.equal(51);
    });

    it('should be able to parse sample name with spaces', function () {
        var data = fs.readFileSync('./tests/resources/sample-with-spaces.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.compiledRegions.length.should.equal(2);

        soundfont.compiledRegions[0].properties.sample.should.equal('/files/My new sample1.wav');
        soundfont.compiledRegions[1].properties.sample.should.equal('/files/My new sample2.wav');
    });

    it('should be able to parse a faulty string', function () {
        var data = fs.readFileSync('./tests/resources/faulty.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.compiledRegions.length.should.equal(1);
        soundfont.compiledRegions[0].properties.sample.should.equal('thing a magick');
    });
});
