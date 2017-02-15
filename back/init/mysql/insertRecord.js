/**
 * 创建基本数据
 */
const co = require('co');
const uuid = require('uuid');
const crypto = require('crypto');
const yaml = require('js-yaml');
const fs = require('fs');

const logger = global.dawan.logger;
const config = global.dawan.config;
const appPropertiesPath = config.init.appPropertiesPath;
const initYamlPath = config.init.initYamlPath;

const appConfigYaml = yaml.safeLoad(fs.readFileSync(appPropertiesPath));
const initObj = yaml.safeLoad(fs.readFileSync(initYamlPath));

const insertUserSQL = `
                    insert into users   (
                                        user_code,login_name,passwd,active,is_block,
                                        create_time,create_user
                                        )
                    values(?,?,?,0,1,now(),0)
                    `;

/**
 * 1.初始化root用户
 */
function* initUser(connection) {
    const userRoot = initObj.userRoot;
    const userCode = uuid.v4();
    const hmac = crypto.createHmac('sha256', appConfigYaml.pass_salt);
    // pass 必须是string 或者 buffer 数字是不可以的
    hmac.update(userRoot.passwd);
    const passwd = hmac.digest('hex');
    const result = yield connection.execute(insertUserSQL, [userCode, userRoot.login_name, passwd]);
    return Promise.resolve(result);
}

const insertRoleSQL = `
                    insert into roles   (
                                        description,name,create_time,create_user
                                        )
                    values(?,?,now(),0)
                    `;

/**
 * 2.初始化root 角色
 */
function* initRole(connection) {
    const role_root = initObj.role_root;
    const result = yield connection.execute(insertRoleSQL,[role_root.description,role_root.name])
    return Promise.resolve(result)
}



const insertUserRoleSQL = `
                        insert into user_role   (
                                                role_id,user_id,create_time,create_user
                                                )
                        values(?,?,now(),0)
                        `;
/**
 * 3.初始化root 用户的 root 角色
 */
function* initUserRole(connection, userInsertId, roleInsertId) {
    connection.execute(insertUserRoleSQL, [roleInsertId, userInsertId]);
}

/**
 * 4.初始化menu
 *
 * [ [ 1, 4, 6, 7, 8, 9 ], [ 2, 3 ] ] 这个执行出来的数组怎么是这个样子
 */
function* initMenu(connection) {
    let basic_menu = initObj.basic_menu;
    let temp_arr=[];
    let menu_ids=[];
    for(let temp_menu of basic_menu) {
        // co(generateMenu(connection,0,temp_menu))
        temp_arr.push(generateMenu(connection,0,temp_menu,menu_ids));
    }
    let result = yield temp_arr;
    // logger.info('menu result')
    // logger.info(result)
    //
    // 这个有个bug,总是少两条,还不清楚原因
    // result = convertArr(result)
    // logger.info(menu_ids)
    return Promise.resolve(menu_ids);

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


function* generateMenu(connection,pid,menuObj,menu_ids) {
    let return_result = []
    let result = yield connection.execute(insertMenuSQL,[pid,menuObj.name,menuObj.uri,menuObj.menu_icon,menuObj.level])
    return_result=return_result.concat(result.insertId)
    menu_ids.push(result.insertId)
    if(undefined !== menuObj.sub) {
        for(let temp_menu of menuObj.sub) {
            // 这个地方 yield  yield* 还没有看出来区别
            let sub_result = yield* generateMenu(connection,result.insertId,temp_menu,menu_ids)

            sub_result.then(val=>{
                return_result=return_result.concat(val)
                // logger.info(val)
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
                    `;
/**
 * 5.初始化 root role menus
 */
function* initRoleMenu(connection, menu_ids, role_id) {
    const temp = [];
    for(let menu_id of menu_ids) {
        temp.push(connection.execute(insertRoleMenuSQL,[role_id,menu_id]));
    }
    yield temp;
    return Promise.resolve(true);
}

let insertRoleMenuSQL = `
                        insert into role_menu   (
                                                role_id,menu_id,create_time,create_user
                                                )
                        values(?,?,now(),0)
                        `;


module.exports = function (connection) {
    return new Promise((resolve, reject) => {
        co(function* () {
            // 1.
            const userResult = yield initUser(connection);
            const userInsertId = userResult.insertId;
            logger.info('insert user root success!');
            // 2.
            const roleResult = yield initRole(connection);
            const roleInsertId = roleResult.insertId;
            logger.info('insert role root success!');
            // 3.
            yield initUserRole(connection, userInsertId, roleInsertId);
            logger.info('insert root user_role sucess!');
            // 4.
            const menuResult = yield initMenu(connection);
            // logger.info(menuResult)
            logger.info('insert menus success!');
            // 5.
            yield initRoleMenu(connection, menuResult, roleInsertId);
            logger.info('insert role_menu success!');

            return Promise.resolve(true);
        }).then((val) => {
            resolve(val);
        }, (err) => {
            reject(err);
        });
    });
};

