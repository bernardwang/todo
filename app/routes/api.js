///// api routes /////
var Todo = require('../models/todo.js');

module.exports = function(app) {
    
    app.get('/api/todos', function(req, res) {
        Todo.find(function(err, todos) {
            if (err)
                res.send(err);
            res.json(todos); 
        });
    });
    
    app.post('/api/todos', function(req, res) {
        Todo.create({
            name : req.body.txt,
            done : false,   
        }, function(err, todo) {
            if (err)
                res.send(err);
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);
                res.json(todos);
            });
        });
    });
   
    app.put('/api/todos/:id', function(req, res) {
        Todo.findById( req.param('id'), function(err, todo) {
            if (err)
                res.send(err);
            todo.name = req.body.name;  
            todo.done = req.body.done;
            todo.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully updated' });
            });
        });
    }); 
    
    app.delete('/api/todos/:id', function(req, res) {
        Todo.remove({
            _id : req.params.id    
        }, function(err, todo) {
            if (err)
                res.send(err);
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
    
    app.delete('/api/todos/', function(req, res) {
        Todo.find().remove().exec();    
    });
}