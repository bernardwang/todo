'use strict';

var app = angular.module('todoApp');

app.controller('MainCtrl', function ($scope, $http) {
    
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $scope.getTodo = function() {
        $http.get('/api/todos')
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }();

    // when submitting new todo
    $scope.addTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    // when changing todo
    $scope.updateTodo = function(todo) {
        $http.put('/api/todos/' + todo._id, todo)
            .success(function(data) {
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo
    $scope.removeTodo = function(todo) {
        $http.delete('/api/todos/' + todo._id)
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    // delete todos marked done
    $scope.removeDone = function() {
        $scope.todos.forEach( function(todo) {
            if(todo.done) {
                console.log(todo.name);
                $http.delete('/api/todos/' + todo._id)
                    .success(function(data) {
                        $scope.todos = data;
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    }); 
            }
        });
    }
    
    // delete all todos
    $scope.removeAll = function() {
        $http.delete('/api/todos/')
            .success(function(data) {
                $scope.todos = [];
            })
            .error(function(data) {
                console.log('Error: ' + data);
            }); 
    }

});