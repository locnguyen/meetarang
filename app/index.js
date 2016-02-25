import 'angular';
import 'angular-material';
import 'angular-material/angular-material.scss';
import 'angular-ui-router';
import 'angular-messages';
import 'angular-cookies';

if (ON_TEST) {
    // Babel won't let us use import syntax here
    require('angular-mocks/angular-mocks');
}

const ngModule = angular.module('meetarang', ['ngMaterial', 'ngMessages', 'ngCookies', 'ui.router']);

ngModule.config(configUrl);
function configUrl($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/login');
}
configUrl.inject = ['$locationProvider', '$urlRouterProvider'];


ngModule.run(applicationInit);
function applicationInit(SessionService) {
    SessionService.runAtAppStart();
}
applicationInit.inject = ['SessionService'];


require('./common/services')(ngModule);
require('./features')(ngModule);