const logger = global.dawan.logger

const Dao = global.projects.admin.mysqlDao
const Role = Dao.Role

exports.roles = function*() {
    try {
	    let roles = yield Role.getRolesForPage()
		logger.info(roles)
		logger.info('------------')
		this.reply({data:roles})
	} catch(err) {
		this.reply({ok:false,error_msg:'服务出错'})
	}

}

exports.allroles = function*() {
    let roles = yield Role.getAllRoles()
    this.reply({data:roles})
}

exports.create = function*() {

}

exports.delete = function* () {

}
