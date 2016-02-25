import 'angular';
import 'angular-material';
import 'angular-material/angular-material.scss';
import 'angular-ui-router';
import 'angular-messages';
import 'angular-cookies';
import 'angular-sanitize';

if (ON_TEST) {
    // Babel won't let us use import syntax here
    require('angular-mocks/angular-mocks');
}

const ngModule = angular.module('meetarang', ['ngMaterial', 'ngMessages', 'ngCookies', 'ngSanitize', 'ui.router']);


ngModule.config(configUrl);
function configUrl($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/login');
}
configUrl.$inject = ['$locationProvider', '$urlRouterProvider'];



ngModule.run(applicationInit);
function applicationInit(SessionService) {
    SessionService.runAtAppStart();
}
applicationInit.$inject = ['SessionService'];



ngModule.factory('authInterceptor', ['UserService', function(UserService) {
    return {
        request(config) {
            if (UserService.getToken()) {
                config.headers.Authorization = `Bearer ${UserService.getToken()}`;
            }
            return config;
        }
    }
}]);

ngModule.config(configHttp);
function configHttp($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors = [...$httpProvider.interceptors, 'authInterceptor'];
}


require('./common/services')(ngModule);
require('./common/directives')(ngModule);
require('./features')(ngModule);