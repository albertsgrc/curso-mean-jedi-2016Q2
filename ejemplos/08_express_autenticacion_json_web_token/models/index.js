var models = ['./user'];

exports.initialize = function() {
  models.forEach(function(model){
    require(model)();
  });
};