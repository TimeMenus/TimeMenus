'use strict';

angular.module('cafe', ['ngRoute']).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

    $routeProvider.when('/', {
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardCtrl'
            }).when('/list', {
                templateUrl: 'templates/list.html',
                controller: 'ListCtrl'
            }).when('/admin', {
                templateUrl: 'templates/admin.html',
                controller: 'ListCtrl'
            }).otherwise({
                redirectTo: '/'
            });

}]).controller('DashboardCtrl',function(){

    console.log('Dahsboard');

}).controller('ListCtrl',function(){

    console.log('List');

}).controller('AdminCtrl',function(){

    console.log('Admin');

});