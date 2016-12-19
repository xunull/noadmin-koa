var Router = require('koa-router');
var basicRouter = require('./basic_router');
var userRouter = require('./userRouter');
var permission = require('./permission');
var logger = global.dawan.logger;

var router = new Router();

// 身份拦截
router.use(permission);

router.use('/',userRouter.routes(),userRouter.allowedMethods());
router.use('/', basicRouter.routes(), basicRouter.allowedMethods());



module.exports = router;
