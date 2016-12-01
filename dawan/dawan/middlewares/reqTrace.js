/**
 * 请求中间件跟踪
 *
 */
const Trace = require('../core/trace/trace');
const TraceReq = require('../core/trace/trace-req')
const logger = global.dawan.logger;
const getTraceLogger = require('../common').logger.getTraceLogger;

module.exports = function* (next) {

    let traceReq = new TraceReq(this)
    let trace = new Trace(traceReq);
    intensive(this, trace);
    yield next;
    // logger.info(trace);

}

function traceLog(msg, meta) {
    this.trace.logs.push(msg);
    // let tempLogger = getTraceLogger('test');
    // tempLogger.info(this, msg, meta);
    // tempLogger.log.call(this,'info',msg,meta);
}

function intensive(ctx, trace) {
    Object.defineProperty(ctx, 'traceLog', {
        value: traceLog,
        enumerable: true,
        configurable: false,
        writable: false
    })

    Object.defineProperty(ctx, 'trace', {
        value: trace,
        enumerable: true,
        configurable: false,
        writable: false
    })
}
