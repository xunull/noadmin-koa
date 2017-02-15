const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const onerror = require('koa-onerror');
const http = require('http');


const config = global.dawan.config;
const logger = global.dawan.logger;

// ****************************************************************
// *********************基本中间件***********************************
// ****************************************************************

const app = koa();
global.dawan.koaApp = app;

// 1.错误处理
onerror(app);

// 2.session
const sessionSecret = config.session_secret;
app.keys = [sessionSecret];
app.use(session({
    key: 'koa:sess',
    maxAge: 120000,
    overwirte: true,
    httpOnly: true,
    signed: true,
}, app));

// 3.body解析
app.use(bodyParser());

// 加载app需要使用的中间件
require('./base_middlewares')(app);
// 系统路由
require('./router')(app);

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

// express，koa 都是可以监听多个端口的
http.createServer(app.callback()).listen(config.port);
logger.info('app listennig on ', config.port);
