const logger = global.dawan.logger

const Dao = global.projects.admin.mysqlDao
const Menu = Dao.Menu

/**
 * 查询某个角色的菜单
 * 没有参数就是所有的菜单
 *
 * @return {Generator} [description]
 */
exports.rolemenus = function*(){
    if(undefined === this.query.role_id) {
        this.reply({
            ok:false,
            error_msg:'无查询参数'
        })
    } else {
        let result = yield Menu.getRoleMenuTree(this.query.role_id,this.query.pid)
        this.reply({data:result})
    }

}

exports.create = function*() {
    let body = this.request.body
    try {
        let currentUser = this.nosession.get('user')
        logger.info(currentUser)
        yield Menu.create(body.name,body.uri,body.pid,currentUser.id)
        this.reply({})
    } catch(err) {
        logger.error(err)
        this.reply({ok:false,error_msg:'服务发生错误'})
    }


}
