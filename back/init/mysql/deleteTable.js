const co = require('co')
const logger = global.dawan.logger

module.exports=function(connection) {
    co(function* (){
        yield connection.execute(userTable)
        logger.info('user table drop success!')
        yield connection.execute(roleTable)
        logger.info('role table drop success!')
        yield connection.execute(userRoleTable)
        logger.info('user_role table drop success!')
        yield connection.execute(menuTable)
        logger.info('menu table drop success!')
        yield connection.execute(roleMenuTable)
        logger.info('role_menu table drop success!')
    })

}

var userTable = 'drop table users'
var roleTable = 'drop table roles'
var userRoleTable = 'drop table user_role'
var menuTable = 'drop table menus'
var roleMenuTable = 'drop table role_menu'