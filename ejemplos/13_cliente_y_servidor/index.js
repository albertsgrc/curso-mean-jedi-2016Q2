// Module requires

var http = require('http');
var express = require('express');
var expressWinston = require('express-winston');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var colors = require('colors');
var compression = require('compression');
var cors = require('cors');
var express_jwt = require('express-jwt');

// Config require, models init and routes require

var config = require('./server/config');
require('./server/models').init();
var routers = require('./server/routers');


// Database connection

mongoose.connect(config.DB_URI, function(error, connected) {
    if (error) { console.error(error.red); process.exit(1); }
    else console.log("Successfully connected to database".green);
});


// Routing and middleware definitions

var app = express();

// Middleware

// Middleware para loguear las peticiones que nos lleguen a la consola
app.use(expressWinston.logger(config.WINSTON_LOGGER_OPTS));

// Middleware para comprimir la respuesta de la petición y que ocupe menos,
// haciendo la transmisión de datos más ligera y rápida
app.use(compression());

// Middleware para permitir cross-origin requests en el cliente 
// (poder bajar recursos de otros servidores que no sean este que programamos)
app.use(cors());

// Middleware para parsear el body (req.body) en un objeto javascript
app.use(bodyParser.json());

// Este middleware proteje los ficheros de partials que requieren de autenticación
app.get('/views/partials/auth_protected/*', express_jwt({ secret: config.JWT_SECRET }));

// Con este middleware que nos da express
// podemos servir los ficheros del cliente, de modo que cuando iniciemos
// el servidor, será como haber hecho un http-server ./client, sólo
// que el servidor en este caso no será el que crea http-server, sino este
// que programamos
app.use(express.static(__dirname + '/client'));

// My routes
app.use('/usuarios', routers.usuarios);
app.use('/authenticate', routers.autenticacion);

// Todos los gets que no se hayan servido aún servirán la página web
app.get('*', function(req, res) { res.sendFile(__dirname + '/client/views/index.html'); })

// Error 404 resource not found
app.all('*', function(req, res) { res.status(404).send("Recurso no encontrado"); });


// Create the server and start listening

http.createServer(app).listen(config.PORT);