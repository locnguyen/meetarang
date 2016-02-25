'use strict';

export default function (ngModule) {
    class LoginController {
        constructor($location, $state, SessionService) {
            if ($location.search().code) {
                SessionService.doLogin($location.search().code)
                    .then(res => $state.go('dashboard'));
            }
        }
    }

    LoginController.$inject = ['$location', '$state', 'SessionService'];

    ngModule
        .controller('LoginController', LoginController);
}