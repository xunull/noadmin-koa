class TraceReq {
    constructor({
        method,url,path,query,querystring,host,protocol,ip
    }) {
        this.method=method;
        this.url=url;
        this.path=path
        this.query=query
        this.querystring=querystring
        this.host=host
        this.protocol=protocol
        this.ip=ip
    }
}

module.exports=TraceReq