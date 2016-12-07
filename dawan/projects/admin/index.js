var path = require('path');

var mongoose= require('../../dawan/common/db/mongoose');
var config=global.dawan.config;
var logger = global.dawan.logger;

var common = global.dawan.common;


async function  readBanner(){
	var banner = await common.file.readFile(path.resolve(__dirname,'./banner.txt'))
	console.log(banner.toString())
}

readBanner();

mongoose.connect(config.db.mongodb);
