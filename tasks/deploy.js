'use strict';

var ghpages = require('gh-pages');
var path = require('path');
var root = path.join(__dirname, '..');

var options = {
    src: [
        path.join(root, 'demo', '**'),
        path.join(root, 'dist', '**')
    ]
};

ghpages.publish(root, {}, function (error) {
    if (error) {
        console.error(error);
        return;
    }

    console.log('Success!');
});
