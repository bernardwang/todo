'use strict';

var app = angular.module('todoApp', ['ngResource','ngRoute']);

// angular views
app.config(['$routeProvider', 
    function($routeProvider) {
        $routeProvider
        
        // home page
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        
        // about page
        .when('/about', {
            templateUrl: 'views/about.html',
        })
        
        // 404
        .otherwise({
            redirectTo: '/'
        });
}]);