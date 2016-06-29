var fs = require('fs');

var colors = require('colors');

var callback = function(error, resultado) {
    if (error) {
        console.error("Ha habido un error!");
        console.error(error);
        process.exit(1);
    }

    console.log(resultado.toString().blue);
};

exports.listar_ficheros = function(camino_carpeta) {
    fs.readdir(camino_carpeta, callback);
}

exports.escribir_contenido = function(camino_fichero) {
    fs.readFile(camino_fichero, 'utf-8', callback);
}