+function (window, angular, workoutBuilder) {
    'use strict';
    
    var workoutBuilderFactory = function (Exercise, WorkoutPlan, WorkoutService) {
        var _service = {},
            buildingWorkout,
            newWorkout;
        
        _service.startBuilding = function (name) {
            if (name) {
                buildingWorkout = WorkoutService.getWorkout(name);
                newWorkout = false;
            } else {
                buildingWorkout = new WorkoutPlan({});
                newWorkout = true;
            }
            
            return buildingWorkout;
        };

        _service.removeExercise = function (exercise) {
            buildingWorkout.exercises.splice(buildingWorkout.exercises.indexOf(exercise), 1);
        };

        _service.addExercise = function (exercise) {
            buildingWorkout.exercises.push({ 
                details: exercise, 
                duration: WorkoutService.DEFAULT_DURATION 
            });
        };

        _service.moveExerciseTo = function (exercise, toIndex) {
            if (toIndex < 0 || toIndex >= buildingWorkout.exercises) 
                return;
                
            // Reminder: array.splice(startIndex, numberToDelete[, item1[, item2[, ...]]])
            // * Changes contents of arrays by removing existing and/or adding new elements.
            // * Returns array of deleted elements, or empty array if none.
            // * If numberToDelete is zero, no elements are deleted. Duh.
            // * Parameters item1, item2, etc. can be arrays.
            
            var currentIndex = buildingWorkout.exercises.indexOf(exercise);
            var exerciseToMove = buildingWorkout.exercises.splice(currentIndex, 1)[0];
            buildingWorkout.exercises.splice(toIndex, 0, exerciseToMove);
        };

        return _service;
    };
    
    workoutBuilder.factory('WorkoutBuilderService', [
        'Exercise', 
        'WorkoutPlan', 
        'WorkoutService', 
        workoutBuilderFactory
    ]);
}(this, this.angular, this.workoutBuilder);
