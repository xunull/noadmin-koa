var logger = global.dawan.logger;

/**
 * 登录页面
 * @return {Generator} [description]
 */
exports.getLogin=function * (next) {
	yield this.render('login');
}

/**
 * 登录请求
 * @return {Generator} [description]
 */
exports.postLogin=function * (next) {
	let reqBody = this.request.body;
	let username=reqBody.username;
	let password=reqBody.password;
	// 暂时这么处理
	if(username=='admin'&&password=='123') {
		this.reply({});
	} else {
		this.reply({ok:false});
	}
}

/**
 * 主页
 * @return {Generator} [description]
 */
exports.getIndex=function * (next) {
	yield this.render('index');
}
