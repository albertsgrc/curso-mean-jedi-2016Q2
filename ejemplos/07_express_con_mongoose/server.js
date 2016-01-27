var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var models = require('./models');


// Nos conectamos a la bd con mongoose
mongoose.connect('mongodb://localhost/example_06');

// Inicializamos los modelos
models.initialize();

var app = express();

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

// Importamos el router de tareas
var taskRouter = require('./routes/tasks');

app.use('/tasks', taskRouter);

http.createServer(app).listen(8080);