/**
 * 该复数是针对api的说明
 * 比如 userProfile 是显示用户自己的profile
 * usersProfile 是显示其他用户的profile ,比如说 usersProfile/xxxx
 */

const logger = global.dawan.logger

const Dao = global.projects.admin.mysqlDao
const User = Dao.User

exports.userProfile = function * (next) {

}

exports.create = function* (){
    // 这个body 是bodyParser 解析出来的
    let reqBody = this.request.body
    logger.info(reqBody)
    let user = yield User.saveNameAndPasswd(reqBody.loginname,reqBody.password,this.nosession.get('user'))

    this.reply({data:user})
}

exports.block = function* () {
    let reqBody = this.request.body
    try {
        let result = yield User.block(...reqBody.users)
        this.reply({})
    } catch(err) {
        logger.error(err)
        this.reply({ok:false,error_msg:'服务发生错误'})
    }
}

exports.unlock = function* () {
    let reqBody = this.request.body
    try {
        let result = yield User.unlock(...reqBody.users)
        this.reply({})
    } catch(err) {
        logger.error(err)
        this.reply({ok:false,error_msg:'服务发生错误'})
    }
}

exports.delete = function* (){
    let reqBody = this.request.body
    logger.info(reqBody)

    // 如果出现err  结果为 undefined
    // let result = yield User.delete(...reqBody.users).catch(err=>{
    //     logger.info('服务发生错误')
    //     logger.info(err)
    // })
    // logger.info('result is ')
    // logger.info(typeof result)
    // logger.info(result)

    /**
     * 这里try catch 比使用catch 好一些
     * 因为try catch 清晰一些,
     * 并且这里err 希望返回给前端 err
     * catch 仅仅是将错误限制在本身的语句上
     */
    try {
        let result = yield User.delete(...reqBody.users)
        this.reply({})
    } catch(err) {
        logger.error(err)
        this.reply({ok:false,error_msg:'服务发生错误'})
    }

}

exports.users = function * () {
    let query = this.query
    logger.info(query)
    logger.info('aaaaaaaaaaa')

    try {
        let users = yield User.getUsersForPage()
        this.reply({ data: users})
    } catch (err) {
        this.reply({ok: false, msg: '获取用户出错'})
    }


}
