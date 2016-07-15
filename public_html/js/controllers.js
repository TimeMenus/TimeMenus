'use strict';
angular.module('controllers', ['services'])
        .controller('ListCtrl', function () {

            console.log('List');

        })
        .controller('AdminCtrl', function ($scope, UserService, TimeService) {

            var categories = firebase.database().ref('categories').limitToLast(100);

            $scope.categories = [];

            categories.on('child_added', function (data) {
                console.log(data.val());
                $scope.categories.push(data.val());
            });


//            console.log(categories);


            $scope.todayDate = TimeService.getTodayDate();

//         console.log(UserService.getUser());

        })
        .controller('DashboardCtrl', function () {

            console.log('Dahsboard');

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
                        // [START_EXCLUDE]
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
//                        $location.url('/admin');
                            loggedInTrigger();
                        }

                    });
//        // [END authwithemail]
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


        });

