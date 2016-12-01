/**
 * 代理koa的网络请求
 *
 */

const http = require('http');
const https = require('https');
const request = require('request');

/**
 * [exports description]
 * @param  {[type]} ctx [koa的上下文环境]
 * @return {[type]}     [description]
 */
module.exports = function(ctx) {

    console.log('ctx request');
    console.log(ctx.request);
    console.log('-----------------------');
    console.log('ctx req');
    console.log(ctx.req);

    if ('POST' === ctx.method) {
        request.post()
    } else if ('GET' === ctx.method) {

    }
}

/**
 * 生成请求方法
 * @return {[type]} [description]
 */
function generateRequestMethod() {
    ctx.koaAgentObj = {};
    ctx.koaAgentObj.method = ctx.method;

    return this;
}

function generateRequest() {
    let koaAgentObj = {};
    koaAgentObj.method = ctx.method;
    koaAgentObj.host = ctx.hostname;
    // 端口不一定需要做完全一样的转发,依据目标地址而定
}

// function https(options, sourceRes) {
//     return new Promise((resolve, reject) => {
//         let req = https.request(options, (destRes) => {});
//         req.write(post_data + '\n');
//         req.end();
//         req.on('error', (err) => {
//             reject(err);
//         });
//     });
//
// }
//
// function http(options) {}
