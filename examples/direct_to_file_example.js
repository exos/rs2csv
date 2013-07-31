
var fs = require('fs');
var rs2csv = require('..');

fs.readFile('./data/example_recordset.json', function (err, content) {

    if (err)
        throw err;

    var rs = JSON.parse(content);

    rs2csv.saveToFile(rs, 'output_example.csv', function (err, content) {
        if (err)
            throw err;

        console.log("File saved!");

    });

});
