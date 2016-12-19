var Router = require('koa-router')
var usersController = require('../controllers/usersController')

var router = new Router({prefix:'users'})

router.get('/',usersController.users)

router.post('/create',usersController.create)

module.exports=router
