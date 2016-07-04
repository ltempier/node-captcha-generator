'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash'),
    Image = require("./Image"),
    mnist = require('./mnist');

var Captcha = function () {
    function Captcha(options) {
        _classCallCheck(this, Captcha);

        _.defaultsDeep(this, options || {}, {
            length: 5,
            size: {
                width: 450,
                height: 200
            }
        });

        this.init();
        this.generate();
    }

    _createClass(Captcha, [{
        key: 'init',
        value: function init() {
            this.value = '';
            this.mnist = [];
            for (var i = 0; i < this.length; i++) {
                var image = mnist.getRandom();
                this.value += image.value.toString();
                this.mnist.push(image);
            }
        }
    }, {
        key: 'generate',
        value: function generate() {
            var border = 20,
                width = border,
                height = 0;

            _.forEach(this.mnist, function (image) {
                width += image.bitmap.width;
                if (image.bitmap.height > height) height = image.bitmap.height;
            });

            var captcha = new Image(width, height + border, this.value);
            var x = border / 2;
            _.forEach(this.mnist, function (image) {
                captcha.composite(image, x, border / 2);
                x = x + image.bitmap.width;
            });

            captcha.resize(this.size.width, this.size.height);
            this.captcha = captcha;
        }
    }, {
        key: 'toBase64',
        value: function toBase64(callback) {
            if (!this.captcha) this.generate();
            this.captcha.toBase64(callback);
        }
    }, {
        key: 'save',
        value: function save(dirpath, callback) {
            if (!this.captcha) this.generate();
            this.captcha.save(dirpath, callback);
        }
    }]);

    return Captcha;
}();

module.exports = Captcha;