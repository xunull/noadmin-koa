module.exports = function *(next){
    let start = new Date;
    yield next;
    let ms = new Date - start;
    console.log('请求耗时 %s %s - %s ',this.method,this.url,ms);

}
