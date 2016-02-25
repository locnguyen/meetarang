'use strict';

export default function (ngModule) {
    class LoginController {
        constructor($location, SessionService) {
            if ($location.search().code) {
                SessionService.doLogin($location.search().code);
            }
        }
    }

    LoginController.$inject = ['$location', 'SessionService'];

    ngModule
        .controller('LoginController', LoginController);
}