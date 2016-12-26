const path = require('path')
const co = require('co')
const colors = require('colors/safe')
const yaml = require('js-yaml')

const mongoose= require('../../dawan/common/db/mongoose')

const config=global.dawan.config
const logger = global.dawan.logger

const common = global.dawan.common
const mysql = common.db.mysql

const appPropertiesPath = config.init.appPropertiesPath
const initYamlPath = config.init.initYamlPath

const appConfigYaml =yaml.safeLoad(fs.readFileSync(appPropertiesPath))
const initObj = yaml.safeLoad(fs.readFileSync(initYamlPath))

global.projects.admin={}
global.projects.admin.project_config=appConfigYaml

// async function  readBanner(){
// 	var banner = await common.file.readFile(path.resolve(__dirname,'./banner.txt'))
// 	console.log(banner.toString())
// }
//
// readBanner();

co(function * readBanner() {
	var banner = yield common.file.readFile(path.resolve(__dirname,'./banner.txt'))
	var banner2 = yield common.file.readFile(path.resolve(__dirname,'./banner2.txt'))
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
