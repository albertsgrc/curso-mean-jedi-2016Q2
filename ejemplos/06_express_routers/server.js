var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

app.use(bodyParser.json());

// Importar el modulo que hará de router para las rutas relacionadas con el recurso 'tasks'
var tasksRouter = require('./routes/tasks');

// Aquí indicamos que queremos delegar el enrutamiento al tasksRouter cuando la petición empiece por /tasks
app.use('/tasks', tasksRouter);


http.createServer(app).listen(8080);