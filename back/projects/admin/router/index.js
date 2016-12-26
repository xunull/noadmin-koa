const Router = require('koa-router')
const basicRouter = require('./basic_router')
const userRouter = require('./userRouter')
const usersRouter = require('./usersRouter')
const rolesRouter = require('./rolesRouter')
const permission = require('./permission')
const menusRouter = require('./menusRouter')
const logger = global.dawan.logger

var router = new Router()

// 身份拦截
router.use(permission)

router.use('/',userRouter.routes(),userRouter.allowedMethods())
router.use('/', basicRouter.routes(), basicRouter.allowedMethods())
router.use('/',usersRouter.routes(),usersRouter.allowedMethods())
router.use('/',rolesRouter.routes(),rolesRouter.allowedMethods())
router.use('/',menusRouter.routes(),menusRouter.allowedMethods())


module.exports = router
