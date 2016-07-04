'use strict';

var _ = require('lodash'),
    Image = require("./Image"),
    mnist = require('./mnist');

class Captcha {
    constructor(options) {

        _.defaultsDeep(this, options || {}, {
            length: 5,
            size: {
                width: 450,
                height: 200
            }
        });

        this.init();
        this.generate()
    }

    init() {
        this.value = '';
        this.mnist = [];
        for (var i = 0; i < this.length; i++) {
            var image = mnist.getRandom();
            this.value += image.value.toString();
            this.mnist.push(image)
        }
    }

    generate() {
        var border = 20,
            width = border,
            height = 0;

        _.forEach(this.mnist, (image) => {
            width += image.bitmap.width;
            if (image.bitmap.height > height)
                height = image.bitmap.height
        });

        var captcha = new Image(width, (height + border), this.value);
        var x = border / 2;
        _.forEach(this.mnist, (image) => {
            captcha.composite(image, x, border / 2);
            x = x + image.bitmap.width;
        });

        captcha.resize(this.size.width, this.size.height);
        this.captcha = captcha
    }

    toBase64(callback) {
        if (!this.captcha)
            this.generate();
        this.captcha.toBase64(callback)
    }


    save(dirpath, callback) {
        if (!this.captcha)
            this.generate();
        this.captcha.save(dirpath, callback);
    }
}

module.exports = Captcha;







