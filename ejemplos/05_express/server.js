var express = require('express');
var bodyParser = require('body-parser');
var winston = require('winston');
var expressWinston = require('express-winston');
var http = require('http');

var app = express();

// Este middleware nos permite tratar el body de la request como si fuera un objeto json de javascript
app.use(bodyParser.json());

// Este middleware loguea por consola todas las peticiones
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      colorize: true
    })
  ],
  meta: false,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  colorStatus: true
}));

app.use(function(req,res,next) {
  winston.info('Our custom middleware!');
  next();
});

// Esta es la función final que responde a la petición.
app.get('/', function(req, res, next) {
  res.status(200).send('Hi from express!')
});

// Ejemplo del tratamiento de una petición tipo post
// Por ejemplo, para crear una nueva tarea
app.post('/tasks', function(req, res, next) {
  var taskData = req.body;
  // Aquí guardariamos el objeto taskData en la base de datos
  res.status(200).send(taskData);
});

http.createServer(app).listen(8080);