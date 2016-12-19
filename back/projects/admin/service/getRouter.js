var RoleMenu = require('../dao').RoleMenu
var logger = global.dawan.logger

module.exports=function * (roleName) {
  let userMenu = yield RoleMenu.getRoleMenuForFront(roleName)
  logger.info(userMenu)
  return userMenu
}