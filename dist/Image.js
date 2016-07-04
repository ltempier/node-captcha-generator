'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('lodash'),
    path = require('path'),
    Jimp = require("jimp");

var Image = function (_Jimp) {
    _inherits(Image, _Jimp);

    function Image(w, h, value, index) {
        _classCallCheck(this, Image);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Image).call(this, w, h));

        _this.value = value;
        _this.index = index;
        _this.constructor = Jimp;
        return _this;
    }

    _createClass(Image, [{
        key: 'save',
        value: function save(dirPath, callback) {
            if ("undefined" == typeof callback) callback = function callback() {};

            var filename = [this.value, this.index].filter(function (val) {
                return val;
            }).join('_') + '.bmp';
            _get(Object.getPrototypeOf(Image.prototype), 'write', this).call(this, path.join(dirPath || './tmp/', filename), callback);
        }
    }, {
        key: 'toBase64',
        value: function toBase64(callback) {
            _get(Object.getPrototypeOf(Image.prototype), 'getBuffer', this).call(this, "image/bmp", function (err, buffer) {
                if (err) callback(err);else callback(null, "data:image/png;base64," + buffer.toString('base64'));
            });
        }
    }, {
        key: 'getRandomOptions',
        value: function getRandomOptions() {

            var options = {
                height: _.random.apply(null, [80, 200]),
                rotate: _.random.apply(null, [-10, 10])
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

            return options;
        }
    }, {
        key: 'randomize',
        value: function randomize(options) {
            options = options || this.getRandomOptions();
            this.resize(Jimp.AUTO, options.height);
            this.rotate(options.rotate);
            this.autocrop();
        }
    }]);

    return Image;
}(Jimp);

module.exports = Image;