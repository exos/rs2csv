
var fs = require('fs');
var rs2csv = require('./lib/rs2csv.js');


module.exports.createStream = function (rs, options) {
    return new rs2csv(rs, options);
}

module.exports.parse = function (rs, options, cb) {

    if (typeof options == 'function') {
        cb = options;
        options = {};
    }

    cb = cb || function () {};
    options = options || {};

    var encoding = options.encoding || 'utf-8';

    var ostream = new rs2csv(rs, options);
    var data = "";

    ostream.on('data', function (chunk) {
        data += chunk.toString(encoding);
    });

    ostream.on('error', function (err) {
        cb(err);
    });

    ostream.on('end', function () {
        cb(null, data);
    });

}

module.exports.saveToFile = function (rs, path, options, cb) {
    
    if (typeof options == 'function') {
        cb = options;
        options = {};
    }

    cb = cb || function () {};
    options = options || {};

    var encoding = options.encoding || 'utf-8';
    var fileoptions = options.file || {};

    try {
        var outFile = fs.createWriteStream(path, fileoptions);
    } catch (e) {
        cb(e);
        return;
    }

    var ostream = new rs2csv(rs, options);
    
    outFile.on('error', function (err) {
        cb(err);
    });

    outFile.on('finish', function () {
        cb(null, outFile);
    });

    ostream.pipe(outFile);

}

module.exports.stream = rs2csv;


