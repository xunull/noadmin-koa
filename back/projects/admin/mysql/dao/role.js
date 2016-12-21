const mapper = require('../mapper/role')

module.exports = Role

function Role(connection) {
    this.connection = connection
}

Role.prototype.getRoleByUserId = function(user_id){
    return this.connection.execute(mapper.getRoleByUserId,[user_id])

}
