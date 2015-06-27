+function (window, angular, workoutBuilder) {
	'use strict';

    var workoutDetailControllerFactory = function ($scope, $location, Durations, WorkoutService, WorkoutBuilderService, selectedWorkout) {
        var restWatch = $scope.$watch('formWorkout.restBetweenExercise', function (newValue) {
            // Conversion logic courtesy http://stackoverflow.com/questions/596467/how-do-i-convert-a-number-to-an-integer-in-javascript
            if (newValue) {
                var intParser = function (value) {
                    return isNaN(parseInt(value)) ? value : parseInt(value);
                };
                
                newValue.$parsers.unshift(intParser);
                newValue.$formatters.push(intParser);
                restWatch(); // De-register the watch after first time.
            }
        });
        
        $scope.$watch('formWorkout.exerciseCount', function (newValue) {
            if (newValue)
                newValue.$setValidity('count', $scope.workout.exercises.length > 0);
        });
            
        $scope.$watch('workout.exercises.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.formWorkout.exerciseCount.$dirty = true;
                $scope.formWorkout.$setDirty();
                $scope.formWorkout.exerciseCount.$setValidity('count', newValue > 0);
            }
        });
     
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
