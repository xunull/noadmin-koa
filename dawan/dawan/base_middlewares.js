var middlewares = require('./middlewares')
var config = global.dawan.config
var render = require('koa-ejs');
var koaStatic = require('koa-static');
var mount = require('koa-mount');

// 处理前端页面,前端资源的中间件
var frontRender = middlewares.frontRender;
var permission = middlewares.permission;

module.exports = function(app) {

    // 中间件的执行顺序依赖于添加的顺序
    // 静态资源放在开头,防止经过不必要的中间件
    // 怎么能让程序决定中间件的顺序

    app.use(middlewares.responseTime)

    app.use(middlewares.resEnhance)

    // 如果开发的时候选择了模式,那么中间价不会被挂载
    if (config.permission) {
        permission(app);
    }
    // 请求追踪也是很有用的,可以追踪请求的参数,以及请求的响应
    // 保留两个端点的数据也是有意义的,及时中间的处理过程加入不到次追踪里
    // 根据配置启用增强,如果该功能可配置,一旦是关闭状态,那么调用代码就会出错
    if (config.requestTrace) {
        app.use(middlewares.reqTrace)
    }

    if (config.renderFile) {
        frontRender(app);
    }

}
