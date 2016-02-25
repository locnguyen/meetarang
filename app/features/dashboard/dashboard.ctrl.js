export default function(ngModule) {
    class DashboardController {
        constructor(DashboardService) {
            this.loadingData = true;

            DashboardService.get()
                .then(data => {
                    this.data = data;
                    this.loadingData = false;
                });
        }
    }

    DashboardController.$inject['DashboardService'];

    ngModule
        .controller('DashboardController', DashboardController);
}