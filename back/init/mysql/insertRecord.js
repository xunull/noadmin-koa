/**
 * 创建基本数据
 */
const co = require('co')
const uuid = require('node-uuid')
const crypto = require('crypto')
const yaml = require('js-yaml')
const fs = require('fs')

const logger = global.dawan.logger
const config = global.dawan.config
const appPropertiesPath = config.init.appPropertiesPath
const initYamlPath = config.init.initYamlPath

const appConfigYaml =yaml.safeLoad(fs.readFileSync(appPropertiesPath))
const initObj = yaml.safeLoad(fs.readFileSync(initYamlPath))

module.exports = function(connection) {
    return new Promise((resolve,reject)=>{
        co(function*(){
            //1.
            let userResult = yield initUser(connection)
            let user_insertId = userResult.insertId
            logger.info('insert user root success!')
            //2.
            let roleResult = yield initRole(connection)
            let role_insertId = roleResult.insertId
            logger.info('insert role root success!')
            //3.
            yield initUserRole(connection,user_insertId,role_insertId)
            logger.info('insert root user_role sucess!')
            //4.
            let menu_result = yield initMenu(connection)
            // logger.info(menu_result)
            logger.info('insert menus success!')
            //5.
            yield initRoleMenu(connection,menu_result,role_insertId)
            logger.info('insert role_menu success!')

            return Promise.resolve(true)
        }).then(val=>{
            resolve(val)
        },err=>{
            reject(err)
        })
    })
    
}

/**
 * 1.初始化root用户
 */
function* initUser(connection) {
    let user_root = initObj.user_root
    let user_code = uuid.v4()
    let hmac = crypto.createHmac('sha256', appConfigYaml.pass_salt)
    // pass 必须是string 或者 buffer 数字是不可以的
    hmac.update(user_root.passwd)
    let passwd = hmac.digest('hex')
    let result = yield connection.execute(insertUserSQL,[user_code,user_root.login_name,passwd])
    return Promise.resolve(result)
}

var insertUserSQL = `
                    insert into users   (
                                        user_code,login_name,passwd,active,is_block,
                                        create_time,create_user
                                        )
                    values(?,?,?,0,1,now(),0)
                    `
/**
 * 2.初始化root 角色
 */
function* initRole(connection) {
    let role_root = initObj.role_root
    let result = yield connection.execute(insertRoleSQL,[role_root.description,role_root.name])
    return Promise.resolve(result)
}

var insertRoleSQL = `
                    insert into roles   (
                                        description,name,create_time,create_user
                                        )
                    values(?,?,now(),0)
                    `

/**
 * 3.初始化root 用户的 root 角色
 */
function* initUserRole(connection,user_insertId,role_insertId) {
    connection.execute(insertUserRoleSQL,[role_insertId,user_insertId])
}

var insertUserRoleSQL = `
                        insert into user_role   (
                                                role_id,user_id,create_time,create_user
                                                )
                        values(?,?,now(),0)
                        `
/**
 * 4.初始化menu
 * 
 * [ [ 1, 4, 6, 7, 8, 9 ], [ 2, 3 ] ] 这个执行出来的数组怎么是这个样子
 */
function* initMenu(connection) {
    let basic_menu = initObj.basic_menu
    let temp_arr=[]
    for(let temp_menu of basic_menu) {
        // co(generateMenu(connection,0,temp_menu))
        temp_arr.push(generateMenu(connection,0,temp_menu))
    }
    let result = yield temp_arr
    // logger.info('menu result')
    // logger.info(result)
    result = convertArr(result)
    return Promise.resolve(result)

}

/**
 * 将结果的二维数组变成一维
 */
function convertArr(arr) {

    let result=[]
    for (let temp of arr) {
        if(temp instanceof Array) {
            for (let other_temp of temp) {
                result.push(other_temp)
            }
        } else {
            result.push(temp)
        }
    }
    return result
}


function* generateMenu(connection,pid,menuObj) {
    let return_result = []
    let result = yield connection.execute(insertMenuSQL,[pid,menuObj.name,menuObj.uri,menuObj.menu_icon,menuObj.level])
    return_result=return_result.concat(result.insertId)
    if(undefined !== menuObj.sub) {
        for(let temp_menu of menuObj.sub) {
            // 这个地方 yield  yield* 还没有看出来区别
            let sub_result = yield* generateMenu(connection,result.insertId,temp_menu)
            
            sub_result.then(val=>{
                return_result=return_result.concat(val)
            })
            
        }
    }
   
    // logger.info(return_result)
    return Promise.resolve(return_result)
}

let insertMenuSQL = `
                    insert into menus   (
                                        pid,name,uri,menu_icon,level,create_time,create_user
                                        )
                    values (?,?,?,?,?,now(),0)
                    `
/**
 * 5.初始化 root role menus
 */
function* initRoleMenu(connection,menu_ids,role_id){
    let temp=[]
    for(let menu_id of menu_ids) {
        temp.push(connection.execute(insertRoleMenuSQL,[role_id,menu_id]))
    }
    yield temp
    return Promise.resolve(true)
}

let insertRoleMenuSQL = `
                        insert into role_menu   (
                                                role_id,menu_id,create_time,create_user
                                                )
                        values(?,?,now(),0)
                        `

