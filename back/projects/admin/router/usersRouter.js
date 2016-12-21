var Router = require('koa-router')
var usersController = require('../controllers/usersController')

var router = new Router({prefix:'users'})

router.get('/',usersController.users)

router.post('/create',usersController.create)

router.post('/delete',usersController.delete)

router.post('/block',usersController.block)

router.post('/unlock',usersController.unlock)

module.exports=router
