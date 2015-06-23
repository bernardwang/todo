'use strict';

var app = angular.module('todoApp', ['ngResource','ngRoute'])

app.config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {
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