const winston = require('winston')
const path = require('path')
const colors = require('colors/safe')
const config = require('../../../conf/dawan.config')

// 系统默认所有log文件存储的位置
const defaultLogFileDir = config.logFileDir

const defaultTransportObj = {
    // winston 并不是每个方法都会接收
    timestamp: function () {
        let date = new Date()
        return date.toLocaleDateString().concat(' ', date.toLocaleTimeString())
    },
    // 该方法运行在 filters and rewriters 之后
    formatter: function (options) {
        // 定义在外面 winston 并不会接收该方法
        function prefix() {
            let date = options.timestamp()
            let prefix = date.concat(' [',options.level.toUpperCase(),'] ')
            return setColor(options.level,prefix)
        }
        // console.log('------------')
        // console.dir(options)
        return prefix() + (options.message
            ? options.message
            : '') + (options.meta && Object.keys(options.meta).length
                ? '\n\t' + JSON.stringify(options.meta,null,4)
                : '')
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
            handleExceptions:true,
            humanReadableUnhandledException:true,
            filename: path.resolve(defaultLogFileDir, config.logger.errorFileName)
        }, defaultTransportObj))
    ]
})

/**
 * filters and rewriters
 * filters 可以让你修改message的内容
 * rewriters 可以让你修改meta的内容
 *
 */

/**
 * debug blue
 * info warn error 红绿灯的颜色
 * logger 的颜色设置
 */
defaultLogger.filters.push(function (level, msg, meta) {
    switch (level) {
        case 'debug':
            return colors.blue(msg)
            break
        case 'verbose':
            return colors.blue(msg)
            break
        case 'info':
            return colors.green(msg)
            break
        case 'warn':
            return colors.yellow(msg)
            break
        case 'error':
            // TODO winston 可能会拦截nodejs 系统中的error 的console 输出
            console.dir(msg)
            console.dir(meta)
            return null
            // return msg;
            // return colors.red(msg);
            break
        default:
            return msg
    }
})

function setColor(level,msg){
    switch (level) {
    case 'debug':
        return colors.blue(msg)
    case 'verbose':
        return colors.blue(msg)
    case 'info':
        return colors.green(msg)
    case 'warn':
        return colors.yellow(msg)
    case 'error':
        return colors.red(msg)
    default:
        return msg
    }
}

module.exports = {
    defaultLogger: defaultLogger,
    // 用户自定义logger时使用
    winstonLogger: winston.Logger,
    defaultTransportObj: defaultTransportObj
}
