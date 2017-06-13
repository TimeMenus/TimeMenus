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
        .service('ItemService', function ($firebaseObject) {

            this.getItems = function (key, callback) {
                var menuReference = firebase.database().ref('cafes/EXPRESSDC1/menues/' + key + '/items/');
                var syncObject = $firebaseObject(menuReference);

                menuReference.on("value", function () {

                    callback(syncObject);
                });
            };

            this.addItem = function (menuKey, item) {

                var itemsRef = firebase.database().ref('cafes/EXPRESSDC1/menues/' + menuKey + '/items');
                itemsRef.push(item).then(function (data) {
                    console.log(data.key);
                });
            };

            this.deleteItem = function (menuKey, key) {
                var itemsdelRef = firebase.database().ref('cafes/EXPRESSDC1/menues/' + menuKey + '/items/' + key);
                console.log(menuKey + key);
                itemsdelRef.remove();
            };

            this.updateItem = function () {

            };

        })
        .service("PlacesService", function ($localStorage) {
            
            
            this.savePlace = function(){
                
            };
            
            this.deletePlace = function(){
                
            };
            
            this.getPlace = function(){
                $localStorage.cafe;
            };

            this.getPlaces = function () {
                return [
                    {"code": "EXPRESS_DC1", "name": "EXPRESS DC1"}
                ];
            };
            this.findPlaceByCode = function (placeCode,callback) {
                angular.forEach(this.getPlaces(),function(place){
                 if(placeCode === place.code){
                     
                     callback(place);
                 }    
                });
            };
            this.findPlaceByName = function (placeName,callback) {
                 angular.forEach(this.getPlaces(),function(place){
                 if(placeName === place.name){
                     
                     callback(place);
                 }    
                });
            };
            this.getPlacesCodes = function () {

                var places = [];
                angular.forEach(this.getPlaces(), function (place) {
                    places.push(place.name);
                });
                return places;
            };


        })
        .service('MenuService', function ($firebaseObject, $sessionStorage) {
            this.createMenu = function (menu) {
                var menuReference = firebase.database().ref('cafes/EXPRESSDC1/menues');
                menuReference.push(menu);
            };

            this.getMenu = function (key, callback) {

                var menuReference = firebase.database().ref('cafes/EXPRESSDC1/menues/' + key);
                var syncObject = $firebaseObject(menuReference);

                menuReference.on("value", function () {

                    callback(syncObject);
                });


            };

            this.bindMenu = function ($scope) {





            };

            this.getMenuKey = function (date, callback) {

                if ($sessionStorage.menuKey !== null)
                {
                    callback($sessionStorage.menuKey);
                } else {


                    var menuReference = firebase.database().ref('cafes/EXPRESSDC1/menues');
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
                }
                ;
            };

            this.updateMenu = function (date, menu) {
                this.getMenuKey(date, function (key) {

                    var menuReference = firebase.database().ref('cafes/EXPRESSDC1/menues/' + key);
                    menu.date = date;
                    menuReference.update(menu);

                });
            };

            this.getCategories = function (callback) {
                var catRef = firebase.database().ref('cafes/EXPRESSDC1/categories');
//              catRef.on('value',function(data){
//                 callback(data.val()); 

                var syncObject = $firebaseObject(catRef);

                catRef.on("value", function () {
                    callback(syncObject);
                });
            };

            this.getCategory = function (catId) {

            };
        });
