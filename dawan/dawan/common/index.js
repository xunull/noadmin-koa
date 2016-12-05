// import 语句能加载index.js么 (现在node 也不支持import)

/**
 * exports 的属性是可以被枚举的
 * 这些定义都是可以被修改的，
 * 要想不被修改 需要使用Object.defineProperty(xxx,xx,{xxx})
 * @type {[type]}
 */

const utils = require('./utils');

const define = require('./utils/defineObjectProperty');

const file = require('./file');
const logger = require('./logger');
const yaml = require('./utils/yaml');
const nodeOs = require('./utils/node-os');
const path = require('./utils/path');
const repl = require('./repl');
const shell = require('./shell');
const argv = utils.argv;


/**
 * 加固所有的属性
 */
define.reinforceObject(file, logger, yaml, nodeOs, path, repl, shell);
// 自己重新定义自己
define.reinforceObject(define);

exports.file = file;
exports.logger = logger;
exports.yaml = yaml;
exports.nodeOs = nodeOs;
exports.path = path;
exports.repl = repl;
exports.shell = shell;
exports.define = define;
