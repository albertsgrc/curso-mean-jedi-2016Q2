var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Función para definir el modelo del usuario
 */
module.exports = function() {
  var userSchema = new Schema({
    username: { type: String, required: true },

    password: { type: String, required: true },

    // Indica si el usuario tiene permisos de administrador
    is_admin: { type: Boolean, default: false }
  });

  mongoose.model('User', userSchema, 'users');
};

