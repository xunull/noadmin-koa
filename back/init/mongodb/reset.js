/**
 * 重新初始化系统
 */

var mongoose= require('../dawan/common/db/mongoose')
var models = require('../projects/admin/models')
var config = require('../conf/dawan.config')
var logger = global.dawan.logger

var db=mongoose.connect(config.db.mongodb)

/**
 * 删除掉原来的collections
 * 现在是全删了,应该有个初始的列表
 * @type {[type]}
 */
let collections = Object.keys(db.collections)
collections.forEach(name => {
    db.collections[name].drop()


})
require('./initCore')
// 有的是在异步执行,在这里不能关闭
// mongoose.db.close();
