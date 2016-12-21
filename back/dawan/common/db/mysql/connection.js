/**
 * 该connection 是从pool中提取的,但是使用时无需关系
 * 默认使用了pool
 */
function Connection(pool) {
    this.pool = pool
}

module.exports = Connection

Connection.prototype.execute = function (sql, params) {
    return new Promise((resolve, reject) => {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, params, function (err, result) {
                    connection.release()
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }

                })
            }


        })
    })

}
