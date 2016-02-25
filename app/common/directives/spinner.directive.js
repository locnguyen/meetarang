import 'spin/dist/spin';

export default function(ngModule) {
    ngModule
        .directive('spinner', [function () {
            let opts = {
                lines: 9, // The number of lines to draw
                length: 6, // The length of each line
                width: 3, // The line thickness
                radius: 7, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#000', // #rgb or #rrggbb or array of colors
                speed: 1, // Rounds per second
                trail: 30, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: true, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: '50%', // Top position relative to parent
                left: '50%' // Left position relative to parent
            };

            return {
                restrict: 'A',
                scope: {
                    spinWhen: '='
                },
                controller($scope) {
                    this.startSpin = function () {
                        $scope.spinner = new Spinner(opts).spin();
                        $scope.spinner.spin($scope.target);
                    };

                    this.stopSpin = function () {
                        $scope.spinner && $scope.spinner.stop();
                    };
                },
                link(scope, el, attrs, ctrl) {
                    if (attrs.opts) {
                        opts = Object.assign({}, opts, attrs.opts);
                    }

                    scope.target = document.getElementById(attrs.id);

                    scope.$watch('spinWhen', function (val) {
                        if (val === true) {
                            ctrl.startSpin();
                        } else {
                            ctrl.stopSpin();
                        }
                    });
                }
            };
        }]);
}