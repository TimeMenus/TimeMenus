'use strict';

angular.module('cafe', ['ngRoute', 'controllers','ngAnimate','ui.bootstrap','firebase', 'directives','ngStorage','ngFileUpload','ngAutocomplete','autocomplete']).
        config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

                $routeProvider.when('/', {
                    templateUrl: 'templates/welcome.html',
                    controller: 'WelcomeCtrl'
                }).when('/dashboard', {
                    templateUrl: 'templates/dashboard.html',
                    controller: 'DashboardCtrl'
                }).when('/da/:placeCode', {
                    templateUrl: 'templates/dashboard.html',
                    controller: 'DashboardCtrl'
                }).when('/list/:categoryId', {
                    templateUrl: 'templates/list.html',
                    controller: 'ListCtrl'
                }).when('/admin', {
                    templateUrl: 'templates/admin.html',
                    controller: 'AdminCtrl'
                }).otherwise({
                    redirectTo: '/'
                });

            }]);