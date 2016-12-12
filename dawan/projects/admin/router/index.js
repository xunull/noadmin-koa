var Router = require('koa-router');
var basicRouter = require('./basic_router');
var userRouter = require('./userRouter');

var logger = global.dawan.logger;

var router = new Router();

router.use('/',userRouter.routes(),userRouter.allowedMethods());
router.use('/', basicRouter.routes(), basicRouter.allowedMethods());



module.exports = router;
