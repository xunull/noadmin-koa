const co = require('co');

const logger = global.dawan.logger;

const userTable = 'drop table users';
const roleTable = 'drop table roles';
const userRoleTable = 'drop table user_role';
const menuTable = 'drop table menus';
const roleMenuTable = 'drop table role_menu';

module.exports = function (connection) {
    co(function* () {
        yield connection.execute(userTable);
        logger.info('user table drop success!');
        yield connection.execute(roleTable);
        logger.info('role table drop success!');
        yield connection.execute(userRoleTable);
        logger.info('user_role table drop success!');
        yield connection.execute(menuTable);
        logger.info('menu table drop success!');
        yield connection.execute(roleMenuTable);
        logger.info('role_menu table drop success!');
    });
};
