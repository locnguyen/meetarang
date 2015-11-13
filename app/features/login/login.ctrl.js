'use strict';

class LoginController {

    constructor() {

    }

    doLogin() {
        console.log('login');
    }
}

LoginController.$inject = [];

angular
    .module('meetarang.features.login.ctrl', [])
    .controller('LoginController', LoginController);

export {LoginController}