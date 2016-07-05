var colors = require('colors');

var MSG1 = "Bienvenido a la comunidad Jedi desde otro módulo";
var MSG2 = "Bienvenido al lado oscuro desde otro módulo";

exports.imprimirMensajes = function() {
    console.log(MSG1.blue);
    console.log(MSG2.red);
}