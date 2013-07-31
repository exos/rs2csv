rs2csv
======

Generate a CSV (Comma-separated values) output format from a RecordSet, for data exports and more, because your boss loves exel.

Install
=======

## Install by NPM

```
$ npm install rs2csv
```

## Install by git

```
$ git clone https://github.com/exos/rs2csv.git
$ cd rs2csv
$ npm install -d
```

Use
===

```
var rs2csv = require('rs2csv');

// And rest

db.query("SELECT * FROM Products", function (err, results) {

    // ...

    rs2csv.parse(results, function (err, csvContent) {
        // You happy
    });

});

```

## Save direct to a file!

```
var rs2csv = require('rs2csv');

// And rest

db.query("SELECT * FROM Products", function (err, results) {

    // ...

    rs2csv.saveToFile(results, 'products.csv', function (err, csvContent) {
        // You happy
    });

});

```

## Using with express (and others...)

```
var rs2csv = require('rs2csv');

// And rest


app.get('/report', function (req, res) {

    // ...

    db.query("SELECT * FROM Products", function (err, results) {
        var csvStream = rs2csv.createStream(results);
        csvStream.pipe(res);
    });

});

```

Documentation
=============

https://github.com/exos/rs2csv/wiki/Documentation

License
=======

GPL2
