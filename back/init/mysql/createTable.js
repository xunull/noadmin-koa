
const co = require('co');

const logger = global.dawan.logger;

/**
 * sql
 */

const userTable = `
                create table users(
                    id int auto_increment,
                    user_code varchar(255) not null,
                    login_name varchar(50) not null,
                    passwd varchar(255) not null,
                    active int not null,
                    is_block int not null,

                    create_time datetime not null,
                    create_user int,
                    update_time datetime ,
                    update_user int,
                    delete_time datetime,
                    delete_user int,
                    can_delete int,
                    is_deleted int,
                    primary key(id) ,index(id)
                )
                `;
/**
 * mysql 用外键表示相互关系
 * 目前这个系统,role 是否需要继承,所属?
 */
const roleTable = `
            create table roles(
                id int auto_increment,
                description varchar(255),
                name varchar(50) not null,

                create_time datetime not null,
                create_user int,
                update_time datetime ,
                update_user int,
                delete_time datetime,
                delete_user int,
                can_delete int,
                is_deleted int,
                primary key(id) ,index(id)
            )
            `;

const userRoleTable = `
                    create table user_role (
                        id int auto_increment,
                        role_id int not null,
                        user_id int not null,

                        create_time datetime not null,
                        create_user int,
                        update_time datetime ,
                        update_user int,
                        delete_time datetime,
                        delete_user int,
                        can_delete int,
                        is_deleted int,
                        primary key(id) ,index(id)
                    )
                    `;

const menusTable = `
                    create table menus (
                        id int auto_increment,
                        pid int,
                        name varchar(50),
                        uri varchar(255) ,
                        menu_icon varchar(50),
                        level int,

                        create_time datetime not null,
                        create_user int,
                        update_time datetime ,
                        update_user int,
                        delete_time datetime,
                        delete_user int,
                        can_delete int,
                        is_deleted int,
                        primary key(id) ,index(id)
                    )
                    `;

const roleMenuTable = `
                    create table role_menu (
                        id int auto_increment,
                        role_id int not null,
                        menu_id int not null,

                        create_time datetime not null,
                        create_user int,
                        update_time datetime ,
                        update_user int,
                        delete_time datetime,
                        delete_user int,
                        can_delete int,
                        is_deleted int,
                        primary key(id) ,index(id)
                    )
                    `;


module.exports = function (connection) {
    return new Promise((resolve, reject) => {
        co(function* () {
            yield connection.execute(userTable);
            logger.info('user table create success!');
            yield connection.execute(roleTable);
            logger.info('role table create success!');
            yield connection.execute(userRoleTable);
            logger.info('user_role table create success!');
            yield connection.execute(menusTable);
            logger.info('menu table create success!');
            yield connection.execute(roleMenuTable);
            logger.info('role_menu table create success!');
            return Promise.resolve(true);
        }).then((val) => {
            resolve(val);
        }, (err) => {
            reject(err);
        });
    });
};
