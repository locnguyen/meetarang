export default function(ngModule) {
    class DashboardController {
        constructor(DashboardService) {
            DashboardService.get()
                .then(data => this.data = data);
        }
    }

    DashboardController.$inject['DashboardService'];

    ngModule
        .controller('DashboardController', DashboardController);
}