'use strict';

import {LoginController} from './login.ctrl.js';

angular
    .module('meetarang.features.login', ['meetarang.features.login.ctrl'])
    .config(loginModule);

loginModule.$inject = ['$stateProvider'];

function loginModule($stateProvider) {
    const loginState = {
        name: 'login',
        url: '/login',
        views: {
            '@': {
                controller: 'LoginController as loginPage',
                templateUrl: 'features/login/login.tpl.html'
            }
        }
    };

    $stateProvider.state(loginState);
}

export {loginModule}