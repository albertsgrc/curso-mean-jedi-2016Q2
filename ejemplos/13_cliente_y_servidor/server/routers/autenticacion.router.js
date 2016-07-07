var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var async = require('async');
var bcrypt = require('bcrypt');

var config = require('../config');

var router = module.exports = express.Router();

var Usuario = mongoose.model('Usuario');

router.post('/', function(req, res) {
    // Recibimos username y password del login por el req.body
    var username = req.body.username;
    var password = req.body.password;

    async.waterfall([
        function(callback) {
            // Buscamos el usuario en la BD
            Usuario.findOne({ username: username }, callback);
        },
        function(usuario, callback) {
            // Si no existe respondemos con error
            if (!usuario) res.status(404).send("El usuario no existe");
            // Sino comparamos la contraseña `a pelo` que nos ha enviado el cliente
            // con la encriptada que habia en la BD
            else bcrypt.compare(password, usuario.password, callback);
        },
        function(equalPasswords, callback) {
            // Si no son iguales respondemos con error
            if (!equalPasswords) res.status(401).send("Contraseña incorrecta");
            else {
                // Si no creamos el token con info de username y password
                // (no ponemos el array de tareas porque podría ser grande,
                // y nos interesa mantener el token pequeñito)
                // y le pasamos tambien el string secreto que tenemos en config.js
                // y le ponemos que expire al cabo de 1 día

                // Ahora no hay que hacer toObject porque ya es un objeto javascript
                // No como antes que era una instancia de un modelo de mongoose
                var token = jwt.sign(
                    { username: username, password: password },
                    config.JWT_SECRET,
                    { expiresIn: 24*60*60 } // 1 día
                );
                // Y se lo devolvemos al cliente
                res.status(200).send({ token: token });
            }
        }
    ], function(error) {
        // Si ha habido error en alguna de las callbacks, devolvemos error
        if (error) res.status(500).json(error);
    });
});
