// Requerimos los modulos mongoose y log
var mongoose = require('mongoose');
var log      = require('winston');


// Requerimos nuestro propio módulo de modelos, que está en la carpeta "./models"
// Recordad que el fichero que se incluye realmente es ./models/index.js
var models = require('./models');

// Nos conectamos a la base de datos local llamada `example_03` usando mongoose. 
// Puerto `27017` por defecto.
mongoose.connect('mongodb://localhost/example_03');

// Ahora inicializamos todos los modelos que hayamos definido con mongoose.
// Ver "./models/index.js" para la implementación.
models.initialize();

// Ahora obtenemos el objeto de la conexion con la base de datos
var db = mongoose.connection;

// Podemos poner una función callback para tratar el caso de que haya un error al conectar con la bd.
// Y loguear el error en la consola para poder hacer debug.
db.on('error', function(err) {
  log.error(err);
});


// ******* OPERACIONES CON LA BASE DE DATOS SIN ASYNC ********

// Esta callback se asegura que estamos conectados a la base de datos cuando empezamos a hacer operaciones
// con ella. Recordad que la conexión se hace asíncronamente y puede tardar un tiempo.
db.once('open', function () {
  log.info('Conexión con MongoDB abierta');

  // Ahora podemos obtener los modelos que hemos definido por su nombre
  var User = mongoose.model('User');
  var Task = mongoose.model('Task');
  
  // Y hacer operaciones con el modelo.
  // Este es un ejemplo para que podáis ver como hacerlas
  // El funcionamiento es muy similar a como lo hacíamos con el módulo mongodb
  // La diferencia es que por ejemplo cuando hacemos un find, este ya nos devuelve directamente
  // un array de Javascript y no hace falta llamar el método .toArray()

  // Primero, borramos todos los documentos existentes, en caso de que hayamos dejado alguno 
  // de ejecuciones previas de este script.

  // Borramos todos los usuarios
  User.remove(function(error, res) {
    if (!error) {
      // Borramos todas las tareas
      Task.remove(function(error, res) {
        if (!error) {
          // Creamos un objeto con los datos del documento (usuario) que vamos a insertar
          var user = {
            username: 'jedi',
            password: '1234',
            tasks: []
          };
          
          // Pasamos los datos al constructor del modelo.
          var user_instance = new User(user);

          // Y lo guardamos en la base de datos.
          // Notad que la función no es como antes sino save.
          // Tambien podéis usar create en vez de save, hace lo mismo
          user_instance.save(function(err, res, nInserted) {
            if (!err) {

              // El usuario se ha guardado correctamente
              // Ahora hacemos un find para printarlo por consola
              // Notad que podríamos haber usado findOne aquí, ya que sólo hay un usuario
              User.find({} ,function(err, res) {
                if (!err) {
                  log.info(res.toString());

                  // Actualizamos la password
                  user_instance.password = '54321';
                  user_instance.save(function(err, res, nInserted) {
                    if (!err) {
                      // El usuario se ha guardado correctamente
                      // Ahora hacemos un find de nuevo y lo printamos por consola
                      User.find({}, function(err, res) {
                        if (!err) log.info(res.toString());
                        db.close();
                      });
                    }
                  });
                }
              });
            }
          })
        }
      })
    }
  });
});
