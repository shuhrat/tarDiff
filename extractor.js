var fs = require('fs');
var path = require('path');

var vow = require('vow');
var tar = require('tar-stream');

module.exports = function(tarFilePath) {
    var deferred = vow.defer();
    var tarballExtract = tar.extract();
    var tarballContents = {};

    tarballExtract.on('entry', function(header, stream, callback) {
        var filepath = header.name
            .split(path.sep)
            .slice(1)
            .join(path.sep);

        tarballContents[filepath] = header.size;

        stream.on('end', function() {
            callback();
        });

        stream.resume();
    });

    tarballExtract.on('finish', function() {
        deferred.resolve(tarballContents);
    });

    fs.createReadStream(tarFilePath).pipe(tarballExtract);

    return deferred.promise();
};
