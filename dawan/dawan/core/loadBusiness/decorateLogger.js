const path = require('path');
// 系统默认的logger
const winston = require('winston');
const shelljs = require('shelljs');
const myWinston = require('../../common/logger/winston');
// 系统默认所有log文件存储的位置
const defaultLogFileDir = dawan.config.logFileDir;

const loggerMap = new Map();

/**
 * 对dawan 增强一个方法
 * @param  {[type]} loggerName [description]
 * @return {[type]}            [description]
 */
global.dawan.getLogger = function(loggerName) {
    let logger = loggerMap.get(loggerName);
    if (undefined === logger) {
        logger = generateBusinessLogger(loggerName);
    }
    return logger;
};

/**
 * 这个就是系统默认给business生成的logger
 * 如果应用想要自己实现logger，那么这个部分不属于应用的可配置项
 * logger的显示完全由业务自己处理
 *
 * level的等级，这个东西可以实现成业务可以配置的，但是也可以是在业务中，业务是可以自己修改的
 * 目前先实现成一个默认的
 * @return {[type]} [description]
 */
function generateBusinessLogger(businessName) {

    // 有可能在给business之前 logger已经被创建
    // 在加载业务逻辑的时候，业务代码中调用了dawan.getLogger
    let logger = loggerMap.get(businessName);
    if(!logger) {
        // 先创建出log的文件夹
        // winston保存的时候也没法跨文件夹写文件
        // 这个方法是同步方法，暂时使用这个
        shelljs.mkdir('-p',path.resolve(defaultLogFileDir, 'business', businessName));

        let businessLogger = new(winston.Logger)({
            level: dawan.config.logger.level,
            // colors:colors, 对于内置的这些logger 颜色设置不起作用
            transports: [
                // 系统默认的log 只提供文件log方式
                // new(winston.transports.Console)({}),
                new(winston.transports.File)(Object.assign({
                    name: 'log-file',
                    filename: path.resolve(defaultLogFileDir, 'business', businessName, dawan.config.logger.logFileName)
                }, myWinston.defaultTransportObj)),
                new(winston.transports.File)(Object.assign({
                    name: 'error-file',
                    level: 'error',
                    filename: path.resolve(defaultLogFileDir, 'business', businessName, dawan.config.logger.errorFileName)
                }, myWinston.defaultTransportObj))
            ]
        });
        // 生成的logger 存储到map中
        loggerMap.set(businessName, businessLogger);
        return businessLogger;
    } else {
        return logger;
    }
}

/**
 * 替换业务中的logger对象
 * @param  {[type]} businessIndex [description]
 * @return {[type]}               [description]
 */
function decorateLogger(businessObj, businessName) {
    businessObj.setLogger(generateBusinessLogger(businessName));
    return businessObj;
}

module.exports = decorateLogger;
