'use strict';

var channelsApp = angular.module('channelsApp', [
    'ngRoute',
    'channelsControllers',
    'usercatServices',
    'factoryGit'
]);

//@override $routeProvider
channelsApp.config(['$routeProvider', function($routeProvider/*,$locationProvider*/) {
        $routeProvider.
        when('/user-list/repositories/:repos', {
            templateUrl: 'user/user_repos.html',
            controller: 'UserRepo_InfoCtrl'            
        }).when('/user-list/:userInfo', {
            templateUrl: 'user/test_3.html',
            controller: 'showUserInfoCtrl'
        }).when('/user-list', {
            templateUrl: 'user/user-list.html', 
            controller: 'getInfoCtrl'
        }).when('/welcomePage', {
            templateUrl: 'user/welcomePage.html',
            controller: 'getInfoCtrl'
        }).otherwise({            
            redirectTo: '/welcomePage'//первое что видим redirectTo ->welcomePage.html
        });
        console.log('redirect-end');
//        $httpProvider.responseInterceptors.push('httpInterceptor');
//        $locationProvider.html5Mode(true);//
    }]);