var express = require('express');
var mongoose = require('mongoose');
var router = module.exports = express.Router();
var async = require('async');

var Usuario = mongoose.model('Usuario');
var Producto = mongoose.model('Producto');

router.get('/:id/info', function(req, res) {
    Usuario.findById(req.params.id, function(error, usuario) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        }
        else res.status(200).json(usuario);
    });
});

router.post('/:id_usuario/compra/:id_producto', function(req, res) {
    function comprarProducto(usuario, producto) {
        --producto.stock;
        var encontrado = false;

        for (var i = 0; i < usuario.lista_de_la_compra.length && !encontrado; ++i) {
            if (usuario.lista_de_la_compra[i].idProducto === req.params.id_producto) {
                ++usuario.lista_de_la_compra[i].cantidad;
                encontrado = true;
            }
        }

        if (!encontrado) 
            usuario.lista_de_la_compra.push({ idProducto: req.params.id_producto, cantidad: 1 });
    }


    async.parallel([
        function(callback) {
            Usuario.findById(req.params.id_usuario, callback);
        },
        function(callback) {
            Producto.findById(req.params.id_producto, callback);
        }
    ], function(error, resultados) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
            return;
        }

        var usuario = resultados[0];
        var producto = resultados[1];

        if (!usuario) res.status(404).send("El usuario no existe");
        else if (!producto) res.status(404).send("El producto que intentas comprar no existe");
        else if (producto.stock === 0) res.status(420).send("No hay stock del producto");
        else {
            comprarProducto(usuario, producto);

            async.parallel([
                function(callback) {
                    usuario.save(callback);
                },
                function(callback) {
                    producto.save(callback);
                }
            ], function(error, resultados) {
                if (error) {
                    console.error(error);
                    res.status(500).json(error);
                }
                else res.status(200).json({
                    msg: "Producto comprado correctamente",
                    producto: producto,
                    usuario: usuario
                });
            });
        }
    });
});

router.all('*', function(req, res) {
    res.status(404).send("URL Inválida!");
});
