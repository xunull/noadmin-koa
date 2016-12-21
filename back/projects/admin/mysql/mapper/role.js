module.exports = {
    getRoleByUserId:`
                    select * from user_role where user_id = ?
                    `
}
