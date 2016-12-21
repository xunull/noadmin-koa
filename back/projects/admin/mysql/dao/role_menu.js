const mapper = require('../mapper/role_menu')
const Menu = require('./menu')
const logger = global.dawan.logger
const log4js = global.dawan.log4js

module.exports = RoleMenu

function RoleMenu(connection) {
    this.connection = connection
    this.MenuDao = new Menu(connection)
}

RoleMenu.prototype.getRoleMenuForFront =async function(role_id) {
    let roleMenuResult = await this.connection.execute(mapper.getRoleMenuByRoleId,[role_id])
    let db_menus = []
    for(let roleMenu of roleMenuResult) {
        let menu = (await this.MenuDao.getMenuById(roleMenu.menu_id))[0]
        db_menus.push(menu)
    }
    let result_menus=[]
    // logger.focus(menus)

    generateMenu(result_menus,0,db_menus)

    function generateMenu(parent,pid,db_menus) {
        let childrenMenus = db_menus.filter((element,index,arr)=>{
            if(pid === element.pid) {
                return true
            } else {
                return false
            }
        })

        childrenMenus.forEach(function(value,index,arr){
            let menu = {}
            parent.push(menu)

            menu.menu_icon = value.menu_icon
            menu.name = value.name
            menu.uri = value.uri
            menu.sub_menu = []

            generateMenu(menu.sub_menu,value.id,db_menus)
        })
    }

    return result_menus



}
