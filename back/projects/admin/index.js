const path = require('path')
const co = require('co')
const colors = require('colors/safe')

var mongoose= require('../../dawan/common/db/mongoose')

var config=global.dawan.config
var logger = global.dawan.logger

var common = global.dawan.common
var mysql = common.db.mysql

global.projects.admin={}

// async function  readBanner(){
// 	var banner = await common.file.readFile(path.resolve(__dirname,'./banner.txt'))
// 	console.log(banner.toString())
// }
//
// readBanner();

co(function * readBanner() {
	var banner = yield common.file.readFile(path.resolve(__dirname,'./banner.txt'))
	// console.log(banner.toString())
	console.log(colors.rainbow(banner.toString()))
})

// var fn = co.wrap(function* (val) {
//   return yield Promise.resolve(val);
// });
//
// fn(true).then(function (val) {
//
// });

mongoose.connect(config.db.mongodb)
let mysqlConfig = config.db.mysql
var connection = mysql.connect(mysqlConfig.host,mysqlConfig.user,mysqlConfig.password,mysqlConfig.database)


global.projects.admin.connection = connection

global.projects.admin.mysqlDao = require('./mysql/dao')(connection)
