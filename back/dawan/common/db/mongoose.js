var mongoose = require('mongoose')
var config = global.dawan.config
var logger = global.dawan.logger

// mongoose.connect('mongodb://localhost/noadmin');

exports.connect = function(connect_url){
    mongoose.connect(connect_url, {
        server: {
            poolSize: 10
        }
    })

    let db = mongoose.connection

    db.on('error', function() {
        logger.info('mongoose has an error')
    })

    db.once('open', function() {
        logger.info('mongoose has connecting')
    })

    return db;
}
