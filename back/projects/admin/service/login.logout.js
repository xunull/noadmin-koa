// var UserMenu = require('../dao').UserMenu
// var RoleMenu = require('../dao').RoleMenu
// var Role = require('../dao').Role

const Dao = global.projects.admin.mysqlDao
const User = Dao.User
const Role = Dao.Role
const RoleMenu = Dao.RoleMenu

var logger = global.dawan.logger
/**
 * [login description]
 * @param  {[type]} user monodb model user
 * @return {[type]}      [description]
 */
exports.login = async function(user, nosession) {
    try {
        // 1.save user
        nosession.set('user', user)
        // 2.查询用户的role
        let userRole = (await Role.getRoleByUserId(user.id))[0]
        logger.info(userRole)
        nosession.set('userRole', userRole)
        // TODO 用户的角色有多个,暂时使用root
        // 3.查询用户的菜单,该菜单为前台样式的菜单
        let userMenu = await RoleMenu.getRoleMenuForFront(userRole.role_id)
        nosession.set('userMenu', userMenu)

    } catch (err) {
        logger.error(err)
    }

}
