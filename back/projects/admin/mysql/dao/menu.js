const mapper = require('../mapper/menu')

module.exports = Menu

function Menu(connection) {
    this.connection = connection
}

Menu.prototype.getMenuById = function(menu_id) {
    return this.connection.execute(mapper.getMenuById,[menu_id])
}
