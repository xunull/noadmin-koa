var middlewares = require('./middlewares')
var config = global.dawan.config
var render = require('koa-ejs')
var koaStatic = require('koa-static')
var mount = require('koa-mount')


// 处理前端页面,前端资源的中间件
var frontRender = middlewares.frontRender
var permission = middlewares.permission

module.exports = function(app) {

    // 中间件的执行顺序依赖于添加的顺序
    // 静态资源放在开头,防止经过不必要的中间件
    // 怎么能让程序决定中间件的顺序

    // TODO
    // 如果静态资源中间件在前,那么静态资源也会经过后面的中间价,
    // 一般来说是不需要其他的中间价参与了,反而可能会增大反应时间
    // 比如logger,响应时间 这些记录同样会记录静态资源
    // 所以静态资源的加载顺序变成可以配置的
    //
    // 将来可能可以配置更多中间件的加载顺序
    if(config.middlewareOrder) {
        addSome(app)
        if (config.renderFile) {
            frontRender(app)
        }

    } else {
        if (config.renderFile) {
            frontRender(app)
        }
        addSome(app)
    }

}

/**
 * 添加除了静态文件外的中间价
 *
 * @param {[type]} app [description]
 */
function addSome(app) {
    // 打印一些请求信息,如ip 用户,客户端信息等
    app.use(middlewares.morgan)

    app.use(middlewares.responseTime)

    app.use(middlewares.resEnhance)

    app.use(middlewares.nosession)

    // 如果开发的时候选择了模式,那么中间价不会被挂载
    if (config.permission) {
        permission(app)
    }
    // 请求追踪也是很有用的,可以追踪请求的参数,以及请求的响应
    // 保留两个端点的数据也是有意义的,及时中间的处理过程加入不到次追踪里
    // 根据配置启用增强,如果该功能可配置,一旦是关闭状态,那么调用代码就会出错
    if (config.requestTrace) {
        app.use(middlewares.reqTrace)
    }
}
