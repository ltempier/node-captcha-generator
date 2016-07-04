'use strict';

var Captcha = require('../');

console.time('process');

for (var i = 0; i < 5; i++) {
    var c = new Captcha({
        length:5
    });
    c.save(__dirname);
}

console.timeEnd('process');
