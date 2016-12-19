var path = require('path');
var co = require('co');

var mongoose= require('../../dawan/common/db/mongoose');
var config=global.dawan.config;
var logger = global.dawan.logger;

var common = global.dawan.common;


// async function  readBanner(){
// 	var banner = await common.file.readFile(path.resolve(__dirname,'./banner.txt'))
// 	console.log(banner.toString())
// }
//
// readBanner();

co(function * readBanner() {
	var banner = yield common.file.readFile(path.resolve(__dirname,'./banner.txt'))
	console.log(banner.toString())
})

// var fn = co.wrap(function* (val) {
//   return yield Promise.resolve(val);
// });
//
// fn(true).then(function (val) {
//
// });

mongoose.connect(config.db.mongodb);
