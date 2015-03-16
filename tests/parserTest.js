var SfzSoundfont = require('./../'),
    should = require('chai').should(),
    fs = require('fs');

describe('Parsing the SFZ soundfont format', function () {
    it('should retrieve the region properties', function () {
        var data = fs.readFileSync('./tests/resources/simple.sfz', 'utf-8'),
            soundfont = SfzSoundfont.loadFromString(data);

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

    /*

    test('parse groups', function() {
        var sfz = '\r\n//some file\r\n' +
            '<region>sample=SOUND_1.wav\r\n' +
            '<group>pitch_keycenter=50\r\n' +
            '<region>sample=SOUND_2.wav\r\n' +
            '<region>sample=SOUND_2.wav\r\n' +
            '<group>pitch_keycenter=51\r\n' +
            '<region>sample=SOUND_2.wav\r\n' +
            '<region>sample=SOUND_2.wav pitch_keycenter=52';

        var sfzFile = Aural.Utils.Sfz.File.loadFromString(sfz);

        equal(sfzFile.regions.length, 5, 'there should be 5 regions loaded');

        equal(sfzFile.regions[0].pitchKeyCenter, 60);
        equal(sfzFile.regions[1].pitchKeyCenter, 50);
        equal(sfzFile.regions[2].pitchKeyCenter, 50);
        equal(sfzFile.regions[3].pitchKeyCenter, 51);
        equal(sfzFile.regions[4].pitchKeyCenter, 52);
    });

    test('parse ignore region without sample', function() {
        var sfz = '\r\n//some file\r\n' +
            '<region>sample=SOUND_1.WAV pitch_keycenter=49\r\n' +
            '<region>pitch_keycenter=50\r\n' +
            '<group>sample=SOUND_1.WAV\r\n' +
            '<region>pitch_keycenter=51\r\n';

        var sfzFile = Aural.Utils.Sfz.File.loadFromString(sfz);

        equal(sfzFile.regions.length, 2, 'there should be 2 regions loaded');

        equal(sfzFile.regions[0].pitchKeyCenter, 49);
        equal(sfzFile.regions[1].pitchKeyCenter, 51);
    });

    */

    it('should be able to parse sample name with spaces', function() {
        var data = fs.readFileSync('./tests/resources/sample-with-spaces.sfz', 'utf-8'),
            soundfont = SfzSoundfont.loadFromString(data);

        soundfont.regions.length.should.equal(2);

        soundfont.regions[0].sample.should.equal('/files/My new sample1.wav');
        soundfont.regions[1].sample.should.equal('/files/My new sample2.wav');
    });

    it('should be able to parse a faulty string', function () {
        var data = fs.readFileSync('./tests/resources/faulty.sfz', 'utf-8'),
            soundfont = SfzSoundfont.loadFromString(data);

        soundfont.regions.length.should.equal(1);
        soundfont.regions[0].sample.should.equal('thing a magick');
    });
});
