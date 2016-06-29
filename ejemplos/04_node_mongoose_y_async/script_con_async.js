// La lista de callbacks anidadas que hay en script.js no es muy bonita...
// Usaremos el módulo async para hacer el código más limpio.
// El siguiente código hace lo mismo que el script.js

var mongoose = require('mongoose');
var async    = require('async');
var log      = require('winston');


var models = require('./models');

mongoose.connect('mongodb://localhost/example_03');

models.initialize();

var db = mongoose.connection;

db.on('error', function(err) {
  log.error(err);
});


// ******* OPERACIONES DE LA BASE DE DATOS CON ASYNC ********
// Este método ejecuta las funciones que se le pasan por parámetro en orden serial (secuencialmente)
// Cuando una función llama el parámetro callback (o la pasa como parámetro 
// de otra función que la va a llamar en su lugar) la siguiente función se ejecuta.
// Si alguna de las funciones llama a su parámetro callback con un valor no nulo como primer parámetro
// entonces significa que ha habido un error, y las siguientes funciones no se ejecutan.
async.waterfall([
    function(callback) {
      db.once('open', callback); 
    },
    function(callback) {
      log.info('MongoDB connection open');
      // Notad que la callback que espera remove ya es de la forma: function(error, resultado) { ... }
      mongoose.model('User').remove(callback);
    },
    function(res, callback) {
      mongoose.model('Task').remove(callback);
    },
    function(res, callback) {
      var user = {
        username: 'jedi',
        password: '1234',
        tasks: []
      };
      
      var User = mongoose.model('User');
      var user_instance = new User(user);
      user_instance.save(callback);
    },
    function(res, nInserted, callback) {
      mongoose.model('User').find({}, callback);
    },
    function(res, callback) {
      // Notad que la callback anterior era del tipo function(err, res) { ... }
      // donde res son los documentos que se han encontrado en la bd.
      // Es por eso que la callback (esta función) recibe rescomo primer parámetro.
      // En general, si la callback se llama así: callback(error, param1, param2, param3,...)
      // entonces la siguiente función recibira los parámetros de la siguiente forma:
      // function(param1, param2, param3, ..., callback) { ... }
      log.info(res.toString());
      
      var user_instance = res[0];
      user_instance.password = '54321';
      user_instance.save(callback);
    },
    function(res, nInserted, callback) { 
      mongoose.model('User').find({}, callback); 
    },
    function(res, callback) { 
      log.info(res.toString()); 
      callback(null, "everything ok!");
    }
],
  function(error, result) {
    // Esta función se llama cuando alguna función del array (parámetro anterior)
    // ha fallado con un error, o cuando terminan todas las funciones correctamente.
    // El parámetro error contiene el error no nulo que se pasó como parámetro del callback,
    // o es nulo si ninguna función ha llamado su callback con un error no nulo.
    // Si no ha habido error, el parámetro resultado contiene el resultado de la última función
    // (segundo parámetro pasado a la callback), que es en este caso "everything ok!"
    
    if (error) log.error(error);
    else log.info(result);

    db.close();
  }
);
