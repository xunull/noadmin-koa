var models = require('../models');
var User = models.User;
var uuid = require('node-uuid');
var _ = require('lodash');

var logger = global.dawan.logger;

/**
 * 查询所有的user,当然 此方法只适合用户少的时候使用
 * 否则太大的结果集 也不好处理
 * @return {[type]} [description]
 */
exports.getAll = function() {
    return new Promise((resolve, reject) => {
        User.find({}, (err, users) => {
            if (err) {
                reject(err);
            } else {
                resolve(users);
            }
        })
    });
}

/**
 * 根据登陆名 查询用户
 * @param  {[type]}   loginname [description]
 * @param  {Function} callback  [description]
 * @return {[type]}             [description]
 */
exports.getUserByLoginName = function(loginname, callback) {

    if (undefined === callback) {
        return new Promise((resolve, reject) => {
            // 主要是为了大小写的忽略
            User.findOne({
                'loginname': new RegExp('^' + loginname + '$', 'i')
            }, function(err, user) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    } else {
        // 主要是为了大小写的忽略
        User.findOne({
            'loginname': new RegExp('^' + loginname + '$', 'i')
        }, function(err, user) {
            if (err) {
                callback(err);
            } else {
                callback(null, user);
            }
        });
    }

};

// 直接存储对象，方便使用
exports.saveUser = function(_user, callback) {

    var user = new User();
    _.assign(user, _user);

    if (undefined === callback) {
        return new Promise((resolve, reject) => {
            user.save(function(err, user) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    } else {
        user.save(function(err, user) {
            if (err) {

                callback(err, user);
            } else {
                callback(null, user);
            }
        });
    }

};

/**
 * 用户名，密码的方式，存储用户
 * @param  {[type]}   username [description]
 * @param  {[type]}   password [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.save = function(username, password, callback) {
    var user = new User();
    user.loginname = username;
    user.pass = password;
    user.accessToken = uuid.v4();
    user.save(function(err, user) {
        if (err) {
            logger.error(err);
            // 这里的err 不一定是原来数据库抛出的err,有可能替换成平台定义的err
            callback(err, user);
        } else {
            callback(null, user);
        }
    });
};
