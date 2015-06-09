+function (window, angular, workoutBuilder) {
	'use strict';

    var workoutListControllerFactory = function ($scope, $location, WorkoutService) {
        $scope.goto = function (workout) {
            $location.path('/builder/workouts/' + workout.name);
        };
        
        var init = function () {
            $scope.workouts = WorkoutService.getWorkouts();
        };
        
        init();
    };
    
    workoutBuilder.controller('WorkoutListController', [
        '$scope', 
        '$location', 
        'WorkoutService', 
        workoutListControllerFactory
    ]);
}(this, this.angular, this.workoutBuilder);
