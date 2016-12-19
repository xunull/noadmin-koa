/**
 * 项目中的一些文件目录的配置
 */
const path = require('path')

module.exports = {
	// log 文件目录
    logDir: path.resolve(__dirname, '../logs'),
	// 业务代码目录
    projectsPath: path.resolve(__dirname, '../projects'),
    // 业务产生的数据的存放目录
    projectsDataFolder: path.resolve(__dirname, '../projectsData'),
    front:{
        view: path.resolve(__dirname, '../../', 'front/xiaowan/views'),
        libsDir: path.resolve(__dirname, '../../','front/libs'),
        publicDir:path.resolve(__dirname,'../..','front/xiaowan/assets'),
        distDir: path.resolve(__dirname, '../../', 'front/dist')
    }
}
