var crypto = require('crypto')

exports.passwordHmac = function(password,pass_salt) {
	let hmac = crypto.createHmac('sha256',pass_salt);
	hmac.update(password)
	return hmac.digest('hex');
}
