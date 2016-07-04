'use strict';

var _ = require('lodash'),
    path = require('path'),
    Jimp = require("jimp");

class Image extends Jimp {
    constructor(w, h, value, index) {
        super(w, h);

        this.value = value;
        this.index = index;

        this.constructor = Jimp;
    }

    save(dirPath) {
        var filename = [this.value, this.index].filter(function (val) {
                return val
            }).join('_') + '.bmp';
        super.write(path.join(dirPath || './tmp/', filename));
    }

    toBase64(callback) {
        super.getBuffer("image/bmp", function (err, buffer) {
            if (err)
                callback(err);
            else
                callback(null, "data:image/png;base64," + buffer.toString('base64'))
        })
    }

    setOptions(options) {

    }

    getRandomOptions() {

        var color1 = 1,
            color2 = _.random(0.0, color1),
            color3 = _.random(0.0, color2);

        var options = {
            height: _.random.apply(null, [80, 200]),
            rotate: _.random.apply(null, [-10, 10]),
            color: _.shuffle([color1, color2, color3])
        };

        switch (this.value) {
            case 0:
                options.rotate = _.random.apply(null, [0, 360]);
            case 1:
            case 7:
                options.rotate = _.random.apply(null, [-1, 1]);
            case 2:
                options.rotate = _.random.apply(null, [-5, 5]);
            case 3:
            case 5:
                options.rotate = _.random.apply(null, [-20, 20]);
        }

        return options
    }

    randomize(options) {
        options = options || this.getRandomOptions();

        this.resize(Jimp.AUTO, options.height);
        this.rotate(options.rotate);
        this.autocrop();
    }

    colorize(options) {
        options = options || this.getRandomOptions();
        this.scan(0, 0, this.bitmap.width, this.bitmap.height, function (x, y, idx) {
            if (this.bitmap.data[idx + 3]) {
                this.bitmap.data[idx + 0] *= options.color[0];
                this.bitmap.data[idx + 1] *= options.color[1];
                this.bitmap.data[idx + 2] *= options.color[2]
            }
        });
    }
}

module.exports = Image;