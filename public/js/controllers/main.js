'use strict';

var app = angular.module('todoApp');

app.controller('MainCtrl', function ($scope, $http) {
    
    $scope.formData = {};   // add todo text box
    
    // landing on the page, get all todos and show them
    // self invoking func
    $scope.getTodo = function() {
        $http.get('/api/todos')
            .success(function(data) {
                updateList(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }();
    
    // sorts lists by done and not done
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

    // submit new todo
    $scope.addTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so user can enter another
                updateList(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    // change todo text
    $scope.updateText = function(todo) {
        $http.put('/api/todos/' + todo._id, todo)
            .success(function(data) {
                // no need to update list 
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    // change todo done
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
        $scope.done_todos = []; // reset list
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
    
    // reverse to display most recent todos first
    $scope.reverse = function(array) {
        if(array && array.length > 0) {
            return array.slice().reverse();
        }
        return [];
    }
     
    // filter funcs
    function isDone(todo) {
        if(todo && todo.done === true) return true;   
    }
    
    function isNotDone(todo) {
        if(todo && todo.done === false) return true;   
    }
    
});