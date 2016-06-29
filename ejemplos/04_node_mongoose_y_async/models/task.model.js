var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Funcion para definir el modelo de la coleccion tasks
 */
module.exports = function() {

  // Esquema que seguirán los objetos de la colección tasks
  var taskSchema = new Schema({
    // title es un atributo que tendrá que ser obligatoriamente de tipo string, 
    // y que deberá tener valor en todos los documentos (por el required: true)
    title: {type: String, required: true},
    // En este caso este atributo podría ser undefined o nulo
    description: {type: String},
    // Si no se especifica el atributo completado, por defecto tendrá valor false
    completed: {type: Boolean, default:false},
    dueDate: {type: Date},
    // Data de creación, en este caso tiene como default el momento actual
    created: {type: Date, default: Date.now},
    // Definimos que subtasks es un array de documentos
    subtasks: [{text: String, completed: Boolean}]
  });

  // Especificamos nombre del modelo, esquema, nombre de la colección,
  // en este caso el nombre del modelo es 'Task' 
  // Este nombre lo usaremos luego para obtener el modelo que deseemos,
  // llamando a mongoose.model('Task')
  // El esquema es el que acabamos de crear
  // Y la colección de la bd en la que se guardarán los documentos se llama 'tasks'
  mongoose.model('Task', taskSchema, 'tasks');
};

