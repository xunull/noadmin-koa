const mapper = require('../mapper/user')
const uuid = require('uuid')
const crypto = require('crypto')
const logger = global.dawan.logger

const mysql_config = global.dawan.config.db.mysql.config
const project_config = global.projects.admin.project_config

module.exports = User


function User(connection) {
    this.connection=connection
}

/**
 * 登录名查询用户
 * @param  {[type]} login_name [description]
 * @return {[type]}            [description]
 */
User.prototype.getUserByLoginName = function(login_name) {
    return this.connection.execute(mapper.getUserByLoginName,[login_name])
}

/**
 * user 分页查询
 * @param  {[type]} since [description]
 * @param  {[type]} limit [description]
 * @return {[type]}       [description]
 */
User.prototype.getUsersForPage = function(since,limit) {
    since = since?since:0
    limit = limit?limit:mysql_config.default_page_limit

    return this.connection.execute(mapper.getUsersForPage,[since,limit])

}

/**
 * 创建用户
 * @param  {[type]} login_name  [description]
 * @param  {[type]} passwd      [description]
 * @param  {[type]} create_user [description]
 * @return {[type]}             [description]
 */
User.prototype.saveNameAndPasswd = function(login_name,passwd,create_user) {
    let user_code = uuid.v4()
    let hmac = crypto.createHmac('sha256', project_config.pass_salt)
    // pass 必须是string 或者 buffer 数字是不可以的
    hmac.update(passwd)
    passwd = hmac.digest('hex')

    return this.connection.execute(mapper.saveNameAndPasswd,
                                    [user_code,login_name,passwd,create_user.id])

}

/**
 * 删除用户
 * @param  {[type]}  user_ids [description]
 * @return {Promise}          [description]
 */
User.prototype.delete =async function(...user_ids) {
    try {
        let deletes = []
        for(let id of user_ids) {
            // 现在root 用户是 1
            // 暂时在这里控制
            if( 1 !== id) {
                /**
                 * 这里的promise 是 return new Promise 在promise 里面是立即执行的
                 * generator 函数 是延迟执行的
                 */
                deletes.push(this.connection.execute(mapper.deleteUserById,[id]))
            }
        }

        let result = await Promise.all(deletes)
        return result
    } catch(err) {
        return Promise.reject(err)
    }

}

User.prototype.unlock = async function(...user_ids) {
    try {
        let unLock = []
        for(let id of user_ids) {
            if(1 !== id) {
                unLock.push(this.connection.execute(mapper.unLockUserById,[id]))
            }
        }
        let result = await Promise.all(unLock)
        return result
    } catch(err) {
        return Promise.reject(err)
    }
}

/**
 * 禁用用户
 * @type {[type]}
 */
User.prototype.block = async function(...user_ids) {
    try {
        let blocks = []
        for(let id of user_ids) {
            if(1 !== id) {
                blocks.push(this.connection.execute(mapper.blockUserById,[id]))
            }
        }
        let result = await Promise.all(blocks)
        return result
    } catch(err) {
        return Promise.reject(err)
    }
}
