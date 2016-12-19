const ejs = require('ejs');
const logger = global.dawan.logger;

module.exports = function * (next) {

    if(undefined===this.reply) {
        addReply(this);
    } else {
    }

    yield next;
}

function addReply(ctx) {

    function reply({
        ok = true,
        data = null,
        error_code = 0,
        error_msg = ''
    }) {
        ctx.type = 'application/json; charset=utf-8';
        ctx.body = JSON.stringify({ok: ok, data: data, error_code: error_code, error_msg: error_msg});
    }

    Object.defineProperty(ctx, 'reply', {
        value: reply,
        enumerable: true,
        configurable: false,
        writable: false
    });

}

function addEjsRender() {

    function ejsRender(filename, data) {

    }

    Object.defineProperty(this, 'ejsRender', {
        value: ejsRender,
        enumerable: true,
        configurable: false,
        writable: false
    })

}
