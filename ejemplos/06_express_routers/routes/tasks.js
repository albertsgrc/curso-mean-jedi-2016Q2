var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  // Aquí obtendríamos las tareas
  res.status(200).send('Hi from tasks list');
});

router.post('/', function(req, res, next) {
  // Aquí creariamos una nueva tarea
});

router.delete('/:id', function(req, res, next) {
  var taskId = req.param('id');
  // Aquí borrariamos la tarea con _id = taskId
});

router.patch('/:id', function(req, res, next) {
  var taskId = req.param('id');
  // Aquí actualizariamos la tarea con _id = taskId
});

module.exports = router; // Cuando llamamos require('tasks'), obtenemos el router