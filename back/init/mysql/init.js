const co = require('co')

module.exports = function (connection) {
    co(function*(){
        yield require('./createTable')(connection)
        yield require('./insertRecord')(connection)
    })
    
}