
module.exports = {
    getUserByLoginName: `
                        select * from users where login_name = ?
                        `,

    getUsersForPage:`
                    select * from users order by id limit ? ,?
                    `,

    saveNameAndPasswd:  `
                        insert into users   (
                                            user_code,login_name,passwd,active,is_block,
                                            create_time,create_user
                                            )
                        values(?,?,?,0,1,now(),?)
                        `,

    deleteUserById:     `
                        delete from users where id = ?
                        `,

    blockUserById:      `
                        update users set is_block = 0 where id = ?
                        `,

    unLockUserById:     `
                        update users set is_block = 1 where id = ?
                        `
}
