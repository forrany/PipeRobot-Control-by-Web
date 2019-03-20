var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        request(uri).pipe(fs.createWriteStream(__dirname +'/public/SnapShoot/' + filename)).on('close', callback);
    });
};


module.exports = download
