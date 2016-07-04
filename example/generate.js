'use strict';

var Captcha = require('../');

console.time('process');

for (var i = 0; i < 2; i++) {
    var c = new Captcha({
        length:7,
        size:{
            height: 100,
            width : 250
        }
    });
    c.save(__dirname);
}

console.timeEnd('process');
