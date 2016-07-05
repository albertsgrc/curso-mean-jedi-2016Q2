var fs = require('fs');

var PATH = __dirname;

module.exports = {
    imprimirArchivosCarpeta: function() {
        fs.readdir(PATH, function(error, ficheros) {
            if (error) console.error(error);
            else {
                console.log(ficheros);
                console.log("Número de ficheros: " + ficheros.length);
            }
        });
    }
}