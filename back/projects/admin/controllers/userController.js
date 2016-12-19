var logger = global.dawan.logger
var getRouter = require('../service/getRouter')
var VueRouter = require('vue-router')

exports.indexMenu = function* (next) {

    logger.info(this.nosession)

    this.reply({ data: this.nosession.get('userMenu') })

}

exports.userProfile = function* (next) {

}

/**
 * 获取用户的view router
 */
exports.getRouter = function* (next) {
    // vue 能做到先创建vue 后创建vue-router么
    // let userMenu = yield getRouter('root')
    // let routeObj = {}
    // for (let menu of userMenu) {
    //     for (let submenu of menu.sub_menu) {
    //         let temp={}
    //         temp.path=submenu.uri
    //     }
    // }

    // let router = new VueRouter(routeObj)
    // this.reply({ data: router })

}
