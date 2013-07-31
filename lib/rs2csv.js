
var stream = require('stream');
var util = require('util');
var _ = require('underscore');

var defaultOptions = {
    separatedBy: ', ',
    terminatedBy: "\n",
    includeColNames: false,
    encoding: 'utf-8' 
};

var Rs2Csv = function () {
    this.init.apply(this,arguments);
}

util.inherits(Rs2Csv, stream.Readable);

Rs2Csv.prototype.init = function (RecordSet, options) {
    
    var options = options || {};
    
    stream.Readable.call(this);
    
    this._options = _.extend({}, defaultOptions);
    this._options = _.extend(this._options, options);
    
    this._recordSet = RecordSet;
    this._rsindex = 0;
    
    this._buff = "";
    
}

Rs2Csv.escapeValue = function (v) {

    if (typeof v !== 'string') {

        if (typeof v == 'null') {
            v = '';
        } else {

            try {
                v = v.toString();
            } catch (e) {
                v = "";
            }
        }

    }

    v = JSON.stringify(v);

    return v;

}

Rs2Csv.prototype._addline = function () {
    
    var separator = this._options.separatedBy;
    var terminator = this._options.terminatedBy;
    
    if (!this._recordSet.length) {
        return false;
    }

    var data = this._recordSet[this._rsindex];

    if (this._rsindex === 0 && this._options.includeColNames) {
        var keys = _.map(_.keys(data), Rs2Csv.escapeValue);
        var buff = new Buffer(keys.join(separator) + terminator);
        this._buff = buff.toString(this._options.encoding);
        buff = null;
    }


    var vals = _.map(_.values(data), Rs2Csv.escapeValue);

    this._rsindex += 1;

    var buff = new Buffer(vals.join(separator) + terminator);
    this._buff += buff.toString(this._options.encoding);
    
    if (this._rsindex < this._recordSet.length) {    
        return true;
    } else {
        return false;
    }
        
}

Rs2Csv.prototype._read = function (bytecounts) {
    
    var bytecounts = bytecounts || null;
        
    if (bytecounts === null) {
        this._addline();
        var chunk = new Buffer(this._buff, this._options.encoding);
        this._buff = "";
    } else {
        
        var chunk = new Buffer(bytecounts, this._options.encoding);
        
        while (this._buff.length < bytecounts) {
            if (!this._addline()) {
                break;
            }
        }
        
        if (this._buff.length < bytecounts) {
            this.push(new Buffer(this._buff,this._options.encoding));
            this.push(null);
            return;
            
        } else {
            chunk.write(this._buff, 0, bytecounts);
            this._buff = this._buff.substr(bytecounts);
        }
        
    }
    
    this.push(chunk);
    
}


module.exports = Rs2Csv;
