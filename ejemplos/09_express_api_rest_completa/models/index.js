var models = ['./task.model', './user.model'];

exports.initialize = function() {
  models.forEach(function(model){
    require(model)();
  });
};