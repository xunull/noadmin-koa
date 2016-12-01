var util = require('util'),
    winston = require('winston');

var TraceLogger = winston.transports.TraceLogger = function (options) {
    // 
    // Name this logger 
    // 
    this.name = 'traceLogger';

    // 
    // Set the level from your options 
    // 
    this.level = 'info';

    // 
    // Configure your storage backing as you see fit 
    // 
};

// 
// Inherit from `winston.Transport` so you can take advantage 
// of the base functionality and `.handleExceptions()`. 
// 
util.inherits(TraceLogger, winston.Transport);

TraceLogger.prototype.log = function (level, msg, meta, callback) {
    // 
    // Store this message and metadata, maybe use some custom logic 
    // then callback indicating success. 
    // 
    console.log('-------------------');
    console.log(msg);
    console.log('----------------------');
    callback(null, true);
};