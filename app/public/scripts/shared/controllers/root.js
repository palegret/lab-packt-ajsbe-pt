+function (window, angular, app) {
    'use strict';
    
    app.controller('RootController', ['$scope', '$modal', function ($scope, $modal) {
        var WorkoutHistoryController = function ($scope, $modalInstance, workoutHistoryTracker) {
            $scope.search = {
                completed: false
            };
            
            $scope.history = workoutHistoryTracker.getHistory();
            
            $scope.ok = function () {
                $modalInstance.close();
            };
        };
        
        WorkoutHistoryController.$inject = ['$scope', '$modalInstance', 'workoutHistoryTracker'];

        $scope.showWorkoutHistory = function () {
            $modal.open({
                templateUrl: 'content/partials/workout-history.html',
                controller: WorkoutHistoryController,
                size: 'lg'
            });
        };
        
        $scope.$on('$routeChangeSuccess', function (e, current, previous) {
            $scope.currentRoute = current;
        });
        
        var init = function () {
        };
        
        init();
    }]);
}(this, this.angular, this.app);
