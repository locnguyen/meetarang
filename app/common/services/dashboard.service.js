export default function(ngModule) {

    class DashboardService {
        constructor($http, AppConfig) {
            this.$http = $http;
            this.AppConfig = AppConfig;
        }

        _getUrl() {
            return `${this.AppConfig.apiBase}/dashboard`;
        }

        get() {
            return this.$http.get(this._getUrl())
                .then(res => res.data);
        }
    }
    DashboardService.inject = ['$http', 'AppConfig'];

    ngModule
        .service('DashboardService', DashboardService);
}