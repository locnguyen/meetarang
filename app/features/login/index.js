'use strict';

export default function (ngModule) {
    require('./login.ctrl.js')(ngModule);

    ngModule.config(loginModule);

    loginModule.$inject = ['$stateProvider'];

    function loginModule($stateProvider) {
        const loginState = {
            name: 'login',
            url: '/login',
            views: {
                '@': {
                    controller: 'LoginController as vm',
                    template: require('./login.tpl.html')
                }
            }
        };

        $stateProvider.state(loginState);
    }
}