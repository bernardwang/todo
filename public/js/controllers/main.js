'use strict';

var app = angular.module('todoApp');
app.controller('MainCtrl', function ($scope) {
    $scope.todos = ['Item 1', 'Item 2', 'Item 3'];
});