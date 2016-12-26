module.exports = {
    getMenuById:`
                select * from menus where id = ?
                `,
                    //别忘了字段前,加前缀,否则都被覆盖了
    getRoleMenus:   `
                    select menus.* from menus , role_menu
                    where menus.id = role_menu.menu_id
                    and role_menu.role_id = ? and menus.pid = ?
                    `,
    create:         `
                    insert into menus(pid,name,uri,menu_icon,
                                        level,create_time,create_user)
                    values(?,?,?,?,?,now(),?)
                    `
}
