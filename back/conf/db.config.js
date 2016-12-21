
module.exports={
	mongodb: 'mongodb://127.0.0.1/noadminKoa',
	redis: {
		redis_host: '127.0.0.1',
		redis_port: 12312,
		redis_password: 123456
	},
	mysql: {
		host:'127.0.0.1',
		user:'root',
		password:'123456',
		database:'noadmin_koa',
		config:{
			default_page_limit:10
		}
	}
}
