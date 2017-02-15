const common = require('../../dawan/common');
const config = require('../../conf/dawan.config');
const logger = require('../../dawan/common/logger/log4js');

global.dawan = {
    config,
    logger,
    common,
};

const mysql = common.db.mysql;
const mysqlConfig = config.db.mysql;
const connection = mysql.connect(mysqlConfig.host,
                                    mysqlConfig.user,
                                    mysqlConfig.password,
                                    mysqlConfig.database);

require('./init')(connection);
