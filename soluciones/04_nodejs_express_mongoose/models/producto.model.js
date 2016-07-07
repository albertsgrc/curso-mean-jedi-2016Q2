var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
    var ProductoSchema = new Schema({
        modelo: { type: String, required: true },
        descripcion: String,
        precio: { type: Number, default: 0 },
        stock: { type: Number, default: 0 }
    });

    mongoose.model('Producto', ProductoSchema, 'productos');
};