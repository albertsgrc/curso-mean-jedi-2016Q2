var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

  var subTaskSchema = new Schema({
    text: {type: String, required:true},
    completed: {Type: Boolean, default: false}
  }, {_id: 0});

  var taskSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    completed: {type: Boolean, default:false},
    dueDate: {type: Date},
    created: {type: Date, default: Date.now},
    subtasks: [subTaskSchema]
  });

  mongoose.model('Task', taskSchema, 'tasks');
};

