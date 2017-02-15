require('babel-core/register');

require('./base_app');
require('./base_web');
// 加载业务逻辑
require('./core/loadProject');
