var Router = require('koa-router');
var userController = require('../controllers/userController');
var basicController = require('../controllers/basicController');


// var router = new Router({
// 	prefix: '/user'
// });
var router = new Router();
// router.prefix('/user');
router.get('user/indexMenu',userController.indexMenu);
// router.get('indexMenu',userController.indexMenu);

module.exports=router;
