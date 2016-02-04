var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var express_jwt = require('express-jwt');
var config = require('../config');

var router = module.exports = express.Router();

var Usuario = mongoose.model('Usuario');

// Registrar un nuevo usuario
router.post('/', function(req, res) {
    // Comprobamos que nos ha indicado una contraseña y username
    if (!req.body.username || !req.body.password) {
        res.status(500).send("Debes especificar usuario y contraseña");
        return;
    }

    // Encriptamos la contraseña
    bcrypt.hash(req.body.password, 12, function(err, hashedPassword) {
        if (err) res.status(500).json(err);
        else {
            // Guardamos en la bd el usuario
            req.body.password = hashedPassword;
            var user_instance = new Usuario(req.body);

            user_instance.save(function(err, saved_user) {
                if (err) res.status(500).json(err);
                else {
                    // No queremos enviar el password de vuelta al cliente
                    // Para ello hay que hacer un toObject y un delete
                    // Porqué? porque realmente saved_user no es un objeto 
                    // javascript, sino una instancia del modelo Usuario
                    saved_user = saved_user.toObject();
                    delete saved_user.password;
                    // Devolvemos el documento guardado
                    res.status(200).json(saved_user);
                }
            });
        }
    }); 
});

// A partir de aquí todas las rutas van a requerir estar autenticado
// Por eso usamos el middleware de express_jwt, pasandole el SECRET para
// que pueda desencriptar el token y comprobar que es correcto
// Como especificamos requestProperty: 'usuario' en req.usuario tendremos
// la info del usuario desencriptada
router.use(express_jwt({ secret: config.JWT_SECRET, requestProperty: 'usuario' }));

// Obtener un usuario y sus tareas
router.get('/', function(req, res) {
    Usuario.findOne({ username: req.usuario.username }, function(err, user) {
        if (err) res.status(500).json(err);
        else res.status(200).json(user);
    });
});

// Crear una nueva tarea
router.post('/tareas', function(req, res) {
    var tarea = req.body;

    var query = { username: req.usuario.username };
    var update = { $push: { tareas: tarea } };
    
    // Indica que queremos que el objeto que nos devuelva la callback (updated) 
    // sea el nuevo (después de haberle aplicado la actualización) y no el viejo
    // Si no lo ponemos por defecto nos pone el viejo
    var options = { 'new': true };

    Usuario.findOneAndUpdate(query, update, options, function(err, updated) {
        if (err) res.status(500).json(err);
        else res.status(200).json(updated);
    });
});

// Editar una tarea
router.patch('/tareas/:id', function(req, res) {
    // Filtramos por usuario
    // Y queremos referirnos a un elemento concreto del array tareas,
    // el que tenga propiedad _id = al id que nos pasan por la url
    var query = { username: req.usuario.username, "tareas._id": req.params.id };
    
    // En este bucle creo el objeto con las propiedades y valores
    // que quiero modificar de la tarea
    var updateObj = {};
    for (var property in req.body)
        if (req.body.hasOwnProperty(property))
            updateObj["tareas.$." + property] = req.body[property];

    // Lo tengo que hacer dado que por el body me pasan atributos de tarea,
    // pero estoy actualizando un usuario, por lo que tengo que poner el
    // prefijo tareas.$. a todas las propiedades para especificar que me refiero
    // a un elemento concreto del array tareas del usuario.
    // Qué elemento? Cuando accedemos a <array>.$ nos referimos al elemento
    // del array que estamos especificando en la query 
    // (segunda parte, "tareas._id: req.params.id"), en este caso tareas.$
    // se referirá al elemento del array tareas con _id = req.params.id

    var update = { $set: updateObj };

    // Explicado en la ruta anterior
    var options = { 'new': true };
    
    console.log(query);
    console.log(update);

    // Si no acabáis de entender la explicación anterior mirad los 
    // console.logs y esta página
    // (https://docs.mongodb.org/manual/reference/operator/update/positional/#up._S_)
    Usuario.findOneAndUpdate(query, update, options, function(err, updated) {
        console.log(err);
        if (err) res.status(500).json(err);
        else res.status(200).json(updated);
    });
});

// Borrar una tarea
router.delete('/tareas/:id', function(req, res) {
    var query = { username: req.usuario.username };

    // Eliminamos la tarea con _id = req.params.id
    // del array de tareas
    var update = { $pull: { "tareas._id": req.params.id } };

    // Explicado más arriba
    var options = { 'new': true };
    
    Usuario.findOneAndUpdate(query, update, options, function(err, updated) {
        if (err) res.status(500).json(err);
        else res.status(200).json(updated);
    });
});

// Si no ha entrado en ninguna ruta anterior, error 404 not found
router.all('*', function(req, res) { res.status(404).send("Recurso no encontrado"); });