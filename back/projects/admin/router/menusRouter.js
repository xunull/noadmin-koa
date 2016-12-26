var Router = require('koa-router')
var menusController = require('../controllers/menusController')

var router = new Router({
	prefix: 'menus'
})

router.get('/rolemenus',menusController.rolemenus)
router.post('/create',menusController.create)

module.exports = router
