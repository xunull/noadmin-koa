/**
 * 挂载前端页面,前端资源的中间件
 * 不挂载这些也是可以的,完全由自己自定义body处理业务
 */
 var config = global.dawan.config
 var render = require('koa-ejs');
 var koaStatic = require('koa-static');
 var mount = require('koa-mount');

 module.exports = function(app) {

     // 打包后的资源
     app.use(mount('/dist', koaStatic(config.directoryConfig.front.distDir)));
     // bower_components 资源
     app.use(mount('/libs',koaStatic(config.directoryConfig.front.libsDir)));
     // 自己的资源
     app.use(mount('/public',koaStatic(config.directoryConfig.front.publicDir)));

     render(app, {
         root: config.directoryConfig.front.view,
         layout: false,
         viewExt: 'html',
         cache: false,
         debug: true
     });

 }
