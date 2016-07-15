'use strict';

angular.module('cafe', ['ngRoute', 'controllers','ngAnimate','ui.bootstrap']).
        config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

                $routeProvider.when('/', {
                    templateUrl: 'templates/dashboard.html',
                    controller: 'DashboardCtrl'
                }).when('/list', {
                    templateUrl: 'templates/list.html',
                    controller: 'ListCtrl'
                }).when('/admin', {
                    templateUrl: 'templates/admin.html',
                    controller: 'AdminCtrl'
                }).otherwise({
                    redirectTo: '/'
                });

            }]);