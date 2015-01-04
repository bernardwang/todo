// define todo model
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo', {
    text : String
});
