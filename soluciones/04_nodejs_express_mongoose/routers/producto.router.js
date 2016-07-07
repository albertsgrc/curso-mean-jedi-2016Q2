var express = require('express');
var mongoose = require('mongoose');
var router = module.exports = express.Router();

var Producto = mongoose.model('Producto');

router.get('/:id', function(req, res) {
    Producto.findById(req.params.id, function(error, producto) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        }
        else res.status(200).json(producto);
    });
});

router.all('*', function(req, res) {
    res.status(404).send("URL Inválida!");
});