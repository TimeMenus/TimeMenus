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
        .service('ItemService', function (MenuService) {

            this.getItems = function () {

            };

            this.addItem = function (menuKey, item) {
                console.log("addItem");
                
                var itemsRef = firebase.database().ref('menues/'+menuKey+'/items');
//                itemsRef.push(item);
                
            };

            this.deleteItem = function () {

            };

            this.updateItem = function () {

            };

        })
        .service('MenuService', function ($firebaseObject) {
            this.createMenu = function (menu) {
                var menuReference = firebase.database().ref('menues');
                menuReference.push(menu);
            };

            this.getMenu = function (key, callback) {

                var menuReference = firebase.database().ref('menues/'+key);
                var syncObject = $firebaseObject(menuReference);

                menuReference.on("value", function () {

                    callback(syncObject);
                });
                

            };

            this.getMenuKey = function (date, callback) {
                var menuReference = firebase.database().ref('menues');
                menuReference.orderByChild("date").equalTo(date).on("value", function (child) {
                    if (child.val() === null) {
                        callback(null);
                    } else {
                        //TODO is there a better way to get the key?
//                        console.log(child.key);
                        for (var key in child.val()) {
                            callback(key);
                        }
                    }
                });
            };

            this.updateMenu = function (date,menu) {
                this.getMenuKey(date,function(key){
                    
                     var menuReference = firebase.database().ref('menues/'+key);
                     menu.date=date;
                    menuReference.update(menu);
                    
                });
            };
            
            this.getCategories = function (callback){
              var catRef = firebase.database().ref('categories');
              catRef.on('value',function(data){
                 callback(data.val()); 
              });
            };
        });