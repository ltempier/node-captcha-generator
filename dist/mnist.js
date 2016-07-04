'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    Image = require("./Image");

var Mnist = function () {
    function Mnist() {
        _classCallCheck(this, Mnist);

        this.length = 60000;
        this.rows = 28;
        this.columns = 28;

        this.imagesPath = path.join(__dirname, "../files/train-images.idx3-ubyte");
        this.labelsPath = path.join(__dirname, "../files/train-labels.idx1-ubyte");

        this.dataFileBuffer = fs.readFileSync(this.imagesPath);
        this.labelFileBuffer = fs.readFileSync(this.labelsPath);
    }

    _createClass(Mnist, [{
        key: 'get',
        value: function get(index) {
            var image = new Image(this.rows, this.columns, this.labelFileBuffer[index + 8], index);
            for (var x = 0; x < this.columns; x++) {
                for (var y = 0; y < this.rows; y++) {
                    var pixel = this.dataFileBuffer[index * this.rows * this.columns + (x + y * this.columns) + 16];
                    if (pixel > 0) image.setPixelColor(Image.rgbaToInt(pixel, pixel, pixel, 1), x, y);
                }
            }
            image.randomize();
            return image;
        }
    }, {
        key: 'getRandom',
        value: function getRandom() {
            var image = this.get(_.random(this.length));
            return image;
        }
    }]);

    return Mnist;
}();

var mnist = new Mnist();

module.exports = mnist;