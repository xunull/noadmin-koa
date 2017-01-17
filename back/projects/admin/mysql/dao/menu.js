const mapper = require('../mapper/menu')
const logger = global.dawan.logger

module.exports = Menu

function Menu(connection) {
    this.connection = connection
}

Menu.prototype.create = function(pid,name,uri,menu_icon,
                                    level,create_user) {
    return this.connection.execute(mapper.create,
                                    [pid,name,uri,menu_icon,level,create_user])

}

Menu.prototype.getMenuById = function(menu_id) {
    return this.connection.execute(mapper.getMenuById,[menu_id])
}


Menu.prototype.getRoleMenuTree = async function(role_id,pid) {

    if(undefined === pid) {
        pid = 0
    } else {
        pid = parseInt(pid)
    }

    let db_menus = await this.connection.execute(mapper.getRoleMenus,[role_id,pid])

    let result_menus=[]

    generateMenu(result_menus,pid,db_menus)

    function generateMenu(parent,pid,db_menus) {
        let childrenMenus = db_menus.filter((element,index,arr)=>{
            if(pid === element.pid) {
                return true
            } else {
                return false
            }
        })

        childrenMenus.forEach(function(value,index,arr){

            parent.push(value)
            value.children_menu = []
            generateMenu(value.children_menu,value.id,db_menus)
        })
    }

    return result_menus

}
