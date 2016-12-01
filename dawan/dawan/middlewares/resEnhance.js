module.exports = function * (next) {

    function reply({
        ok = true,
        data = null,
        error_code = 0,
        error_msg = ''
    }) {
        this.type = 'application/json; charset=utf-8';
        this.body=JSON.stringify({
            ok:ok,
            data:data,
            error_code:error_code,
            error_msg:error_msg
        });
    }

    Object.defineProperty(this, 'reply', {
        value: reply,
        enumerable: true,
        configurable: false,
        writable: false
    });
    yield next;

}
