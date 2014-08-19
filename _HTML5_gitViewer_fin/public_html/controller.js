'use strict';

/* Controllers */

var channelsControllers = angular.module('channelsControllers', []);

//channelsControllers.controller("CreateChannelCtrl_name", ['$scope', '$http', 'getInfoCtrl']);
//заменили $http на factoryName
channelsControllers.controller("CreateChannelCtrl_name", ['$scope', 'factoryName', 'getInfoCtrl']);

//showUserInfoCtrl.$inject = ['$scope', '$routeParams', '$http'];

function getInfoCtrl($scope, $routeParams, factoryName) {
    var url = 'https://api.github.com/users?since=15';//показывать начиная с 15 id
    console.log("getInfoCtrl start:: $routeParams.login: " + $routeParams.login + ', $routeParams:' + $routeParams);

    $scope.phones = factoryName.query();//делаем запрос через $http.get('./test/sampledb.json')
    $scope.emails = $routeParams.emails;
    $scope.orderProp = 'id';


}


channelsControllers.controller('showUserInfoCtrl', ['$scope', '$routeParams', '$http', 'factoryUserInfo',
    function($scope, $routeParams, $http, factoryUserInfo) {

        $scope.id = $routeParams.userInfo;//первое значение в json запросе 

        $scope.text = "success in showUserInfoCtrl";

//    $scope.user = factoryUserInfo.queryUserInfo();//делаем запрос через $http.get('...json')

        console.log('curernt userInfo: ' + $routeParams.userInfo);

        $scope.user = factoryUserInfo.get({user_more_info: $routeParams.userInfo}, function(data) {
            console.log(" ---user_more_info ", $routeParams.userInfo);
            //$scope.mainImageUrl = data.avatar_url; 
        });
        
        /*
        $scope.setImage = function(imageUrl) {
            $scope.mainImageUrl = imageUrl;
            for (var i = 0; i < 3; i++) {
                setTimeout(function() {
                    console.log(i);
                }, 5100);
         
            }
        };*/

        $http.get('https://api.github.com/users/' + $routeParams.userInfo)
                //$http.get('test/id_1.json')
                .success(function(data, status) {
                    $scope.user = data;
                    $scope.mainImageUrl = data.avatar_url;
                    console.log(data.login + " has " + data.public_repos + " public repositories!");
                })
                .error(function(status) {
                    console.log(" ---error in showUserInfoCtrl ", status);
                });

    }]);

//page 3
channelsControllers.controller('UserRepo_InfoCtrl', ['$scope','$http', '$routeParams', 'factoryReposInfo',
    function UserRepo_InfoCtrl($scope,$http, $routeParams, factoryReposInfo) {
    var url = 'https://api.github.com/users' +'/'+ $routeParams.repos + "/repos";
        $scope.text = " - static text: from UserRepo_InfoCtrl";
        $scope.id = $routeParams.userInfo;
        console.log('Reading:  ' + $routeParams.repos + "/repos" + "\n", "---");
        
        //req:example "https://api.github.com/users/vanpelt/repos"        
        //error in factory:  $routeParams.repos -not reload
        //$scope.names_repo = factoryReposInfo.queryReposInfo();//делаем запрос через $http.get('./test/sampledb.json')
        
         $http.get(url)
         .success(function(data, status) {
         $scope.user = data;        
         $scope.names_repo = data;

         console.log("data[0].name:" + $scope.names_repo + "\n id: " + data.id + "\nowner: " + data.owner);         
         })
         .error(function(status) {
         console.log(" ---error in UserRepo_InfoCtrl ", "status" + status);
         });
    }]);