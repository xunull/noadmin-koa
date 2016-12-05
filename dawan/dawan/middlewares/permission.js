var corePermission = require('../core/permission');

module.exports = function(app) {
    app.use(corePermission);
}
