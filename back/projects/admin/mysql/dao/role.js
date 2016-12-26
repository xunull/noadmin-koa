const mapper = require('../mapper/role')
const mysql_config = global.dawan.config.db.mysql.config
const project_config = global.projects.admin.project_config

module.exports = Role

function Role(connection) {
    this.connection = connection
}

Role.prototype.getRoleByUserId = function(user_id){
    return this.connection.execute(mapper.getRoleByUserId,[user_id])

}

Role.prototype.getAllRoles = function() {
    return this.connection.execute(mapper.getAllRoles)
}

/**
 * 查询出某个角色所有的菜单
 * @param  {[type]} role_id [description]
 * @return {[type]}         [description]
 */
Role.prototype.getRoleMenus = function(role_id) {
    return this.connection.execute(mapper.getRoleMenus,[role_id])
}

Role.prototype.save = function() {

}

Role.prototype.getRolesForPage = function(since,limit) {
    since = since?since:0
    limit = limit?limit:mysql_config.default_page_limit

    return this.connection.execute(mapper.getRolesForPage,[since,limit])
}


/**
 * 获取某个menu的所有子menu
 * @param  {[type]}  menu_id [description]
 * @return {Promise}         [description]
 */
Role.prototype.getMenuChildren = async function(menu_id) {
    let result = await this.connection.execute(mapper.getMenuChildren,[menu_id])
    return result
}
