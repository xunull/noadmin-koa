// 重写require,使用新特性
require("babel-core/register");

require('./base_app');
require('./base_web');
// 加载业务逻辑
require('./core/loadBusiness');
