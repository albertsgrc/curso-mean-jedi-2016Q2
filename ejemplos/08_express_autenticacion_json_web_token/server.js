var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');

var models = require('./models');

// config.js es un fichero con constantes
var config = require('./config');

// Conectamos a la BD
mongoose.connect(config.db_path);

// Inicializamos los modelos
models.initialize();

var app = express();

// Middleware que parsea el body
app.use(bodyParser.json());

// Importamos los módulos enrutadores

// del recurso 'users'
var userRouter = require('./routes/users');

// de la autenticación (urls que servirán para hacer login)
var authRouter = require('./routes/authentication');

// Y los usamos para los caminos que toquen
app.use('/users',  userRouter);
app.use('/authenticate', authRouter);

http.createServer(app).listen(8080);
