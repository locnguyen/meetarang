export default function(ngModule) {

    ngModule
        .service('DashboardService', DashboardService);

    DashboardService.$inject = ['$http', 'AppConfig'];

    function DashboardService($http, AppConfig) {
        var external = {
            get: get
        };

        function _getUrl() {
            return AppConfig.apiBase + '/dashboard';
        }

        function get() {
            return $http.get(_getUrl())
                .then(function(res) {
                    return res.data;
                });
        }

        return external;
    }
}