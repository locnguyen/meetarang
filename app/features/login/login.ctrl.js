'use strict';

export default function (ngModule) {
    class LoginController {

        constructor() {

        }

        doLogin() {
            console.log('login');
        }
    }

    LoginController.$inject = [];

    ngModule
        .controller('LoginController', LoginController);;
}