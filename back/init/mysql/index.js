var common = require('../../dawan/common')
var config = require('../../conf/dawan.config')
var logger = require('../../dawan/common/logger/log4js')

global.dawan = {
    config: config,
    logger: logger,
    common: common
}

var mysql = common.db.mysql
let mysqlConfig = config.db.mysql
let connection = mysql.connect(mysqlConfig.host,mysqlConfig.user,mysqlConfig.password,mysqlConfig.database)

require('./init')(connection)