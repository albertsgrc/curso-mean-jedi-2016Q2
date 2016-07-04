// Necesitamos obtener el secret para poder generar el token
var secret = require('../config').jwt_secret;
var authRouter = require('express').Router();

// Este módulo lo utilizaremos para generar el token
var jwt = require('jsonwebtoken');

// Obtenemos el modelo del usuario
var User = require('mongoose').model('User');

authRouter.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {
    if (err) res.status(500).send(err);

    if (!user) res.status(401).send('No se ha encontrado el usuario');
    else {
      if (user.password !== password) {
        res.status(401).send('Password incorrecto');
      } else {
        var token = jwt.sign(user.toObject(), secret, {
          expiresInMinutes: 1440
        });
        res.json({
          token: token
        });
      }
    }
  });
});

module.exports = authRouter;
