'use strict';
angular.module('services', [])
        .service('UserService', function () {

            var user = undefined;

            this.getUser = function () {
                if (user === undefined) {
                    return null;
                } else {
                    return user;
                }
            };

            this.setUser = function (data) {
                user = data;
            };

            this.isLoggedIn = function () {
                if (this.getUser() !== null) {
                    return true;
                } else {
                    return false;
                }
            };


        })
        .service('TimeService', function () {

            this.getTodayDate = function () {
//                return moment().format('LL');
                return moment().format("MMM Do YY");
            };

        })
        .service('ItemService', function () {

            this.getItems = function () {

            };

            this.addItem = function () {

            };

            this.deleteItem = function () {

            };

            this.updateItem = function () {

            };

        })
        .service('MenuService', function () {
            this.startMenu = function () {

            };

            this.getMenu = function (key, callback) {

                var menuReference = firebase.database().ref('menues/'+key);

                menuReference.on("value", function (child) {
                    callback(child.val());
                });

            };

            this.getMenuKey = function (date, callback) {
                var menuReference = firebase.database().ref('menues');
                menuReference.orderByChild("date").equalTo(date).on("value", function (child) {
                    if (child.val() === null) {
                        callback(null);
                    } else {
                        //TODO is there a better way to get the key?
                        console.log(child.key);
                        for (var key in child.val()) {
                            callback(key);
                        }
                    }
                });
            };

            this.updateMenu = function () {

            };
            
            this.getCategories = function (callback){
              var catRef = firebase.database().ref('categories');
              catRef.on('value',function(data){
                 callback(data.val()); 
              });
            };
        });