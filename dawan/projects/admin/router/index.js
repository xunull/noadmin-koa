var Router = require('koa-router');
var basicRouter = require('./basic_router');

var logger = global.dawan.logger;

var router = new Router();

router.use('/', basicRouter.routes(), basicRouter.allowedMethods());

module.exports = router;
