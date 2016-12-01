const logger = global.dawan.logger;
/**
 * 输出所有koa 的ctx的值
 * @param  {Function}  next [description]
 * @return {Generator}      [description]
 */
module.exports = function * (next) {

    logger.info('--------- request ---------------');

    logger.info(`this.header is ${JSON.stringify(this.header)}`);
    logger.info(`this.method is ${this.method}`);
    logger.info(`this.url is ${this.url}`);
    logger.info(`this.path is ${this.path}`);
    logger.info(`this.query is ${JSON.stringify(this.query)}`);
    logger.info(`this.querystring is ${this.querystring}`);
    logger.info(`this.length is ${this.length}`);
    logger.info(`this.host is ${this.host}`);
    // 检查客户端请求的缓存是否是最新
    logger.info(`this.fresh is ${this.fresh}`);
    // 与fresh的结果相反
    logger.info(`this.stale is ${this.stale}`);
    // 这个不能json.stringify
    logger.info(`this.socket is ${this.socket}`);
    logger.info(`this.protocol is ${this.protocol}`);
    logger.info(`this.secure is ${this.secure}`);
    logger.info(`this.ip is ${this.ip}`);
    logger.info(`this.ips is ${this.ips}`);
    logger.info(`this.subdomains is ${this.subdomains}`);

    yield next;

}
