


# node-captcha

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



# results
71807
![71807](https://raw.githubusercontent.com/ltempier/node-captcha/master/example/71807.bmp)

74117
![74117](https://raw.githubusercontent.com/ltempier/node-captcha/master/example/74117.bmp)

78101
![78101](https://raw.githubusercontent.com/ltempier/node-captcha/master/example/78101.bmp)

78913
![78913](https://raw.githubusercontent.com/ltempier/node-captcha/master/example/78913.bmp)

81804
![81804](https://raw.githubusercontent.com/ltempier/node-captcha/master/example/81804.bmp)




