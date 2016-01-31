var colors = require('colors');
var _ = require('lodash');

var modulo_local = require('./modulo_local');
var modulo_archivos = require('./modulo_archivos');

var index = 0;

var MSG1 = "Bienvenido a la comunidad Jedi";
var MSG2 = "Bienvenido al lado oscuro";

var interval = setInterval(function() {
    switch(index++) {
        case 0:
            console.log(MSG1.blue);
            console.log(MSG2.red);
            break;

        case 1:
            modulo_local.imprimirMensajes();
            break;
        
        case 2:
            modulo_archivos.imprimirArchivosCarpeta();
            break;
        
        default:
            var decir = function(que, quien) {
                console.log(que + " " + quien);
            }

            var saludar = _.partial(decir, "Hola");

            saludar("Fabian Cancellara");
            saludar("Enric Mas");

            var felicitar = _.partial(decir, "Felicidades");

            felicitar("José Joaquín Rojas");
            felicitar(_.repeat("lol", 5));

            var users = [
              { 'user': 'barney',  'age': 36 },
              { 'user': 'fred',    'age': 40 },
              { 'user': 'pebbles', 'age': 1 }
            ];

            var youngest = _.chain(users)
              .sortBy('age')
              .map(function(chr) {
                return chr.user + ' is ' + chr.age;
              })
              .first()
              .value();

            console.log(youngest);

            clearInterval(interval);
    }
}, 3000);