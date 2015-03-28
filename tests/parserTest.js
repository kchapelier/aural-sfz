var SfzSoundfont = require('./../'),
    should = require('chai').should(),
    fs = require('fs');

describe('Parsing the SFZ soundfont format', function () {
    /*
    it('should retrieve the region properties', function () {
        var data = fs.readFileSync('./tests/resources/simple.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.regions.length.should.equal(2);

        soundfont.regions[0].sample.should.equal('SOUND_1.wav');
        //soundfont.regions[0].pitchKeyCenter.should.equal(74);
        //soundfont.regions[0].loKey.should.equal(72);
        //soundfont.regions[0].hiKey.should.equal(76);
        soundfont.regions[0].loVelocity.should.equal(0);
        soundfont.regions[0].hiVelocity.should.equal(127);

        soundfont.regions[1].sample.should.equal('SOUND_2.wav');
        //soundfont.regions[1].pitchKeyCenter.should.equal(72);
        //soundfont.regions[1].loKey.should.equal(77);
        //soundfont.regions[1].hiKey.should.equal(81);
        soundfont.regions[1].loVelocity.should.equal(0);
        soundfont.regions[1].hiVelocity.should.equal(127);
    });
    */

    it('should be able to parse regions in groups', function () {
        var data = fs.readFileSync('./tests/resources/with-groups.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.regions.length.should.equal(5);

        //soundfont.regions[0].pitchKeyCenter.should.equal(60);
        //soundfont.regions[1].pitchKeyCenter.should.equal(50);
        //soundfont.regions[2].pitchKeyCenter.should.equal(50);
        //soundfont.regions[3].pitchKeyCenter.should.equal(51);
        //soundfont.regions[4].pitchKeyCenter.should.equal(52);
    });

    /*

    it('should ignore region without sample', function () {
        var data = fs.readFileSync('./tests/resources/with-a-region-without-sample.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.regions.length.should.equal(2);

        //soundfont.regions[0].pitchKeyCenter.should.equal(49);
        //soundfont.regions[1].pitchKeyCenter.should.equal(51);
    });

    it('should be able to parse sample name with spaces', function () {
        var data = fs.readFileSync('./tests/resources/sample-with-spaces.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.regions.length.should.equal(2);

        soundfont.regions[0].sample.should.equal('/files/My new sample1.wav');
        soundfont.regions[1].sample.should.equal('/files/My new sample2.wav');
    });

    it('should be able to parse a faulty string', function () {
        var data = fs.readFileSync('./tests/resources/faulty.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.regions.length.should.equal(1);
        soundfont.regions[0].sample.should.equal('thing a magick');
    });
    */
});
