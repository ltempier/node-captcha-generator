'use strict';

var fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    Image = require("./Image");

class Mnist {
    constructor() {
        this.length = 60000;
        this.rows = 28;
        this.columns = 28;

        this.imagesPath = path.join(__dirname, "../files/train-images.idx3-ubyte");
        this.labelsPath = path.join(__dirname,"../files/train-labels.idx1-ubyte");

        this.dataFileBuffer = fs.readFileSync(this.imagesPath);
        this.labelFileBuffer = fs.readFileSync(this.labelsPath);
    }

    get(index) {
        var image = new Image(this.rows, this.columns, this.labelFileBuffer[index + 8], index);
        for (var x = 0; x < this.columns; x++) {
            for (var y = 0; y < this.rows; y++) {
                var pixel = this.dataFileBuffer[(index * this.rows * this.columns) + (x + (y * this.columns)) + 16];
                if (pixel > 0)
                    image.setPixelColor(Image.rgbaToInt(pixel, pixel, pixel, 1), x, y);
            }
        }
        image.randomize();
        return image
    }

    getRandom() {
        var image = this.get(_.random(this.length));
        return image
    }
}

var mnist = new Mnist();

module.exports = mnist;
