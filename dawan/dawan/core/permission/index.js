/**
 * 权限,许可控制模块
 *
 * 有简单的黑白名单规则
 *
 * 还有自己添加的验证方法(基于许可的,基于用户角色的,基于请求分类的)
 */

var logger = global.dawan.logger;
var config = global.dawan.config;
let whiteList = ['/signin', '/login', '/'];
let blackList = [];

// 目前的拦截规则很大，只有session中有用户信息(用户登陆过，才会放行)
// 如果本系统中有业务系统，那么不应该拦截业务系统的请求
// 在其他的业务系统工作的时候
// 本系统作为支持系统
module.exports = function * (next) {

    if (!this.nosession || !this.nosession.get('user')) {

        if (whiteList.indexOf(this.path) !== -1) {
            // 白名单中的路径放行
            yield next;
        } else {
            this.status=403;
        }

    } else {
        yield next;
    }

};
