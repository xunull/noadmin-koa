// winston的实现比log4js更全面
var winstonLogger = require('./winston');

// var log4jsLogger = require('./log4js');

var defaultLogger = winstonLogger.defaultLogger;

var loggerManage = require('./loggerManage');

/**
 * 增加一个方法
 * 一般在调试的时候使用
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
defaultLogger.focus=function(obj) {
    defaultLogger.info('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+');
    defaultLogger.info(obj);
    defaultLogger.info('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+');
}

module.exports = {
    defaultLogger:defaultLogger,
    winstonLogger: winstonLogger.winstonLogger,
    getTraceLogger:loggerManage.getTraceLogger
}
