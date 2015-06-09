+function (window, angular, workoutBuilder) {
	'use strict';

    var workoutDetailControllerFactory = function ($scope, $location, Durations, WorkoutService, WorkoutBuilderService, selectedWorkout) {
        $scope.removeExercise = function (exercise) {
            WorkoutBuilderService.removeExercise(exercise);
        };
        
        $scope.durations = Durations;
        
        $scope.moveExerciseTo = function (exercise, location) {
            WorkoutBuilderService.moveExerciseTo(exercise, location);
        };
        
        var init = function () {
            $scope.workout = selectedWorkout;
        };
        
        init();
    };
    
    workoutBuilder.controller('WorkoutDetailController', [
        '$scope', 
        '$location', 
        'Durations',
        'WorkoutService',
        'WorkoutBuilderService',
        'selectedWorkout',
        workoutDetailControllerFactory
    ]);
}(this, this.angular, this.workoutBuilder);
