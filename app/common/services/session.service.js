export default function (ngModule) {
    class SessionService {
        constructor ($cookies, $http, $location, $rootScope) {
            this.$cookies = $cookies;
            this.$http = $http;
            this.$location = $location;
            this.$rootScope = $rootScope;
        }

        isLoggedIn() {
            return angular.isDefined(this.$cookies.get('token'));
        }

        doLogin(code) {
            this.$http.post(`http://localhost:9000/oauth2/access?code=${code}`)
                .then(res => this.$cookies.put('token', res.data.token));
        }

        runAtAppStart() {
            this.$rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
                if (!this.isLoggedIn() && !this.$location.search().code) {
                    window.location.href = 'http://localhost:9000/oauth2/authorize';
                }
            });
        }
    }

    SessionService.$inject = ['$cookies', '$http', '$location', '$rootScope'];

    ngModule
        .service('SessionService', SessionService);
}