export default function(ngModule) {

    class DashboardService {
        constructor($http) {
            this.$http = $http;
        }

        get() {
            return this.$http.get('http://localhost:9000/dashboard')
                .then(res => res.data);
        }
    }

    DashboardService.inject = ['$http'];

    ngModule
        .service('DashboardService', DashboardService);
}