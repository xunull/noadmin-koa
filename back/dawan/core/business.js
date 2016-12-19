const defaultLogger = dawan.logger;

class Business {

    constructor() {
        this.logger=defaultLogger;
    }
    setLogger(logger){
        this.logger = logger;

    }
    init(){

    }
    destroy(){
        // 此方法对于业务模块可能并不使用，
        // 一个业务不使用，并不一定需要摧毁它吧
        // 不过先占个位置吧
    }
}

module.exports = Business;
