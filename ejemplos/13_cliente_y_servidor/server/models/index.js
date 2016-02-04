var fs = require('fs');

// Ahora en vez de mantener los modelos en un array, los obtenemos
// leyendo los ficheros de la carpeta y filtrando aquellos que tengan como 
// substring en el nombre el string .model

// Notad que eso nos obliga a seguir la convención de que todos los ficheros
// js con modelos que queramos incluir deberán contener el substring .model
exports.init = function() {
    fs.readdirSync(__dirname)
    .filter(function(fname) {
        return fname.indexOf(".model") !== -1;
    })
    .forEach(function(model) {
        require("./" + model)();
    });
};