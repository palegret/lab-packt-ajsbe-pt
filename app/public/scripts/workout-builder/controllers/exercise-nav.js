+function (window, angular, workoutBuilder) {
	'use strict';

    var exerciseNavControllerFactory = function ($scope, WorkoutService, WorkoutBuilderService) {
        $scope.addExercise = function (exercise) {
            WorkoutBuilderService.addExercise(exercise);
        };
        
        var init = function () {
            $scope.exercises = WorkoutService.getExercises();
        };
        
        init();
    };

    workoutBuilder.controller('ExerciseNavController', [
        '$scope', 
        'WorkoutService', 
        'WorkoutBuilderService',
        exerciseNavControllerFactory
    ]);
}(this, this.angular, this.workoutBuilder);
