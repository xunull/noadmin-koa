

var log4js = require('log4js')
log4js.configure({
  appenders: [{
    type: 'console'
  }]
  // 不替换node 自己的console
  // replaceConsole: true
})

var logger = log4js.getLogger('noadmin')

/**
 * 此方法调试的时候使用
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
logger.focus=function(obj) {
    logger.info('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+')
    logger.info(obj)
    logger.info('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+')
}

module.exports = logger
