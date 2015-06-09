+function (window, angular, app) {
	'use strict';
    
    app.directive('ngConfirm', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    var message = attrs.ngConfirmMessage || 'Are you sure?';
                    
                    if (confirm(message))
                        scope.$apply(attrs.ngConfirm);
                });
            }
        }
    }]);
}(this, this.angular, this.app);
