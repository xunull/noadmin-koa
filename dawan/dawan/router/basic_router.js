/**
 * 最基本的请求
 */
var Router = require('koa-router');
var basicController = require('../controllers/basicController');

var router = new Router();

router.get('login',basicController.getLogin);
router.post('login',basicController.postLogin);
router.get('index',basicController.getIndex);

module.exports=router;
