var logger = global.dawan.logger
var loginLogout = require('../service/login.logout')
var User = require('../dao').User
var crypto = global.dawan.common.crypto
var yaml = require('js-yaml')
var fs = require('fs')
var appConfigYamlPath = global.dawan.config.init.appPropertiesPath
var appConfigYaml = yaml.safeLoad(fs.readFileSync(appConfigYamlPath))

/**
 * 登录页面
 * @return {Generator} [description]
 */
exports.getLogin = function * (next) {
    yield this.render('login')
}

/**
 * 登录请求
 * @return {Generator} [description]
 */
exports.postLogin = function * (next) {
    let reqBody = this.request.body
    let username = reqBody.username
    let password = reqBody.password
	let ctx = this

	let user = yield User.getUserByLoginName(username)
	password = crypto.passwordHmac(password,appConfigYaml.pass_salt)
	if (password == user.passwd) {
		logger.info('密码验证成功')
		yield loginLogout.login(user, ctx.nosession)
		ctx.reply({})
	} else {
		logger.info('密码验证失败')
		ctx.reply({ok:false})
	}

    // User.getUserByLoginName(username, async function(err, user) {
    //     if (err) {
	//
	// 		logger.error(err);
	// 	} else {
	//
    //         password = crypto.passwordHmac(password,appConfigYaml.pass_salt);
    //         if (password == user.pass) {
    //             logger.info('密码验证成功');
	//
	// 			// this 是哪
    //             await loginLogout.login(user, ctx.nosession);
	// 			ctx.reply({});
    //         } else {
    //             logger.info('密码验证失败');
	// 			ctx.reply({ok:false});
    //         }
    //     }
    // });


}



/**
 * 主页
 * @return {Generator} [description]
 */
exports.getIndex = function * (next) {
    yield this.render('index')
}
