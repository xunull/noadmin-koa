var Router = require('koa-router');
var basicRouter = require('./basic_router');


var logger = global.dawan.logger;

module.exports = function(app) {

    var rootRouter = new Router({
        prefix:'/admin'
    });

    rootRouter.use('/',basicRouter.routes(),basicRouter.allowedMethods());

    app.use(rootRouter.routes()).use(rootRouter.allowedMethods());

    logger.info('121212121212');
}
