var logger = global.dawan.logger;
var config = global.dawan.config;
let whiteList = ['/signin', '/login', '/'];
let blackList = [];

// 目前的拦截规则很大，只有session中有用户信息(用户登陆过，才会放行)
// 如果本系统中有业务系统，那么不应该拦截业务系统的请求
// 在其他的业务系统工作的时候
// 本系统作为支持系统
module.exports = function * ( next) {

    if (!config.permission) {
        // 没有启用权限验证,全部放行
        yield next;
    } else {
        if (!this.nosession || !this.nosession.get('user')) {

            if (whiteList.indexOf(this.path) !== -1) {
                // 白名单中的路径放行
                yield next;
            } else {
                res.status(403).send('forbidden!');
            }
        } else {
            yield next;
        }
    }

};
