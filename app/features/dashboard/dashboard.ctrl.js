export default function(ngModule) {
    class DashboardController {
        constructor(DashboardService) {
            this.loadingData = true;

            DashboardService.get()
                .then(data => {
                    this.loadingData = false;
                    this.data = data;
                    let {name, description, event_url:eventUrl} = data.next_event;
                    Object.assign(this, {name, description, eventUrl});
                });
        }
    }

    DashboardController.$inject['DashboardService'];

    ngModule
        .controller('DashboardController', DashboardController);
}