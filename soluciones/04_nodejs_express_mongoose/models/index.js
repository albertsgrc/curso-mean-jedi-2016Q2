var fs = require('fs');

exports.init = function() {
    fs.readdirSync(__dirname)
    .filter(function(fname) {
        return fname.indexOf(".model") !== -1;
    })
    .forEach(function(model) {
        require("./" + model)();
    });
};