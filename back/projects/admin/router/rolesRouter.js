var Router = require('koa-router')
var rolesController = require('../controllers/rolesController')

/**
 * koa-router 一个大问题
 * router的path 如果以/开头, 那么这个path 就是一个相对于网站url root的一个path,
 * 即使对于嵌套路由来说,因此如果是嵌套路由,那么prefix 不能以/开头
 *
 * 如果一个路由使用了前缀,那么 此路由中的path 需要以/开头
 */

var router = new Router({
	prefix: 'roles'
})

router.get('/',rolesController.roles)
router.post('/create',rolesController.create)
router.post('/delete',rolesController.delete)
router.get('/allroles',rolesController.allroles)

module.exports = router
