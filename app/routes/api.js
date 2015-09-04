///// api routes /////
var Todo = require('../models/todo.js');

module.exports = function(app) {
    
    // get all todos
    app.get('/api/todos', function(req, res) {
        Todo.find(function(err, todos) {
            if (err)
                res.send(err);
            res.json(todos); 
        });
    });
    
    // add todo
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
   
    // change todo
    app.put('/api/todos/:id', function(req, res) {
        Todo.findById( req.param('id'), function(err, todo) {
            if (err)
                res.send(err);
            var d_same = (todo.done === req.body.done);
            todo.name = req.body.name;  
            todo.done = req.body.done;
            todo.save(function(err) {
                if (err)
                    res.send(err);
                if (d_same){    // only text changed, no need to get todos
                    res.json({ message: '' });
                }
                else {         // done changed, gets all todos for resorting list
                    Todo.find(function(err, todos) {
                        if (err)
                            res.send(err)
                        res.json(todos);
                    });
                }
            });
        });
    }); 
    
    // delete todo
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
    
    // delete all
    // when no todo id
    app.delete('/api/todos/', function(req, res) {
        Todo.find().remove().exec();
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
}