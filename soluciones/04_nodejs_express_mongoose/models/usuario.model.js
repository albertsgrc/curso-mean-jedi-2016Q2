var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = function() {
    var UsuarioSchema = new Schema({
        nombre: { type: String, required: true },
        lista_de_la_compra: [ { idProducto: String, cantidad: Number } ]
    });

    mongoose.model('Usuario', UsuarioSchema, 'usuarios');
};