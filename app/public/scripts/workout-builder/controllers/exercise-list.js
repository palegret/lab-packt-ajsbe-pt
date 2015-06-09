+function (window, angular, workoutBuilder) {
	'use strict';

    var exerciseListControllerFactory = function ($scope, $location, WorkoutService) {
        $scope.goto = function (exercise) {
            $location.path('/builder/exercises/' + exercise.name);
        };
        
        var init = function () {
            $scope.exercises = WorkoutService.getExercises();
        };
        
        init();
    };

    workoutBuilder.controller('ExerciseListController', [
        '$scope', 
        '$location',
        'WorkoutService', 
        exerciseListControllerFactory
    ]);
}(this, this.angular, this.workoutBuilder);
