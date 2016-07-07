var fs = require('fs');

fs.readdirSync(__dirname)
    .filter(function(fname) {
        return fname.indexOf(".router") !== -1;
    })
    .forEach(function(router) {
        var routerName = router.slice(0, router.indexOf('.'));
        exports[routerName] = require("./" + router);
    });