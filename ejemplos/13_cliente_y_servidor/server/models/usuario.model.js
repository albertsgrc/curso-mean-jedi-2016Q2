var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
    // Notad que se va a crear un atributo _id también para este esquema
    // (Cada tarea del array tareas)
    var TareaSchema = new Schema({
        // trim elimina espacios al principio y final del string
        // i.e "    albert   " se convierte en "albert"
        titulo: { type: String, trim: true, required: true },
        completada: { type: Boolean, default: false }
    });

    // Notad que podemos poner como tipo otro esquema que hayamos definido
    // (atributo tareas)
    var UsuarioSchema = new Schema({
        // unique: true  aquí especifica que no van a poder haber dos documentos
        // en la colección usuarios con el mismo username
        username: { type: String, required: true, trim: true, unique: true },
        password: { type: String, required: true },
        tareas: { type: [TareaSchema], default: [] }
    });

    mongoose.model('Usuario', UsuarioSchema, 'usuarios');
};
