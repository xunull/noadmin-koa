/**
 * 只负责提取session
 * 目前还会判断session 是否过期，如果过期了会自动重新生成一个新的session
 */

var Nosession = require('../core/nosession');
var logger = global.dawan.logger;
var config = global.dawan.config;

var nosession_store = require('../core/nosession_store');

// nosessionid 不能仅仅是httponly
// 否则ajax请求携带不了该session会被禁止访问
// koa 的cookie 设置不了maxAge ?
let defaultCookieOption = {
    // maxAge: 1200000, // 十分钟
    path: '/',
    signed: true,
    httpOnly: false
}

module.exports = function * (next) {

    let nosessionid = this.cookies.get('nosessionid');

    if (undefined === nosessionid) {
        // 没有nosessionid
        this.nosession = new Nosession();
        this.nosessionid = this.nosession.nosessionid;
        this.cookies.set('nosessionid', this.nosessionid, defaultCookieOption);

    } else {
        // 有nosessionid,但是本系统中不一定会有
        // 比如，当服务器重启后，session 已经被清空了

        let storedSession = nosession_store.getSession(nosessionid);

        if (undefined === storedSession) {
            this.nosession = new Nosession();
            this.nosessionid = this.nosession.nosessionid;
            this.cookies.set('nosessionid', this.nosessionid, defaultCookieOption);
        } else {
            if (Date.now() > storedSession.expires_on) {
                // session 已经过期
                // 销毁上次的session
                storedSession.destory();

                this.nosession = new Nosession();
                this.nosessionid = this.nosession.nosessionid;
                this.cookies.set('nosessionid', this.nosessionid, defaultCookieOption);
            } else {
                this.nosession = nosession_store.getSession(nosessionid);
                this.nosessionid = this.nosession.nosessionid;
                // 刷新一下cookie中 sessionid 的时间
                this.cookies.set('nosessionid', this.nosessionid, defaultCookieOption);
            }
        }
    }

    yield next;
}
