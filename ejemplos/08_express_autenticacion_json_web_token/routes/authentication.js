// Necesitamos obtener el secret para poder generar el token
var secret = require('../config').jwt_secret;
var authRouter = require('express').Router();

// Este módulo lo utilizaremos para generar el token
var jwt = require('jsonwebtoken');

// Obtenemos el modelo del usuario
var User = require('mongoose').model('User');

/**
 * En esta ruta se generará un token de autenticación a enviar al usuario. El cliente
 * usa este token para acceder a las rutas protegidas de la API, es decir,
 * aquellas que requieran de login.
 */
authRouter.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  // Comprobamos que el usuario exista y obtenemos su documento de la BD
  User.findOne({ username: username }, function(err, user) {
    if (err) res.status(500).send(err);

    if (!user) res.status(401).send('No se ha encontrado el usuario');
    else {
      // Comprobamos las contraseñas
      if (user.password !== password) {
        // Si no son iguales le enviamos un mensaje informando de la situación
        res.status(401).send('Password incorrecto');
      } else {

        // Generamos el token con el modulo jwt.
        // Le pasamos como primer parámetro el documento del usuario
        // Y como segundo el secret (string que solo concemos nosotros)
        // Ver fichero config.js para más info
        console.log(user);
        var token = jwt.sign(user.toObject(), secret, {
          expiresInMinutes: 1440 // Este token expirará en 24h
        });

        // Notad que esto nos libra de guardar cualquier estado en el servidor.
        // Un usuario está autenticado si tiene un token válido que podamos
        // verificar que hemos dado nosotros (con el middleware express_jwt)
        // y que no haya expirado. La información del momento exacto de expiración 
        // se guarda en el token en sí, por lo tanto no guardamos ningún estado
        // en la memoria del servidor.

        // Le enviamos el token al cliente
        res.json({
          token: token
        });
      }
    }
  });
});

module.exports = authRouter;