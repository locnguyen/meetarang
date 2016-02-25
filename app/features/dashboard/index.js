'use strict';

export default function(ngModule) {
    require('./dashboard.ctrl.js')(ngModule);

    ngModule.config(dashboardModule);

    dashboardModule.$inject = ['$stateProvider'];

    function dashboardModule($stateProvider) {
        const loginState = {
            name: 'dashboard',
            url: '/dashboard',
            views: {
                '@': {
                    controller: 'DashboardController as vm',
                    template: require('./dashboard.tpl.html')
                }
            }
        };

        $stateProvider.state(loginState);
    }
}