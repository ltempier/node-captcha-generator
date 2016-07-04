


## node-captcha

node-captcha is a captcha generator write in pure js, thanks to [oliver-moran](https://github.com/oliver-moran/jimp).

node-captcha generate only numeric captcha, it use [MNIST database](http://yann.lecun.com/exdb/mnist/) to generate random number combination.

Example usage:

```js

    let Captcha = require('node-captcha');

    var c = new Captcha({
        length:5, // number length
        size:{    // output size
            width: 450,
            height: 200
        }
    });

    c.save('dirPath/to/save', function(err){

    });

    // get base64 image as string
    c.toBase64(function(err, base64){

    });

    // string value of captcha
    c.value;

    // jimp object  more info https://github.com/oliver-moran/jimp
    c.captcha;

    c.captcha.write('filePath/to/save', function(err){
    });

```



## results

39314 ![39314](https://raw.githubusercontent.com/ltempier/node-captcha/master/example/39314.bmp)

47612 ![47612](https://raw.githubusercontent.com/ltempier/node-captcha/master/example/47612.bmp)

3406072 ![3406072](https://raw.githubusercontent.com/ltempier/node-captcha/master/example/3406072.bmp)

4803633 ![4803633](https://raw.githubusercontent.com/ltempier/node-captcha/master/example/4803633.bmp)



## todo
- add colors options
- add more randomize options
- switch to alphanumeric captcha

