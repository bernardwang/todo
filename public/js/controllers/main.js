'use strict';

var app = angular.module('todoApp');

app.controller('MainCtrl', function ($scope, $http) {
    
    $scope.formData = {};
    
    function isNotDone(todo) {
        if(todo && todo.done === false) return true;   
    }
    
    function isDone(todo) {
        if(todo && todo.done === true) return true;   
    }
    
    function updateList(data) {
        if(data && data.length > 0) {
            $scope.todos = data.filter(isNotDone);
            $scope.done_todos = data.filter(isDone);   
        }
        else{
            $scope.todos = [];
            $scope.done_todos = [];
        }
    }
    
    // display todos most recent first
    $scope.reverse = function(array) {
        if(array && array.length > 0) {
            return array.slice().reverse();
        }
        return [];
    }

    // landing on the page, get all todos and show them
    $scope.getTodo = function() {
        $http.get('/api/todos')
            .success(function(data) {
                updateList(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }();

    // submitting new todo
    $scope.addTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                updateList(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    // changing todo text
    $scope.updateText = function(todo) {
        $http.put('/api/todos/' + todo._id, todo)
            .success(function(data) {
                // no need to update list 
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    // changing todo done
    $scope.updateDone = function(todo) {
        $http.put('/api/todos/' + todo._id, todo)
            .success(function(data) {
                updateList(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo
    $scope.removeTodo = function(todo) {
        $http.delete('/api/todos/' + todo._id)
            .success(function(data) {
                updateList(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    // delete todos marked done
    $scope.removeDone = function() {
        $scope.done_todos.forEach(function(d_todo) {
            $http.delete('/api/todos/' + d_todo._id)
                .success(function(data) {
                    // nothing
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                }); 
        });
        $scope.done_todos = [];
    }
    
    // delete all todos
    $scope.removeAll = function() {
        $http.delete('/api/todos/')
            .success(function(data) {
                updateList(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            }); 
    }
    
});