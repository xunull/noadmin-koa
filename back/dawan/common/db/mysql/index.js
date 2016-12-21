var mysql = require('mysql')
var logger = require('../../logger/log4js')
var Connection = require('./connection')

exports.connect = function(host,user,password,database) {
    var pool = mysql.createPool({
        connectionLimit: 10,
        host: host,
        user: user,
        password: password,
        database: database
    })
    return new Connection(pool)
}

