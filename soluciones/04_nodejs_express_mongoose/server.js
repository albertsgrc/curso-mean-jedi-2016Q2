var http = require('http');
var express = require('express');
var expressWinston = require('express-winston');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var colors = require('colors');

var config = require('./config');
require('./models').init();
var routers = require('./routers');

var Usuario = mongoose.model('Usuario');
var Producto = mongoose.model('Producto');

// Database connection

mongoose.connect(config.DB_URI, function(error, connected) {
    if (error) { console.error(error.red); process.exit(1); }
    else console.log("Successfully connected to database".green);
});

// Routing and middleware definitions

var app = express();

app.use(expressWinston.logger(config.WINSTON_LOGGER_OPTS));

app.use(bodyParser.json());

// Define routing

app.use('/usuario', routers.usuario);
app.use('/admin', routers.admin);
app.use('/producto', routers.producto);

app.get('/productos', function(req, res) {
    Producto.find(function(error, productos) {
        if (error) {
            console.error(error.red);
            res.status(500).json(error);
        }
        else res.status(200).json(productos);
    });
});

app.post('/registrarUsuario', function(req, res) {
    var usuario = new Usuario(req.body);

    usuario.save(function(error, usuario) {
        if (error) {
            console.error(error.red);
            res.status(500).json(error);
        }
        else res.status(200).send({
            msg: "Usuario añadido correctamente",
            usuario: usuario
        });
    });
});

app.all('*', function(req, res) {
    res.status(404).send("URL Inválida!");
});

http.createServer(app).listen(config.PORT);
