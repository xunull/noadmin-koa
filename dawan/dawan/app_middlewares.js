var middlewares = require('./middlewares')
var config = global.dawan.config
var render = require('koa-ejs');
var koaStatic = require('koa-static');
var mount = require('koa-mount');

module.exports = function(app) {

    // 中间件的执行顺序依赖于添加的顺序
    // 静态资源放在开头,防止经过不必要的中间件
    // 怎么能让程序决定中间件的顺序

    // 打包后的资源
    app.use(mount('/dist', koaStatic(config.directory_config.distDir)));
    // bower_components 资源
    app.use(mount('/libs',koaStatic(config.directory_config.libsDir)));
    // 自己的资源
    app.use(mount('/public',koaStatic(config.directory_config.publicDir)));

    app.use(middlewares.responseTime)
    app.use(middlewares.resEnhance)
    app.use(middlewares.reqTrace)

    render(app, {
        root: config.directory_config.view,
        layout: false,
        viewExt: 'html',
        cache: false,
        debug: true
    });

}
