var logger = global.dawan.logger;

exports.indexMenu = function * (next) {

    logger.info(this.nosession);

	this.reply({data:this.nosession.get('userMenu')});

}
