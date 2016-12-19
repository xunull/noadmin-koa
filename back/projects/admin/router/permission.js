/**
 * 权限,许可控制模块
 *
 * 有简单的黑白名单规则
 *
 * 还有自己添加的验证方法(基于许可的,基于用户角色的,基于请求分类的)
 */

var logger = global.dawan.logger;
let whiteList = ['/admin/signin', '/admin/login', '/'];
let blackList = [];


module.exports = function * (next) {

    if (!this.nosession || !this.nosession.get('user')) {
		// logger.focus(this.path);
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
