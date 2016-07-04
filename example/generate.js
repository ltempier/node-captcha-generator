'use strict';

var Captcha = require('../');

console.time('process');

for (var i = 0; i < 1; i++) {
    var c = new Captcha({
        length:6
    });
    c.save(__dirname);
}

console.timeEnd('process');
