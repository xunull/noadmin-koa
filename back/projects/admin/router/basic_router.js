/**
 * 最基本的请求
 */
var Router = require('koa-router');
var basicController = require('../controllers/basicController');
var userRouter = require('./userRouter');

var router = new Router();

router.get('login',basicController.getLogin);
router.post('login',basicController.postLogin);
router.get('index',basicController.getIndex);


// router.use('/user',userRouter.routes(), userRouter.allowedMethods());

module.exports=router;
