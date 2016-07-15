'use strict';
angular.module('services', [])
        .service('UserService', function () {

            var user = {};

            this.getUser = function () {
                if (user === {}) {
                    return null;
                } else {
                    return user;
                }
            };

            this.setUser = function (data) {
                user = data;
            };

        })
        .service('TimeService', function () {

            this.getTodayDate = function(){
              return moment().format('LL');  
            };

        });