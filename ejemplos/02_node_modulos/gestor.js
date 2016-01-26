

// Importamos nuestro propio módulo que hemos creado en
// la carpeta gestor_ficheros
var colors = require('colors');

var gestor_ficheros = require('./gestor_ficheros');

// Usamos sus métodos

console.log("Voy a listar los ficheros de la carpeta ficheros y a escribir mi propio código\n".red);

gestor_ficheros.listar_ficheros('./ficheros');


gestor_ficheros.escribir_contenido('./gestor.js');