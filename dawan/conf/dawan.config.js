var path = require('path');
var directoryConfig =  require('./dawan.directory.config');

const config = {

    hostname: '127.0.0.1',
    debug: true,
    port: 5000,
    session_secret: 'lafdjslx-sdfjxsfsd-xs',
    permission: false, //是否启用权限验证
    logFileDir:path.resolve(__dirname,'../logs'),
    logger: {
        logFileName: 'log.log',
        errorFileName: 'error.log',
        level: 'debug'
    },
    // 是否需要前端资源渲染的中间件
    renderFile:true,
    requestTrace:true,// 请求跟踪

};

config.directoryConfig=directoryConfig;

module.exports = config;
