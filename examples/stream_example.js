
var fs = require('fs');
var rs2csv = require('..').stream;

fs.readFile('./data/example_recordset.json', function (err, content) {

    if (err)
        throw err;

    var rs = JSON.parse(content);

    var CSVStram = new rs2csv(rs, { includeColNames: true });
    var CSVFile = fs.createWriteStream('example_output.csv');

    CSVStram.pipe(CSVFile);

    CSVStram.on('end', function () {
        console.log("Finished! \n You can try it with LibreOffice, type: localc example_output.csv");
    });

});
