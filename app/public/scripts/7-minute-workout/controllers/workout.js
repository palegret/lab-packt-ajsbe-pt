+function (window, angular, sevenMinuteWorkout) {
    'use strict';
    
    var _workoutControllerFactory = function ($scope, $interval, $location, Exercise, WorkoutPlan, WorkoutService, workoutHistoryTracker, appEvents) {
        var restExercise = WorkoutService.getRestExercise(),
            exerciseIntervalPromise;
    
        var startWorkout = function () {
            $scope.workoutPlan = WorkoutService.getInitialWorkout();
            $scope.workoutTimeRemaining = $scope.workoutPlan.totalWorkoutDuration();
            workoutHistoryTracker.startTracking();
            $scope.currentExerciseIndex = -1;
            startExercise($scope.workoutPlan.exercises.shift());
        };

        var getNextExercise = function (currentExercisePlan) {
            var nextExercise = null;
            
            if (currentExercisePlan === restExercise)
                nextExercise = $scope.workoutPlan.exercises[$scope.currentExerciseIndex + 1];
            else if ($scope.currentExerciseIndex < $scope.workoutPlan.exercises.length - 1)
                nextExercise = restExercise;
    
            return nextExercise;
        };

        var startExerciseTimeTracking = function () {
            var workoutComplete = function () {
                workoutHistoryTracker.endTracking(true);
                $location.path('/finish');
            };

            var updateTimeAndDuration = function () {
                $scope.currentExerciseDuration++;
                $scope.workoutTimeRemaining--;
            };
            
            var promise = $interval(updateTimeAndDuration, 1000, ($scope.currentExercise.duration - $scope.currentExerciseDuration));
            
            promise.then(function () {
                var next = getNextExercise($scope.currentExercise);
                
                if (next)
                    startExercise(next);
                else
                    workoutComplete();
            });
            
            return promise;
        };

        $scope.pauseWorkout = function () {
            $interval.cancel(exerciseIntervalPromise);
            $scope.workoutPaused = true;
        };
        
        $scope.resumeWorkout = function () {
            exerciseIntervalPromise = startExerciseTimeTracking();
            $scope.workoutPaused = false;
        };
        
        $scope.pauseResumeToggle = function () {
            if ($scope.workoutPaused)
                $scope.resumeWorkout();
            else
                $scope.pauseWorkout();
        };

        $scope.onKeyPressed = function (event) {
            var p = 80, 
                P = 112;
                
            if (event.which === p || event.which === P)
                $scope.pauseResumeToggle();
        };

        var startExercise = function (exercisePlan) {
            $scope.currentExercise = exercisePlan;
            $scope.currentExerciseDuration = 0;
        
            if (exercisePlan.details.name != 'rest') {
                $scope.currentExerciseIndex++;
                $scope.$emit(appEvents.workout.exerciseStarted, exercisePlan.details);
            }
            
            exerciseIntervalPromise = startExerciseTimeTracking();
        };
    
        var init = function () {
            startWorkout();
        };
    
        init();
    };
    
    sevenMinuteWorkout.controller('WorkoutController', [
        '$scope', 
        '$interval', 
        '$location', 
        'Exercise', 
        'WorkoutPlan',
        'WorkoutService', 
        'workoutHistoryTracker', 
        'appEvents', 
        _workoutControllerFactory
    ]);
}(this, this.angular, this.sevenMinuteWorkout);
