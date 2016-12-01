var winston = require('winston');
var path = require('path');
var colors = require('colors/safe');
var config = require('../../../conf/dawan.config');

// 系统默认所有log文件存储的位置
const defaultLogFileDir = config.logFileDir;

const defaultTransportObj = {
    timestamp: function () {
        let date = new Date();
        return date.toLocaleDateString().concat(' ', date.toLocaleTimeString());
    },
    formatter: function (options) {
        // Return string will be passed to logger.
        return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (options.message
            ? options.message
            : '') + (options.meta && Object.keys(options.meta).length
                ? '\n\t' + JSON.stringify(options.meta)
                : '');
    }
}

/**
 * 默认实现的logger
 * @type {[type]}
 */
var defaultLogger = new (winston.Logger)({
    level: config.logger.level,
    // colors:colors, 对于内置的这些logger 颜色设置不起作用
    transports: [
        new (winston.transports.Console)(Object.assign({
            // 这个属性不起作用
            colorize: 'all'
        }, defaultTransportObj)),
        // 这里的name 是这个transport的命名
        new (winston.transports.File)(Object.assign({
            name: 'log-file',
            filename: path.resolve(defaultLogFileDir, config.logger.logFileName)
        }, defaultTransportObj)),
        new (winston.transports.File)(Object.assign({
            name: 'error-file',
            level: 'error',
            filename: path.resolve(defaultLogFileDir, config.logger.errorFileName)
        }, defaultTransportObj))
    ]
});

/**
 * debug blue
 * info warn error 红绿灯的颜色
 * logger 的颜色设置
 */
// defaultLogger.filters.push(function (level, msg, meta) {
//     switch (level) {
//         case 'debug':
//             return colors.blue(msg);
//             break;
//         case 'verbose':
//             return colors.blue(msg);
//             break;
//         case 'info':
//             return colors.green(msg);
//             break;
//         case 'warn':
//             return colors.yellow(msg);
//             break;
//         case 'error':
//             // TODO winston 可能会拦截nodejs 系统中的error 的console 输出
//             console.error(msg);
//             return msg;
//             // return colors.red(msg);
//             break;
//         default:
//             return msg;
//     }
// });

module.exports = {
    defaultLogger: defaultLogger,
    // 用户自定义logger时使用
    winstonLogger: winston.Logger,
    defaultTransportObj: defaultTransportObj
};
