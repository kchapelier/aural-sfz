var SfzSoundfont = require('./../').Soundfont,
    should = require('chai').should(),
    fs = require('fs');

describe('Matching an input to a region', function() {
    it('should return null when there are no match', function() {
        var soundfond = new SfzSoundfont();

        should.equal(soundfond.matchInput(), null);
    });

    it('should match an input with a key in the lokey and hikey bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/key-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.matchInput(0, 72, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 74, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 76, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
    });

    it('should not match an input with a key out of the lokey and hikey bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/key-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        should.equal(soundfont.matchInput(0, 71, 0, 127, 130, 0), null);
        should.equal(soundfont.matchInput(0, 77, 0, 127, 130, 0), null);
    });

    it('should match an input with a velocity in the lovel and hivel bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/velocity-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.matchInput(0, 72, 0, 50, 130, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 72, 0, 75, 130, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 72, 0, 100, 130, 0).properties.sample.should.equal('SOUND_1.wav');
    });

    it('should not match an input with a velocity out of the lovel and hivel bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/velocity-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        should.equal(soundfont.matchInput(0, 72, 0, 49, 130, 0), null);
        should.equal(soundfont.matchInput(0, 72, 0, 101, 130, 0), null);
    });

    it('should match an input with a channel in the lochan and hichan bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/channel-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.matchInput(2, 72, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(3, 72, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(4, 72, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
    });

    it('should not match an input with a channel out of the lochan and hichan bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/channel-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        should.equal(soundfont.matchInput(1, 72, 0, 127, 130, 0), null);
        should.equal(soundfont.matchInput(5, 72, 0, 127, 130, 0), null);
    });

    it('should match an input with a bpm in the lobpm and hibpm bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/bpm-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.matchInput(0, 72, 0, 127, 50, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 72, 0, 127, 75, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 72, 0, 127, 100, 0).properties.sample.should.equal('SOUND_1.wav');
    });

    it('should not match an input with a bpm out of the lobpm and hibpm bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/bpm-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        should.equal(soundfont.matchInput(0, 72, 0, 127, 49, 0), null);
        should.equal(soundfont.matchInput(0, 72, 0, 127, 101, 0), null);
    });

    it('should match an input with a random value in the lorand and hirand bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/random-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.matchInput(0, 72, 0, 127, 130, 0.2).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 72, 0, 127, 130, 0.5).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 72, 0, 127, 130, 0.8).properties.sample.should.equal('SOUND_1.wav');
    });

    it('should not match an input with a random value out of the lorand and hirand bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/random-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        should.equal(soundfont.matchInput(0, 72, 0, 127, 130, 0.19), null);
        should.equal(soundfont.matchInput(0, 72, 0, 127, 130, 0.81), null);
    });

    it('should match an input with a bend in the lobend and hibend bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/bend-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.matchInput(0, 72, -100, 127, 100, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 72, 0, 127, 100, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 72, 100, 127, 100, 0).properties.sample.should.equal('SOUND_1.wav');
    });

    it('should not match an input with a bend out of the lobend and hibend bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/bend-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        should.equal(soundfont.matchInput(0, 72, -101, 127, 100, 0), null);
        should.equal(soundfont.matchInput(0, 72, 101, 127, 100, 0), null);
    });

    /*
    it('should match an input with a poly aftertouch in the lopolyaft and hipolyaft bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/poly-aftertouch-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        soundfont.matchInput(0, 72, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 72, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
        soundfont.matchInput(0, 72, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
    });

    it('should not match an input with a poly aftertouch out of the lopolyaft and hipolyaft bound', function () {
        var data = fs.readFileSync('./tests/resources/matchingTest/poly-aftertouch-test.sfz', 'utf-8'),
            soundfont = SfzSoundfont.parse(data);

        should.equal(soundfont.matchInput(0, 72, 0, 127, 130, 0), null);
        should.equal(soundfont.matchInput(0, 72, 0, 127, 130, 0), null);
    });
    */

    /*
     it('should match an input with a channel aftertouch in the lochanaft and hichanaft bound', function () {
         var data = fs.readFileSync('./tests/resources/matchingTest/channel-aftertouch-test.sfz', 'utf-8'),
                    soundfont = SfzSoundfont.parse(data);

         soundfont.matchInput(0, 72, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
         soundfont.matchInput(0, 72, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
         soundfont.matchInput(0, 72, 0, 127, 130, 0).properties.sample.should.equal('SOUND_1.wav');
     });

     it('should not match an input with a channel aftertouch out of the lochanaft and hichanaft bound', function () {
         var data = fs.readFileSync('./tests/resources/matchingTest/channel-aftertouch-test.sfz', 'utf-8'),
                    soundfont = SfzSoundfont.parse(data);

         should.equal(soundfont.matchInput(0, 72, 0, 127, 130, 0), null);
         should.equal(soundfont.matchInput(0, 72, 0, 127, 130, 0), null);
     });
     */
});
