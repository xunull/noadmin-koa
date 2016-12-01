const shelljs = require('shelljs');
const path = require('path');
const fs = require('fs');
const businessDataFolder = dawan.config.businessDataFolder;

module.exports =function generate(businessName) {
    let folderPath = path.resolve(businessDataFolder, businessName);
    fs.access(folderPath, err => {
        if (err) {
            // 路径不存在
            shelljs.mkdir('-p', folderPath);
        } else {
            // 路径已经存在
        }
    })

}
