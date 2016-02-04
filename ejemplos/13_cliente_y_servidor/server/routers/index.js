var fs = require('fs');

// Lee todos los ficheros de la carpeta que contienen en su nombre el string .router
// y los requiere, guardando en exports.nombre_fichero el valor del require
// donde nombre_fichero es el nombre del fichero sin la parte final .router.js

// Esto se traduce en que si tenemos los ficheros tareas.router.js y usuarios.router.js
// será como hacer exports.tareas = require('./tareas.router') y 
// exports.usuarios = require('./usuarios.router')

// Notad que eso nos obliga a seguir la convención de que todos los ficheros
// js con routers que queramos incluir deberán contener el substring .router
fs.readdirSync(__dirname)
    .filter(function(fname) {
        return fname.indexOf(".router") !== -1;
    })
    .forEach(function(router) {
        var routerName = router.slice(0, router.indexOf('.'));
        exports[routerName] = require("./" + router);
    });