module.exports = function(connection) {

    let User = new (require('./user'))(connection)
    let UserRole = new (require('./user_role'))(connection)
    let Role = new (require('./role'))(connection)
    let Menu = new (require('./menu'))(connection)
    let RoleMenu = new (require('./role_menu'))(connection)
    return {
        User,
        UserRole,
        Role,
        Menu,
        RoleMenu
    }

}