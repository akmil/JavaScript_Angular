'use strict';

var main_url = './test/';
main_url = 'https://api.github.com/users';
angular.module('factoryGit', []).
        factory('getJsonDataFactory', function($http) {
            return{
                getData: function(main_url) {
//                    return $http.get(main_url + 'sampledb.json');
                    return $http.get(main_url);
                }
            };
        }).
        factory('getJsonDataUserFactory', function($http) {
            return{
                getDataUser: function() {
                    return $http.get('main_url' + $routeParams.user_more_info + '.json');
                }
            }
            ;
        });

angular.module('usercatServices', ['ngResource'])        
        .factory('factoryReposInfo', function($resource, $routeParams) {
            console.log("**factoryReposInfo return:" + {method: 'GET', params: {user: 'id'}, isArray: true});
            console.log("**factoryReposInfo $resource return:" + main_url +'/'+ $routeParams.repos +"/repos");
//$routeParams.repos - берет :repos из app.js
//            return $resource(main_url + $routeParams.repos + '.json',
            return $resource(main_url +'/'+ $routeParams.repos +'/repos',
                    {
//                        'save': {method: 'POST'},
                        'isArr': {method: 'JSONP', isArray: true}
                    },
                    {       
                        queryReposInfo: {method: 'GET', params: {user: 'id'}, isArray: true}
                        //isArray: false - значит что стучим в {".."}, а не массив[{".."},{".."}]
                    });
        })        
        .factory('factoryUserInfo', function($resource, $routeParams) {
            console.log("**factoryUserInfo started ***");
            console.log("**factoryUserInfo return:" + {method: 'GET', params: {user: 'id'}, isArray: true});
//            var UserInfoUrl = main_url +'/'+ $routeParams.user_more_info;
//            console.log("**$routeParams return:" + $routeParams.userInfo);
            
            return $resource(main_url +'/'+ $routeParams.userInfo,{},
                    {       
                        queryUserInfo: {method: 'GET', params: {user: 'login'}, isArray: false}                        
                    });
        })        
        .factory('factoryName', function($resource) {
            console.log("phonecatServices return:" + {method: 'GET', params: {user: 'id'}, isArray: true});

            return $resource(main_url + '?since=4', {}, {
                query: {method: 'GET', params: {user: 'id'}, isArray: true}
            });
        });
