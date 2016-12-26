module.exports = {
    getRoleByUserId:`
                    select * from user_role where user_id = ?
                    `,
    getRolesForPage:`
                    select * from roles order by id limit ? ,?
                    `,
    getMenuChildren:`
                    select * from roles where pid = ?
                    `,
    getRoleMenus:   `
                    select * from menus , role_menu
                    where menus.id = role_menu.menu_id
                    and role_id = ?
                    `,
    getAllRoles:`
                select * from roles order by id
                `

}
