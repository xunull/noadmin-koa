const mysql = require('mysql');

const logger = require('../../logger/log4js');

const Connection = require('./connection');

exports.connect = function (host, user, password, database) {
    const pool = mysql.createPool({
        connectionLimit: 10,
        host,
        user,
        password,
        database,
    });
    return new Connection(pool);
};


