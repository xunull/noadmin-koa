var koa = require('koa')
var bodyParser = require('koa-bodyparser')
var session = require('koa-session')
var onerror = require('koa-onerror')
var app = koa()
var http = require('http')

var logger = global.dawan.logger;

const config = global.dawan.config
// ****************************************************************
// *********************基本中间件***********************************
// ****************************************************************

// 1.错误处理
onerror(app)

// 2.session
// 使用内存session ,不用引入数据库
const sessionSecret = config.session_secret
app.keys = [sessionSecret]
app.use(session({
    key: 'koa:sess',
    maxAge: 120000,
    overwirte: true,
    httpOnly: true,
    signed: true
}, app))

// 3.body解析
app.use(bodyParser())

// 加载app需要使用的中间件
require('./app_middlewares')(app);
// 系统路由
require('./router')(app);

// koa 异常捕捉
app.on('error', function(err, ctx) {
    console.error('server error', err, ctx)
})

// express，koa 都是可以监听多个端口的
http.createServer(app.callback()).listen(3000)
http.createServer(app.callback()).listen(3001)
logger.info('app listen on 3000 and 3001');
