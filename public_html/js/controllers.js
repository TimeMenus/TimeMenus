'use strict';
angular.module('controllers', ['services'])
        .controller('ListCtrl', function ($scope, $sessionStorage, TimeService, $routeParams, UserService, ItemService, MenuService) {

            $scope.admin = false;
            $scope.todayDate = TimeService.getTodayDate();


            if (UserService.isLoggedIn()) {
                console.log("admin");
                $scope.admin = true;
            } else {
                console.log("not admin");
            }
            $scope.categoryIdscp = $routeParams.categoryId;
            ItemService.getItems($sessionStorage.menuKey, function (data) {
                $scope.categoryItems = data;
            });
            MenuService.getCategories(function (data) {
                $scope.categories = data;
            });
            
            $scope.deleteItem = function(key){
              ItemService.deleteItem($sessionStorage.menuKey, key);
            };

        })
        .controller('AdminCtrl', function ($scope, UserService, TimeService, MenuService, ItemService, $sessionStorage) {

            $scope.categories = [];
            $scope.createNewMenu = false;
            $scope.menu = {};
            $scope.todayDate = TimeService.getTodayDate();

            MenuService.getCategories(function (data) {
                $scope.categories = data;
            });

            MenuService.getMenuKey(TimeService.getTodayDate(), function (key) {
                if (key === null) {
                    $scope.createNewMenu = true;
                } else {
                    MenuService.getMenu(key, function (menu) {
                        $scope.menu = menu;
                    });
                }

            });

            $scope.createMenu = function (date) {

                $scope.menu.date = date;
                MenuService.createMenu($scope.menu);
            };

            $scope.updateNote = function (date) {

                MenuService.updateMenu(date, $scope.menu);

            };

//            $scope.items = MenuService.getMenu();
            
             $scope.deleteItem = function(key){
              ItemService.deleteItem($sessionStorage.menuKey, key);
            };

        })
        .controller('DashboardCtrl', function ($scope, MenuService, TimeService, $firebaseObject, $firebaseArray, $firebaseAuth, $sessionStorage) {

            $scope.loading = true;
            function callBack(menuKey) {
                $sessionStorage.menuKey = menuKey;
                if (menuKey !== null) {
                    MenuService.getMenu(menuKey, function (menu) {
                        menu.$bindTo($scope, "menu");
                        $scope.loading = false;
                    });
                } else {
                    $scope.loading = false;
                }
            }

            MenuService.getMenuKey(TimeService.getTodayDate(), callBack);

            MenuService.getCategories(function (categories) {
                categories.$bindTo($scope, "categories");
            });
            
            $scope.categoryName =  function(id){
                var name="Miscellaneous";
                
                angular.forEach($scope.categories,function(value,key){
                    if(id === key){
                        name=value;
                    }
                });

             return name;   
            };

        })
        .controller('LoginCtrl', function ($scope, $location, UserService) {

            var config = {
                apiKey: "AIzaSyDhw6flOynYbkqkieRd8nyWkT32QDBoz8E",
                authDomain: "express-cafe-a7687.firebaseapp.com",
                databaseURL: "https://express-cafe-a7687.firebaseio.com",
                storageBucket: "express-cafe-a7687.appspot.com"
            };

            firebase.initializeApp(config);

            $scope.logIn = function () {
                if (firebase.auth().currentUser) {
                    // [START signout]
                    $scope.logOut();
                    // [END signout]
                } else {

                    var email = $scope.email;
                    var password = $scope.password;

                    if (email.length < 4) {
                        alert('Please enter an email address.');
                        return;
                    }
                    if (password.length < 4) {
                        alert('Please enter a password.');
                        return;
                    }
//        // Sign in with email and pass.
//        // [START authwithemail]
                    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorMessage);
                        if (errorCode === 'auth/wrong-password') {
                            alert('Wrong password.');
                        } else {
                            alert(error);
                        }
                        // [END_EXCLUDE]
                    }).then(function (data) {

                        if (data !== undefined) {
                            console.log(data);
                            UserService.setUser(data);
                            loggedInTrigger();
                        }

                    });
                }


            };

            $scope.admin = function () {
                displayForm('loginForm', true);
                displayForm('adminForm', false);
            };

            var displayForm = function (formName, display) {
                var currentElement = document.getElementById(formName);
                if (display) {
                    currentElement.style.visibility = 'visible';
                    currentElement.style.display = 'inline';
                } else {
                    currentElement.style.visibility = 'hidden';
                    currentElement.style.display = 'none';
                }
            };

            var loggedInTrigger = function () {
                displayForm('loginForm', false);
                displayForm('logoutForm', true);
            };

            $scope.logOut = function () {
                firebase.auth().signOut().then(function () {
                    displayForm('logoutForm', false);
                    displayForm('loginForm', true);
                    $location.url('/');
                });

            };

            if (!firebase.auth().currentUser) {
                //$scope.logOut();
            }

            displayForm('loginForm', false);
            displayForm('logoutForm', false);


        })
        .controller('ItemFormCtrl', function ($scope, $uibModalInstance, categories, date, MenuService, ItemService, Upload) {

            var storageRef = firebase.storage().ref();

            $scope.categories = categories;
            
            $scope.item={};
            
            var it={};


            $scope.ok = function () {
//                console.log($scope.item);
                console.log(it);

//                

                if (!it || !it.url) {
                    console.log("Need to upload a picture");
                    alert("Need to upload a picture");
                } else {
                    
                    $scope.item.picture={};
                    $scope.item.picture.url=it.url;
                    $scope.item.picture.name=it.name;

                    MenuService.getMenuKey(date, function (key) {
//                        $uibModalInstance.close();

                            console.log(key);

                        if (key === null) {
                            console.log("need to create a menu");

                        } else {
                            return ItemService.addItem(key, $scope.item, function (data) {
                                console.log(data);
                            $uibModalInstance.close();
//                             return;
                            });
                        }
                    });
                    
                    $uibModalInstance.close();
                }
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };


            $scope.$watch('file', function () {

                $scope.upload($scope.file);

            });

            $scope.upload = function (file) {

                if (file !== undefined) {

                    file = file[0];

                    var metadata = {
                        'contentType': file.type
                    };

                    var newName = generateRandomId() + '.' + file.name.split('.')[1];

                    storageRef.child('images/' + newName).put(file, metadata).then(function (snapshot) {
                        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                        console.log(snapshot.metadata);
                        var url = snapshot.metadata.downloadURLs[0];
                        console.log('File available at', url);

                        it.url=url;
                        it.name=snapshot.a.name;
                        

                    }).catch(function (error) {
                        console.error('Upload failed:', error);
                    });
                }
            };


            var generateRandomId = function () {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 15; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            };

        })
        .controller('ItemFormDisplayCtrl', function ($scope, $uibModal, $log, MenuService) {

            $scope.categories = [];
            MenuService.getCategories(function (data) {
                $scope.categories = data;
            });


            $scope.open = function (date) {

                console.log(date);

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'templates/itemform.html',
                    controller: 'ItemFormCtrl',
                    resolve: {
                        categories: function () {
                            return $scope.categories;
                        },
                        date: function () {
                            return date;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

        });

