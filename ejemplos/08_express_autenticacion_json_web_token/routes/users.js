var mongoose = require('mongoose');

var userRouter = require('express').Router();

var jwt_secret = require('../config').jwt_secret;
var express_jwt = require('express-jwt');

var User = mongoose.model('User');


/**
 * Esta función devuelve todos los usuarios de la base de datos
 * Está restringida para que sólo funcione si es administrador

   express_jwt({ ... }) es el middleware que verifica que
   el usuario esté autenticado. Si no lo está, responderá la request con
   un error de autenticación y no llamará a next(), por lo que no se va a
   ejecutar la función final que obtiene los usuarios
 */
userRouter.get('/users',
    express_jwt({secret: jwt_secret, requestProperty: 'usuario'}),
    function(req, res, next) {
      if (req.usuario.is_admin) {
        User.find({}, function(err, users) {
          if (err) res.status(500).send(err);
          else res.status(200).send(users);
        })
      }
      else {
          res.status(403).send('No tienes acceso a este recurso!');
      }
    }
);

/**
 * Ruta para crear un nuevo usuario
 */
userRouter.post('/', function(req, res, next) {
  var user_instance = new User(req.body);
  user_instance.save(function(err, newUsr) {
    if (err) res.status(500).send(err);
    else res.status(200).json({ user: newUsr });
  });
});

/**
 * Ruta para borrar un usuario. Sólo se puede borrar el mismo usuario
 * que hace la petición o el admin
 */
userRouter.delete('/:id', express_jwt({secret: jwt_secret}),function(req, res, next) {
  if (req.user.is_admin || req.user._id.toString() === req.params.id) {
    User.findOne({ _id: req.params.id }, function(err, user) {
      if (err) res.status(500).send(err);
      else {
        if (user) {
          user.remove();
          res.status(204).end();
        }
        else res.status(404).end();
      }
    })
  }
  else res.status(401).send('No puedes borrar otros usuarios!');
});

/**
 * Ruta para actualizar un usuario. Igual que para borrar, sólo un admin
 * o el mismo usuario pueden actualizar
 */
userRouter.patch('/:id', express_jwt({secret: jwt_secret}), function(req, res, next) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) res.status(500).send(err);
    else if (!user) res.status(404).end();
    else {
      user.username = req.body.username || user.username;

      // Notad que la contraseña se guarda tal cual.
      // En el siguiente ejemplo veremos como guardar la contraseña hasheada,
      // ya que guardarla tal y como nos llega es inseguro por si alguien
      // consigue acceder a la base de datos y leer las contraseñas
      user.password = req.body.password || user.password;

      user.save(function(err, newUsr) {
        if (err) res.status(500).send(err);
        res.status(200).json({ user: newUsr });
      });
    }
  });
});

module.exports = userRouter;
