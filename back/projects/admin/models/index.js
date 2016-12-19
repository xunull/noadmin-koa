var mongoose = require('mongoose');
var config = global.dawan.config;
var logger = global.dawan.logger;

require('./user');
require('./menu');
require('./user_menu');
require('./access_path');
require('./user_access_path');
require('./role');
require('./user_role');
require('./role_access_path');
require('./role_menu');
require('./business');

exports.User = mongoose.model('User');
exports.Menu = mongoose.model('Menu');
exports.UserMenu = mongoose.model('UserMenu');
exports.AccessPath = mongoose.model('AccessPath');
exports.UserAccessPath = mongoose.model('UserAccessPath');
exports.Role = mongoose.model('Role');
exports.UserRole = mongoose.model('UserRole');
exports.RoleAccessPath = mongoose.model('RoleAccessPath');
exports.RoleMenu = mongoose.model('RoleMenu');
exports.Business = mongoose.model('Business');
