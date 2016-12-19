var traceTransport = require('./traceTransport');
var winston = require('winston');
const traceLoggerMap = new Map();

exports.getTraceLogger = getTraceLogger;

function getTraceLogger(loggerName) {
    let logger = traceLoggerMap.get(loggerName);
    if (undefined === logger) {
        logger = generateTraceLogger(loggerName);
    }
    return logger
}

function generateTraceLogger(loggerName) {

    let logger = traceLoggerMap.get(loggerName);

    if(!logger) {

        let businessLogger = new(winston.Logger)({
            level: dawan.config.logger.level,
            transports: [
                new(winston.transports.TraceLogger)()
            ]
        });
        // 生成的logger 存储到map中
        traceLoggerMap.set(loggerName, businessLogger);
        return businessLogger;
    } else {
        return logger;
    }
}
