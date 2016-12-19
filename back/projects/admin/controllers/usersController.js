/**
 * 该复数是针对api的说明
 * 比如 userProfile 是显示用户自己的profile
 * usersProfile 是显示其他用户的profile ,比如说 usersProfile/xxxx
 */

var logger = global.dawan.logger
var User = require('../dao').User

exports.userProfile = function * (next) {

}

exports.create = function* (){
    // 这个body 是bodyParser 解析出来的
    let reqBody = this.request.body
    logger.info(reqBody)
    let user = yield User.save(reqBody.loginname,reqBody.password)
    this.reply({data:user})
}

exports.users = function * () {
    let query = this.query
    logger.info(query)
    logger.info('aaaaaaaaaaa')

    try {
       let users = yield User.getAll()
       this.reply({ data: users})
   } catch (err) {
       this.reply({ok: false, msg: '获取用户出错'})
   }


}
