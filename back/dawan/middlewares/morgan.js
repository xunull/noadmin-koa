const morgan = require('morgan')

// create "middleware"
const logger = morgan('combined')

module.exports = function *(next){
    yield next
    logger(this.req, this.res, function (err) {

     })
}
