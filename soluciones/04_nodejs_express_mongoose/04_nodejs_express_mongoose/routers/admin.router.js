var express = require('express');
var mongoose = require('mongoose');
var router = module.exports = express.Router();

var Usuario = mongoose.model('Usuario');
var Producto = mongoose.model('Producto');

router.get('/listaUsuarios', function(req, res){
    Usuario.find(function(error, usuarios) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        }
        else res.status(200).json(usuarios);
    });
});

router.post('/anadirProducto', function(req, res) {
    var producto = new Producto(req.body);

    producto.save(function(error, resultado) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        }
        else res.status(200).send({
            msg: "Producto añadido correctamente",
            producto_anadido: resultado
        });
    });
});


router.delete('/borrarProducto/:id', function(req, res){
    Producto.findByIdAndRemove(req.params.id, function(error, resultado) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        }
        else res.status(200).json({
            msg: resultado ? "Producto borrado correctamente" : "El producto no existe",
            producto_borrado: resultado
        });
    });
});


router.patch('/actualizarProducto/:id', function(req, res) {
    Producto.findByIdAndUpdate(req.params.id, req.body, function(error, resultado) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        }
        else res.status(200).json({
            msg: resultado ? "Producto actualizado correctamente" : "El producto no existe",
            producto_anterior: resultado
        });
    });
});

router.all('*', function(req, res) {
    res.status(404).send("URL Inválida!");
});
