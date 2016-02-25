export default function(ngModule) {
    class SessionService {
        constructor ($http, $location, $rootScope, UserService, AppConfig) {
            this.$http = $http;
            this.$location = $location;
            this.$rootScope = $rootScope;
            this.UserService = UserService;
            this.AppConfig = AppConfig;
        }

        isLoggedIn() {
            return angular.isDefined(this.UserService.getToken());
        }

        doLogin(code) {
            return this.$http.post(`${this.AppConfig.apiBase}/oauth2/access?code=${code}`)
                .then(res => this.UserService.saveToken(res.data.token));
        }

        runAtAppStart() {
            this.$rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
                if (!this.isLoggedIn() && !this.$location.search().code) {
                    window.location.href = `${this.AppConfig.apiBase}/oauth2/authorize`;
                }
            });
        }
    }

    SessionService.$inject = ['$http', '$location', '$rootScope', 'UserService', 'AppConfig'];

    ngModule
        .service('SessionService', SessionService);
}