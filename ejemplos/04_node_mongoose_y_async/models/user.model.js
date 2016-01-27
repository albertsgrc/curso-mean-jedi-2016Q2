var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Funcion para definir el modelo de un usuario
 */
module.exports = function() {
  var userSchema = new Schema({
    username: {type: String, required:true},
    password: {type: String, required: true},
    // tasks es un array de objectIds que hacen referencia al modelo Task
    // De este modo podemos establecer relaciones entre modelos,
    // simulando los joins de SQL
    tasks: [{
      type: Schema.Types.ObjectId, ref: 'Task'
    }]
    
    // Cuando hagamos un find del documento, este array tendrá ids de mongodb,
    // no tendrá tareas. Si queremos que mongoose nos substituya los ids
    // por los documentos correspondientes de la coleccion tareas,
    // haremos .find().populate('tasks'), donde tasks es el nombre
    // del atributo del que queremos que se substituyan los _id por
    // los documentos del modelo especificado como valor de ref
  });

  mongoose.model('User', userSchema, 'users');
};

